// Deterministic original SVG illustrations for Week 12. Node.js 18+.
import { writeFileSync } from "node:fs";
function generateWeek12(){
  const figs=[],ink="#172334",blue="#2563eb",teal="#16756a",orange="#b45309",gray="#64748b",grid="#dbe3eb";
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const n=x=>Number(x.toFixed(3));
  const text=(x,y,s,z=16,a="middle",c=ink)=>`<text x="${n(x)}" y="${n(y)}" font-size="${z}" text-anchor="${a}" fill="${c}">${esc(s)}</text>`;
  const line=(x,y,u,v,c=ink,w=1.5,d="")=>`<line x1="${n(x)}" y1="${n(y)}" x2="${n(u)}" y2="${n(v)}" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  const rect=(x,y,w,h,c,st="none",sw=1)=>`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${c}" stroke="${st}" stroke-width="${sw}"/>`;
  const path=(pts,c=blue,w=2.5,d="")=>`<path d="${pts.map(([x,y],i)=>(i?"L":"M")+n(x)+" "+n(y)).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  const seq=(a,b,k)=>Array.from({length:k},(_,i)=>a+(b-a)*i/(k-1));
  const legend=(x,y,c,s)=>line(x,y-5,x+24,y-5,c,3)+text(x+31,y,s,14,"start");
  function save(name,title,desc,w,h,b){figs.push({name,content:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>\n<rect width="${w}" height="${h}" fill="white"/><g font-family="Arial, sans-serif">\n${b}\n</g></svg>\n`});}
  function plot(x,y,w,h,x0,x1,y0,y1,xt,yt,xlabel,ylabel,xf=v=>v,yf=v=>v){
    const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h*(y1-v)/(y1-y0);let b="";
    for(const v of xt)b+=line(X(v),y,X(v),y+h,grid)+text(X(v),y+h+21,xf(v),13);
    for(const v of yt)b+=line(x,Y(v),x+w,Y(v),grid)+text(x-9,Y(v)+4,yf(v),13,"end");
    b+=line(x,y,x,y+h)+line(x,y+h,x+w,y+h)+text(x+w/2,y+h+45,xlabel,15)+`<text transform="translate(${x-60} ${y+h/2}) rotate(-90)" text-anchor="middle" font-size="15" fill="${ink}">${esc(ylabel)}</text>`;
    return {X,Y,b,curve:(f,c)=>path(seq(x0,x1,501).map(v=>[X(v),Y(f(v))]),c)};
  }
  {
    let b=text(410,30,"Geometric overlap versus reference coverage",21);
    const cases=[{x:85,y:90,dx:40,dy:20,w:160,h:100,label:"Partial prediction",inter:120*80,pa:16000},{x:485,y:90,dx:-25,dy:-20,w:210,h:140,label:"Oversized prediction",inter:16000,pa:29400}];
    for(const a of cases){b+=rect(a.x,a.y,160,100,"#dbeafe",blue,2)+`<rect x="${a.x+a.dx}" y="${a.y+a.dy}" width="${a.w}" height="${a.h}" fill="#fbbf24" fill-opacity=".30" stroke="${orange}" stroke-width="2"/>`;const iou=a.inter/(16000+a.pa-a.inter),cov=a.inter/16000;b+=text(a.x+80,260,a.label,17)+text(a.x+80,287,`IoU = ${iou.toFixed(3)}; coverage = ${cov.toFixed(2)}`,15);}
    b+=legend(150,330,blue,"Reference region")+legend(450,330,orange,"Predicted region");
    save("week12-box-coverage.svg","Box overlap and reference coverage","Two synthetic rectangle examples illustrating different IoU and coverage scores.",820,355,b);
  }
  {
    const p=plot(100,62,620,255,-5,-1,0,1,[-5,-4,-3,-2,-1],[0,.25,.5,.75,1],"Prevalence (logarithmic scale)","Precision",v=>`10^${v}`,v=>`${Math.round(100*v)}%`);
    let b=text(410,30,"Precision at fixed recall 0.99",21)+p.b;
    for(const [q,c] of [[.01,orange],[.001,teal],[.0001,blue]])b+=p.curve(z=>{const a=10**z;return .99*a/(.99*a+(1-a)*q);},c);
    b+=legend(110,382,orange,"FPR 1%")+legend(310,382,teal,"FPR 0.1%")+legend(510,382,blue,"FPR 0.01%");
    b+=text(410,410,"Illustrative binary decision model; not Google performance.",14);
    save("week12-prevalence-precision.svg","Precision and prevalence","Bayes precision calculated at fixed recall with three false-positive probabilities.",820,435,b);
  }
  {
    const p=plot(100,62,620,255,0,500,0,1,[0,100,200,300,400,500],[0,.25,.5,.75,1],"Number of sensitive objects K","Probability of at least one miss",v=>v,v=>`${Math.round(100*v)}%`);
    let b=text(410,30,"Collection risk under independent misses",21)+p.b;
    for(const [q,c] of [[.01,orange],[.005,teal],[.001,blue]])b+=p.curve(k=>-Math.expm1(k*Math.log1p(-q)),c);
    b+=legend(105,382,orange,"Miss rate 1%")+legend(305,382,teal,"Miss rate 0.5%")+legend(505,382,blue,"Miss rate 0.1%");
    b+=text(410,410,"Independent equal-probability trials are an illustrative assumption.",14);
    save("week12-collection-risk.svg","Collection-level miss probability","Probability of one or more misses under three independent-object models.",820,435,b);
  }
  {
    // An original stylized scene, not Street View photography.
    const scene=(x,y,mode)=>{
      let b=`<g transform="translate(${x} ${y})">`;
      b+=rect(0,0,240,150,"#d8ecf5")+rect(0,94,240,56,"#64748b")+rect(0,84,240,10,"#a8b0b5");
      b+=rect(8,23,70,61,"#f1dfc6")+rect(90,12,74,72,"#c5cbd2")+rect(175,34,57,50,"#e5d6ba");
      for(let i=0;i<3;i++){b+=rect(17+i*18,36,12,16,"#72869a")+rect(99+i*19,25,13,18,"#72869a");}
      b+=rect(110,113,65,18,"#45677c")+`<path d="M120 113 L128 100 H158 L169 113" fill="#45677c"/><circle cx="123" cy="132" r="7" fill="#172334"/><circle cx="162" cy="132" r="7" fill="#172334"/>`;
      b+=`<circle cx="45" cy="74" r="10" fill="#d49a70"/><path d="M35 90 Q45 83 55 90 L58 116 H32 Z" fill="#246875"/><path d="M38 115 V137 M52 115 V137" stroke="#253444" stroke-width="5"/>`;
      b+=rect(132,119,24,8,"#f7f4e8");
      if(mode==="original"){b+=`<circle cx="42" cy="72" r="1.4" fill="#172334"/><circle cx="48" cy="72" r="1.4" fill="#172334"/>`+text(144,125,"•••",7);}
      else if(mode==="smooth"){
        b+=`<ellipse cx="45" cy="74" rx="13" ry="12" fill="#b6a69a" fill-opacity=".94"/><rect x="129" y="116" width="30" height="14" rx="5" fill="#a1a9aa"/>`;
      }else{
        b+=`<circle cx="45" cy="74" r="13" fill="#334155"/>`+rect(129,116,30,14,"#334155");
      }
      return b+"</g>";
    };
    let b=text(400,29,"Synthetic street scene: conceptual redaction alternatives",20);
    [["Original schematic","original"],["Smoothing schematic","smooth"],["Opaque replacement","fixed"]].forEach(([label,m],i)=>{b+=scene(26+i*258,62,m)+text(146+i*258,239,label,15);});
    b+=text(400,272,"Original vector artwork; no real people, identifiers or Google imagery.",14)+text(400,293,"The middle panel illustrates appearance only; it is not a computed blur or a privacy test.",13);
    save("week12-synthetic-redaction.svg","Synthetic street-scene protection examples","Original vector scene showing conceptual differences between visible details, smoothing, and opaque replacement.",800,315,b);
  }
  {
    const p=plot(100,63,620,240,-3,3,0,1,[-3,-2,-1,0,1,2,3],[0,.25,.5,.75,1],"Position across a mask","Weight");
    const a=x=>Math.min(1,Math.max(0,2-Math.abs(x)));
    let b=text(410,30,"Alpha blending and a full-replacement interior",20)+rect(p.X(-1),63,p.X(1)-p.X(-1),240,"#e2f1e9")+p.b+p.curve(a,teal)+p.curve(x=>1-a(x),orange);
    b+=text(410,90,"Protected interior",15)+legend(115,370,teal,"Replacement weight α")+legend(435,370,orange,"Original weight 1−α")+text(410,402,"Assumes fixed mask and independent replacement; contextual leakage can remain.",14);
    save("week12-alpha-mask.svg","Alpha profile and source contribution","Illustrative mask showing full replacement centrally and transition zones outside.",820,425,b);
  }
  return figs;
}
for (const figure of generateWeek12()) {
  writeFileSync(new URL("../media/" + figure.name, import.meta.url), figure.content, "utf8");
}
