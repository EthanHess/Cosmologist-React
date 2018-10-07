const express = require('express'); 
const bodyParser = require('body-parser'); 
const requestController = require('./controllers/request_controller'); 

const app = express(); 
app.use(bodyParser.json()); 

//Requests
const baseURL = '/api/archives'
app.get(baseURL, requestController.getArchives); 
app.post(baseURL, requestController.createArchive); 
app.delete(`${baseURL}/:id`, requestController.deleteArchive); 
app.put(`${baseURL}/:id`, requestController.updateArchive); 

const port = 4000; 
app.listen(port, () => {
    console.log(`Hey I'm listening on ${port} 🐙`); 
}); 