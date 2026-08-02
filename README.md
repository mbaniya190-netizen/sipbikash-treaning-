# Sip Bikas lead capture

The consultation form submits a name and phone number to `POST /api/leads`. The API route is server-side and appends a row to Google Sheets in this order: `Submitted at (UTC)`, `Name`, `Phone`.

## Google Sheet preparation

1. Create a tab named `Leads` in the spreadsheet, or set `GOOGLE_SHEETS_TAB` to the name of an existing tab.
2. Add these header cells to the first row: `Submitted at (UTC)`, `Name`, `Phone`.
3. In the Google Sheet, choose **Share**, add the service account email, and set it to **Editor**.
4. In the Google Cloud project for the service account, enable the **Google Sheets API**.

## Vercel environment variables

Add the following variables for Production, Preview, and Development. Do not use the `NEXT_PUBLIC_` prefix.

| Name | Value |
| --- | --- |
| `GOOGLE_SHEETS_ID` | The spreadsheet ID from its Google Sheets URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Your Google service-account email |
| `GOOGLE_PRIVATE_KEY` | The complete service-account private key, including the `BEGIN` and `END` lines. Use `\\n` between lines if Vercel stores it as one line. |
| `GOOGLE_SHEETS_TAB` | `Leads` (or your chosen tab name) |

Redeploy after saving the variables. No Google credential is exposed to the browser or committed to Git.
