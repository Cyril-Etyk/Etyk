const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL =
  "mongodb+srv://etykRoot:Willcio2019@etyk.72jgg.mongodb.net/etyk?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const DATABASE_NAME = "etyk";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, userCollection, ticketCollection;

app.listen(5000, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      userCollection = database.collection("Users");
      ticketCollection = database.collection("Tickets");
      console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
});

app.post("/Users", (request, response) => {
    userCollection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.post("/Tickets", (request, response) => {
    ticketCollection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/Users", (request, response) => {
   userCollection.find({}).toArray((error, result) => {
       if(error) {
           return response.status(500).send(error);
       }
       response.send(result);
   });
});

app.get("/Tickets", (request, response) => {
   ticketCollection.find({}).toArray((error, result) => {
       if(error) {
           return response.status(500).send(error);
       }
       response.send(result);
   });
});

app.get("/Users/:id", (request, response) => {
    userCollection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
