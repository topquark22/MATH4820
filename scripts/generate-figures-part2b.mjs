// Deterministic vector illustrations for Weeks 5–7. Run with Node.js 18+.
import { writeFileSync } from "node:fs";
function generatePart2b(){
  const out=[],ink="#172334",blue="#2563eb",teal="#16756a",orange="#b45309",gray="#64748b",grid="#dbe3eb",purple="#7c3aed";
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const n=x=>+x.toFixed(3),seq=(a,b,k)=>Array.from({length:k},(_,i)=>a+(b-a)*i/(k-1));
  const text=(x,y,s,z=16,a="middle",c=ink)=>`<text x="${n(x)}" y="${n(y)}" font-size="${z}" text-anchor="${a}" fill="${c}">${esc(s)}</text>`;
  const line=(x,y,u,v,c=ink,w=1.5,d="")=>`<line x1="${n(x)}" y1="${n(y)}" x2="${n(u)}" y2="${n(v)}" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  const rect=(x,y,w,h,c,st="none")=>`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${c}" stroke="${st}"/>`;
  const path=(pts,c=blue,w=2.3)=>`<path d="${pts.map(([x,y],i)=>(i?"L":"M")+n(x)+" "+n(y)).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const legend=(x,y,c,s)=>line(x,y-5,x+24,y-5,c,3)+text(x+31,y,s,14,"start");
  function save(name,title,desc,w,h,b){out.push({name,content:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>\n<rect width="${w}" height="${h}" fill="white"/><g font-family="Arial, sans-serif">\n${b}\n</g></svg>\n`});}
  function plot(x,y,w,h,x0,x1,y0,y1,xt,yt,xlabel,ylabel,xf=v=>v,yf=v=>v){
    const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h*(y1-v)/(y1-y0);let b="";
    for(const v of xt)b+=line(X(v),y,X(v),y+h,grid)+text(X(v),y+h+21,xf(v),13);
    for(const v of yt)b+=line(x,Y(v),x+w,Y(v),grid)+text(x-9,Y(v)+4,yf(v),13,"end");
    b+=line(x,y,x,y+h)+line(x,y+h,x+w,y+h)+text(x+w/2,y+h+45,xlabel,15)+`<text transform="translate(${x-56} ${y+h/2}) rotate(-90)" text-anchor="middle" font-size="15" fill="${ink}">${esc(ylabel)}</text>`;
    return {X,Y,b,curve:(f,c,a=x0,z=x1)=>path(seq(a,z,501).map(v=>[X(v),Y(f(v))]),c)};
  }
  function raster(a,x,y,sz,lo=0,hi=1){const groups={};for(let r=0;r<a.length;r++)for(let c=0;c<a[r].length;c++){const g=Math.round(255*Math.min(1,Math.max(0,(a[r][c]-lo)/(hi-lo))));(groups[g]??=[]).push(`M${n(x+c*sz)} ${n(y+r*sz)}h${sz}v${sz}h-${sz}z`);}return Object.entries(groups).map(([g,d])=>`<path d="${d.join("")}" fill="rgb(${g},${g},${g})"/>`).join("");}
  function rng(seed){let s=seed>>>0;return ()=>{s=(Math.imul(1664525,s)+1013904223)>>>0;return (s+.5)/4294967296;};}
  function dft1(a,inv=false){const N=a.length,s=inv?1:-1;return Array.from({length:N},(_,k)=>{let re=0,im=0;for(let j=0;j<N;j++){const t=s*2*Math.PI*k*j/N,c=Math.cos(t),d=Math.sin(t);re+=a[j][0]*c-a[j][1]*d;im+=a[j][0]*d+a[j][1]*c;}return inv?[re/N,im/N]:[re,im];});}
  function dft2(a,inv=false){const N=a.length,b=a.map(r=>dft1(r,inv)),c=Array.from({length:N},()=>Array(N));for(let j=0;j<N;j++){const col=dft1(b.map(r=>r[j]),inv);for(let i=0;i<N;i++)c[i][j]=col[i];}return c;}
  const complex=a=>a.map(r=>r.map(v=>[v,0]));
  const real=a=>a.map(r=>r.map(z=>z[0]));
  const map2=(a,f)=>a.map((r,i)=>r.map((v,j)=>f(v,i,j)));
  function target(N){return Array.from({length:N},(_,i)=>Array.from({length:N},(_,j)=>{const x=j/N,y=i/N;return .12+(.18<x&&x<.31&&.16<y&&y<.84?.75:0)+(.31<=x&&x<.76&&(.16<y&&y<.29||.44<y&&y<.57)?.75:0)+(.62<x&&x<.79&&.57<y&&y<.84?.45:0);}));}
  const mse=(a,b)=>a.reduce((s,r,i)=>s+r.reduce((t,v,j)=>t+(v-b[i][j])**2,0),0)/(a.length*a[0].length);
  {
    const p=plot(86,60,610,250,0,.5,-56,0,[0,.1,.2,.3,.4,.5],[-56,-42,-28,-14,0],"Spatial frequency (cycles/pixel)","log₁₀ |H|");
    let b=text(390,29,"Gaussian attenuation (logarithmic magnitude)",21)+p.b;
    for(const [s,c] of [[1,blue],[2,teal],[3,orange],[5,purple]])b+=p.curve(v=>-2*Math.PI**2*s*s*v*v/Math.LN10,c);
    b+=legend(105,380,blue,"σ = 1")+legend(260,380,teal,"σ = 2")+legend(415,380,orange,"σ = 3")+legend(570,380,purple,"σ = 5");
    b+=text(390,405,"Ideal continuous Gaussian, evaluated to the one-dimensional Nyquist frequency.",14);
    save("week05-gaussian-attenuation.svg","Gaussian attenuation","Logarithmic transfer magnitude for ideal Gaussians of four standard deviations.",780,430,b);
  }
  {
    const p=plot(86,60,610,250,0,.5,0,56,[0,.1,.2,.3,.4,.5],[0,14,28,42,56],"Spatial frequency (cycles/pixel)","log₁₀ inverse gain");
    let b=text(390,29,"Exponential growth of naive inverse gain",21)+p.b;for(const [s,c] of [[1,blue],[2,teal],[3,orange],[5,purple]])b+=p.curve(v=>2*Math.PI**2*s*s*v*v/Math.LN10,c);
    b+=legend(105,380,blue,"σ = 1")+legend(260,380,teal,"σ = 2")+legend(415,380,orange,"σ = 3")+legend(570,380,purple,"σ = 5");
    b+=text(390,405,"Ideal continuous model: σ = 2 at 0.5 cycles/pixel gives gain ≈ 3.7 × 10⁸.",14);
    save("week05-inverse-gain.svg","Naive inverse gain","Logarithmic reciprocal Gaussian transfer magnitude for four blur strengths.",780,430,b);
  }
  {
    const N=32,f=target(N),F=dft2(complex(f)),nu=k=>Math.min(k,N-k)/N;
    const H=(i,j)=>Math.exp(-2*Math.PI**2*.9**2*(nu(i)**2+nu(j)**2));
    const clean=real(dft2(map2(F,(z,i,j)=>z.map(v=>v*H(i,j))),true));
    const random=rng(4820),noise=()=>.012*Math.sqrt(-2*Math.log(random()))*Math.cos(2*Math.PI*random());
    const b=map2(clean,v=>v+noise()),B=dft2(complex(b));
    const inv=real(dft2(map2(B,(z,i,j)=>z.map(v=>v/H(i,j))),true));
    const reg=real(dft2(map2(B,(z,i,j)=>{const h=H(i,j);return z.map(v=>v*h/(h*h+.005));}),true));
    let s=text(440,28,"Synthetic circular blur, noise, and inversion",21)+text(440,50,"32 × 32 raster; ideal Gaussian transfer σ = 0.9; seeded Gaussian noise SD = 0.012",14);
    const panels=[["Original",f],["Blur + noise",b],["Naive inverse",inv],["Tikhonov (λ = 0.005)",reg]];
    panels.forEach(([label,a],i)=>{const x=18+i*220,y=75;s+=raster(a,x,y,6)+text(x+96,288,label,16);const flat=a.flat();s+=text(x+96,311,`Range ${Math.min(...flat).toFixed(2)} to ${Math.max(...flat).toFixed(2)}`,12)+text(x+96,332,`MSE ${mse(a,f).toExponential(2)}`,13);});
    s+=text(440,362,"Identical display range [0,1]; MSE and range computed before display clipping.",14);
    save("week05-inverse-artifacts.svg","Synthetic inverse filtering experiment","Computed original, blurred noisy observation, naive inverse, and regularized inverse, with unclipped metrics.",880,385,s);
  }
  {
    const p=plot(80,60,610,255,0,1,0,20,[0,.2,.4,.6,.8,1],[0,5,10,15,20],"Transfer magnitude |H|","Magnitude of inverse gain");
    let b=text(390,29,"Naive and stabilized frequency-domain gains",21)+p.b+p.curve(h=>1/h,orange,.05,1)+p.curve(h=>h/(h*h+.01),teal)+p.curve(h=>h/(h*h+.0025),blue);
    b+=legend(80,380,orange,"Naive (h ≥ 0.05)")+legend(320,380,teal,"Tikhonov λ = 0.01")+legend(560,380,blue,"Wiener K = 0.0025");
    b+=text(390,410,"Identity penalty and constant spectral ratio have the same form when λ = K.",14);
    save("week06-regularization-gains.svg","Filter gain comparison","Calculated naive, Tikhonov and constant-ratio Wiener inverse gains.",820,435,b);
  }
  {
    const p=plot(80,60,600,250,-4,0,0,1.05,[-4,-3,-2,-1,0],[0,.25,.5,.75,1],"Regularization λ (log scale)","Expected squared error",x=>`10^${x}`);
    const h=.1,s2=.01,truth=1,g=l=>h/(h*h+l),bias=l=>(g(l)*h-1)**2*truth**2,variance=l=>g(l)**2*s2;
    let b=text(380,29,"Scalar regularization: squared bias and variance",20)+p.b+p.curve(x=>bias(10**x),blue)+p.curve(x=>variance(10**x),orange)+p.curve(x=>bias(10**x)+variance(10**x),teal);
    b+=line(p.X(-2),60,p.X(-2),310,gray,1.5,"5 4")+text(p.X(-2)+8,82,"λ = 0.01",13,"start");
    b+=legend(95,380,blue,"Squared bias")+legend(305,380,orange,"Variance")+legend(485,380,teal,"Total expected MSE")+text(380,407,"Illustrative scalar case: h = 0.1, true value = 1, noise variance = 0.01.",14);
    save("week06-bias-variance.svg","Bias-variance trade-off","Exact scalar Tikhonov squared bias, variance, and total expected squared error.",780,430,b);
  }
  {
    const N=64,f=Array.from({length:N},(_,i)=>4+(i>=13&&i<25?28:0)+(i>=38&&i<44?18:0)),h=[1,4,6,4,1].map(v=>v/16);
    const conv=a=>a.map((_,i)=>h.reduce((s,w,k)=>s+w*a[(i+k-2+N)%N],0));const mu=conv(f),random=rng(62026);
    const poisson=l=>{let p=1,k=0,L=Math.exp(-l);do{k++;p*=random();}while(p>L);return k-1;};
    const obs=mu.map(poisson);let est=Array(N).fill(obs.reduce((s,v)=>s+v,0)/N);const series=[],snap={};
    const metrics=(a,k)=>{const pred=conv(a),err=a.reduce((s,v,i)=>s+(v-f[i])**2,0)/N,dev=2*pred.reduce((s,v,i)=>s+v-obs[i]+(obs[i]===0?0:obs[i]*Math.log(obs[i]/v)),0)/N;series.push([k,err,dev]);};
    metrics(est,0);
    for(let k=1;k<=150;k++){const pred=conv(est);const corr=conv(obs.map((v,i)=>v/Math.max(pred[i],1e-12)));est=est.map((v,i)=>v*corr[i]);metrics(est,k);if([5,25,150].includes(k))snap[k]=est.slice();}
    let b=text(425,29,"Richardson–Lucy: fitting counts versus recovering the reference",20)+text(425,50,"64-sample circular signal, symmetric unit-sum PSF, seeded Poisson counts",14);
    const p=plot(85,80,690,210,0,63,0,Math.ceil(Math.max(...f,...obs,...snap[150])/10)*10,[0,16,32,48,63],[0,20,40,60,80].filter(v=>v<=Math.ceil(Math.max(...f,...obs,...snap[150])/10)*10),"Sample index","Estimated counts");
    b+=p.b+path(f.map((v,i)=>[p.X(i),p.Y(v)]),gray,2)+path(snap[5].map((v,i)=>[p.X(i),p.Y(v)]),teal)+path(snap[150].map((v,i)=>[p.X(i),p.Y(v)]),orange);
    b+=legend(95,355,gray,"Reference")+legend(300,355,teal,"Iteration 5")+legend(505,355,orange,"Iteration 150");
    const max=Math.ceil(Math.max(...series.map(x=>x[1]))/20)*20,devmax=Math.ceil(Math.max(...series.map(x=>x[2]))),q=plot(85,405,300,160,0,150,0,max,[0,50,100,150],[0,max/2,max],"Iteration","Reference MSE");
    const r=plot(475,405,300,160,0,150,0,devmax,[0,50,100,150],[0,devmax/2,devmax],"Iteration","Poisson deviance / sample");
    b+=q.b+r.b+path(series.map(([k,e])=>[q.X(k),q.Y(e)]),blue)+path(series.map(([k,e,d])=>[r.X(k),r.Y(d)]),teal);
    const best=series.reduce((a,c)=>c[1]<a[1]?c:a,series[0]);
    b+=text(425,635,`This realization: lowest reference MSE at iteration ${best[0]}; reference-based stopping is an oracle.`,14);
    save("week06-richardson-lucy.svg","Richardson-Lucy iteration experiment","Actual seeded Poisson experiment showing estimated signals, reference MSE, and data deviance.",850,655,b);
  }
  {
    const N=32,f=target(N),rotate=a=>Array.from({length:N},(_,i)=>Array.from({length:N},(_,j)=>a[N-1-j][i])),undo=a=>Array.from({length:N},(_,i)=>Array.from({length:N},(_,j)=>a[j][N-1-i]));
    const kernel=[.2,.6,.2],H=k=>kernel[1]+2*kernel[0]*Math.cos(2*Math.PI*k/N);
    const warp=rotate(f),blur=real(dft2(map2(dft2(complex(warp)),(z,i,j)=>z.map(v=>v*H(j))),true));
    const random=rng(72026),obs=map2(blur,v=>v+.015*Math.sqrt(-2*Math.log(random()))*Math.cos(2*Math.PI*random()));
    const inv=a=>real(dft2(map2(dft2(complex(a)),(z,i,j)=>z.map(v=>v*H(j)/(H(j)**2+.01))),true));
    const good=undo(inv(obs)),bad=inv(undo(obs));
    let b=text(420,28,"Composite degradation and restoration order",20)+text(420,49,"90° pixel permutation, horizontal circular blur, seeded additive noise",14);
    const panels=[["Original",f],["Warp",warp],["Blur + noise",obs],["Deconvolve, then unwarp",good],["Unwarp, then same filter",bad]];
    panels.forEach(([label,a],i)=>{const x=i<3?47+i*280:187+(i-3)*280,y=i<3?74:335;b+=raster(a,x,y,5.6)+text(x+89.6,y+198,label,15);if(i>=3)b+=text(x+89.6,y+221,`Reference MSE ${mse(a,f).toExponential(3)}`,14);});
    b+=text(420,590,"Both inversions use the same horizontal Tikhonov filter and λ = 0.01.",14)+text(420,612,"The incorrect order changes the effective blur direction. Display range [0,1].",14);
    save("week07-composite-reconstruction.svg","Alternative reconstruction sequences","Actual generated raster experiment with a rotation and anisotropic blur; compares two inversion sequences.",840,635,b);
  }
  return out;
}
for (const figure of generatePart2b()) {
  writeFileSync(new URL("../media/" + figure.name, import.meta.url), figure.content, "utf8");
}
