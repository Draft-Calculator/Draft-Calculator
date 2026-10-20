# Quick Draft Calculator – Play Store checklist

## 1. Host the app (HTTPS)
- Upload this folder to GitHub Pages (repo Draft-Calculator). Replace `YOURUSERNAME` in twa-manifest.json, store-listing.md.
- Open the URL in Android Chrome: "Install app" must appear.

## 2. Build the Android bundle (.aab) with billing ON
- Easiest: pwabuilder.com → enter URL → Android → tick **Google Play Billing** → Package name `com.markjun.quickdraft` → generate. Keep the keystore file + password safe (backup it twice).
- Or Bubblewrap: `npm i -g @bubblewrap/cli`, then `bubblewrap init --manifest=<manifest url>` and `bubblewrap build` (use twa-manifest.json, playBilling enabled).

## 3. Play Console – create app
- Name Quick Draft Calculator, App, **Free** (the app is free to download; the unlock is an in-app product).
- Declarations: Ads = No; Target audience 18+; Content rating questionnaire (utility, no violence etc → Everyone); News app = No; Government app = No; Financial features = None; Health = None.
- Data safety: collects no data, shares none, nothing encrypted-in-transit needed. (Payments are processed by Google Play.)
- Privacy policy URL: the hosted privacy.html.
- Store listing: copy store-listing.md; upload icon-512.png, feature graphic, the 6 phone screenshots.

## 4. Create the one-time product (monetise → In-app products)
- Product ID exactly **lifetime_unlock** (the app looks for this ID)
- Type: one-time, non-consumable. Name "Lifetime unlock". Price: PHP 200 (Play converts for other countries). Status Active.
- Set up a merchant/payments profile and a tax profile (Play requires it before paid items).

## 5. Digital Asset Links
- Play Console → Setup → App signing → copy the SHA-256 of the **app signing key**.
- Fill assetlinks.json.template, save it as `.well-known/assetlinks.json` on the same host (GitHub Pages: add a `.nojekyll` file in the root). Without it the app shows a browser bar and billing will not work.

## 6. Test before release
- Internal testing track → add your Gmail as tester and as licence tester (Setup → License testing). Test: install, trial text in menu, buy with a test card, reinstall → "Restore purchase".
- Closed testing: new personal developer accounts must run a closed test with at least 12 testers for 14 days before applying for production.
- Then release to production, target the Philippines first or all countries.

## How the licence works in the app
- First launch starts a 60-day free trial (stored on the device). Menu shows days left; a reminder shows in the last 7 days.
- After day 60 the app is locked behind an unlock screen (price shown from Google Play, ₱200). Users can still back up their data from that screen.
- Unlock is verified with Google Play on each start; a refund removes it. Reinstalling = "Restore purchase".
- Limit: the trial clock is local. Clearing app data or reinstalling restarts the 60 days. That cannot be prevented without your own server.
