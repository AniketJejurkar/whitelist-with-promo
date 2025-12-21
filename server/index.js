// server/index.js (Final Code for New Sheet)
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import { google } from 'googleapis';
import * as fs from 'fs';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); 
app.use(express.json());

// ⚠️ REPLACE THIS WITH THE ID FROM YOUR NEW GOOGLE SHEET (Step 1)
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Function to initialize and run the server
async function startServer() {
    try {
        // --- GOOGLE SHEETS AUTHENTICATION ---
        const keyFilePath = './service-account-key.json';
        const credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'], 
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // --- API ENDPOINT ---
        app.post('/api/submit-form', async (req, res) => {
          // Fields expected from the client-side form submission (must match frontend keys!)
         const { name, email, xUsername, walletAddress, country, referralCode } = req.body;

          if (!name || !email || !xUsername || !walletAddress || !country) {
    return res.status(400).json({ error: 'Missing required form fields' });
}
          
          // Data array matches columns A-K. Blank strings are for auto-calculated columns.
          // [A, B, C, D, E, F, G, H, I, J, K]
          const rowData = [
    "", // A: ID
    name, // B: Full Name (Now using 'name' variable)
    email,      // C: Email
    xUsername,  // D: X Username
    walletAddress, // E: Wallet Address
    "", // F: Referral Code 
    referralCode || "", // G: Referred By
    "", // H: Whitelist Bonus
    "", // I: Referral Bonus
    "", // J: Total Bonus
    country,
    "Pending",
    new Date().toLocaleString() // K: Submitted At
];
          
          try {
            await sheets.spreadsheets.values.append({
              spreadsheetId: SPREADSHEET_ID,
              range: 'Sheet1!A:M', // Covers all columns up to the timestamp (Column K)
              valueInputOption: 'USER_ENTERED', 
              resource: {
                values: [rowData], 
              },
            });
            
            res.status(200).json({ message: 'Form submitted successfully!' });

          } catch (error) {
            console.error('ERROR writing to Google Sheets:', error.message);
            // ⚠️ ADD THIS LINE TO PRINT THE FULL ERROR OBJECT ⚠️
            console.error('FULL ERROR DETAILS:', error);
            res.status(500).json({ error: 'Failed to save data. Check server logs.' });
          }
        });

        app.listen(port, () => {
          console.log(`Server listening at http://localhost:${port}`); 
        });

    } catch (e) {
        console.error("==========================================");
        console.error("SERVER CRITICAL STARTUP FAILURE:");
        console.error("Error:", e.message);
        console.error("\nAction: Check if 'service-account-key.json' is in the 'server' folder.");
        console.error("==========================================");
        process.exit(1);
    }
}

startServer();