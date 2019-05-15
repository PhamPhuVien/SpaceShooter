// const MongoClient = require('mongodb').MongoClient;
// //const uri = "mongodb+srv://admin:admin@cluster0-z6bg3.mongodb.net/SpaceShooter?retryWrites=true";
// const uri = 'mongodb+srv://admin:admin@cluster0-z6bg3.mongodb.net/ShooterGame?retryWrites=true';
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(uri, err => {
  // const collection = client.db("SpaceShooter").collection("devices");
  // client.close();
// });



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@clusterss-myhtb.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(uri, err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


//mongodb+srv://admin:<password>@clusterss-myhtb.gcp.mongodb.net/test?retryWrites=true
//mongodb+srv://admin:<password>@clusterss-myhtb.gcp.mongodb.net/test?retryWrites=true