(() => {
  'use strict';
  const root=document.getElementById('lab-layout'), canvas=root.querySelector('canvas'), ctx=canvas.getContext('2d');
  const panel=root.querySelector('.content'), reading=root.querySelector('.reading');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const pageCache=new Map();
  const sections={
    about:{title:'Dongwoo Kim',eyebrow:'THE PROFESSOR’S DESK',intro:'',page:'../index.html',place:"the professor's desk",pin:[-1.9,2.1,.3],destination:[-.7,1.8]},
    research:{title:'Research',eyebrow:'THE BLACKBOARD',intro:'',page:'research.html',place:'the blackboard',pin:[-2.1,3.05,-3.55],destination:[-2.2,-2]},
    papers:{title:'Publications',eyebrow:'THE BOOKSHELF',intro:'* equal contribution · † co-corresponding',page:'publication.html',place:'the bookshelf',pin:[2.4,3.05,-3.35],destination:[2.4,-2]},
    people:{title:'Our people',eyebrow:'THE SHARED DESK',intro:'Machine Learning Lab · POSTECH',page:'team.html',place:'the shared desk',pin:[2,2.1,.5],destination:[2.4,-1.2]},
    join:{title:'Join the lab',eyebrow:'A SEAT FOR YOU',intro:'For prospective graduate students and undergraduate researchers.',page:'join.html',place:'the empty chair',pin:[2.92,1.75,3.15],destination:[1.5,3.2]}
  };
  let selected='about',angle=45,view=45,cameraFrame,walkFrame,faces=[],target='about',avatar={x:-.7,z:1.8},stride=0;
  const keys=['','about','research','papers','people','join'],pixels=ctx.createImageData(480,320),depths=new Float32Array(480*320),picks=new Uint8Array(480*320);
  const boxes=[];
  // Orthographic boxes share a depth buffer for drawing and object picking.
  function box(x,y,z,w,h,d,color,group=''){boxes.push({x,y,z,w,h,d,color,group});}
  function shade(hex,k){return '#'+hex.slice(1).match(/../g).map(c=>Math.min(255,Math.round(parseInt(c,16)*k)).toString(16).padStart(2,'0')).join('');}
  function project([x,y,z]){const a=angle*Math.PI/180,depth=x*Math.sin(a)+z*Math.cos(a);return [240+(x*Math.cos(a)-z*Math.sin(a))*29,190+depth*14.5-y*25.1,depth*.866+y*.5];}
  function face(points,color,group=''){faces.push({p:points.map(project),color,group});}
  function cube(b){const{x,y,z,w,h,d,color,group}=b,X=x+w,Y=y+h,Z=z+d;
    face([[x,Y,z],[X,Y,z],[X,Y,Z],[x,Y,Z]],shade(color,1.10),group);
    face([[X,y,z],[X,y,Z],[X,Y,Z],[X,Y,z]],shade(color,.81),group);
    face([[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]],color,group);
  }
  function person(x,z,shirt,g='people',step=0){
    box(x-.25,.12+Math.max(0,step)*.08,z-.12+step*.10,.19,.36,.23,'#3e4a59',g);box(x+.06,.12+Math.max(0,-step)*.08,z-.12-step*.10,.19,.36,.23,'#3e4a59',g);
    box(x-.28,.45,z-.17,.56,.52,.34,shirt,g);box(x-.42,.48,z-.13,.13,.4,.23,'#dfb18b',g);box(x+.29,.48,z-.13,.13,.4,.23,'#dfb18b',g);
    box(x-.24,1.01,z-.2,.48,.4,.4,'#e7bb96',g);box(x-.26,1.31,z-.22,.52,.16,.43,'#4b4443',g);box(x-.26,1.14,z-.22,.13,.23,.43,'#4b4443',g);
    box(x+.08,1.18,z+.205,.05,.06,.02,'#393d47',g);
  }
  function desk(x,z,g){
    for(const dx of[0,2.3])for(const dz of[0,.96])box(x+dx,.03,z+dz,.11,.94,.11,'#788482',g);
    box(x-.08,.91,z-.08,2.6,.15,1.25,'#bf9671',g);
    box(x+.58,1.07,z+.17,.8,.045,.55,'#53616c',g);box(x+.92,1.08,z+.24,.13,.19,.13,'#53616c',g);
    box(x+.48,1.25,z+.15,1.04,.67,.10,'#43505b',g);box(x+.55,1.32,z+.255,.9,.52,.012,'#91c0c4',g);
    box(x+.65,1.64,z+.271,.52,.035,.015,'#e1ede0',g);box(x+.65,1.52,z+.271,.33,.035,.015,'#d2e4dc',g);
    box(x+.68,1.07,z+.79,.72,.035,.21,'#dae0d8',g);box(x+1.91,1.07,z+.52,.2,.25,.2,'#eee6d6',g);
  }
  function plant(x,z){box(x-.27,.01,z-.27,.54,.51,.54,'#b78066');box(x-.06,.51,z-.06,.12,.7,.12,'#737b51');box(x-.45,.85,z-.26,.57,.38,.52,'#709780');box(x-.07,1.11,z-.20,.48,.49,.40,'#618b73');box(x-.17,1.42,z-.13,.27,.3,.26,'#81a18a');}
  // Floor, two cutaway walls and small parquet tiles.
  box(-5,-.34,-4,10,.34,8,'#bbab8d');
  for(let x=-5;x<5;x++)for(let z=-4;z<4;z++)box(x,0,z,.99,.025,.99,((x+z)%3===0?'#e0d3b6':'#e8dcbf'));
  box(-5.12,0,-4.12,.12,3.05,8.12,'#c3d6d4');box(-5,0,-4.12,10,3.05,.12,'#d8e5df');
  box(-4.98,.03,-4,.1,.18,8,'#a5b8b0');box(-5,.03,-4,10,.18,.1,'#a5b8b0');
  // Window on the left wall.
  box(-4.98,1.25,-1.8,.06,1.35,2.1,'#f6edda');box(-4.9,1.35,-1.68,.04,1.15,1.86,'#a4cbd0');
  box(-4.84,1.35,-.82,.035,1.15,.09,'#f6edda');box(-4.84,1.87,-1.68,.035,.08,1.86,'#f6edda');
  // Research board, with graph nodes and short chalk marks.
  box(-4.3,1.16,-3.92,3.75,1.5,.10,'#a38765','research');box(-4.18,1.28,-3.805,3.5,1.25,.025,'#3e625b','research');
  for(const [x,y]of[[-3.8,1.66],[-3.1,2.17],[-2.48,1.69],[-1.65,2.13]])box(x,y,-3.765,.15,.15,.03,'#dce6c7','research');
  for(let i=0;i<7;i++){box(-3.72+i*.1,1.75+i*.067,-3.77,.11,.045,.025,'#a5c5b2','research');box(-3.05+i*.1,2.15-i*.058,-3.77,.11,.045,.025,'#a5c5b2','research');}
  box(-1.7,1.52,-3.77,.72,.035,.03,'#a5c5b2','research');box(-4.26,1.13,-3.78,3.67,.07,.23,'#b69c75','research');
  // Open bookshelf, layered with individually colored books.
  box(.75,.05,-3.85,3.9,2.66,.13,'#9b785e','papers');
  for(const x of[.75,4.5])box(x,.05,-3.85,.15,2.66,.73,'#b18c69','papers');
  for(const y of[.05,.88,1.72,2.62])box(.75,y,-3.85,3.9,.1,.78,'#c19a71','papers');
  for(let row=0;row<3;row++)for(let i=0;i<12;i++){const h=.47+(i%3)*.08;box(.98+i*.28,.16+row*.83,-3.58,.19,h,.43,['#8fa49b','#aa7b69','#6e8fa2','#c4ae79'][i%4],'papers');box(.98+i*.28,.24+row*.83,-3.137,.19,.035,.014,'#eadfc4','papers');}
  box(-.6,.028,-.1,4.7,.014,3.8,'#b8c9c5');
  desk(-3.05,-.25,'about');desk(.8,.15,'people');person(-1.85,1.55,'#7c91ad','about');person(2.58,-.35,'#b17d68');
  plant(-3.95,2.75);plant(4.15,-1.7);
  // An empty chair faces the second desk.
  for(const x of[2.55,3.16])for(const z of[2.5,3.03])box(x,.03,z,.09,.61,.09,'#5f7475','join');
  box(2.47,.62,2.42,.9,.14,.8,'#799b91','join');box(2.47,.74,3.08,.9,.62,.14,'#83a396','join');
  box(-3.85,.03,1.35,.95,.53,.65,'#bd956f');box(-3.93,.56,1.29,1.11,.1,.77,'#d2ad81');box(-3.6,.67,1.5,.39,.20,.29,'#e8e1cd');
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
    face([[avatar.x-.36,.05,avatar.z-.33],[avatar.x+.36,.05,avatar.z-.33],[avatar.x+.36,.05,avatar.z+.33],[avatar.x-.36,.05,avatar.z+.33]],'#c6ac75');
    const staticCount=boxes.length;person(avatar.x,avatar.z,'#527da9','',stride);
    boxes.forEach(cube);boxes.length=staticCount;
    for(const f of faces){const rgba=f.color.slice(1).match(/../g).map(v=>parseInt(v,16));if(rgba.length===3)rgba.push(255);for(let i=1;i<f.p.length-1;i++)triangle(f.p[0],f.p[i],f.p[i+1],rgba,keys.indexOf(f.group));}
    ctx.putImageData(pixels,0,0);
    const [x,y]=project(sections[target].pin);ctx.fillStyle='#d3a85b';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+5,y-7);ctx.lineTo(x,y-11);ctx.lineTo(x-5,y-7);ctx.closePath();ctx.fill();
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
  function cameraButtons(){root.querySelector('[data-turn="-1"]').disabled=view<=25;root.querySelector('[data-turn="1"]').disabled=view>=65;}
  // Step from the last requested view, not the mid-turn angle, so views stay on the 10° grid.
  function turn(direction){cancelAnimationFrame(cameraFrame);const start=angle,t0=performance.now();view=Math.max(25,Math.min(65,view+direction*10));cameraButtons();
    if(reducedMotion.matches){angle=view;draw();return;}
    function tick(t){const v=Math.min(1,(t-t0)/260),e=v*v*(3-2*v);angle=start+(view-start)*e;draw();if(v<1)cameraFrame=requestAnimationFrame(tick);}
    cameraFrame=requestAnimationFrame(tick);
  }
  root.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>walk(b.dataset.place)));
  root.querySelectorAll('[data-turn]').forEach(b=>b.addEventListener('click',()=>turn(Number(b.dataset.turn))));
  canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)*480/r.width),y=Math.floor((e.clientY-r.top)*320/r.height);if(x>=0&&x<480&&y>=0&&y<320){const key=keys[picks[y*480+x]];if(key)walk(key);}});
  // The markup already shows the desk as selected; render without scrolling on load.
  renderPanel('about');
  draw();
  cameraButtons();
})();
