const express = require('express')
const app = express()
const port = process.env.PORT || 5002
const cors = require("cors")

require('dotenv').config();


//middle ware
app.use(cors(
  {origin:["http://localhost:3000","http://mern-bookstore.onrender.com"]}
));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//mongoDB config


const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri =process.env.MONGODB_URI; //"mongodb+srv://mern-store:helloworld114514@cluster0.1snykhc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //create a collection of documents
    await client.connect();
    const bookCollections = client.db("BookInventory").collection("books");

    //insert a book to the db: post method
    app.post("/upload-book",async(req,res)=>{
        const data = req.body;
        const  result = await bookCollections.insertOne(data);
        res.send(result)
    })

    //get all books
    app.get("/all-books",async(req,res)=>{
        const books =  bookCollections.find();
        const result = await books.toArray();
        res.send(result);

    })

    //get a book
    app.get("/book/:id",async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await bookCollections.findOne(filter);
      res.send(result)
    })

    //update book
    app.put("/book/:id",async(req,res)=>{
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = {_id:new ObjectId(id)};
      const options = {upsert:true};
      const updateDoc = {
        $set:{
          ...updateBookData
        }
      }

      const result = await bookCollections.updateOne(filter,updateDoc,options)
      res.send(result)
    })
    

    //delete a book
    app.delete("/book/:id",async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await bookCollections.deleteOne(filter);
      res.send(result);

    })

    //find by category
    app.get("/all-books",async(req,res)=>{
      let query = {};
      if(req.query?.category){
        query = {
          category:req.query.category

        }
      }

      const result = await bookCollections.find(query).toArray();
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})