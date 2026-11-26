// Deterministic vector illustrations for Week 4. Run with Node.js 18+.
import { writeFileSync } from "node:fs";
function generatePart2a(){
  const out=[],ink="#172334",blue="#2563eb",teal="#16756a",orange="#b45309",gray="#64748b",grid="#dbe3eb";
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const n=x=>+x.toFixed(3),seq=(a,b,k)=>Array.from({length:k},(_,i)=>a+(b-a)*i/(k-1));
  const text=(x,y,s,z=16,a="middle",c=ink)=>`<text x="${n(x)}" y="${n(y)}" font-size="${z}" text-anchor="${a}" fill="${c}">${esc(s)}</text>`;
  const line=(x,y,u,v,c=ink,w=1.5,d="")=>`<line x1="${n(x)}" y1="${n(y)}" x2="${n(u)}" y2="${n(v)}" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  const dot=(x,y,c=blue,r=4)=>`<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${c}"/>`;
  const rect=(x,y,w,h,c,st="none")=>`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${c}" stroke="${st}"/>`;
  const path=(pts,c=blue,w=2.3)=>`<path d="${pts.map(([x,y],i)=>(i?"L":"M")+n(x)+" "+n(y)).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const legend=(x,y,c,s)=>line(x,y-5,x+24,y-5,c,3)+text(x+31,y,s,14,"start");
  function save(name,title,desc,w,h,b){out.push({name,content:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>\n<rect width="${w}" height="${h}" fill="white"/><g font-family="Arial, sans-serif">\n${b}\n</g></svg>\n`});}
  function plot(x,y,w,h,x0,x1,y0,y1,xt,yt,xlabel,ylabel){
    const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h*(y1-v)/(y1-y0);let b="";
    for(const v of xt)b+=line(X(v),y,X(v),y+h,grid)+text(X(v),y+h+21,v,13);
    for(const v of yt)b+=line(x,Y(v),x+w,Y(v),grid)+text(x-9,Y(v)+4,v,13,"end");
    b+=line(x,y,x,y+h)+line(x,y+h,x+w,y+h)+text(x+w/2,y+h+45,xlabel,15)+`<text transform="translate(${x-49} ${y+h/2}) rotate(-90)" text-anchor="middle" font-size="15" fill="${ink}">${esc(ylabel)}</text>`;
    return {X,Y,b,curve:(f,c)=>path(seq(x0,x1,501).map(v=>[X(v),Y(f(v))]),c)};
  }
  function raster(a,x,y,sz,lo=0,hi=1){const rows=a.length,cols=a[0].length,groups={};for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const g=Math.round(255*Math.min(1,Math.max(0,(a[r][c]-lo)/(hi-lo))));(groups[g]??=[]).push(`M${n(x+c*sz)} ${n(y+r*sz)}h${sz}v${sz}h-${sz}z`);}return Object.entries(groups).map(([g,d])=>`<path d="${d.join("")}" fill="rgb(${g},${g},${g})"/>`).join("");}
  {
    let b=text(320,30,"Eighth roots of unity: W = exp(−2πi/8)",20);
    const cx=320,cy=235,r=155;b+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${gray}" stroke-width="1.5"/>`+line(110,cy,530,cy,gray)+line(cx,50,cx,420,gray)+text(535,cy+5,"Re",14)+text(cx+15,55,"Im",14);
    for(let k=0;k<8;k++){const a=-2*Math.PI*k/8,x=cx+r*Math.cos(a),y=cy-r*Math.sin(a);b+=line(cx,cy,x,y,grid)+dot(x,y,blue,5)+text(cx+(r+23)*Math.cos(a),cy-(r+23)*Math.sin(a)+5,`W^${k}`,15);}
    b+=text(320,450,"Increasing k proceeds clockwise for the forward DFT convention.",14);
    save("week04-roots-of-unity.svg","Eighth roots of unity","Eight equally spaced complex numbers on the unit circle using negative phase.",640,475,b);
  }
  {
    const N=32;let b=text(400,30,"Sinusoidal images and centered Fourier magnitude",20)+text(245,62,"Spatial raster",17)+text(570,62,"log(1 + |DFT|)",17);
    const cases=[[0,4,"Vertical stripes"],[4,0,"Horizontal stripes"],[3,3,"Diagonal stripes"]];
    cases.forEach(([u,v,label],i)=>{const y=85+i*180,a=Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=>.5+.5*Math.cos(2*Math.PI*(u*r+v*c)/N)));
      const spec=Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=>{const rr=r-N/2,cc=c-N/2;return rr===0&&cc===0?Math.log1p(N*N/2):((rr===u&&cc===v)||(rr===-u&&cc===-v))?Math.log1p(N*N/4):0;}));
      b+=text(20,y+73,label,15,"start")+raster(a,181,y,4)+raster(spec,506,y,4,0,Math.log1p(N*N/2));
      b+=line(506+64,y,506+64,y+128,"#475569",.5)+line(506,y+64,634,y+64,"#475569",.5);
      // Mark the exact non-DC bins with small rings.
      for(const s of [-1,1])b+=`<circle cx="${508+4*(16+s*v)}" cy="${y+2+4*(16+s*u)}" r="5" fill="none" stroke="#eab308" stroke-width="1.5"/>`;
      b+=text(245,y+151,`(u,v) = (${u},${v})`,14)+text(570,y+151,"DC and conjugate peaks",14);
    });save("week04-sinusoidal-spectra.svg","Sinusoids and Fourier spectra","Sampled cosine patterns and analytically exact DFT magnitudes; rings locate the non-DC peaks.",800,635,b);
  }
  {
    let b=text(360,30,"Radix-2 FFT butterfly",22);
    const arr=(x,y,u,v,c=ink)=>{const a=Math.atan2(v-y,u-x);return line(x,y,u,v,c,2)+path([[u-10*Math.cos(a-.45),v-10*Math.sin(a-.45)],[u,v],[u-10*Math.cos(a+.45),v-10*Math.sin(a+.45)]],c,2);};
    b+=text(85,105,"E[k]",21)+text(85,255,"O[k]",21)+dot(135,100,blue,5)+dot(135,250,teal,5);
    b+=arr(140,100,475,100,blue)+arr(140,100,475,250,blue)+arr(140,250,270,250,teal)+rect(270,225,108,50,"#e5f1eb",teal)+text(324,256,"× W^k",19);
    b+=arr(378,250,475,100,teal)+arr(378,250,475,250,teal);
    b+=`<circle cx="495" cy="100" r="19" fill="white" stroke="${ink}"/><circle cx="495" cy="250" r="19" fill="white" stroke="${ink}"/>`+text(495,107,"+",23)+text(495,257,"−",23)+arr(514,100,570,100)+arr(514,250,570,250)+text(580,105,"X[k]",19,"start")+text(580,255,"X[k+N/2]",19,"start");
    b+=text(360,323,"Top: E[k] + W^k O[k]     Bottom: E[k] − W^k O[k]",16);
    save("week04-fft-butterfly.svg","Radix-2 FFT butterfly","Two half-size DFT outputs combine through a twiddle factor, sum and difference.",740,350,b);
  }
  {
    const f=Array.from({length:5},(_,r)=>Array.from({length:5},(_,c)=>r*5+c+1)),h=[[1,2,1],[2,4,2],[1,2,1]],centers=[[2,2],[2,3]];
    let b=text(385,29,"Convolution as a moving weighted neighborhood",20);
    centers.forEach(([r,c],i)=>{const x=35+380*i,y=66,s=49;let sum=0;for(let a=0;a<5;a++)for(let d=0;d<5;d++){const inwin=Math.abs(a-r)<=1&&Math.abs(d-c)<=1;b+=rect(x+d*s,y+a*s,s,s,inwin?"#dbeafe":"#f1f5f9","white")+text(x+(d+.5)*s,y+a*s+30,f[a][d],15);if(inwin)sum+=f[a][d]*h[r-a+1][c-d+1]/16;}
      b+=`<rect x="${x+(c-1)*s}" y="${y+(r-1)*s}" width="${3*s}" height="${3*s}" fill="none" stroke="${blue}" stroke-width="2"/>`+dot(x+(c+.5)*s,y+(r+.5)*s,orange,4)+text(x+122,y+275,`Output at (${r},${c}) = ${sum}`,16);});
    b+=text(385,380,"Kernel weights: [1 2 1; 2 4 2; 1 2 1] / 16",17)+text(385,406,"Symmetric kernel: flipping does not change it. Indices are zero-based.",14);
    save("week04-convolution-neighborhood.svg","Moving convolution neighborhood","Two weighted neighborhoods on a numerical array with exact computed output values.",770,430,b);
  }
  {
    const N=31,mid=15;let b=text(420,29,"Three point spread functions",21);
    const cases=[["Uniform motion", (x,y)=>y===0&&Math.abs(x)<=7?1:0],["Disk defocus",(x,y)=>x*x+y*y<=64?1:0],["Gaussian, σ = 3",(x,y)=>Math.exp(-(x*x+y*y)/18)]];
    cases.forEach(([label,f],i)=>{const a=Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=>f(c-mid,r-mid)));b+=raster(a,38+i*280,65,7)+text(146+i*280,307,label,17);});
    b+=text(420,338,"Peak-normalized display; convolution kernels are normalized to unit sum.",14);
    save("week04-point-spread-functions.svg","Representative point spread functions","Generated horizontal line, disk and Gaussian kernels, displayed with peak normalization.",840,360,b);
  }
  {
    const p=plot(79,60,600,255,0,.5,0,1,[0,.1,.2,.3,.4,.5],[0,.25,.5,.75,1],"Spatial frequency (cycles/pixel)","Transfer magnitude");
    const L=8,gauss=v=>Math.exp(-2*Math.PI**2*2**2*v*v),motion=v=>v===0?1:Math.abs(Math.sin(Math.PI*L*v)/(L*Math.sin(Math.PI*v)));
    const disk=[];for(let r=-4;r<=4;r++)for(let c=-4;c<=4;c++)if(r*r+c*c<=16)disk.push(c);
    const d=v=>Math.abs(disk.reduce((s,c)=>s+Math.cos(2*Math.PI*c*v),0)/disk.length);
    let b=text(380,29,"Frequency responses along the horizontal axis",20)+p.b+p.curve(motion,blue)+p.curve(d,orange)+p.curve(gauss,teal);
    b+=legend(85,380,blue,"8-sample motion")+legend(295,380,orange,"Discrete disk R = 4")+legend(505,380,teal,"Ideal Gaussian σ = 2");
    b+=text(380,408,"Discrete box and disk versus continuous Gaussian approximation.",14);
    save("week04-psf-responses.svg","PSF transfer magnitudes","Exact discrete horizontal frequency response for motion and disk; ideal continuous Gaussian response.",760,430,b);
  }
  {
    const f=[1,2,3,4],h=[1,1],lin=[0,0,0,0,0];for(let i=0;i<f.length;i++)for(let j=0;j<h.length;j++)lin[i+j]+=f[i]*h[j];const circ=[0,0,0,0];lin.forEach((v,i)=>circ[i%4]+=v);
    let b=text(380,29,"Linear convolution versus circular wrap-around",21)+text(380,55,"f = (1, 2, 3, 4), h = (1, 1)",16);
    function bars(a,x,y,label){let s=text(x+150,y-14,label,17);for(let i=0;i<a.length;i++){const xx=x+15+i*58;s+=rect(xx,y+160-a[i]*20,36,a[i]*20,i===4?orange:blue)+text(xx+18,y+150-a[i]*20,a[i],15)+text(xx+18,y+181,i,13);}return s+line(x,y+160,x+300,y+160,gray);}
    b+=bars(lin,45,100,"Full linear output")+bars(circ,420,100,"Length-4 circular output")+path([[310,195],[365,195],[365,145],[435,145]],orange,2)+text(380,312,"The last value 4 wraps into index 0: 1 + 4 = 5.",16)+text(380,338,"Padding to length 5 avoids this aliasing.",15);
    save("week04-circular-convolution.svg","Linear and circular convolution","Calculated outputs of the lecture example, showing the tail wrapping to the first index.",760,360,b);
  }
  return out;
}
for (const figure of generatePart2a()) {
  writeFileSync(new URL("../media/" + figure.name, import.meta.url), figure.content, "utf8");
}
