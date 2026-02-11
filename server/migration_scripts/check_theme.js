
const { MongoClient } = require('mongodb');

// Target: 'babu88roni' database
const targetUri = "mongodb+srv://grood45_db_user:Sher%40123%40123@cluster0.5ldue7g.mongodb.net/babu88roni?appName=Cluster0";
const targetDbName = "babu88roni";

async function checkThemeColor() {
    console.log("Checking ThemeColor in", targetDbName, "...");
    const client = new MongoClient(targetUri);

    try {
        await client.connect();
        const db = client.db(targetDbName);

        // List collections to ensure case matches
        const collections = await db.listCollections().toArray();
        const themeColorCol = collections.find(c => c.name.toLowerCase() === 'themecolor');

        if (!themeColorCol) {
            console.log("ERROR: ThemeColor collection NOT found.");
            console.log("Available collections:", collections.map(c => c.name));
        } else {
            console.log("Found collection:", themeColorCol.name);
            const count = await db.collection(themeColorCol.name).countDocuments();
            console.log("Document count:", count);

            const doc = await db.collection(themeColorCol.name).findOne();
            console.log("First document:", doc);
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

checkThemeColor();
