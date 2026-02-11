const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("babu88");
        const users = database.collection("users");

        const username = "admin";
        const password = "admin123";
        const hashedPassword = await bcrypt.hash(password, 10);

        const filter = { username: username };
        const updateDoc = {
            $set: {
                username: username,
                password: hashedPassword,
                role: "admin",
                createdAt: new Date(),
            },
        };
        const options = { upsert: true };

        const result = await users.updateOne(filter, updateDoc, options);

        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s), upserted ${result.upsertedCount} document(s)`
        );
        console.log("Admin user created/updated successfully.");
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
