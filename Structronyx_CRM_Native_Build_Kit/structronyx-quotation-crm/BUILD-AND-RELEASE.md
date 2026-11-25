# Structronyx CRM — native build/release

This repository is exclusively for Structronyx Renewables CRM. Do not configure it with Solar Yard credentials or repositories.

## Cloud activation required for shared employee records
Configure the dedicated Supabase project's `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as GitHub Actions repository variables before building. Apply `supabase/migrations/202611250001_structronyx_crm.sql`, create the admin and employee accounts, and disable public signup. Never put a Supabase service-role key in the app or GitHub variables used by frontend builds.

## Build artifacts
- Android: `.github/workflows/build-android.yml` creates a debug APK artifact (installable for testing; not a signed Play Store release).
- Windows: `.github/workflows/build-desktop.yml` creates a Windows NSIS installer `.exe`.
- Linux: `npm run desktop:linux` creates an AppImage on a Linux build machine.

After pushing this folder to a private GitHub repository, open Actions, run the two workflows, and download the corresponding artifact from the completed run. A production signed APK/installer requires owner-controlled signing certificates/keystore and secrets; do not commit those files.

## Local commands
`npm install`
`npm run build`
`npx cap add android` (once)
`npm run android:sync`
`npm run android:debug`
`npm run desktop:win` (Windows host)
