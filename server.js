const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

let db;

const url = "mongodb+srv://valgonzr:ennIuqqxuHx0NikV@demon.5xoynxc.mongodb.net/ArtistApp?retryWrites=true&w=majority";
const dbName = "ArtistApp";

app.listen(4400, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.collection('songs').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index', { songs: result });
  });
});

app.post('/songs', (req, res) => {
  db.collection('songs').insertOne({}, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

app.put('/songs', (req, res) => {
  db.collection('songs')
    .findOneAndUpdate(
      {},
      {
        $set: {},
      },
      {
        sort: { _id: -1 },
        upsert: true,
      },
      (err, result) => {
        if (err) return res.send(err);
        res.send(result);
      }
    );
});

app.delete('/songs', (req, res) => {
  db.collection('songs').findOneAndDelete({}, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Message deleted!');
  });
});
