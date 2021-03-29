const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
console.log(process.env.DB_USER)
//mondo connection
const MongoClient = require("mongodb").MongoClient;
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x4mku.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const eventCollection = client.db("vulenteer-network").collection("events");
  console.log('database3 connected')

  app.post('/addEvent',(req,res)=>{
    eventCollection.insertOne(req.body)
    .then(res=>console.log(res))
  })

  app.get('/allEvents',(req, res)=>{
    eventCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
      console.log(documents)
    })
  })
  // perform actions on the collection object
  // client.close();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hello World");
});

app.listen(process.env.PORT || port);
