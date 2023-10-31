const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Read notes from JSON File and send as a response
app.get('/api/notes', (req, res) => {
    try {
      // Read the contents of the 'db.json' file
      const notesData = fs.readFileSync('db.json', 'utf8');
  
      // Parse the JSON data into an array
      const notes = JSON.parse(notesData);
  
      // Send the notes as a JSON response
      res.json(notes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 //Add new note to the JSON file 
app.post('/api/notes', (req, res) => {
    try {
        // Read the contents of the 'db.json' file
        const notesData = fs.readFileSync('db.json', 'utf8');

        // Parse the JSON data into an array
        const notes = JSON.parse(notesData);

        // Create a new note object based on the request body
        const newNote = {
        title: req.body.title,
        text: req.body.text,
        };
  
      // Assign a unique ID to the new note (you can use a timestamp or a unique identifier library)
      newNote.id = // Generate a unique ID;
  
      // Add the new note to the array of notes
      notes.push(newNote);
  
      // Write the updated notes array back to the 'db.json' file
      fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));
  
      // Send a success response
      res.json(newNote);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//delete a note from the JSON file.  
app.delete('/api/notes/:id', (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Read the contents of the 'db.json' file
      const notesData = fs.readFileSync('db.json', 'utf8');
  
      // Parse the JSON data into an array
      const notes = JSON.parse(notesData);
  
      // Find the index of the note to be deleted
      const noteIndex = notes.findIndex((note) => note.id === noteId);
  
      if (noteIndex !== -1) {
        // Remove the note from the array
        notes.splice(noteIndex, 1);
  
        // Write the updated notes array back to the 'db.json' file
        fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));
  
        // Send a success response
        res.json({ message: 'Note deleted' });
      } else {
        // Send a not found response if the note with the specified ID doesn't exist
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
