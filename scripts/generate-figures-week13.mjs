// Deterministic original illustrations for Week 13. Node.js 18+.
import { writeFileSync } from "node:fs";
function generateWeek13(){
  const out=[],ink="#172334",blue="#2563eb",teal="#16756a",orange="#b45309",gray="#64748b",purple="#7c3aed";
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const text=(x,y,s,z=16,a="middle",c=ink)=>`<text x="${x}" y="${y}" font-size="${z}" text-anchor="${a}" fill="${c}">${esc(s)}</text>`;
  const rect=(x,y,w,h,c,st="none",sw=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" stroke="${st}" stroke-width="${sw}"/>`;
  const line=(x,y,u,v,c=ink,w=1.5,d="")=>`<line x1="${x}" y1="${y}" x2="${u}" y2="${v}" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:""}/>`;
  const dot=(x,y,c=blue,r=5)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  const path=(d,c,w=2,dash="")=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:""}/>`;
  function save(name,title,desc,w,h,b){out.push({name,content:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>\n<rect width="${w}" height="${h}" fill="white"/><g font-family="Arial, sans-serif">\n${b}\n</g></svg>\n`});}
  {
    let b=text(420,28,"Conditional inpainting: remove before replacement",21);
    const N=10,s=16,mask=(r,c)=>r>=2&&r<=7&&c>=3&&c<=6,original=(r,c)=>mask(r,c)?((r+c)%3===0?"#b45309":"#e8b49a"):(r<5?"#c9ddeb":"#a2b6a5");
    const labels=["Original raster","Binary mask M","Masked input","Replacement output"];
    for(let k=0;k<4;k++){const x=25+k*210,y=60;for(let r=0;r<N;r++)for(let c=0;c<N;c++){const m=mask(r,c);let fill=original(r,c);if(k===1)fill=m?"#172334":"#f1f5f9";if(k===2&&m)fill="#f1f5f9";if(k===3&&m)fill=(r+2*c)%3===0?"#16756a":"#9dd4cb";b+=rect(x+c*s,y+r*s,s,s,fill,"#fff",.4);}b+=text(x+80,245,labels[k],16);}
    b+=text(420,283,"Outside pixels are unchanged. Masked source values do not enter the replacement branch.",14);
    save("week13-masked-inpainting.svg","Conditional inpainting schematic","Artificial raster showing the source, binary mask, removed region, and independently colored replacement.",840,305,b);
  }
  {
    let b=text(400,29,"Face coverage versus full-body coverage",21);
    function person(x,kind){let s=`<g transform="translate(${x} 60)">`;
      s+=rect(0,0,210,290,"#eef2f6")+`<circle cx="105" cy="45" r="26" fill="#d7aa88"/><path d="M77 82 L133 82 L157 150 L135 160 L126 123 L130 205 L80 205 L84 123 L75 160 L53 150 Z" fill="#42687c"/><path d="M91 205 L86 272 M119 205 L127 272" stroke="#263b4b" stroke-width="19"/><path d="M77 88 L131 139" stroke="#e9bb49" stroke-width="8"/>`;
      if(kind==="face")s+=`<rect x="74" y="13" width="62" height="67" fill="${teal}" fill-opacity=".22" stroke="${teal}" stroke-width="3"/>`;
      if(kind==="body")s+=`<rect x="43" y="7" width="124" height="276" fill="${teal}" fill-opacity=".22" stroke="${teal}" stroke-width="3"/>`;
      return s+"</g>";
    }
    [["Original schematic","none"],["Face region","face"],["Full-body region","body"]].forEach(([l,k],i)=>{b+=person(25+270*i,k)+text(130+270*i,380,l,16);});
    b+=text(400,414,"Illustrative coverage only; actual segmentation and contextual leakage require validation.",14);
    save("week13-mask-coverage.svg","Face and full-body coverage","Original schematic person with two illustrative protected regions.",800,435,b);
  }
  {
    let b=text(390,29,"Exact toy privacy–utility conflict",21);
    const x=95,y=65,w=600,h=250;
    for(let i=0;i<=4;i++){const a=i/4;b+=line(x+w*a,y,x+w*a,y+h,"#dbe3eb")+line(x,y+h*(1-a),x+w,y+h*(1-a),"#dbe3eb")+text(x+w*a,y+h+22,a,13)+text(x-10,y+h*(1-a)+5,a,13,"end");}
    b+=line(x,y,x,y+h)+line(x,y+h,x+w,y+h)+line(x,y+h,x+w,y,teal,3);
    for(let i=0;i<=4;i++)b+=dot(x+w*i/4,y+h*(1-i/4),teal,5);
    b+=text(395,366,"Utility: probability of retaining the protected bit",15)+`<text transform="translate(27 190) rotate(-90)" text-anchor="middle" font-size="15" fill="${ink}">Mutual information (bits)</text>`+text(390,397,"Fair binary attribute, independently erased with probability 1 − r; leakage = r bits.",14);
    save("week13-privacy-utility.svg","Toy privacy and utility trade-off","Exact diagonal relation for an erasure mechanism preserving a fair bit with probability r.",780,420,b);
  }
  {
    let b=text(410,28,"Frame-wise replacement versus persistent synthetic appearance",20);
    const colors=[blue,orange,purple,teal,"#b91c1c"];
    for(let row=0;row<2;row++){const y=72+row*165;b+=text(410,y-12,row?"Persistent appearance":"Independent appearances",17);for(let t=0;t<5;t++){const x=40+t*150,c=row?blue:colors[t],cx=x+42+t*8;b+=rect(x,y,130,105,"#f1f5f9","#cbd5e1")+dot(cx,y+30,c,12)+`<path d="M${cx-16} ${y+49} Q${cx} ${y+40} ${cx+16} ${y+49} L${cx+20} ${y+76} H${cx-20} Z" fill="${c}"/>`+text(x+65,y+126,`Frame ${t+1}`,14);}}
    b+=text(410,407,"Motion is retained in both rows; only the schematic replacement appearance changes.",14);
    save("week13-temporal-flicker.svg","Frame-wise and persistent synthesis","Five artificial frames in each row, comparing independent colors with a persistent synthetic color.",820,430,b);
  }
  {
    let b=text(420,28,"Tracking failure modes (synthetic trajectories)",21);
    const titles=["Missed detection","Fragmented track","Association switch"];
    for(let k=0;k<3;k++){const x=35+k*280,y=70;b+=rect(x,y,250,210,"#f8fafc","#cbd5e1")+text(x+125,y-12,titles[k],16);b+=line(x+20,y+185,x+230,y+185,gray)+line(x+20,y+185,x+20,y+15,gray);
      const pts=Array.from({length:6},(_,i)=>[x+35+35*i,y+150-20*i]);
      b+=path(pts.map(([a,c],i)=>(i?"L":"M")+a+" "+c).join(" "),gray,1.5,"5 4");
      if(k===0){pts.forEach(([a,c],i)=>{if(i!==3)b+=dot(a,c,blue);else b+=`<circle cx="${a}" cy="${c}" r="7" fill="none" stroke="${orange}" stroke-width="2"/>`;});}
      if(k===1){pts.forEach(([a,c],i)=>{if(i!==3)b+=dot(a,c,i<3?blue:teal);});}
      if(k===2){const other=pts.map(([a,c],i)=>[a,y+50+20*i]);b+=path(other.map(([a,c],i)=>(i?"L":"M")+a+" "+c).join(" "),gray,1.5,"5 4");pts.forEach(([a,c],i)=>{b+=dot(a,c,i<3?blue:teal);b+=dot(other[i][0],other[i][1],i<3?teal:blue);});}
      b+=text(x+125,y+233,"Time →",13);
    }
    b+=dot(140,334,blue)+text(152,339,"Track A",14,"start")+dot(325,334,teal)+text(337,339,"Track B / new track",14,"start")+dot(580,334,orange)+text(592,339,"Missing observation",14,"start");
    save("week13-tracking-failures.svg","Tracking failures","Three schematic time-position plots with missing detections, fragmented labels, and swapped associations.",840,365,b);
  }
  {
    const N=8,s=22,prev=Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=>r>=2&&r<=5&&c>=1&&c<=3?1:0)),cur=prev.map(row=>row.map((_,c)=>row[(c-1+N)%N])),warped=prev.map(row=>row.map((_,c)=>row[(c-1+N)%N]));
    const diff=(a,b)=>a.map((r,i)=>r.map((v,j)=>Math.abs(v-b[i][j]))),err=(a,b)=>diff(a,b).flat().reduce((q,v)=>q+v*v,0)/(N*N);
    const panels=[["Previous",prev],["Current",cur],["Unaligned difference",diff(cur,prev)],["Warped previous",warped],["Current",cur],["Compensated difference",diff(cur,warped)]];
    let b=text(420,28,"Motion compensation isolates appearance changes",21);
    panels.forEach(([l,a],i)=>{const x=55+(i%3)*280,y=58+Math.floor(i/3)*250;for(let r=0;r<N;r++)for(let c=0;c<N;c++)b+=rect(x+c*s,y+r*s,s,s,a[r][c]?(i%3===2?orange:teal):"#edf2f7","white",.6);b+=text(x+88,y+199,l,15);if(i%3===2)b+=text(x+88,y+220,`MSE = ${i<3?err(cur,prev):err(cur,warped)}`,14);});
    b+=text(420,555,"Exact one-pixel circular translation; full validity support.",14);
    save("week13-temporal-error.svg","Motion-compensated temporal error","Computed binary raster translation and differences before and after alignment.",840,580,b);
  }
  return out;
}
for (const figure of generateWeek13()) {
  writeFileSync(new URL("../media/" + figure.name, import.meta.url), figure.content, "utf8");
}
