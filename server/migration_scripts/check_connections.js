
const { MongoClient } = require('mongodb');

const sourceUri = "mongodb+srv://babu88user:6o1ZTLYwvVYlgtGI@cluster0.5n8w89u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const targetUri = "mongodb+srv://grood45_db_user:Sher%40123%40123@cluster0.5ldue7g.mongodb.net/babu88roni?appName=Cluster0";

async function checkConnection(uri, name) {
    console.log(`Connecting to ${name}...`);
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log(`Successfully connected to ${name}`);
        const db = client.db();
        const collections = await db.listCollections().toArray();
        console.log(`${name} Collections:`, collections.map(c => c.name));

        // Count documents in each collection
        for (const collection of collections) {
            const count = await db.collection(collection.name).countDocuments();
            console.log(`- ${collection.name}: ${count} documents`);
        }

    } catch (error) {
        console.error(`Error connecting to ${name}:`, error);
        return false;
    } finally {
        await client.close();
    }
    return true;
}

async function main() {
    console.log("Starting connection checks...");
    const sourceOk = await checkConnection(sourceUri, "SOURCE");
    const targetOk = await checkConnection(targetUri, "TARGET");

    if (sourceOk && targetOk) {
        console.log("\nBoth connections verified successfully!");
    } else {
        console.error("\nConnection verification FAILED.");
    }
}

main();
