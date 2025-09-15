import { Client, Databases, TablesDB, ID } from 'node-appwrite';

import deliveries from './deliveries.json' with { type: 'json' };

const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const APPWRITE_TABLE_ID = process.env.APPWRITE_TABLE_ID;

export default async ({ req, res, log, error }) => {
  try {
    const client = new Client();
    client
      .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(APPWRITE_PROJECT_ID) // Your project ID
      .setKey(APPWRITE_API_KEY); // Your secret API key

    const databases = new Databases(client);
    const tablesDb = new TablesDB(client);

    log('function is working');

    if (req.method == 'GET') {
      let response = await tablesDb.listRows(
        APPWRITE_DATABASE_ID,
        APPWRITE_TABLE_ID
      );

      log('response is here', response);

      return res.send({
        status: 200,
        message: 'Data fetched successfully',
        data: response,
      });
    } else if (req.method == 'POST') {

      const delivery = await tablesDb.deleteRows(
        APPWRITE_DATABASE_ID,
        APPWRITE_TABLE_ID,
        []
      );

      log('data added', delivery);

      return res.send({
        status: 200,
        message: 'Data added successfully',
        data: delivery,
      });
    }
  } catch (err) {
    error('error', err);

    return res.send({
      status: 500,
      message: 'Internal Server Error',
      data: err,
    });
  }
};

// {
//             $id: ID.unique(),
//             customer: 'Mahesh Joshi',
//             route: 'Night',
//             product: 'Buffalo Milk',
//             quantity: 0.75,
//             status: 'delivered',
//           },
//           {
//             $id: ID.unique(),
//             customer: 'Seema Verma',
//             route: 'Morning',
//             product: 'Cow Milk',
//             quantity: 2,
//             status: 'delivered',
//           },
