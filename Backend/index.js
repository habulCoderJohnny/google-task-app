const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

app.use(cors());
app.use(express.json());

//CONNECT TO MONGODB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rp51h.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      console.log('db connected!!');
      const toDoListCollection = client.db("google-tasks").collection("taskList");

     //task form sent to mongoDB
     app.post('/deadline', async (req, res) => {
        const taskList = req.body;
        const result = await toDoListCollection.insertOne(taskList);
        res.send(result);
      })
      //mongodb task data get
      app.get('/showToDoList/',async (req, res) => {
        const query = {};
        const cursor = toDoListCollection.find(query);
        const googleTask = await cursor.toArray();
        res.send(googleTask);
      });

      ///delete
      app.delete('/taskComplete/:id', async (req, res) => {
        const id  = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await toDoListCollection.deleteOne(query);
        res.send(result);
      });

     //update task 
      app.put('upadate/:id', async (req, res) => {
        const id  = req.params.id;
        const updateTask = req.body;
        const filter = {_id: ObjectId(id)};
        const updateDoc = {
            $set: updateTask
          };
        const result = await toDoListCollection.updateOne(filter, updateDoc);
        res.send(result);
      });


    }
    finally {
  
    }
  
  
  }
  run().catch(console.dir);
  
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
  
  app.listen(port, () => {
    console.log(`google task app listening on port ${port}`)
  })