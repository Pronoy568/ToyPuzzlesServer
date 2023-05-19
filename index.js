const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vqc0wwo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyPuzzlesCollection = client
      .db("ToyPuzzles")
      .collection("toyCollection");

    // Toy Routes get in the all specific data of email
    app.get("/toys", async (req, res) => {
      let query = {};
      if (req?.query?.email) {
        query = { sellerEmail: req.query.email };
      }
      const result = await toyPuzzlesCollection.find(query).toArray();
      res.send(result);
    });

    // Toy Routes get in the single data
    app.get("/toy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toyPuzzlesCollection.findOne(query);
      res.send(result);
    });

    // Toy Routes post in the data
    app.post("/toys", async (req, res) => {
      const toys = req.body;
      const result = await toyPuzzlesCollection.insertOne(toys);
      res.send(result);
    });

    // Toy Routes Delete in the single data
    app.delete("/toy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toyPuzzlesCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Toy Puzzles server is running now!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
