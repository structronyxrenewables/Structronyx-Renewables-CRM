# Structronyx Renewables Quotation CRM — cloud integration starter

This project is exclusively for Structronyx Renewables. It is not connected to Solar Yard CRM, its database, accounts, or deployment.

## What's implemented in this version
- Existing quotation builder and corrected five-page PDF output retained.
- Supabase email/password authentication gate when cloud environment variables are configured.
- Supabase cloud quotation read/insert, realtime refresh across logged-in clients, and server-generated unique quotation numbers.
- Structronyx-specific PostgreSQL migration with employee profiles, admin/employee roles, active-account flag, quotation table, indexes, and row-level security policies.
- Local browser preview remains available when cloud configuration is absent; it is not multi-user and should only use test data.

## Activate cloud login (requires project owner action)
1. Create a **new Supabase project for Structronyx Renewables only** at https://supabase.com/dashboard. Do not reuse Solar Yard's project.
2. In Supabase SQL Editor, run `supabase/migrations/202611250001_structronyx_crm.sql`.
3. In Authentication > Providers, enable Email. Keep public sign-ups disabled for a private employee CRM.
4. Create the first administrator user in Authentication > Users. Then in SQL Editor set their role:
   ```sql
   update public.employee_profiles
   set role = 'admin', full_name = 'Structronyx Administrator'
   where user_id = (select id from auth.users where email = 'admin@your-company-domain.com');
   ```
   Replace the email with the actual admin email. Do not share a common employee password. Create/invite individual users.
5. Copy the project's Project URL and publishable/anon key into `.env` based on `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
   ```
   These values are intended for the browser. **Never** put a service-role/secret key in `VITE_` variables or frontend code.
6. Install and run:
   ```bash
   npm install
   npm run dev
   ```
7. Deploy the built `dist/` directory to a hosting project dedicated to Structronyx Renewables. Configure the same two environment variables in that hosting project's environment settings, then rebuild/redeploy.

## Employee administration
- Add employees through Supabase Authentication (invite/create user); the database trigger creates an employee profile by default.
- Promote the designated administrator by setting `employee_profiles.role='admin'` for their user id.
- Set `active=false` to disable CRM data access for a departing employee. Also disable/delete their Auth account.
- RLS policies protect all quotation rows; employees can read shared quotations and create/update records, while deletion is admin-only.
- Do not expose Supabase service-role credentials in the browser.

## Build / Android
```bash
npm install
npm run build
npx cap add android
npm run android:sync
```
Build/sign the APK from Android Studio or a configured Android build runner. No APK is included in this project archive.

## Security / current limitations
- This is an integration-ready starter, not a hosted production CRM until the project is created, migration applied, admin provisioned, environment variables set, and deployment verified.
- Employee management UI (invite/role editing) and cloud backup/export are not yet included; employee provisioning currently uses Supabase Auth and the `employee_profiles` table.
- Existing quotation PDF template includes company/payment details from the supplied master quotation; verify those details before using externally.
- Do not use real customer data in local preview mode.
