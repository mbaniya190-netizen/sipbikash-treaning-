import { google } from "googleapis";

const REQUIRED_ENVIRONMENT_VARIABLES = [
  "GOOGLE_SHEETS_ID",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
] as const;

export type Lead = {
  name: string;
  phone: string;
};

function getGoogleConfiguration() {
  const missing = REQUIRED_ENVIRONMENT_VARIABLES.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing Google Sheets configuration: ${missing.join(", ")}`);
  }

  return {
    spreadsheetId: process.env.GOOGLE_SHEETS_ID as string,
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
    privateKey: (process.env.GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
    sheetName: process.env.GOOGLE_SHEETS_TAB || "Sheet 1",
  };
}

export async function appendLead({ name, phone }: Lead) {
  const { spreadsheetId, clientEmail, privateKey, sheetName } = getGoogleConfiguration();
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetName.replace(/'/g, "''")}'!A:C`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[new Date().toISOString(), name, phone]],
    },
  });
}
