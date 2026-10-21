(() => {
  'use strict';
  const root=document.getElementById('lab-layout'), canvas=root.querySelector('canvas'), ctx=canvas.getContext('2d');
  const panel=root.querySelector('.content'), reading=root.querySelector('.reading');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const pageCache=new Map();
  const sections={
    about:{title:'Dongwoo Kim',eyebrow:'THE PROFESSOR’S DESK',intro:'',page:'../index.html',place:"the professor's desk",pin:[-1.9,2.1,.3],destination:[-.3,1.6]},
    research:{title:'Research',eyebrow:'THE BLACKBOARD',intro:'',page:'research.html',place:'the blackboard',pin:[-2.1,3.05,-3.55],destination:[-2.2,-2]},
    papers:{title:'Publications',eyebrow:'THE BOOKSHELF',intro:'* equal contribution · † co-corresponding',page:'publication.html',place:'the bookshelf',pin:[2.4,3.05,-3.35],destination:[2.4,-2]},
    people:{title:'Our people',eyebrow:'THE SHARED DESK',intro:'Machine Learning Lab · POSTECH',page:'team.html',place:'the shared desk',pin:[2,2.1,.5],destination:[3.9,1.85]},
    join:{title:'Join the lab',eyebrow:'A SEAT FOR YOU',intro:'For prospective graduate students and undergraduate researchers.',page:'join.html',place:'the empty chair',pin:[2.92,1.75,3.15],destination:[1.5,3.2]}
  };
  let selected='about',walkFrame,faces=[],target='about',avatar={x:-.3,z:1.6},stride=0,scene='lab',tint=null;
  const keys=['','about','research','papers','people','join','exit','boss0','boss1','boss2','boss3','boss4','boss5'],W=canvas.width,H=canvas.height,pixels=ctx.createImageData(W,H),depths=new Float32Array(W*H),picks=new Uint8Array(W*H);
  // Each scene keeps its own static boxes. `tint` recolors boxes as they are added, for flashing or defeated bosses.
  const lab=[],dungeon=[];let boxes=lab;
  // Orthographic boxes share a depth buffer for drawing and object picking.
  function box(x,y,z,w,h,d,color,group=''){boxes.push({x,y,z,w,h,d,color:tint?tint(color):color,group});}
  function shade(hex,k){return '#'+hex.slice(1).match(/../g).map(c=>Math.min(255,Math.round(parseInt(c,16)*k)).toString(16).padStart(2,'0')).join('');}
  // The lab is a 45° view and the dungeon a straight-on battle view. Each origin keeps its room inside the canvas.
  const views={lab:{a:Math.PI/4,x:197,y:175},dungeon:{a:0,x:196,y:160}};
  function project([x,y,z],{a,x:ox,y:oy}=views[scene]){const depth=x*Math.sin(a)+z*Math.cos(a);return [ox+(x*Math.cos(a)-z*Math.sin(a))*29,oy+depth*14.5-y*25.1,depth*.866+y*.5];}
  function face(points,color,group=''){faces.push({p:points.map(p=>project(p)),color,group});}
  function cube(b){const{x,y,z,w,h,d,color,group}=b,X=x+w,Y=y+h,Z=z+d;
    face([[x,Y,z],[X,Y,z],[X,Y,Z],[x,Y,Z]],shade(color,1.08),group);
    face([[X,y,z],[X,y,Z],[X,Y,Z],[X,Y,z]],shade(color,.86),group);
    face([[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]],color,group);
  }
  // A chibi figure facing +z: big head, two eyes and blush. `y` raises a seated figure; `long` adds long hair and a ribbon.
  function person(x,z,{shirt,hair='#40383a',group:g='people',step=0,y=0,long=false}){
    const leg=s=>y+.1+Math.max(0,s)*.07;
    box(x-.21,leg(step),z-.1+step*.08,.17,.24,.2,'#66789a',g);box(x+.04,leg(-step),z-.1-step*.08,.17,.24,.2,'#66789a',g);
    box(x-.25,y+.32,z-.15,.5,.38,.3,shirt,g);box(x-.36,y+.36,z-.1,.11,.28,.2,'#f3c9aa',g);box(x+.25,y+.36,z-.1,.11,.28,.2,'#f3c9aa',g);
    box(x-.33,y+.68,z-.28,.66,.56,.56,'#fbd9bf',g);
    box(x-.18,y+.84,z+.28,.08,.11,.02,'#3a3340',g);box(x+.1,y+.84,z+.28,.08,.11,.02,'#3a3340',g);
    box(x-.25,y+.77,z+.28,.09,.05,.02,'#f6a7ab',g);box(x+.16,y+.77,z+.28,.09,.05,.02,'#f6a7ab',g);
    box(x-.36,y+1.14,z-.31,.72,.2,.62,hair,g);box(x-.33,y+1.04,z+.28,.66,.1,.03,hair,g);
    box(x-.36,y+.86,z-.31,.03,.3,.36,hair,g);box(x+.33,y+.86,z-.31,.03,.3,.36,hair,g);
    if(long){
      box(x-.36,y+.5,z-.31,.72,.66,.14,hair,g);
      box(x-.36,y+.52,z+.2,.09,.62,.11,hair,g);box(x+.27,y+.52,z+.2,.09,.62,.11,hair,g);
      box(x+.08,y+1.34,z-.02,.24,.12,.1,'#f2708f',g);
    }
  }
  function desk(x,z,g){
    for(const dx of[0,2.3])for(const dz of[0,.96])box(x+dx,.03,z+dz,.11,.94,.11,'#a7b5b8',g);
    box(x-.08,.91,z-.08,2.6,.15,1.25,'#e8bd92',g);
    box(x+.58,1.07,z+.17,.8,.045,.55,'#6b7b8c',g);box(x+.92,1.08,z+.24,.13,.19,.13,'#6b7b8c',g);
    box(x+.48,1.25,z+.15,1.04,.67,.10,'#5c6c7d',g);box(x+.55,1.32,z+.255,.9,.52,.012,'#b5e4e0',g);
    box(x+.65,1.64,z+.271,.52,.035,.015,'#ffffff',g);box(x+.65,1.52,z+.271,.33,.035,.015,'#e3f6f1',g);
    box(x+.68,1.07,z+.79,.72,.035,.21,'#fffaf0',g);box(x+1.91,1.07,z+.52,.2,.25,.2,'#f7b9c6',g);
  }
  function plant(x,z,flower){
    box(x-.27,.01,z-.27,.54,.51,.54,'#ec9f84');box(x-.06,.51,z-.06,.12,.7,.12,'#7f9a5c');box(x-.45,.85,z-.26,.57,.38,.52,'#86c79a');box(x-.07,1.11,z-.20,.48,.49,.40,'#6fb486');box(x-.17,1.42,z-.13,.27,.3,.26,'#a5dbb0');
    if(flower){box(x-.1,1.72,z-.06,.16,.12,.16,'#f7a1b8');box(x-.05,1.84,z-.01,.06,.03,.06,'#ffe08a');}
  }
  function cat(x,z){
    const c='#f5c28e';
    box(x-.2,.03,z-.28,.4,.3,.5,c);box(x-.18,.25,z+.04,.36,.3,.3,c);
    box(x-.17,.55,z+.18,.09,.09,.08,c);box(x+.08,.55,z+.18,.09,.09,.08,c);
    box(x-.1,.38,z+.34,.05,.06,.01,'#3a3340');box(x+.05,.38,z+.34,.05,.06,.01,'#3a3340');
    box(x+.14,.15,z-.36,.08,.34,.08,'#e9a96c');
  }
  // Floor, two cutaway walls and small parquet tiles.
  box(-5,-.34,-4,10,.34,8,'#e2c4a2');
  for(let x=-5;x<5;x++)for(let z=-4;z<4;z++)box(x,0,z,.99,.025,.99,((x+z)%3===0?'#f1dcbd':'#f9ecd8'));
  box(-5.12,0,-4.12,.12,3.05,8.12,'#dcefe8');box(-5,0,-4.12,10,3.05,.12,'#fbe1d8');
  box(-4.98,.03,-4,.1,.18,8,'#f0c3b3');box(-5,.03,-4,10,.18,.1,'#f0c3b3');
  // Pastel bunting along the back wall.
  box(-4.9,2.88,-3.995,9.8,.02,.01,'#d9a9a0');
  for(let i=0;i<19;i++){const x=-4.75+i*.5,c=['#f6a5bd','#f6d78f','#9fd5c3','#a9c4ef'][i%4];box(x,2.78,-3.99,.22,.1,.02,c);box(x+.06,2.7,-3.99,.1,.08,.02,c);}
  // Window on the left wall, with curtains.
  box(-4.98,1.25,-1.8,.06,1.35,2.1,'#fff6ea');box(-4.9,1.35,-1.68,.04,1.15,1.86,'#bfe3f2');
  box(-4.84,1.35,-.82,.035,1.15,.09,'#fff6ea');box(-4.84,1.87,-1.68,.035,.08,1.86,'#fff6ea');
  box(-4.92,1.15,-2.05,.07,1.6,.32,'#f7b8c6');box(-4.92,1.15,.03,.07,1.6,.32,'#f7b8c6');
  // Research board, with graph nodes, short chalk marks and a doodled heart.
  box(-4.3,1.16,-3.92,3.75,1.5,.10,'#d6a77a','research');box(-4.18,1.28,-3.805,3.5,1.25,.025,'#4d7d6e','research');
  for(const [x,y]of[[-3.8,1.66],[-3.1,2.17],[-2.48,1.69],[-1.65,2.13]])box(x,y,-3.765,.15,.15,.03,'#fff3c4','research');
  for(let i=0;i<7;i++){box(-3.72+i*.1,1.75+i*.067,-3.77,.11,.045,.025,'#bfe3cf','research');box(-3.05+i*.1,2.15-i*.058,-3.77,.11,.045,.025,'#bfe3cf','research');}
  box(-1.7,1.52,-3.77,.72,.035,.03,'#bfe3cf','research');box(-4.26,1.13,-3.78,3.67,.07,.23,'#e0b98d','research');
  const heart=[[1,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[1,2],[2,2],[3,2],[2,3]];
  for(const [c,r]of heart)box(-1.26+c*.09,2.26-r*.09,-3.77,.09,.09,.03,'#f6a5bd','research');
  // Open bookshelf, layered with individually colored books.
  box(.75,.05,-3.85,3.9,2.66,.13,'#c8956e','papers');
  for(const x of[.75,4.5])box(x,.05,-3.85,.15,2.66,.73,'#ddb187','papers');
  for(const y of[.05,.88,1.72,2.62])box(.75,y,-3.85,3.9,.1,.78,'#e7bf93','papers');
  for(let row=0;row<3;row++)for(let i=0;i<12;i++){const h=.47+(i%3)*.08;box(.98+i*.28,.16+row*.83,-3.58,.19,h,.43,['#f4aaa4','#9fd5c3','#a9c4ef','#f6d78f'][i%4],'papers');box(.98+i*.28,.24+row*.83,-3.137,.19,.035,.014,'#fff7e6','papers');}
  box(-.6,.028,-.1,4.7,.014,3.8,'#ddd4f3');
  desk(-3.05,-.25,'about');desk(.8,.15,'people');
  person(-1.85,1.55,{shirt:'#f2b179',hair:'#4a3a35',group:'about'});
  // The student sits on a stool behind the shared desk, high enough to show their face.
  box(2.36,.03,-.6,.44,.37,.4,'#ecc699','people');person(2.58,-.4,{shirt:'#c4aeea',hair:'#7a4b3a',y:.3,long:true});
  plant(-3.95,2.75,true);plant(4.15,-1.7);cat(-2.5,2.9);
  // An empty chair faces the second desk, with a heart on its back.
  for(const x of[2.55,3.16])for(const z of[2.5,3.03])box(x,.03,z,.09,.61,.09,'#86a9a3','join');
  box(2.47,.62,2.42,.9,.14,.8,'#a6dccb','join');box(2.47,.74,3.08,.9,.62,.14,'#b4e3d3','join');
  for(const [c,r]of heart)box(2.67+c*.1,1.24-r*.1,3.22,.1,.1,.015,'#f6a5bd','join');
  box(-3.85,.03,1.35,.95,.53,.65,'#dcae84');box(-3.93,.56,1.29,1.11,.1,.77,'#ecc699');box(-3.6,.67,1.5,.39,.20,.29,'#fff3dc');
  // The research dungeon: stone floor, a brick back wall with torches and the exit door, and a magic circle for the hero.
  boxes=dungeon;
  box(-6.5,-.34,-5,13,.34,12,'#3b3a55');
  for(let x=-6.5;x<6.5;x++)for(let z=-5;z<7;z++)box(x,0,z,.98,.025,.98,(Math.floor(x)+z)%2?'#4d4c6f':'#55547a');
  box(-6.5,0,-5.4,13,3.05,.4,'#5f5c8c');
  for(let r=0;r<6;r++)for(let c=-7;c<7;c++){const x0=Math.max(-6.5,c+r%2*.5),x1=Math.min(6.5,c+r%2*.5+1)-.05;if(x1>x0)box(x0,r*.5+.03,-5,x1-x0,.44,.02,(r+c)%2?'#7a77a8':'#736fa0');}
  box(-.85,0,-4.98,1.7,2.05,.05,'#4b4570','exit');box(-.68,0,-4.94,1.36,1.88,.04,'#9a7552','exit');
  for(const x of[-.24,.22])box(x,0,-4.9,.03,1.88,.01,'#7d5c40','exit');box(.42,.85,-4.9,.09,.09,.02,'#ffe08a','exit');
  for(const x of[-4.6,-1.6,1.6,4.6]){box(x-.07,1.5,-4.98,.14,.35,.12,'#8a6a4a');box(x-.13,1.85,-4.98,.26,.08,.16,'#a07a52');box(x-.1,1.93,-4.94,.2,.28,.1,'#ffb347');box(x-.05,1.98,-4.88,.1,.16,.05,'#ffe08a');}
  box(-1.05,.026,1.95,2.1,.006,1.1,'#9b7fe0');box(-.9,.032,2.03,1.8,.006,.94,'#463f6e');
  boxes=lab;
  // Cute boss faces: two eyes and blush on a front face at height y.
  function eyes(x,y,z,g){box(x-.2,y,z,.09,.12,.02,'#3a3340',g);box(x+.11,y,z,.09,.12,.02,'#3a3340',g);box(x-.3,y-.08,z,.1,.05,.02,'#f6a7ab',g);box(x+.2,y-.08,z,.1,.05,.02,'#f6a7ab',g);}
  // Graph Neural Networks: a slime wearing a small graph.
  function slime(x,z,g){
    const c='#b39ddb';
    box(x-.62,0,z-.4,1.24,.52,.8,c,g);box(x-.48,.52,z-.32,.96,.3,.64,c,g);box(x-.28,.82,z-.2,.56,.14,.4,c,g);
    eyes(x,.26,z+.4,g);
    for(const [nx,ny]of[[-.4,.86],[0,1.22],[.4,.86]])box(x+nx-.08,ny,z-.08,.16,.16,.16,'#ffe08a',g);
    for(const side of[-.4,.4])for(let s=1;s<5;s++)box(x+side*(1-s/5)-.025,.92+.36*s/5,z-.025,.05,.05,.05,'#fff7e6',g);
  }
  // Geometric Deep Learning: a floating crystal circled by a ring.
  function crystal(x,z,g){
    box(x-.4,.03,z-.2,.8,.01,.4,'#2f2d47',g);
    [.3,.62,.9,1.02,.9,.62,.3].forEach((w,i)=>box(x-w/2,.38+i*.2,z-w*.35,w,.2,w*.7,i>3?'#b8e6f2':'#8fd3e8',g));
    eyes(x,1.04,z+.36,g);
    box(x-.85,.95,z+.4,1.7,.06,.06,'#e9d6ff',g);
  }
  // Trustworthy AI: a knight with a lock on the shield.
  function knight(x,z,g){
    for(const lx of[-.28,.06])box(x+lx,0,z-.12,.22,.32,.24,'#5d6680',g);
    box(x-.4,.32,z-.25,.8,.55,.5,'#aab4c8',g);
    box(x-.38,.87,z-.3,.76,.62,.6,'#c3cbdb',g);box(x-.3,1.1,z+.3,.6,.12,.02,'#3a3340',g);
    box(x-.2,1.13,z+.32,.08,.06,.01,'#ffe08a',g);box(x+.12,1.13,z+.32,.08,.06,.01,'#ffe08a',g);
    box(x-.08,1.49,z-.2,.16,.3,.4,'#f2708f',g);
    box(x-.62,.3,z+.28,.56,.72,.08,'#6f86c4',g);
    box(x-.43,.52,z+.36,.18,.15,.02,'#ffe08a',g);box(x-.41,.67,z+.36,.03,.09,.02,'#ffe08a',g);box(x-.31,.67,z+.36,.03,.09,.02,'#ffe08a',g);box(x-.41,.74,z+.36,.13,.03,.02,'#ffe08a',g);
  }
  // ML for Science: a potion flask with bubbles.
  function flask(x,z,g){
    [.8,1.1,1.2,1.1,.8].forEach((w,i)=>box(x-w/2,i*.18,z-w*.3,w,.18,w*.6,i<3?'#8be3b4':'#d6eef5',g));
    eyes(x,.3,z+.36,g);
    box(x-.17,.9,z-.17,.34,.32,.34,'#d6eef5',g);box(x-.21,1.22,z-.21,.42,.14,.42,'#c9a06a',g);
    for(const [bx,by]of[[.22,1.48],[.05,1.66],[.3,1.82]])box(x+bx-.05,by,z-.05,.1,.1,.1,'#bff5d4',g);
  }
  // Language Models: a book monster with a speech bubble.
  function book(x,z,g){
    box(x-.55,0,z-.28,1.1,1.25,.56,'#e07a7a',g);box(x-.5,1.25,z-.24,1,.04,.48,'#fff7e6',g);
    for(const y of[.18,1])box(x-.55,y,z+.28,1.1,.06,.02,'#ffe08a',g);
    eyes(x,.66,z+.28,g);box(x-.12,.4,z+.28,.24,.08,.02,'#7a3a4a',g);
    box(x+.05,1.42,z-.05,.82,.44,.1,'#ffffff',g);box(x+.12,1.36,z-.05,.14,.08,.1,'#ffffff',g);
    for(const dx of[.25,.44,.63])box(x+dx,1.6,z+.05,.08,.08,.02,'#3a3340',g);
  }
  // Generative Models: a ghost speckled with diffusion noise.
  function ghost(x,z,g){
    box(x-.4,.03,z-.2,.8,.01,.4,'#2f2d47',g);
    box(x-.5,.4,z-.3,1,1.05,.6,'#ece6ff',g);box(x-.38,1.45,z-.24,.76,.14,.48,'#ece6ff',g);
    for(let i=0;i<4;i++)box(x-.5+i*.25,.2+i%2*.1,z-.3,.25,.2,.6,'#ece6ff',g);
    for(let i=0;i<12;i++)box(x-.44+i*37%9*.1,.48+i*53%8*.11,z+.3,.05,.05,.01,'#b9aee6',g);
    eyes(x,1,z+.3,g);
  }
  function sword(x,z){box(x+.38,.3,z-.02,.05,.1,.05,'#8a6a4a');box(x+.31,.4,z-.05,.19,.04,.1,'#c9a24a');box(x+.37,.44,z-.03,.07,.56,.06,'#e6edf5');}
  // One boss per research area; `area` must match a heading on the research page. Two stand on top and two on each side.
  const bosses=[
    {area:'Graph Neural Networks',label:'GNNs',x:-2.3,z:-3.8,top:1.38,art:slime},
    {area:'Geometric Deep Learning',label:'Geometric DL',x:2.3,z:-3.8,top:1.78,art:crystal},
    {area:'Trustworthy AI',label:'Trustworthy AI',x:-4.5,z:0,top:1.8,art:knight},
    {area:'ML for Science',label:'ML for Science',x:-4.5,z:5.3,top:1.92,art:flask},
    {area:'Language Models',label:'Language Models',x:4.5,z:0,top:1.86,art:book},
    {area:'Generative Models',label:'Generative Models',x:4.5,z:5.3,top:1.59,art:ghost}
  ];
  const home={x:0,z:2.5};let hero={...home};
  function triangle(a,b,c,rgba,id){
    const area=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(area)<.001)return;
    const left=Math.max(0,Math.floor(Math.min(a[0],b[0],c[0]))),right=Math.min(W-1,Math.ceil(Math.max(a[0],b[0],c[0])));
    const top=Math.max(0,Math.floor(Math.min(a[1],b[1],c[1]))),bottom=Math.min(H-1,Math.ceil(Math.max(a[1],b[1],c[1])));
    for(let y=top;y<=bottom;y++)for(let x=left;x<=right;x++){
      const px=x+.5,py=y+.5,u=((b[1]-c[1])*(px-c[0])+(c[0]-b[0])*(py-c[1]))/area,v=((c[1]-a[1])*(px-c[0])+(a[0]-c[0])*(py-c[1]))/area,w=1-u-v;
      if(u<0||v<0||w<0)continue;
      const index=y*W+x,z=u*a[2]+v*b[2]+w*c[2];if(z<depths[index])continue;
      depths[index]=z;picks[index]=id;pixels.data.set(rgba,index*4);
    }
  }
  // Small 2D pixel sprites drawn over the scene: X is the color, o is a white highlight.
  function sprite(rows,x,y,color){rows.forEach((row,r)=>[...row].forEach((c,i)=>{if(c!=='.'){ctx.fillStyle=c==='o'?'#ffffff':color;ctx.fillRect(x+i,y+r,1,1);}}));}
  const grey=c=>{const [r,g,b]=c.slice(1,7).match(/../g).map(v=>parseInt(v,16)),l=Math.round((r*.3+g*.59+b*.11)*.6+70).toString(16).padStart(2,'0');return '#'+l+l+l;};
  const flashing=b=>b.hit!=null&&Math.floor(b.hit*6)%2===0;
  let fade=0;
  function draw(){
    faces=[];pixels.data.fill(0);depths.fill(-Infinity);picks.fill(0);
    boxes=scene==='lab'?lab:dungeon;const staticCount=boxes.length;
    if(scene==='lab'){
      face([[-5,-.38,-3.8],[5.5,-.38,-3.8],[5.5,-.38,4.4],[-5,-.38,4.4]],'#00000012');
      face([[avatar.x-.36,.05,avatar.z-.33],[avatar.x+.36,.05,avatar.z-.33],[avatar.x+.36,.05,avatar.z+.33],[avatar.x-.36,.05,avatar.z+.33]],'#e3c9a8');
      person(avatar.x,avatar.z,{shirt:'#6cc2a2',group:'',step:stride});
    }else{
      face([[-6.3,-.38,-4.8],[6.8,-.38,-4.8],[6.8,-.38,7.5],[-6.3,-.38,7.5]],'#00000012');
      person(hero.x,hero.z,{shirt:'#6cc2a2',group:'',step:stride});sword(hero.x,hero.z);
      // A struck boss shakes and flashes white; a defeated one turns grey.
      bosses.forEach((b,i)=>{tint=flashing(b)?()=>'#ffffff':b.defeated?grey:null;b.art(b.x+(b.hit!=null?Math.sin(b.hit*40)*.08:0),b.z,'boss'+i);tint=null;});
    }
    boxes.forEach(cube);boxes.length=staticCount;
    for(const f of faces){const rgba=f.color.slice(1).match(/../g).map(v=>parseInt(v,16));if(rgba.length===3)rgba.push(255);for(let i=1;i<f.p.length-1;i++)triangle(f.p[0],f.p[i],f.p[i+1],rgba,keys.indexOf(f.group));}
    ctx.putImageData(pixels,0,0);
    if(scene==='lab'){
      // A pixel heart, with one highlight, marks the destination.
      const [x,y]=project(sections[target].pin).map(Math.round);
      sprite(['.XX...XX.','XoXX.XXXX','XXXXXXXXX','XXXXXXXXX','.XXXXXXX.','..XXXXX..','...XXX...','....X....'],x-4,y-8,'#f2708f');
    }else for(const b of bosses){
      // Health bars, and a spark on each flash of a hit.
      const [x,y]=project([b.x,b.top+.2,b.z]).map(Math.round),hp=b.defeated?0:b.hit!=null?1-b.hit:1;
      ctx.fillStyle='#2d2a40';ctx.fillRect(x-12,y-2,24,4);ctx.fillStyle=hp>.3?'#7ee08a':'#ff8a8a';ctx.fillRect(x-11,y-1,Math.round(22*hp),2);
      if(flashing(b)){const [sx,sy]=project([b.x,b.top/2,b.z+.5]).map(Math.round);sprite(['...X...','.X.X.X.','..XXX..','XXXXXXX','..XXX..','.X.X.X.','...X...'],sx-3,sy-3,'#fff3a0');}
    }
    if(fade>0){ctx.fillStyle=`rgba(36,30,58,${fade})`;ctx.fillRect(0,0,W,H);}
  }
  function node(tag,text,className){const n=document.createElement(tag);if(text)n.textContent=text;if(className)n.className=className;return n;}
  // Keep the original pages as the source of truth. Cache only for this visit.
  function loadPage(key) {
    if (!pageCache.has(key)) {
      const url = new URL(sections[key].page, document.baseURI);
      const request = fetch(url).then(async response => {
        if (!response.ok) throw new Error('Could not load ' + url.pathname);
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        const main = doc.getElementById('layout-content');
        if (!main) throw new Error('Page content is missing');
        main.querySelectorAll('#toptitle, #footer, script').forEach(element => element.remove());
        main.querySelectorAll('a[href]').forEach(link => {
          link.href = new URL(link.getAttribute('href'), url).href;
          if (link.target === '_blank') link.rel = 'noopener';
        });
        main.querySelectorAll('img[src]').forEach(image => {
          image.src = new URL(image.getAttribute('src'), url).href;
        });
        return main;
      }).catch(error => {
        pageCache.delete(key);
        throw error;
      });
      pageCache.set(key, request);
    }
    return pageCache.get(key);
  }

  function renderPublications(main) {
    for (const heading of main.querySelectorAll('h2')) {
      panel.append(node('h3', heading.textContent), heading.nextElementSibling.cloneNode(true));
    }
  }

  function renderAbout(main) {
    for (const child of main.children) {
      if (child.id === 'news') break;
      panel.append(child.cloneNode(true));
    }
  }

  function renderTeam() {
    for (const [category, members] of Object.entries(TEAM_DATA)) {
      const section = node(category === 'Alumni' ? 'details' : 'section');
      section.append(node(category === 'Alumni' ? 'summary' : 'h3', category));
      for (const member of members) {
        const row = node('div', '', 'member'), info = node('div'), photo = node('img');
        photo.src = member.photo;
        photo.alt = '';
        photo.loading = 'lazy';
        // Like the team page, show initials if the photo fails to load.
        photo.onerror = () => photo.replaceWith(node('span', member.name.split(' ').map(part => part[0]).join(''), 'initials'));
        info.append(node('strong', member.name), node('p', [member.dept, member.research].filter(Boolean).join(' · ')));
        for (const [label, href] of [['Homepage', member.homepage], ['Scholar', member.scholar]]) {
          if (!href) continue;
          const link = node('a', label + ' ↗');
          link.href = href;
          link.target = '_blank';
          link.rel = 'noopener';
          info.append(link);
        }
        row.append(photo, info);
        section.append(row);
      }
      panel.append(section);
    }
  }

  async function renderPanel(key) {
    const section = sections[key];
    root.querySelector('.eyebrow').textContent = section.eyebrow;
    root.querySelector('#lab-panel-title').textContent = section.title;
    root.querySelector('.intro').textContent = section.intro;
    root.querySelector('.original-page').href = section.page;
    panel.className = 'content ' + key;
    panel.replaceChildren(node('p', 'Loading…'));
    reading.setAttribute('aria-busy', 'true');
    try {
      const main = key === 'people' ? null : await loadPage(key);
      // A slower request must not replace a newer destination.
      if (selected !== key || target !== key) return;
      panel.replaceChildren();
      if (key === 'about') renderAbout(main);
      else if (key === 'papers') renderPublications(main);
      else if (key === 'people') renderTeam();
      else panel.append(...Array.from(main.children, child => child.cloneNode(true)));
    } catch (error) {
      if (selected !== key || target !== key) return;
      const message = node('p', 'This content could not be loaded. ');
      const link = node('a', 'Open the original page →');
      link.href = section.page;
      message.append(link);
      panel.replaceChildren(message);
    } finally {
      if (selected === key && target === key) reading.setAttribute('aria-busy', 'false');
    }
  }

  function arrive(key, scroll = true) {
    selected = key;
    target = key;
    stride = 0;
    walkFrame = null;
    root.querySelectorAll('[data-place]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.place === key)));
    root.querySelector('.arrival').textContent = key === 'research' ? status() : 'At ' + sections[key].place + ' · ' + sections[key].title;
    // Research opens the dungeon, where each boss stands for one research area.
    if (key === 'research' && scene === 'lab') setScene('dungeon');
    else draw();
    renderPanel(key).then(() => {
      // On narrow screens the panel sits below the lab. Scroll once it is filled, so the page is long enough,
      // but keep the dungeon in view so the bosses can be fought.
      const top = reading.getBoundingClientRect().top;
      if (scroll && selected === key && target === key && (top < 0 || top > innerHeight / 2 && scene === 'lab')) {
        reading.scrollIntoView({block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth'});
      }
    });
  }
  // Floor footprints [x0,z0,x1,z1]: desks, shelf, board, people, plants, cat, cabinet and chair.
  const obstacles=[[-3.13,-.33,-.53,.92],[.72,.07,3.32,1.32],[.75,-3.92,4.65,-3.07],[-4.3,-3.92,-.55,-3.55],[-2.21,1.24,-1.49,1.86],[2.22,-.71,2.94,-.09],[-4.4,2.48,-3.5,3.02],[3.7,-1.97,4.6,-1.43],[-2.7,2.54,-2.3,3.24],[-3.93,1.29,-2.82,2.06],[2.47,2.42,3.37,3.22]];
  function blocked(x,z){return Math.abs(x)>4.7||Math.abs(z)>3.7||obstacles.some(([x0,z0,x1,z1])=>x>x0-.3&&x<x1+.3&&z>z0-.3&&z<z1+.3);}
  // Shortest walkable route on a 0.1 grid, so a walk from anywhere goes around the furniture.
  function route(tx,tz){
    const n=95,cell=(x,z)=>Math.round((x+4.7)*10)+Math.round((z+3.7)*10)*n,spot=c=>[c%n/10-4.7,Math.floor(c/n)/10-3.7];
    const start=cell(avatar.x,avatar.z),goal=cell(tx,tz),from=new Map([[start,start]]),queue=[start];
    for(let q=0;q<queue.length&&!from.has(goal);q++){
      const c=queue[q];
      for(const next of[c-1,c+1,c-n,c+n])if(!from.has(next)&&Math.abs(next%n-c%n)<2&&(next===goal||!blocked(...spot(next)))){from.set(next,c);queue.push(next);}
    }
    const points=[[tx,tz]];
    for(let c=from.get(goal);c!==undefined&&c!==start;c=from.get(c))points.unshift(spot(c));
    return [[avatar.x,avatar.z],...points];
  }
  function walk(key){
    if(!Object.hasOwn(sections,key))return;
    if(scene==='dungeon'){if(key==='research'){arrive(key);return;}leave();}
    cancelAnimationFrame(walkFrame);target=key;
    const [dx,dz]=sections[key].destination;
    if(Math.hypot(avatar.x-dx,avatar.z-dz)<.001){arrive(key);return;}
    if(key !== 'people') loadPage(key).catch(() => {});
    if(reducedMotion.matches){avatar={x:dx,z:dz};arrive(key);return;}
    const points=route(dx,dz),segments=[];let total=0;
    for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],length=Math.hypot(b[0]-a[0],b[1]-a[1]);if(length>.001){segments.push({a,b,length});total+=length;}}
    if(total<.001){arrive(key);return;}
    reading.setAttribute('aria-busy','true');root.querySelector('.arrival').textContent='Walking to '+sections[key].place+'…';
    const start=performance.now(),duration=Math.min(1600,Math.max(350,total*120));
    function tick(t){const progress=Math.min(1,(t-start)/duration);let distance=total*progress;
      for(const s of segments){if(distance<=s.length){const f=distance/s.length;avatar={x:s.a[0]+(s.b[0]-s.a[0])*f,z:s.a[1]+(s.b[1]-s.a[1])*f};break;}distance-=s.length;}
      stride=Math.sin(progress*total*7);draw();if(progress<1)walkFrame=requestAnimationFrame(tick);else{avatar={x:dx,z:dz};arrive(key);}
    }
    walkFrame=requestAnimationFrame(tick);
  }
  function status(){const n=bosses.filter(b=>b.defeated).length;return n===bosses.length?'Dungeon cleared! All six research bosses are defeated.':'Research dungeon · '+n+'/'+bosses.length+' bosses defeated';}
  // Switch scenes behind a short fade from dark.
  let fadeFrame;
  const labLabel=canvas.getAttribute('aria-label');
  function setScene(next){
    scene=next;root.classList.toggle('in-dungeon',next==='dungeon');
    canvas.setAttribute('aria-label',next==='dungeon'?'A pixel-art research dungeon. The hero stands in a magic circle, surrounded by six bosses, one for each research area. Use the boss buttons to fight them.':labLabel);
    cancelAnimationFrame(fadeFrame);
    if(reducedMotion.matches){fade=0;draw();return;}
    const start=performance.now();
    (function tick(t){fade=Math.max(0,1-(t-start)/400);draw();if(fade>0)fadeFrame=requestAnimationFrame(tick);})(start);
  }
  function leave(){
    if(scene!=='dungeon')return;
    cancelAnimationFrame(fightFrame);fightFrame=null;for(const b of bosses)b.hit=null;hero={...home};stride=0;
    setScene('lab');root.querySelector('.arrival').textContent='At '+sections.research.place+' · '+sections.research.title;
  }
  // The hero dashes to the boss, strikes until its health runs out and walks back. The panel then jumps to that research area.
  let fightFrame;
  function fight(i){
    const b=bosses[i];if(fightFrame||scene!=='dungeon')return;
    if(reducedMotion.matches){defeat(b);draw();return;}
    const dx=b.x-home.x,dz=b.z-home.z,d=Math.hypot(dx,dz),near={x:b.x-dx/d*1.3,z:b.z-dz/d*1.3},start=performance.now();
    const lerp=(p,q,f)=>({x:p.x+(q.x-p.x)*f,z:p.z+(q.z-p.z)*f});
    let struck=false;
    function tick(t){
      const e=Math.max(0,t-start);
      if(e<350)hero=lerp(home,near,e/350);
      else if(e<750){hero=near;b.hit=(e-350)/400;}
      else{if(!struck){struck=true;b.hit=null;defeat(b);}hero=lerp(near,home,Math.min(1,(e-750)/350));}
      stride=e<350||e>=750?Math.sin(e/45):0;
      if(e<1100){draw();fightFrame=requestAnimationFrame(tick);}else{hero={...home};stride=0;fightFrame=null;draw();}
    }
    fightFrame=requestAnimationFrame(tick);
  }
  function defeat(b){
    b.defeated=true;b.button.classList.add('defeated');
    root.querySelector('.arrival').textContent=status();
    const heading=[...panel.querySelectorAll('h2')].find(h=>h.textContent.trim()===b.area);
    if(!heading)return;
    heading.scrollIntoView({block:'start',behavior:reducedMotion.matches?'auto':'smooth'});
    heading.classList.remove('struck');void heading.offsetWidth;heading.classList.add('struck');
  }
  // Name tags over the dungeon double as accessible fight buttons.
  const bossLayer=root.querySelector('.bosses');
  bosses.forEach((b,i)=>{
    const [x,y]=project([b.x,0,b.z+.45],views.dungeon);
    b.button=node('button',b.label);b.button.type='button';b.button.style.left=x/W*100+'%';b.button.style.top=y/H*100+'%';
    b.button.setAttribute('aria-label','Fight the '+b.area+' boss');b.button.addEventListener('click',()=>fight(i));bossLayer.append(b.button);
  });
  bossLayer.querySelector('.leave').addEventListener('click',leave);
  root.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>walk(b.dataset.place)));
  canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)*W/r.width),y=Math.floor((e.clientY-r.top)*H/r.height);if(x>=0&&x<W&&y>=0&&y<H){const key=keys[picks[y*W+x]];if(scene==='dungeon'){if(key==='exit')leave();else if(key?.startsWith('boss'))fight(+key.slice(4));}else if(key)walk(key);}});
  // Arrow keys move the avatar in their screen direction. Stepping onto a place's spot opens it without scrolling.
  const moves={ArrowUp:[-1,-1],ArrowDown:[1,1],ArrowLeft:[-1,1],ArrowRight:[1,-1]},held=new Set();
  let stepFrame,lastStep,walked=0;
  function step(t){
    let dx=0,dz=0;for(const k of held){dx+=moves[k][0];dz+=moves[k][1];}
    const length=Math.hypot(dx,dz);
    if(!length||scene!=='lab'){stepFrame=null;stride=0;held.clear();draw();return;}
    if(walkFrame){cancelAnimationFrame(walkFrame);arrive(selected,false);}
    const distance=Math.max(0,Math.min(50,t-lastStep))*.003,x=avatar.x+dx/length*distance,z=avatar.z+dz/length*distance;lastStep=t;
    if(!blocked(x,avatar.z))avatar.x=x;if(!blocked(avatar.x,z))avatar.z=z;
    walked+=distance;stride=Math.sin(walked*7);
    const zone=Object.keys(sections).find(k=>Math.hypot(avatar.x-sections[k].destination[0],avatar.z-sections[k].destination[1])<.8);
    if(zone&&zone!==selected)arrive(zone,false);else draw();
    stepFrame=requestAnimationFrame(step);
  }
  addEventListener('keydown',e=>{
    if(e.key==='Escape'&&scene==='dungeon'){leave();return;}
    if(!moves[e.key]||scene!=='lab'||e.altKey||e.ctrlKey||e.metaKey)return;
    e.preventDefault();held.add(e.key);
    if(!stepFrame){lastStep=performance.now();stepFrame=requestAnimationFrame(step);}
  });
  addEventListener('keyup',e=>held.delete(e.key));
  addEventListener('blur',()=>held.clear());
  // The markup already shows the desk as selected; render without scrolling on load.
  renderPanel('about');
  draw();
})();
