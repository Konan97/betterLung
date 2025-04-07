import assert from 'assert';
import { addDocument, viewDocument, updateDocument, deleteDocument } from './cruds.js';
import { connectDB, closeDB } from "./db.js";

const database = "NSLC_info"
const testCollection = 'test_items';

try {
  const client = await connectDB();
  await client.db(database).collection(testCollection).deleteMany({}); // clean slate

  // ✅ Test: Add Document
  const id = await addDocument(database, testCollection, { name: 'Item1', count: 1 });
  assert.ok(id, 'Failed to insert document');
  console.log('✔️ addDocument passed');

  // ✅ Test: View Document
  const docs = await viewDocument(database, testCollection, { name: 'Item1' });
  console.log("length ", docs.length)
  assert.strictEqual(docs.length, 1, 'View failed: expected 1 document');
  assert.strictEqual(docs[0].count, 1, 'Incorrect count value');
  console.log('✔️ viewDocuments passed');

  // ✅ Test: Update Document
  const updatedDoc = await updateDocument(database, testCollection, { name: 'Item1' }, { count: 2 });
  assert.strictEqual(updatedDoc.count, 2, 'Update failed: count mismatch');
  console.log('✔️ updateDocument passed');

  // ✅ Test: Delete Document
  const deleted = await deleteDocument(database, testCollection, { name: 'Item1' });
  assert.strictEqual(deleted, true, 'Delete failed');
  console.log('✔️ deleteDocument passed');

  await client.db(database).collection(testCollection).drop();
  console.log('🎉 All tests passed!');

  process.on("SIGINT", async () => {
    await closeDB();
    process.exit(0);
  });

} catch (err) {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
  
}

  
  