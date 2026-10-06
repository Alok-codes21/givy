// ---- GOOGLE LOGIN SETUP -------------------------------------------------
// 1. console.cloud.google.com > APIs & Services > Credentials > Create OAuth client ID (Web application)
// 2. Add your site URL(s) under "Authorized JavaScript origins" (e.g. http://localhost:5173 and your live domain)
// 3. Paste the client ID below, or put VITE_GOOGLE_CLIENT_ID=... in a .env file, then rebuild.
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
