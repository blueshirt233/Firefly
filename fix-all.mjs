import{readFileSync,writeFileSync}from"fs";
import{execSync}from"child_process";

const uiPath="C:/Users/admin/Desktop/sonic-topography-master/src/components/UI/UI.tsx";
let f=readFileSync(uiPath,"utf8");
console.log("Lines:",f.split("\n").length);

// ── Check if fix is already applied ──
if(f.includes("engine.loadUrl = function")&&f.includes("_metingSongMap['meting-")){
  console.log("Fix already applied, skipping...");
} else {
  // ── 1. Override engine.loadUrl after engine.init() ──
  const marker="engine.init();";
  let idx=f.indexOf(marker);
  if(idx>0){
    const override=`
        // ── Firefly: Meting URL bridge ──
        (function(){
          var orig = engine.loadUrl.bind(engine);
          engine.loadUrl = function(url) {
            if (url && _metingSongMap[url]) {
              var r = _metingSongMap[url];
              orig(r.url);
              if (r.lrcUrl) fetch(r.lrcUrl).then(function(g){return g.text()}).then(function(t){setLyricsText(t)}).catch(function(){});
              return;
            }
            orig(url);
          };
        })();`;
    f=f.substring(0,idx+marker.length)+override+f.substring(idx+marker.length);
    console.log("engine.loadUrl overridden");
  }

  // ── 2. Expand _metingSongMap population ──
  const popOld="songs.forEach(function(s){ _metingSongMap[s.id] = { url: s.url, lrcUrl: s.lrcUrl }; });";
  const popNew="songs.forEach(function(s){ _metingSongMap[s.id] = { url: s.url, lrcUrl: s.lrcUrl }; });\n        data.forEach(function(s,i){ _metingSongMap['meting-'+i] = { url: s.url, lrcUrl: s.lrc || '' }; });";
  if(f.includes(popOld)){ f=f.replace(popOld,popNew); console.log("Map population expanded"); }

  writeFileSync(uiPath,f,"utf8");
  console.log("Written. Lines:",f.split("\n").length);
  console.log("Has override:",f.includes("engine.loadUrl = function"));
  console.log("Has meting key:",f.includes("_metingSongMap['meting-"));
}

// ── 3. Add base:'./' if missing ──
const vp="C:/Users/admin/Desktop/sonic-topography-master/vite.config.ts";
let vf=readFileSync(vp,"utf8");
if(!vf.includes("base:")){
  const m="plugins: ["; const i=vf.indexOf(m);
  if(i>0){vf=vf.substring(0,i)+"base: './',\n  "+vf.substring(i);writeFileSync(vp,vf);console.log("base added");}
}

// ── 4. Rebuild sonic-topography ──
console.log("\n=== Building sonic-topography ===");
execSync("npm run build",{cwd:"C:/Users/admin/Desktop/sonic-topography-master",stdio:"inherit"});

// ── 5. Copy to Firefly ──
console.log("\n=== Copying to Firefly ===");
const DST="C:/Users/admin/Desktop/Firefly/public/sonic-topography";
execSync(`cmd /c "xcopy /E /Y dist\\* ${DST}\\"`,{cwd:"C:/Users/admin/Desktop/sonic-topography-master",stdio:"inherit"});

// ── 6. Build Firefly ──
console.log("\n=== Building Firefly ===");
execSync("pnpm astro build",{cwd:"C:/Users/admin/Desktop/Firefly",stdio:"inherit"});

// ── 7. Verify ──
const distJs=readFileSync("C:/Users/admin/Desktop/Firefly/public/sonic-topography/index.html","utf8");
console.log("\n=== Verification ===");
console.log("Sonic HTML has ./assets:",distJs.includes("./assets"));
const jsFiles=require("fs").readdirSync(DST+"/assets").filter(x=>x.endsWith(".js"));
const bigJS=jsFiles.sort((a,b)=>require("fs").statSync(DST+"/assets/"+b).size-require("fs").statSync(DST+"/assets/"+a).size)[0];
const jsContent=readFileSync(DST+"/assets/"+bigJS,"utf8");
console.log("JS has meting.mikus:",jsContent.includes("meting.mikus"));
console.log("JS has _metingSongMap:",jsContent.includes("_metingSongMap"));
console.log("Firefly dist exists:",require("fs").existsSync("C:/Users/admin/Desktop/Firefly/dist/music-visualizer/index.html"));
console.log("\n=== ALL DONE ===");