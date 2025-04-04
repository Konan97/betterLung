import { MongoClient, ServerApiVersion } from 'mongodb';

const username = encodeURIComponent("sunyuting17");
const password = encodeURIComponent("zOdHnRNIraLJ");
const clusterUrl = "clusterbetterlung.odabm8d.mongodb.net";

const authMechanism = "DEFAULT"

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`

// Function to connect to MongoDB
async function connectDB() {
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  await client.connect();
  console.log("✅ Connected to MongoDB");
  return client;
};

export { connectDB };