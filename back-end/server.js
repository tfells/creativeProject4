const express = require('express');
const bodyParser = require("body-parser");
// Configure multer so that it will upload to '../front-end/public/images'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/creativeProject', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  message: String,
});

// Create a model for items in the museum.
const Note = mongoose.model('Note', itemSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/note', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    message: req.body.mess,
  });
  try {
    await note.save();
    res.send(note);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/notes', async (req, res) => {
  try {
    let notes = await Note.find();
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/delete/:id', async (req, res) => {
  try {
    await Note.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    console.log("HERE");
    res.sendStatus(500);
  }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
