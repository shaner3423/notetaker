const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3002;
const path = require('path');
const outputPath = path.join(__dirname, './db/db.json');



//parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data 
app.use(express.json());
app.use(express.static('public')); 

//link homepage 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});



function readDbFile () {
    fs.readFile(outputPath, (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
    return JSON.parse(data);
    }
)};



const notesArray = [];

//get API notes
app.get('/api/notes', (req, res) => {
    return res.json(notesArray);
});


//post API - this is where Ben's code starts he posted a video on our slack class channel and taught us how to do these codes https://github.com/Bgallag5
app.post('/api/notes', (req, res) => {
    const notesInput = req.body;
    notesInput.id = notesArray.length.toString();
    notesArray.push(notesInput);
    
    fs.writeFile('db/db.json', JSON.stringify(notesArray), (err) => {
        if (err) console.log(err);
    });
    res.json(notesArray);
});

//delete API - borrowed from Emily https://github.com/EmilyNecciai
// app.delete('/api/notes/:id', (req, res) => {
//    const { id } = req.params;

//    const deleteNote = outhPath.findIndex(outPath => outPath.id == id);

//    notes.splice(deleteNote, 1);
//    return res.send();

// });

//get notes pages 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//listener
app.listen(PORT, () => {
    console.log("API server now on port 3002")
});