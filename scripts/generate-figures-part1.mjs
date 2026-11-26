// Deterministic vector illustrations for Weeks 1–3. Run with Node.js 18+.
import { writeFileSync } from "node:fs";
function generatePart1() {
  const out = [];
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const n = x => Number(x.toFixed(3));
  const ink="#172334",blue="#2563eb",teal="#16756a",orange="#b45309",gray="#64748b",grid="#dbe3eb";
  const txt=(x,y,s,size=16,anchor="middle",color=ink)=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" fill="${color}">${esc(s)}</text>`;
  const ln=(x1,y1,x2,y2,c=ink,w=1.5,d="")=>`<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${c}" stroke-width="${w}"${d?' stroke-dasharray="'+d+'"':""}/>`;
  const dot=(x,y,c=blue,r=4)=>`<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${c}"/>`;
  const rect=(x,y,w,h,fill,stroke="none")=>`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}" stroke="${stroke}"/>`;
  const path=(pts,c=blue,w=2.4,d="")=>`<path d="${pts.map(([x,y],i)=>(i?"L":"M")+n(x)+" "+n(y)).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"${d?' stroke-dasharray="'+d+'"':""}/>`;
  const seq=(a,b,k)=>Array.from({length:k},(_,i)=>a+(b-a)*i/(k-1));
  const legend=(x,y,c,s)=>ln(x,y-5,x+27,y-5,c,3)+txt(x+34,y,s,14,"start");
  const svg=(name,title,desc,w,h,body)=>out.push({name,content:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n  <title id="title">${esc(title)}</title>\n  <desc id="desc">${esc(desc)}</desc>\n  <rect width="${w}" height="${h}" fill="#ffffff"/>\n  <g font-family="Arial, sans-serif">\n${body}\n  </g>\n</svg>\n`});
  function plot(x,y,w,h,x0,x1,y0,y1,xt,yt,xlabel,ylabel) {
    const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h*(y1-v)/(y1-y0);
    let body="";
    for(const v of xt)body+=ln(X(v),y,X(v),y+h,grid)+txt(X(v),y+h+22,v,13);
    for(const v of yt)body+=ln(x,Y(v),x+w,Y(v),grid)+txt(x-9,Y(v)+5,v,13,"end");
    body+=ln(x,y,x,y+h)+ln(x,y+h,x+w,y+h)+txt(x+w/2,y+h+46,xlabel,15)+`<text transform="translate(${x-52} ${y+h/2}) rotate(-90)" text-anchor="middle" font-size="15" fill="${ink}">${esc(ylabel)}</text>`;
    return {X,Y,body,curve:(f,c=blue,w=2.4)=>path(seq(x0,x1,401).map(v=>[X(v),Y(f(v))]),c,w)};
  }
  {
    const p=plot(75,60,600,230,0,6,0,1,[0,1,2,3,4,5,6],[0,.25,.5,.75,1],"Position x","Intensity");
    const f=x=>.5+.2*Math.cos(2*Math.PI*x/6);
    const g=x=>f(x)+.15*Math.sin(Math.PI*x);
    let b=txt(375,29,"Different functions, identical sampled values",20)+p.body+p.curve(f,blue)+p.curve(g,teal);
    for(let i=0;i<=6;i++){b+=dot(p.X(i),p.Y(f(i)),ink,4.5);const q=Math.round(f(i)*4)/4;b+=rect(p.X(i)-3,p.Y(q)-3,6,6,orange);}
    b+=legend(90,355,blue,"f(x)")+legend(245,355,teal,"f(x) + 0.15 sin(πx)")+legend(495,355,orange,"Quantized to 0.25");
    svg("week01-sampling.svg","Sampling and quantization","Two different continuous functions agree at integer locations; squares show quantized samples.",740,380,b);
  }
  {
    let b=txt(360,30,"Bilinear interpolation in a unit cell",21);const x=120,y=65,s=230,a=.25,c=.75;const px=x+s*a,py=y+s*(1-c);
    b+=rect(x,y,s,s,"#eef4ff",gray);
    b+=ln(px,y,px,y+s,gray,1.2,"5 4")+ln(x,py,x+s,py,gray,1.2,"5 4");
    for(const [u,v,label,w] of [[0,0,"I(0,0)",(1-a)*(1-c)],[1,0,"I(1,0)",a*(1-c)],[0,1,"I(0,1)",(1-a)*c],[1,1,"I(1,1)",a*c]]){
      const xx=x+s*u,yy=y+s*(1-v);b+=ln(xx,yy,px,py,blue,1.1,"4 4")+dot(xx,yy,blue,6)+txt(xx,yy+(v?-13:22),label,15);
    }
    b+=dot(px,py,orange,6)+txt(px+10,py-12,"(a,b) = (0.25,0.75)",14,"start",orange);
    b+=txt(390,90,"Four interpolation weights",17,"start")+txt(390,125,"w00 = (1−a)(1−b) = 0.1875",15,"start")+txt(390,155,"w10 = a(1−b) = 0.0625",15,"start")+txt(390,185,"w01 = (1−a)b = 0.5625",15,"start")+txt(390,215,"w11 = ab = 0.1875",15,"start")+txt(390,255,"Sum = 1",17,"start",teal);
    svg("week01-bilinear.svg","Bilinear interpolation","A unit cell with the four grid samples and a weighted interpolation point.",740,350,b);
  }
  {
    const p=plot(75,60,590,235,-2.5,2.5,-.2,1.1,[-2,-1,0,1,2],[-.2,0,.5,1],"Offset t","Kernel h(t)");
    const cubic=t=>{t=Math.abs(t);return t<=1?1.5*t**3-2.5*t*t+1:t<2?-.5*t**3+2.5*t*t-4*t+2:0;};
    let b=txt(370,28,"Interpolation kernels (Keys a = −0.5)",21)+p.body;
    b+=path([[-2.5,0],[-.5,0],[-.5,1],[.5,1],[.5,0],[2.5,0]].map(([x,y])=>[p.X(x),p.Y(y)]),gray,2.4);
    b+=path([[-2.5,0],[-1,0],[0,1],[1,0],[2.5,0]].map(([x,y])=>[p.X(x),p.Y(y)]),blue,2.4)+p.curve(cubic,teal);
    b+=legend(85,360,gray,"Nearest neighbor")+legend(285,360,blue,"Linear")+legend(475,360,teal,"Bicubic (Keys)");
    svg("week01-interpolation-kernels.svg","Interpolation kernels","Exact nearest, linear, and Keys cubic kernels with negative lobes.",740,390,b);
  }
  {
    const maps=[["Original",(x,y)=>[x,y]],["Translation",(x,y)=>[x+.45,y+.3]],["Rotation (30°)",(x,y)=>[Math.cos(Math.PI/6)*x-Math.sin(Math.PI/6)*y,Math.sin(Math.PI/6)*x+Math.cos(Math.PI/6)*y]],["Nonuniform scaling",(x,y)=>[1.35*x,.65*y]],["Shear",(x,y)=>[x+.6*y,y]],["Homography",(x,y)=>[x/(1+.4*y),y/(1+.4*y)]]];
    let b=txt(420,29,"Geometric transformation families",21);
    maps.forEach(([label,f],i)=>{const cx=140+280*(i%3),cy=143+235*Math.floor(i/3),scale=67;const map=(x,y)=>{const [u,v]=f(x,y);return [cx+scale*u,cy-scale*v];};b+=txt(cx,cy+106,label,16);for(const k of seq(-1,1,5)){b+=path(seq(-1,1,41).map(t=>map(k,t)),blue,1.3)+path(seq(-1,1,41).map(t=>map(t,k)),teal,1.3);}b+=dot(...map(0,0),orange,4);});
    svg("week02-affine-transformations.svg","Affine and projective mappings","Six Cartesian grids generated from explicit translation, rotation, scaling, shear and homography formulas.",840,505,b);
  }
  {
    const R=1,theta0=Math.PI;const warp=(x,y,s=1)=>{const a=s*theta0*Math.max(0,1-Math.hypot(x,y)/R);return [x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)];};
    const fs=[["Original",(x,y)=>[x,y]],["Radial swirl",warp],["Exact continuous inverse",(x,y)=>warp(...warp(x,y),-1)]];
    let b=txt(420,29,"Radial swirl: θ(r) = π max(0, 1−r/R)",20);
    fs.forEach(([label,f],i)=>{const cx=140+i*280,cy=169,sc=100;const m=(x,y)=>{const [u,v]=f(x,y);return [cx+sc*u,cy-sc*v];};for(const k of seq(-1.1,1.1,11)){b+=path(seq(-1.1,1.1,181).map(t=>m(k,t)),blue,1)+path(seq(-1.1,1.1,181).map(t=>m(t,k)),teal,1);}b+=`<circle cx="${cx}" cy="${cy}" r="${sc*.7}" fill="none" stroke="${orange}" stroke-dasharray="5 4" stroke-width="1.5"/>`+dot(...m(.7,0),orange,5)+txt(cx,305,label,16);});
    b+=txt(420,338,"Dashed circle: invariant radius. The inverse panel is continuous, not resampled pixels.",14);
    svg("week02-radial-swirl.svg","Radial swirl and continuous inverse","Cartesian grids and a point at invariant radius, computed with the lecture's radial rotation profile.",840,360,b);
  }
  {
    let b=txt(420,29,"Luminance and chroma sample grids",21);
    const cases=[["4:4:4",1,1],["4:2:2",2,1],["4:2:0",2,2]];
    cases.forEach(([label,sx,sy],i)=>{const x=65+i*275,y=85,z=37;b+=txt(x+74,62,label,19);for(let r=0;r<4;r++)for(let c=0;c<4;c++){b+=rect(x+c*z,y+r*z,z,z,"#e2e8f0","#fff")+dot(x+(c+.5)*z,y+(r+.5)*z,gray,3);}for(let r=0;r<4;r+=sy)for(let c=0;c<4;c+=sx){b+=`<rect x="${x+c*z+1}" y="${y+r*z+1}" width="${sx*z-2}" height="${sy*z-2}" fill="#2563eb" fill-opacity=".13" stroke="${blue}" stroke-width="1.5"/>`+dot(x+(c+sx/2)*z,y+(r+sy/2)*z,blue,6);}b+=txt(x+74,258,`Y: 16, Cb: ${16/(sx*sy)}, Cr: ${16/(sx*sy)}`,14);});
    b+=dot(77,293,gray,3)+txt(88,298,"Luminance sample",14,"start")+dot(340,293,blue,6)+txt(353,298,"One sample per chroma channel (schematic center)",14,"start");
    svg("week03-chroma-subsampling.svg","Chroma sampling arrangements","Full luminance grid and chroma footprints for 4:4:4, 4:2:2 and 4:2:0. Sample siting is illustrative.",840,325,b);
  }
  {
    let b=txt(420,28,"The 64 orthonormal 8 × 8 DCT basis patterns",21)+txt(420,49,"Column index v increases to the right; row index u increases downward",14);
    const a=90,z=8.6,step=91;for(let u=0;u<8;u++)for(let v=0;v<8;v++){
      const x=65+v*step,y=67+u*step;
      const groups={};for(let r=0;r<8;r++)for(let c=0;c<8;c++){const val=Math.cos((2*r+1)*u*Math.PI/16)*Math.cos((2*c+1)*v*Math.PI/16);const g=Math.round(127.5*(1+val));(groups[g]??=[]).push(`M${n(x+c*z)} ${n(y+r*z)}h${z}v${z}h-${z}z`);}
      for(const [g,d] of Object.entries(groups))b+=`<path d="${d.join("")}" fill="rgb(${g},${g},${g})"/>`;
      b+=txt(x+4*z,y+8*z+13,`(${u},${v})`,11);
    }b+=txt(420,813,"Display scales each basis by its cosine amplitude; orthonormal normalization is given in the lecture.",13);
    svg("week03-dct-basis.svg","All 64 block DCT basis patterns","Generated cosine products indexed by u and v.",840,835,b);
  }
  {
    const p=plot(75,58,570,200,-20,20,-20,20,[-20,-10,0,10,20],[-20,-10,0,10,20],"Input coefficient","Decoded coefficient");
    let b=txt(360,28,"Scalar quantization: Q = 10, ties rounded upward",20)+p.body+path([[p.X(-20),p.Y(-20)],[p.X(20),p.Y(20)]],gray,1.4,"5 4");
    for(let k=-2;k<=2;k++){const a=Math.max(-20,10*k-5),z=Math.min(20,10*k+5);b+=ln(p.X(a),p.Y(k*10),p.X(z),p.Y(k*10),blue,3);if(k<2)b+=ln(p.X(z),p.Y(k*10),p.X(z),p.Y((k+1)*10),blue,1,"3 3");}
    const q=plot(75,355,570,130,-20,20,-5,5,[-20,-10,0,10,20],[-5,0,5],"Input coefficient","Error");
    b+=q.body;for(let k=-2;k<=2;k++){const a=Math.max(-20,10*k-5),z=Math.min(20,10*k+5);b+=ln(q.X(a),q.Y(10*k-a),q.X(z),q.Y(10*k-z),teal,2.5);}
    b+=txt(360,555,"Error = decoded − original; magnitude ≤ Q/2.",14);
    svg("week03-quantization.svg","Quantization staircase and error","The lecture's nearest rounding convention, with jumps indicated schematically.",720,575,b);
  }
  {
    const vals=Array.from({length:71},(_,i)=>i-35),q=(x,k)=>k*Math.floor(x/k+.5);
    const direct={},twice={};for(const x of vals){const a=q(x,5),b=q(q(x,7),5);direct[a]=(direct[a]||0)+1;twice[b]=(twice[b]||0)+1;}
    const keys=Array.from({length:15},(_,i)=>5*(i-7));let b=txt(400,28,"Idealized double quantization of uniform integer inputs",20)+txt(400,50,"Q₁ = 7, Q₂ = 5; original coefficients −35 through 35",15);
    const x=60,y=85,w=690,h=220,step=w/keys.length;for(let j=0;j<=10;j+=2)b+=ln(x,y+h-j*20,x+w,y+h-j*20,grid)+txt(x-8,y+h-j*20+5,j,13,"end");
    keys.forEach((k,i)=>{const xx=x+i*step+5;const a=direct[k]||0,c=twice[k]||0;b+=rect(xx,y+h-20*a,step*.36,20*a,blue)+rect(xx+step*.4,y+h-20*c,step*.36,20*c,orange)+txt(xx+step*.38,y+h+21,k,12);});
    b+=ln(x,y+h,x+w,y+h)+legend(105,355,blue,"Direct Q₂")+legend(390,355,orange,"Q₁ then Q₂")+txt(400,380,"Scalar model only: no IDCT, rounding of pixels, or grid misalignment.",14);
    svg("week03-double-quantization.svg","Double quantization histograms","Counts computed by applying the specified ideal scalar quantizers to a uniform finite integer range.",800,400,b);
  }
  return out;
}
for (const figure of generatePart1()) {
  writeFileSync(new URL("../media/" + figure.name, import.meta.url), figure.content, "utf8");
}
