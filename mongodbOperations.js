import { MongoClient, ServerApiVersion } from 'mongodb';

const username = encodeURIComponent("sunyuting17");
const password = encodeURIComponent("zOdHnRNIraLJ");
const clusterUrl = "clusterbetterlung.odabm8d.mongodb.net";

const authMechanism = "DEFAULT"

//const uri = "mongodb+srv://sunyuting17:zOdHnRNIraLJ@clusterbetterlung.odabm8d.mongodb.net/";
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
}

// const content = {"name": "Gefitinib",
// "US_Brand":["Iressa"],
// "FDA Approved": "Yes",
// "Use":["first-line treatment in patients whose tumors have certain EGFR gene mutations."]}
const content = {"name": "Osimertinib Mesylate",
  "US_Brand":["Tagrisso"],
  "FDA Approved": "Yes",
  "Use":["adults who have an abnormal EGFR gene and had surgery to remove the cancer, to help keep the cancer from coming back after surgery",
    "adults with stage IIIA, stage IIIB, or stage IIIC cancer that cannot be removed by surgery and did not get worse during or after platinum-based chemoradiation therapy",
    "adults with pemetrexed disodium and platinum-based chemotherapy as the first treatment for cancer that has spread to other parts of the body",
    "adults with cancer that has spread to other parts of the body and got worse during or after treatment with another EGFR tyrosine kinase inhibitor"
  ]}
/**
 * 📌 Function to Add a New Document
 * @param {string} database - Database of the document
 * @param {string} collection - Collection of the document
 * @param {string} content - Content of the document
 */
async function addDocument(database, collection, content) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const client = await connectDB();
    const db = client.db(database);
    const drug_infos = db.collection(collection);
    const new_drug = await drug_infos.insertOne(content);
    console.log("✅ Document Added:", new_drug);

    await client.close();

  } catch (err) {
    console.error("❌ Error Adding Document:", err);
  }
}

async function viewDocument(filter = {}) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const client = await connectDB();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db('NSLC_info');
    const drug_infos = database.collection('drug_info');

    // Query
    const query = {name: "Afatinib Dimaleate"};
    const drug_info = await drug_infos.findOne(query)

    console.log(drug_info);
    
    // Ensures that the client will close when you finish/error
    await client.close();
    return drug_info;

  } catch (err) {
    console.error("❌ Error Viewing Document:", err);
  }
}

viewDocument().catch(console.dir);
//addDocument('NSLC_info', 'drug_info', content)
/*"name":"Afatinib Dimaleate",
"US_Brand":["Gilotrif"],
"FDA Approved":"Yes",
"Class":"kinase inhibitors",
"Use":["first-line treatment in patients with tumors that have certain EGFR gene mutations","patients with squamous NSCLC that got worse after treatment with platinum chemotherapy"]}
"name": "Gefitinib",
"US_Brand":["Iressa"],
"FDA Approved": "Yes",
"Use":["first-line treatment in patients whose tumors have certain EGFR gene mutations."]
*/
export { addDocument, viewDocument };