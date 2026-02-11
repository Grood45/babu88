
const { MongoClient } = require('mongodb');

// Source: 'babu88' database on cluster0.5n8w89u
const sourceUri = "mongodb+srv://babu88user:6o1ZTLYwvVYlgtGI@cluster0.5n8w89u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const sourceDbName = "babu88";

// Target: 'babu88roni' database on cluster0.5ldue7g
const targetUri = "mongodb+srv://grood45_db_user:Sher%40123%40123@cluster0.5ldue7g.mongodb.net/babu88roni?appName=Cluster0";
const targetDbName = "babu88roni";

async function runMigration() {
    console.log("Starting migration...");

    const sourceClient = new MongoClient(sourceUri);
    const targetClient = new MongoClient(targetUri);

    try {
        await sourceClient.connect();
        console.log("Connected to Source DB");
        const sourceDb = sourceClient.db(sourceDbName);

        await targetClient.connect();
        console.log("Connected to Target DB");
        const targetDb = targetClient.db(targetDbName);

        // Get all collections from source
        const collections = await sourceDb.listCollections().toArray();
        console.log(`Found ${collections.length} collections to migrate.`);

        for (const collection of collections) {
            const colName = collection.name;
            console.log(`Migrating collection: ${colName}...`);

            const docs = await sourceDb.collection(colName).find({}).toArray();

            if (docs.length > 0) {
                try {
                    // Optional: clear target collection before inserting to avoid duplicates if re-running
                    // await targetDb.collection(colName).deleteMany({}); 

                    const result = await targetDb.collection(colName).insertMany(docs);
                    console.log(` -> Inserted ${result.insertedCount} documents into ${colName} (Source had ${docs.length})`);
                } catch (err) {
                    console.error(` -> Error inserting into ${colName}:`, err.message);
                }
            } else {
                console.log(` -> Skipping ${colName} (0 documents)`);
            }
        }

        console.log("\nMigration completed successfully!");

    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await sourceClient.close();
        await targetClient.close();
    }
}

runMigration();
