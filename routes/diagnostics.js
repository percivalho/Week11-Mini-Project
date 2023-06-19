const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  console.log("here");
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log(req.body);

  //const { username, topic, tip } = req.body;
  if (req.body) {
    const newDiagnostics = {
      time: Date.now(), // Unix timestamp in milliseconds
      error_id: uuidv4(), 
      errors: req.body.errors,
    }


    readAndAppend(newDiagnostics, './db/diagnostics.json');
    res.json(`Diagnostics added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
  
});

module.exports = diagnostics;
