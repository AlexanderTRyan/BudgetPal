const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const jsonData = req.body;

    // Convert JSON data to string
    const jsonString = JSON.stringify(jsonData);

    // Write JSON string to file
    fs.writeFile('data.json', jsonString, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Data has been written to file');
        res.send('Data saved successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});