const router = require('express').Router();
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');



// GET method for notes
router.get('/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    // console.log(err)
    // console.log(data)
    const notesData = JSON.parse(data);
    // console.log(notesData)
    res.json(notesData);
  })
});



// POST method for notes
router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      ...req.body,
      id: uuidv4()
    };

    // Convert the data to a string so we can save it
  let noteListItem = { ...req.body, id: uuidv4() }

    // read the list of existing notes
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      let noteList = data ? JSON.parse(data) : []
      noteList.push(noteListItem)
      
      // write to db.json file
      fs.writeFile("./db/db.json", JSON.stringify(noteList), err => {
        err ? console.log(err) : console.log("list updated successfuly")
      })
    });

    const response = {
      status: 'success',
      body: noteListItem,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});




module.exports = router;