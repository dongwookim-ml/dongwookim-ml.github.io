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
  let selected='about',walkFrame,faces=[],target='about',avatar={x:-.3,z:1.6},stride=0;
  const keys=['','about','research','papers','people','join'],pixels=ctx.createImageData(480,320),depths=new Float32Array(480*320),picks=new Uint8Array(480*320);
  const boxes=[];
  // Orthographic boxes share a depth buffer for drawing and object picking.
  function box(x,y,z,w,h,d,color,group=''){boxes.push({x,y,z,w,h,d,color,group});}
  function shade(hex,k){return '#'+hex.slice(1).match(/../g).map(c=>Math.min(255,Math.round(parseInt(c,16)*k)).toString(16).padStart(2,'0')).join('');}
  function project([x,y,z]){const a=Math.PI/4,depth=x*Math.sin(a)+z*Math.cos(a);return [240+(x*Math.cos(a)-z*Math.sin(a))*29,190+depth*14.5-y*25.1,depth*.866+y*.5];}
  function face(points,color,group=''){faces.push({p:points.map(project),color,group});}
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
  person(-1.85,1.55,{shirt:'#6f86c4',group:'about'});
  // The student sits on a stool behind the shared desk, high enough to show their face.
  box(2.36,.03,-.6,.44,.37,.4,'#ecc699','people');person(2.58,-.4,{shirt:'#f2b179',hair:'#4a3a35',y:.3});
  person(-.95,-2.75,{shirt:'#c4aeea',hair:'#7a4b3a',group:'research',long:true});
  plant(-3.95,2.75,true);plant(4.15,-1.7);cat(-2.5,2.9);
  // An empty chair faces the second desk, with a heart on its back.
  for(const x of[2.55,3.16])for(const z of[2.5,3.03])box(x,.03,z,.09,.61,.09,'#86a9a3','join');
  box(2.47,.62,2.42,.9,.14,.8,'#a6dccb','join');box(2.47,.74,3.08,.9,.62,.14,'#b4e3d3','join');
  for(const [c,r]of heart)box(2.67+c*.1,1.24-r*.1,3.22,.1,.1,.015,'#f6a5bd','join');
  box(-3.85,.03,1.35,.95,.53,.65,'#dcae84');box(-3.93,.56,1.29,1.11,.1,.77,'#ecc699');box(-3.6,.67,1.5,.39,.20,.29,'#fff3dc');
  function triangle(a,b,c,rgba,id){
    const area=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(area)<.001)return;
    const left=Math.max(0,Math.floor(Math.min(a[0],b[0],c[0]))),right=Math.min(479,Math.ceil(Math.max(a[0],b[0],c[0])));
    const top=Math.max(0,Math.floor(Math.min(a[1],b[1],c[1]))),bottom=Math.min(319,Math.ceil(Math.max(a[1],b[1],c[1])));
    for(let y=top;y<=bottom;y++)for(let x=left;x<=right;x++){
      const px=x+.5,py=y+.5,u=((b[1]-c[1])*(px-c[0])+(c[0]-b[0])*(py-c[1]))/area,v=((c[1]-a[1])*(px-c[0])+(a[0]-c[0])*(py-c[1]))/area,w=1-u-v;
      if(u<0||v<0||w<0)continue;
      const index=y*480+x,z=u*a[2]+v*b[2]+w*c[2];if(z<depths[index])continue;
      depths[index]=z;picks[index]=id;pixels.data.set(rgba,index*4);
    }
  }
  function draw(){
    faces=[];pixels.data.fill(0);depths.fill(-Infinity);picks.fill(0);
    face([[-5,-.38,-3.8],[5.5,-.38,-3.8],[5.5,-.38,4.4],[-5,-.38,4.4]],'#00000012');
    face([[avatar.x-.36,.05,avatar.z-.33],[avatar.x+.36,.05,avatar.z-.33],[avatar.x+.36,.05,avatar.z+.33],[avatar.x-.36,.05,avatar.z+.33]],'#e3c9a8');
    const staticCount=boxes.length;person(avatar.x,avatar.z,{shirt:'#6cc2a2',group:'',step:stride});
    boxes.forEach(cube);boxes.length=staticCount;
    for(const f of faces){const rgba=f.color.slice(1).match(/../g).map(v=>parseInt(v,16));if(rgba.length===3)rgba.push(255);for(let i=1;i<f.p.length-1;i++)triangle(f.p[0],f.p[i],f.p[i+1],rgba,keys.indexOf(f.group));}
    ctx.putImageData(pixels,0,0);
    // A pixel heart, with one highlight, marks the destination.
    const [x,y]=project(sections[target].pin).map(Math.round);
    ['.XX...XX.','XXXX.XXXX','XXXXXXXXX','XXXXXXXXX','.XXXXXXX.','..XXXXX..','...XXX...','....X....'].forEach((row,r)=>[...row].forEach((c,i)=>{if(c==='X'){ctx.fillStyle=r===1&&i===1?'#ffffff':'#f2708f';ctx.fillRect(x-4+i,y-8+r,1,1);}}));
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
        const row = node('div', '', 'member');
        row.append(node('strong', member.name), node('p', [member.dept, member.research].filter(Boolean).join(' · ')));
        for (const [label, href] of [['Homepage', member.homepage], ['Scholar', member.scholar]]) {
          if (!href) continue;
          const link = node('a', label + ' ↗');
          link.href = href;
          link.target = '_blank';
          link.rel = 'noopener';
          row.append(link);
        }
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

  function arrive(key) {
    selected = key;
    target = key;
    stride = 0;
    walkFrame = null;
    root.querySelectorAll('[data-place]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.place === key)));
    root.querySelector('.arrival').textContent = 'At ' + sections[key].place + ' · ' + sections[key].title;
    draw();
    renderPanel(key).then(() => {
      // On narrow screens the panel sits below the lab. Scroll once it is filled, so the page is long enough.
      const top = reading.getBoundingClientRect().top;
      if (selected === key && target === key && (top < 0 || top > innerHeight / 2)) {
        reading.scrollIntoView({block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth'});
      }
    });
  }
  function walk(key){
    if(!Object.hasOwn(sections,key))return;cancelAnimationFrame(walkFrame);target=key;
    const [dx,dz]=sections[key].destination;
    if(Math.hypot(avatar.x-dx,avatar.z-dz)<.001){arrive(key);return;}
    if(key !== 'people') loadPage(key).catch(() => {});
    if(reducedMotion.matches){avatar={x:dx,z:dz};arrive(key);return;}
    const points=[[avatar.x,avatar.z],[0,avatar.z],[0,dz],[dx,dz]],segments=[];let total=0;
    for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],length=Math.hypot(b[0]-a[0],b[1]-a[1]);if(length>.001){segments.push({a,b,length});total+=length;}}
    if(total<.001){arrive(key);return;}
    reading.setAttribute('aria-busy','true');root.querySelector('.arrival').textContent='Walking to '+sections[key].place+'…';
    const start=performance.now(),duration=Math.min(1100,Math.max(350,total*120));
    function tick(t){const progress=Math.min(1,(t-start)/duration);let distance=total*progress;
      for(const s of segments){if(distance<=s.length){const f=distance/s.length;avatar={x:s.a[0]+(s.b[0]-s.a[0])*f,z:s.a[1]+(s.b[1]-s.a[1])*f};break;}distance-=s.length;}
      stride=Math.sin(progress*total*7);draw();if(progress<1)walkFrame=requestAnimationFrame(tick);else{avatar={x:dx,z:dz};arrive(key);}
    }
    walkFrame=requestAnimationFrame(tick);
  }
  root.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>walk(b.dataset.place)));
  canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)*480/r.width),y=Math.floor((e.clientY-r.top)*320/r.height);if(x>=0&&x<480&&y>=0&&y<320){const key=keys[picks[y*480+x]];if(key)walk(key);}});
  // The markup already shows the desk as selected; render without scrolling on load.
  renderPanel('about');
  draw();
})();
