
const { MongoClient } = require('mongodb');

const sourceUri = "mongodb+srv://babu88user:6o1ZTLYwvVYlgtGI@cluster0.5n8w89u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const targetUri = "mongodb+srv://grood45_db_user:Sher%40123%40123@cluster0.5ldue7g.mongodb.net/babu88roni?appName=Cluster0";

async function listDatabases(uri, name) {
    console.log(`Connecting to ${name}...`);
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log(`Successfully connected to ${name}`);

        const adminDb = client.db().admin();
        const dbs = await adminDb.listDatabases();
        console.log(`${name} Databases:`);
        dbs.databases.forEach(db => console.log(` - ${db.name} (${db.sizeOnDisk} bytes)`));

    } catch (error) {
        console.error(`Error listing databases for ${name}:`, error);
    } finally {
        await client.close();
    }
}

async function main() {
    console.log("Listing databases...");
    await listDatabases(sourceUri, "SOURCE");
    // Target DB is known as 'babu88roni' from the URL, but checking anyway
    await listDatabases(targetUri, "TARGET");
}

main();
