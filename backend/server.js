const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const router = express.Router();

const API_PORT = 3001;
const CONNECTION_URL =
  "mongodb+srv://exdunn:exdunn@exaltcluster-e03v8.mongodb.net/test?retryWrites=true";
const DB_NAME = "exaltDB";
const COLLECTION_NAMES = [
  "Synthesis",
  "Hardcore Synthesis",
  "SSF Synthesis HC",
  "SSF Synthesis"
];

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

var database;
var collections = {};

// this is our create methid
// this method adds new data in our database
router.post("/putData", (request, response) => {});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DB_NAME);

      for (const name of COLLECTION_NAMES) {
        collections[name] = database.collection(name);
      }
    }
  );
  console.log(`LISTENING ON PORT ${API_PORT}`);
});

// this is our get method
// this method fetches all available data in our database
router.post("/getData", (request, response) => {
  const { collectionName } = request.body;
  console.log(collectionName);
  collections[collectionName].find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (request, response) => {});
