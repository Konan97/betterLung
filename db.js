import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config'; // import dotenv

const username = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clusterUrl = "clusterbetterlung.odabm8d.mongodb.net";

const authMechanism = "DEFAULT"

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`

let client;

// Function to connect to MongoDB
async function connectDB() {
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
  if (!client){
    client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
    await client.connect();
    console.log("✅ Connected to MongoDB");
  }
  return client;
};

/**
 * Closing when app shuts down for APIs
 */
async function closeDB() {
  if (client){
    await client.close();
    console.log("❌ MongoDB connection closed");
  }
  
}

export { connectDB, closeDB };