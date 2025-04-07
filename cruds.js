import { connectDB } from './db.js';

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
    // add new doc
    const new_drug = await drug_infos.insertOne(content);
    console.log("✅ Document Added:", new_drug);

    //await client.close();
    return new_drug

  } catch (err) {
    console.error("❌ Error Adding Document:", err);
  }
}

async function viewDocument(database, collection, filter = {}) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const client = await connectDB();
    const db = client.db(database);
    const drug_infos = db.collection(collection);

    // Query
    // filter object: const query = {name: "Afatinib Dimaleate"};
    const drug_info = await drug_infos.find(filter).toArray();
    console.log(drug_info);
    
    // Ensures that the client will close when you finish/error
    // await client.close();
    return drug_info;

  } catch (err) {
    console.error("❌ Error Viewing Document:", err);
  }
}

async function updateDocument(database, collection, query, updateData) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const client = await connectDB();
    const db = client.db(database);
    const drug_infos = db.collection(collection);
    
    await drug_infos.updateOne(query, { $set: updateData});
    const new_drug = await drug_infos.findOne(query);
    // await client.close();
    return new_drug
    
  } catch (err) {
    console.error("❌ Error Updating Document:", err);
  }
}


async function deleteDocument(database, collection, filter = {}) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const client = await connectDB();
    const db = client.db(database);
    const drug_infos = db.collection(collection);

    // Query
    // filter object: const query = {name: "Afatinib Dimaleate"};
    const result = await drug_infos.deleteOne(filter);
    console.log(result);
    // Ensures that the client will close when you finish/error
    // await client.close();
    /* Print a message that indicates whether the operation deleted a
    document */
    return result.deletedCount === 1

  } catch (err) {
    console.error("❌ Error Deleting Document:", err);
  }
  
}

//viewDocument().catch(console.dir);
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
export { addDocument, viewDocument, updateDocument, deleteDocument };