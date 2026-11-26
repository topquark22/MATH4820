// Deterministic original illustrations for Week 14. Node.js 18+.
import { writeFileSync } from "node:fs";
function generateWeek14(){
  const out=[],ink="#172334",blue="#2563eb",teal="#16756a",orange="#b45309",gray="#64748b",grid="#dbe3eb";
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const n=x=>+x.toFixed(3);
  const text=(x,y,s,z=16,a="middle",c=ink)=>`<text x="${n(x)}" y="${n(y)}" font-size="${z}" text-anchor="${a}" fill="${c}">${esc(s)}</text>`;
  const line=(x,y,u,v,c=ink,w=1.5,d="")=>`<line x1="${n(x)}" y1="${n(y)}" x2="${n(u)}" y2="${n(v)}" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  const dot=(x,y,c=blue,r=5)=>`<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${c}"/>`;
  const path=(pts,c=blue,w=2.5,d="")=>`<path d="${pts.map(([x,y],i)=>(i?"L":"M")+n(x)+" "+n(y)).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  function save(name,title,desc,w,h,b){out.push({name,content:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>\n<rect width="${w}" height="${h}" fill="white"/><g font-family="Arial, sans-serif">\n${b}\n</g></svg>\n`});}
  function axes(x,y,w,h,xlabel,ylabel){
    const X=v=>x+w*v,Y=v=>y+h*(1-v);let b="";
    for(let i=0;i<=4;i++){const v=i/4;b+=line(X(v),y,X(v),y+h,grid)+line(x,Y(v),x+w,Y(v),grid)+text(X(v),y+h+20,v,13)+text(x-9,Y(v)+4,v,13,"end");}
    b+=line(x,y,x,y+h)+line(x,y+h,x+w,y+h)+text(x+w/2,y+h+45,xlabel,15)+`<text transform="translate(${x-57} ${y+h/2}) rotate(-90)" text-anchor="middle" font-size="15" fill="${ink}">${esc(ylabel)}</text>`;
    return {X,Y,b};
  }
  {
    const a=[["A",.05,.30],["B",.20,.40],["C",.35,.80],["D",.60,.90],["E",.40,.60],["F",.75,.85]];
    const front=a.filter(([,p,u])=>!a.some(([,q,v])=>q<=p&&v>=u&&(q<p||v>u))).sort((a,b)=>a[1]-b[1]);
    const p=axes(90,70,620,300,"Privacy leakage P (minimize)","Utility U (maximize)");
    let b=text(400,30,"Pareto dominance in a finite configuration set",21)+p.b+path(front.map(([,x,y])=>[p.X(x),p.Y(y)]),teal,2,"6 4");
    a.forEach(([k,x,y])=>{const c=front.some(v=>v[0]===k)?teal:gray;b+=dot(p.X(x),p.Y(y),c,6)+text(p.X(x)+10,p.Y(y)-9,k,16,"start",c);});
    b+=dot(115,440,teal)+text(128,445,"Nondominated",14,"start")+dot(325,440,gray)+text(338,445,"Dominated",14,"start")+text(400,472,"Dashed segments guide the eye; intermediate configurations need not exist.",14);
    save("week14-pareto-frontier.svg","Pareto dominance","Six artificial configurations, with A through D nondominated and E and F dominated.",800,495,b);
  }
  {
    const outcomes=[1,0,1,1,0],N=4;let tp=0,ap=0;const ranks=outcomes.map((v,i)=>{tp+=v;const p=tp/(i+1),r=tp/N;ap+=v*p/N;return {p,r,v,k:i+1};});
    const p=axes(90,65,590,280,"Recall","Precision");let b=text(400,28,"Ranked detections: non-interpolated average precision",20)+p.b;
    let last=0;for(const a of ranks){if(a.v){b+=`<rect x="${p.X(last)}" y="${p.Y(a.p)}" width="${p.X(a.r)-p.X(last)}" height="${p.Y(0)-p.Y(a.p)}" fill="${teal}" fill-opacity=".16" stroke="${teal}" stroke-width="1"/>`;last=a.r;}b+=dot(p.X(a.r),p.Y(a.p),a.v?teal:orange,5)+text(p.X(a.r)+10,p.Y(a.p)-8,`#${a.k}`,13,"start");}
    b+=dot(115,420,teal)+text(130,425,"True positive",14,"start")+dot(320,420,orange)+text(335,425,"False positive",14,"start")+text(400,457,`AP = 29/48 = ${ap.toFixed(4)}; maximum recall = 0.75`,17)+text(400,482,"Shaded area represents the stated discrete AP convention, not COCO interpolation.",13);
    save("week14-precision-recall.svg","Ranked precision recall","Exact precision and recall for five ranked detections and four reference objects.",800,505,b);
  }
  {
    const refs=[[180,130],[340,130],[180,290],[340,290]],pred=[[186,133],[354,130],[210,290],null],radius=20;let correct=0;
    let b=text(400,30,"Pose-keypoint accuracy under a fixed tolerance",20);
    b+=line(180,130,340,130,gray,3)+line(180,130,180,290,gray,3)+line(340,130,340,290,gray,3)+line(180,290,340,290,gray,3);
    refs.forEach(([x,y],i)=>{const p=pred[i],ok=p&&Math.hypot(p[0]-x,p[1]-y)<=radius;if(ok)correct++;b+=`<circle cx="${x}" cy="${y}" r="${radius}" fill="#dbeafe" fill-opacity=".7" stroke="${blue}" stroke-dasharray="4 3"/>`+dot(x,y,blue,4)+text(x-28,y+4,`K${i+1}`,14,"end");if(p){b+=line(x,y,p[0],p[1],ok?teal:orange,2)+dot(p[0],p[1],ok?teal:orange,5);}else b+=text(x+28,y+4,"missing",14,"start",orange);});
    b+=text(590,120,"Reference scale = 200",17)+text(590,155,"Threshold = 0.10",17)+text(590,190,"Tolerance = 20",17)+text(590,248,`PCK = ${correct}/4 = ${(correct/4).toFixed(2)}`,22,"middle",teal);
    b+=dot(140,365,blue)+text(153,370,"Reference",14,"start")+dot(325,365,teal)+text(338,370,"Correct prediction",14,"start")+dot(560,365,orange)+text(573,370,"Incorrect prediction",14,"start");
    b+=text(400,405,"Missing eligible predictions remain in the denominator.",14);
    save("week14-pose-keypoints.svg","Pose keypoint tolerance","Four artificial reference keypoints, two correct predictions, one outside tolerance and one missing.",800,430,b);
  }
  {
    const cal=[["A",.08,.45],["B",.14,.72],["C",.21,.84],["D",.31,.91]],test=[["A",.10,.43],["B",.18,.69],["C",.25,.82],["D",.33,.90]],budget=.2;
    const selected=cal.filter(a=>a[1]<=budget).sort((a,b)=>b[2]-a[2])[0][0];let b=text(440,28,"Select on calibration data; evaluate on held-out data",21);
    for(const [i,arr] of [cal,test].entries()){const p=axes(80+i*435,90,320,240,"Leakage","Utility");b+=text(240+i*435,62,i?"Held-out evaluation":"Calibration",17)+p.b+line(p.X(budget),90,p.X(budget),330,orange,2,"5 4");for(const [k,x,y] of arr)b+=dot(p.X(x),p.Y(y),k===selected?teal:gray,k===selected?7:4)+text(p.X(x)+9,p.Y(y)-8,k,14,"start");}
    b+=text(440,410,`Budget P ≤ ${budget}; configuration ${selected} selected before test evaluation.`,16)+text(440,434,"The held-out values are illustrative and must not be used to retune the selected result.",14);
    save("week14-configuration-evaluation.svg","Calibration and held-out evaluation","Two artificial objective plots showing a configuration selected using a fixed calibration leakage budget.",880,455,b);
  }
  return out;
}
for (const figure of generateWeek14()) {
  writeFileSync(new URL("../media/" + figure.name, import.meta.url), figure.content, "utf8");
}
