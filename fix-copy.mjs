import{readFileSync,writeFileSync,existsSync,mkdirSync,copyFileSync,readdirSync,statSync}from"fs";
import{join}from"path";
import{execSync}from"child_process";

function cp(src,dst){
  mkdirSync(dst,{recursive:true});
  for(const f of readdirSync(src)){
    const sf=join(src,f),df=join(dst,f);
    if(statSync(sf).isDirectory())cp(sf,df);
    else copyFileSync(sf,df);
  }
}

const src="C:/Users/admin/Desktop/sonic-topography-master/dist";
const dst="C:/Users/admin/Desktop/Firefly/public/sonic-topography";
cp(src,dst);
console.log("Copied");

console.log("Building Firefly...");
execSync("pnpm astro build",{cwd:"C:/Users/admin/Desktop/Firefly",stdio:"inherit"});

console.log("=== Verification ===");
const distHtml=readFileSync(join(dst,"index.html"),"utf8");
console.log("Sonic HTML has ./assets:",distHtml.includes("./assets"));
const jsFiles=readdirSync(join(dst,"assets")).filter(f=>f.endsWith(".js"));
const big=jsFiles.sort((a,b)=>statSync(join(dst,"assets",b)).size-statSync(join(dst,"assets",a)).size)[0];
const js=readFileSync(join(dst,"assets",big),"utf8");
console.log("JS:",big);
console.log("Has meting.mikus:",js.includes("meting.mikus"));
console.log("Has _metingSongMap:",js.includes("_metingSongMap"));
console.log("Has engine.loadUrl override:",js.includes("loadUrl=function"));
console.log("Firefly dist:",existsSync("C:/Users/admin/Desktop/Firefly/dist/music-visualizer/index.html"));
console.log("DONE");