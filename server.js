const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  // Implement logic to read notes from the JSON file and send them as a response.
});

app.post('/api/notes', (req, res) => {
  // Implement logic to add a new note to the JSON file.
});

app.delete('/api/notes/:id', (req, res) => {
  // Implement logic to delete a note from the JSON file.
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
