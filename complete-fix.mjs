import{readFileSync,writeFileSync,existsSync,mkdirSync,copyFileSync,readdirSync,statSync}from"fs";
import{join}from"path";
import{execSync}from"child_process";

const P = "C:/Users/admin/Desktop/sonic-topography-master/src/components/UI/UI.tsx";
let f = readFileSync(P,"utf8");
console.log("UI.tsx lines:",f.split("\n").length);

// ═══ Step 1: Patch loadNeteaseSong — add direct URL check ═══
// Find the function definition
let found = false;
const patterns = [
  "const loadNeteaseSong =",
  "const loadNeteaseSong=",
  "function loadNeteaseSong(",
  "async function loadNeteaseSong(",
];

for (const pattern of patterns) {
  const idx = f.indexOf(pattern);
  if (idx >= 0) {
    // Find the opening brace
    const brace = f.indexOf("{", idx);
    if (brace > 0 && brace < idx + 100) {
      const patch = `
    // ── Firefly: direct Meting URL ──
    if (song.url) {
      engine.init();
      engine.loadUrl(song.url);
      if (song.lrcUrl) {
        fetch(song.lrcUrl).then(r=>r.text()).then(t=>setLyricsText(t)).catch(()=>{});
      }
      setCurrentSongId(songIdentity(song));
      setCurrentSong(song);
      return;
    }
`;
      f = f.substring(0, brace + 1) + patch + f.substring(brace + 1);
      console.log("loadNeteaseSong patched at", idx);
      found = true;
      break;
    }
  }
}

if (!found) {
  console.log("loadNeteaseSong NOT found by name. Checking alternatives...");
  // Try to find by "song" parameter patterns
  for (let i = 0; i < 3; i++) {
    const pat = [
      "async (song,", "async(song,", "const loadSong", "loadSong =",
      "= async (song", "= async(song"
    ];
    for (const p of pat) {
      const idx = f.indexOf(p);
      if (idx > 0) {
        console.log("Found",p,"at",idx,":",f.substring(idx-20,idx+80));
      }
    }
    if (i === 0) { /* only one pass */ break; }
  }
}

// ═══ Step 2: Also patch playFromQueue ═══
const pqPatterns = ["const playFromQueue", "function playFromQueue"];
for (const pattern of pqPatterns) {
  const idx = f.indexOf(pattern);
  if (idx >= 0) {
    const brace = f.indexOf("{", idx);
    if (brace > 0 && brace < idx + 80) {
      const patch = `
    // ── Firefly: Meting URL shortcut for prev/next ──
    var q = getCurrentQueue();
    var i = q.findIndex(s=>s.id===currentSongId) + 1;
    var s = q[i];
    if (s && s.url) {
      engine.init();
      engine.loadUrl(s.url);
      if (s.lrcUrl) fetch(s.lrcUrl).then(r=>r.text()).then(t=>setLyricsText(t)).catch(()=>{});
      setCurrentSongId(songIdentity(s));
      setCurrentSong(s);
      return;
    }
`;
      f = f.substring(0, brace + 1) + patch + f.substring(brace + 1);
      console.log("playFromQueue patched at", idx);
      break;
    }
  }
}

// ═══ Step 3: Ensure song.url/lrcUrl in mapping ═══
// Verify the mapping already exists
if (!f.includes("url: s.url")) {
  const oldMap = "artist: s.author,";
  const idx = f.indexOf(oldMap);
  if (idx > 0) {
    const lineEnd = f.indexOf("\n", idx);
    f = f.substring(0, lineEnd) + ",\n          url: s.url,\n          lrcUrl: s.lrc || ''\n" + f.substring(lineEnd);
    console.log("URL fields added to song mapping");
  }
}

// ═══ Step 4: Verify base:'./' in vite config ═══
const VP = "C:/Users/admin/Desktop/sonic-topography-master/vite.config.ts";
let vf = readFileSync(VP,"utf8");
if (!vf.includes("base: './'") && !vf.includes("base:'./'")) {
  const marker = "plugins: [";
  const idx = vf.indexOf(marker);
  if (idx > 0) {
    vf = vf.substring(0, idx) + "base: './',\n  " + vf.substring(idx);
    writeFileSync(VP, vf, "utf8");
    console.log("base:'./' added to vite config");
  }
}

writeFileSync(P, f, "utf8");
console.log("UI.tsx written. Lines:", f.split("\n").length);
console.log("Has loadNeteaseSong url check:", f.includes("if (song.url) {"));

// ═══ Step 5: Build sonic-topography ═══
console.log("\n=== Building sonic-topography ===");
execSync("npm run build", {cwd: "C:/Users/admin/Desktop/sonic-topography-master", stdio: "inherit"});

// ═══ Step 6: Copy to Firefly ═══
console.log("\n=== Copying ===");
function cp(src, dst) {
  mkdirSync(dst, {recursive: true});
  for (const ff of readdirSync(src)) {
    const sf = join(src, ff), df = join(dst, ff);
    if (statSync(sf).isDirectory()) cp(sf, df);
    else copyFileSync(sf, df);
  }
}
cp("C:/Users/admin/Desktop/sonic-topography-master/dist",
   "C:/Users/admin/Desktop/Firefly/public/sonic-topography");
console.log("Copied");

// ═══ Step 7: Build Firefly ═══
console.log("\n=== Building Firefly ===");
execSync("pnpm astro build", {cwd: "C:/Users/admin/Desktop/Firefly", stdio: "inherit"});

// ═══ Step 8: Verify ═══
const sonicHtml = readFileSync("C:/Users/admin/Desktop/Firefly/public/sonic-topography/index.html", "utf8");
const hasRelativeAssets = sonicHtml.includes("./assets");
console.log("\n=== VERIFICATION ===");
console.log("Sonic HTML ./assets:", hasRelativeAssets);

const assetsDir = "C:/Users/admin/Desktop/Firefly/public/sonic-topography/assets";
const jsFiles = readdirSync(assetsDir).filter(f => f.endsWith(".js"));
const bigJS = jsFiles.sort((a,b) => statSync(join(assetsDir,b)).size - statSync(join(assetsDir,a)).size)[0];
const jsContent = readFileSync(join(assetsDir, bigJS), "utf8");
console.log("JS:", bigJS);
console.log("Has meting.mikus:", jsContent.includes("meting.mikus"));
console.log("Has if(song.url):", jsContent.includes("song.url"));
console.log("Has lrcUrl:", jsContent.includes("lrcUrl"));

const fireflyDist = "C:/Users/admin/Desktop/Firefly/dist/music-visualizer/index.html";
console.log("Firefly dist exists:", existsSync(fireflyDist));
console.log("\n=== ALL DONE ===");