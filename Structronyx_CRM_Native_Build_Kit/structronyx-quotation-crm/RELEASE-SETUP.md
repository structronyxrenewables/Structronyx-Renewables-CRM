# One-command release (Windows + Android)

This workflow builds a Windows NSIS installer and an Android debug APK for Structronyx Renewables CRM only.

## One-time setup
1. In Supabase, apply the migration at `supabase/migrations/202611250001_structronyx_crm.sql` in the project's SQL Editor.
2. In GitHub, open **Settings → Secrets and variables → Actions → Variables** and add:
   - `VITE_SUPABASE_URL` = your Structronyx Supabase Project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = the project's public publishable/anon key (safe for client app; never use service_role)
3. Install GitHub CLI (`gh`) and sign in once with `gh auth login`. Ensure your account can run Actions workflows.

## Release
From this app folder, run:

```sh
npm install
npm run release
```

The command starts the GitHub Actions workflow. When it finishes, open the repository's **Actions → Build Structronyx CRM release** run and download:
- `Structronyx-CRM-Windows-Installer` (EXE)
- `Structronyx-CRM-Android-APK` (debug APK for testing)

These are test builds. A Play Store-ready APK/AAB or signed production installer requires owner-controlled signing credentials and a separate signing setup. Do not commit signing keys or service-role keys.
