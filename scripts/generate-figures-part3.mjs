// Deterministic vector illustrations for Weeks 8–9. Run with Node.js 18+.
import { writeFileSync } from "node:fs";
function generatePart3(){
  const out=[],ink="#172334",blue="#2563eb",teal="#16756a",orange="#b45309",gray="#64748b",grid="#dbe3eb",purple="#7c3aed";
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const n=x=>+x.toFixed(3),seq=(a,b,k)=>Array.from({length:k},(_,i)=>a+(b-a)*i/(k-1));
  const text=(x,y,s,z=16,a="middle",c=ink)=>`<text x="${n(x)}" y="${n(y)}" font-size="${z}" text-anchor="${a}" fill="${c}">${esc(s)}</text>`;
  const line=(x,y,u,v,c=ink,w=1.5,d="")=>`<line x1="${n(x)}" y1="${n(y)}" x2="${n(u)}" y2="${n(v)}" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  const dot=(x,y,c=blue,r=4)=>`<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${c}"/>`;
  const rect=(x,y,w,h,c,st="none")=>`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${c}" stroke="${st}"/>`;
  const path=(pts,c=blue,w=2.3,d="")=>`<path d="${pts.map(([x,y],i)=>(i?"L":"M")+n(x)+" "+n(y)).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"${d?` stroke-dasharray="${d}"`:""}/>`;
  const legend=(x,y,c,s)=>line(x,y-5,x+24,y-5,c,3)+text(x+31,y,s,14,"start");
  function save(name,title,desc,w,h,b){out.push({name,content:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>\n<rect width="${w}" height="${h}" fill="white"/><g font-family="Arial, sans-serif">\n${b}\n</g></svg>\n`});}
  function plot(x,y,w,h,x0,x1,y0,y1,xt,yt,xlabel,ylabel,xf=v=>v,yf=v=>v){
    const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h*(y1-v)/(y1-y0);let b="";
    for(const v of xt)b+=line(X(v),y,X(v),y+h,grid)+text(X(v),y+h+21,xf(v),13);
    for(const v of yt)b+=line(x,Y(v),x+w,Y(v),grid)+text(x-9,Y(v)+4,yf(v),13,"end");
    b+=line(x,y,x,y+h)+line(x,y+h,x+w,y+h)+text(x+w/2,y+h+45,xlabel,15)+`<text transform="translate(${x-57} ${y+h/2}) rotate(-90)" text-anchor="middle" font-size="15" fill="${ink}">${esc(ylabel)}</text>`;
    return {X,Y,b,curve:(f,c,a=x0,z=x1)=>path(seq(a,z,501).map(v=>[X(v),Y(f(v))]),c)};
  }
  {
    const p=plot(90,62,620,252,0,450,0,1,[0,100,200,300,400],[0,.25,.5,.75,1],"Distinct inputs q","Probability of at least one collision");
    let b=text(400,28,"Exact birthday collision probabilities",21)+p.b+line(p.X(0),p.Y(.5),p.X(450),p.Y(.5),gray,1,"5 4");
    for(const [bits,c] of [[8,blue],[12,teal],[16,orange]]){const N=2**bits;let lp=0;const pts=[];let median=null;for(let q=0;q<=450;q++){if(q>1&&q<=N)lp+=Math.log1p(-(q-1)/N);const prob=q>N?1:-Math.expm1(lp);pts.push([p.X(q),p.Y(prob)]);if(median===null&&prob>=.5)median=q;}b+=path(pts,c);b+=dot(p.X(median),p.Y(.5),c,4);}
    b+=legend(100,385,blue,"8 bits")+legend(290,385,teal,"12 bits")+legend(480,385,orange,"16 bits")+text(400,410,"Ideal uniform independent digests of distinct inputs; exact product, not SHA-256 measurements.",13);
    save("week08-birthday-bound.svg","Birthday collision probability","Exact finite-space collision probabilities for ideal 8-, 12- and 16-bit hashes.",800,435,b);
  }
  {
    let b=text(400,29,"Binary64 spacing depends on magnitude",21);
    const rows=[{label:"Near 1",xs:[-2,-1,0,1,2],labels:["1−2⁻⁵³","1","1+2⁻⁵²","1+2·2⁻⁵²","1+3·2⁻⁵²"],positions:[145,225,385,545,705]},{label:"Near 10¹⁶",xs:[-4,-2,0,2,4],labels:["a−4","a−2","a","a+2","a+4"],positions:[145,285,425,565,705]}];
    b+=text(50,67,"Near 1 (spacing changes at the power-of-two boundary)",16,"start");
    b+=line(125,130,725,130,gray);
    rows[0].positions.forEach((x,i)=>{b+=dot(x,130,blue,5)+text(x,155,rows[0].labels[i],13);});
    b+=text(305,112,"2⁻⁵²",14, "middle",teal)+text(185,112,"2⁻⁵³",14,"middle",teal);
    b+=text(50,207,"Near a = 10¹⁶ (spacing = 2)",16,"start")+line(125,265,725,265,gray);
    rows[1].positions.forEach((x,i)=>{b+=dot(x,265,blue,5)+text(x,289,rows[1].labels[i],14);});
    b+=dot(495,265,orange,5)+text(495,242,"a+1",15,"middle",orange)+line(495,260,425,260,orange,1.5,"4 3")+text(400,330,"a+1 is halfway between representable values; round-to-nearest, ties-to-even selects a.",14);
    save("week08-floating-point-spacing.svg","Binary64 representable values","Exact relative spacings near 1 and ten to the sixteenth, illustrating the lost increment.",800,355,b);
  }
  {
    const N=40,f=Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=> (c>=9&&c<=13&&r>=7&&r<=32)||(r>=7&&r<=11&&c>=9&&c<=27)||(r>=19&&r<=23&&c>=9&&c<=27)?1:0));
    const g=f.map(r=>r.slice());for(let r=24;r<=32;r++)g[r][27]=1;const e=f.map((row,i)=>row.map((v,j)=>Math.abs(v-g[i][j])));
    let b=text(420,29,"Small global error can change a decisive feature",21);const panels=[["Reference",f],["Derivative",g],["Absolute difference",e]];
    panels.forEach(([label,a],k)=>{const x=38+k*280,y=65,z=5;let d="";for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(a[r][c])d+=`M${x+c*z} ${y+r*z}h${z}v${z}h-${z}z`;b+=rect(x,y,N*z,N*z,"#101820")+`<path d="${d}" fill="${k===2?"#f59e0b":"white"}"/>`+text(x+100,292,label,16);});
    const s=e.flat().reduce((a,v)=>a+v,0);b+=text(420,329,`${s} altered samples of ${N*N}; MSE = ${s}/${N*N} = ${(s/(N*N)).toFixed(6)}.`,16)+text(420,354,"The additional stroke may matter much more than its global pixel fraction.",14);
    save("week09-local-feature-error.svg","Global and localized reconstruction error","Synthetic reference and derivative differ at nine pixels forming an additional stroke.",840,378,b);
  }
  {
    let b=text(380,29,"Binary feature decision versus known reference",21);
    b+=text(375,67,"Reference feature present",17)+text(615,67,"Reference feature absent",17);
    const cells=[[255,90,"TP","True positive","#e2f1e9"],[495,90,"FP","False positive","#f8e5e5"],[255,215,"FN","False negative","#f8e5e5"],[495,215,"TN","True negative","#e2f1e9"]];
    cells.forEach(([x,y,a,s,c])=>{b+=rect(x,y,230,115,c,"#cbd5e1")+text(x+115,y+47,a,31)+text(x+115,y+77,s,17);});
    b+=text(130,137,"Feature",17)+text(130,160,"detected",17)+text(130,262,"Feature not",17)+text(130,285,"detected",17);
    b+=text(380,365,"Sensitivity = TP/(TP+FN)     Specificity = TN/(TN+FP)",15)+text(380,391,"False-positive rate = FP/(FP+TN)",15);
    save("week09-confusion-matrix.svg","Graphical confusion matrix","Reference truth as columns and decisions as rows, with definitions of the three performance measures.",760,415,b);
  }
  {
    const p=plot(90,62,620,252,1,3,-1,1.5,[1,1.5,2,2.5,3],[-1,-.5,0,.5,1,1.5],"Independent negative controls N (log scale)","Upper bound (%) (log scale)",x=>Math.round(10**x),y=>Number((10**y).toPrecision(2)));
    const exact=x=>Math.log10(100*(-Math.expm1(Math.log(.05)/10**x))),approx=x=>Math.log10(300/10**x);
    let b=text(400,29,"Zero observed failures: exact 95% upper bound",21)+p.b+p.curve(exact,blue)+path(seq(1,3,501).map(x=>[p.X(x),p.Y(approx(x))]),orange,2.3,"6 4");
    b+=legend(100,385,blue,"Exact one-sided binomial")+legend(425,385,orange,"Rule of three")+text(400,410,"Independent Bernoulli trials with a common failure probability; both axes logarithmic.",14);
    save("week09-confidence-bounds.svg","Exact confidence bound and rule of three","Log-log plot of the exact zero-count one-sided binomial confidence bound and the approximation.",800,435,b);
  }
  {
    const p=plot(90,65,620,235,0,1,0,1,[0,.2,.4,.6,.8,1],[0,.25,.5,.75,1],"Decision threshold t","Conditional probability");
    // Exact illustrative distributions on [0,1]: F_pos(t)=t², F_neg(t)=2t−t².
    const sens=t=>1-t*t,spec=t=>2*t-t*t,fpr=t=>1-spec(t);
    let b=text(400,29,"Decision threshold trades sensitivity against specificity",20)+p.b+p.curve(sens,blue)+p.curve(spec,teal)+path(seq(0,1,501).map(t=>[p.X(t),p.Y(fpr(t))]),orange,2.3,"5 4");
    b+=legend(100,360,blue,"Sensitivity")+legend(310,360,teal,"Specificity")+legend(515,360,orange,"False-positive rate");
    b+=text(400,391,"Illustrative score distributions: F_present(t) = t²; F_absent(t) = 2t − t².",14)+text(400,414,"Detect when score ≥ t; curves are analytic, not measured forensic performance.",14);
    save("week09-threshold-tradeoffs.svg","Decision threshold trade-offs","Exact analytic sensitivity, specificity and false-positive curves for illustrative score distributions.",800,440,b);
  }
  return out;
}
for (const figure of generatePart3()) {
  writeFileSync(new URL("../media/" + figure.name, import.meta.url), figure.content, "utf8");
}
