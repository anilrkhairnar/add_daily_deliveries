import { Client, Databases } from "node-appwrite";

import deliveries from "./deliveries.json" assert { type: "json" };

const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const APPWRITE_TABLE = process.env.APPWRITE_TABLE;
export default async ({ req, res }) => {
  const client = new Client();
  const database = new Databases(client);
  client
    .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID) // Your project ID
    .setKey(APPWRITE_API_KEY); // Your secret API key

  console.log("function is working");

  if (req.method == "GET") {
    let response = await database.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TABLE
    );

    console.log("response is here", response);

    return res.send({
      status: 200,
      message: "Data fetched successfully",
      data: response,
    });
  } else if (req.method == "POST") {
    const delivery = database.createRows(
      APPWRITE_DATABASE_ID,
      APPWRITE_TABLE,
      deliveries
    );

    return res.send({
      status: 200,
      message: "Data added successfully",
      data: delivery,
    });
  }
};
