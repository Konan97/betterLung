import { MongoClient, ServerApiVersion } from 'mongodb';
import { mongoose } from 'mongoose'

const username = encodeURIComponent("sunyuting17");
const password = encodeURIComponent("zOdHnRNIraLJ");
const clusterUrl = "clusterbetterlung.odabm8d.mongodb.net";

const authMechanism = "DEFAULT"

//const uri = "mongodb+srv://sunyuting17:zOdHnRNIraLJ@clusterbetterlung.odabm8d.mongodb.net/";
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db('NSLC_info');
    const drug_infos = database.collection('drug_info');

    // Query
    const query = {name: "Afatinib Dimaleate"};
    const drug_info = await drug_infos.findOne(query)
    
    console.log(drug_info);
  } finally {
    // Ensures that the client will close when you finish/error

    await client.close();
  }
}
run().catch(console.dir);