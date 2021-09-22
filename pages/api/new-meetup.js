import { MongoClient } from "mongodb";
// api/new-meetup
// POST api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("Step 1");
    const client = await MongoClient.connect(
      "mongodb+srv://scott:tiger@cluster0.u3ddh.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    console.log("Step 2");
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
    console.log("Step 3");
  }
}

export default handler;
