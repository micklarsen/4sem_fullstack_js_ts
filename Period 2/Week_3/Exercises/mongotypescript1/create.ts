import { MongoClient, Db, Collection, ObjectID, ObjectId } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
    const client = await connect();
    const db = client.db("day1ex1")
    const collection = db.collection("inventory")
    const status = await setupTestData(collection)

    //Add your play-around code here
    const demo = db.collection("demo");
    await demo.insertMany([
        {
            name: "Kurt",
            age: 26,
            status: "subscriber"
        },
        {
            name: "Sigrid",
            age: 82,
            status: "free"
        }
    ])

    const all = await demo.find({}).toArray()
    console.log(all);
    const first: any = all[0]
    console.log(new ObjectId(first._id).getTimestamp())


    client.close()
})()
