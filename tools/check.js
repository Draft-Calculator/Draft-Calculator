// Basic safety checks run on every pull request.
const fs=require('fs'),vm=require('vm');
let bad=0;const fail=m=>{console.error('FAIL: '+m);bad++};
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
if(!scripts.length)fail('no inline scripts found');
scripts.forEach((s,i)=>{try{new vm.Script(s)}catch(e){fail('script '+i+' syntax: '+e.message)}});
for(const f of ['manifest.webmanifest','twa-manifest.json']){try{JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){fail(f+' is not valid JSON')}}
for(const id of ['licWall','licBuy','groups','ds','qd','vp'])if(!html.includes('id="'+id+'"'))fail('missing element id '+id);
if(!/const C="qdc-v\d+"/.test(fs.readFileSync('sw.js','utf8')))fail('sw.js cache name missing');
console.log(bad?bad+' problem(s)':'All checks passed ('+scripts.length+' scripts)');process.exit(bad?1:0);
