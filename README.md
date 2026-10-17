# Publishing steps
1. Host this folder over HTTPS (GitHub Pages, Netlify, Cloudflare Pages). Open it on Android Chrome: it must be installable (offline works).
2. Go to pwabuilder.com, enter the URL, choose Android → Google Play, generate the signed .aab (keep the keystore safe).
3. Play Console ($25 one-time): create app, upload .aab, add privacy URL (privacy.html), data safety = none collected, screenshots (phone, 1080x1920) and the 1024x500 feature graphic, then submit.
4. Digital Asset Links: PWABuilder gives an assetlinks.json; host it at /.well-known/assetlinks.json so the address bar is hidden.
iOS needs a Mac and Apple Developer account ($99/yr); the hosted page can also be added to the home screen via Safari.
