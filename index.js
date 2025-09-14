import { Client, TablesDB } from "node-appwrite";

const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const APPWRITE_TABLE = process.env.APPWRITE_TABLE;
export default async ({ req, res }) => {
  if (req.method === "GET") {
    const client = new Client();
    const tablesDB = new TablesDB(client);
    client
      .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(APPWRITE_PROJECT_ID) // Your project ID
      .setKey(APPWRITE_API_KEY); // Your secret API key

    let response = await tablesDB.listRows(
      APPWRITE_DATABASE_ID,
      APPWRITE_TABLE
    );
    return res.send(response.documents);
  }
};
