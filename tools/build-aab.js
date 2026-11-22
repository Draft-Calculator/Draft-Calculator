/* Build a signed Android App Bundle (.aab) from twa-manifest.json with Bubblewrap core.
   Env: JAVA_HOME, ANDROID_HOME, KEYSTORE_PATH, KEYSTORE_PASSWORD, KEY_ALIAS, KEY_PASSWORD,
        VERSION_CODE, VERSION_NAME.  Output: build/app-release-signed.aab */
const fs=require("fs"),path=require("path");
const {TwaManifest,TwaGenerator,Config,JdkHelper,AndroidSdkTools,GradleWrapper,JarSigner,ConsoleLog}=require("@bubblewrap/core");
(async()=>{
 const e=process.env,need=["JAVA_HOME","ANDROID_HOME","KEYSTORE_PATH","KEYSTORE_PASSWORD","KEY_ALIAS","VERSION_CODE","VERSION_NAME"];
 for(const k of need)if(!e[k]){console.error("Missing env "+k);process.exit(1)}
 const log=new ConsoleLog("build-aab"),raw=JSON.parse(fs.readFileSync("twa-manifest.json","utf8"));
 raw.appVersionCode=parseInt(e.VERSION_CODE,10);raw.appVersion=e.VERSION_NAME;
 raw.signingKey={path:path.resolve(e.KEYSTORE_PATH),alias:e.KEY_ALIAS};
 const manifest=new TwaManifest(raw),err=manifest.validate();if(err)throw new Error("Invalid twa-manifest.json: "+err);
 const dir=path.resolve("build/android");fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
 await new TwaGenerator().createTwaProject(dir,manifest,log);
 const cfg=new Config(e.JAVA_HOME,e.ANDROID_HOME),jdk=new JdkHelper(process,cfg),sdk=new AndroidSdkTools(process,cfg,jdk,log);
 await new GradleWrapper(process,sdk,dir).bundleRelease();
 const src=path.join(dir,"app/build/outputs/bundle/release/app-release.aab"),out=path.resolve("build/app-release-signed.aab");
 if(!fs.existsSync(src))throw new Error("Gradle did not produce "+src);
 await new JarSigner(jdk).sign(manifest.signingKey,e.KEYSTORE_PASSWORD,e.KEY_PASSWORD||e.KEYSTORE_PASSWORD,src,out);
 console.log("Signed bundle: "+out+" (versionCode "+e.VERSION_CODE+")");
})().catch(x=>{console.error(x);process.exit(1)});
