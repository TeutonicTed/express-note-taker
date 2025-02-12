
// API routing file
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
const api = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use("/api", api)



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    }
);


    


app.listen(PORT, () =>
console.log (`App listening at http://localhost:${PORT}`)
);