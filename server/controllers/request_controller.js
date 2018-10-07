const archives = []; 
id = 0; 

module.exports = {
    getArchives: (req, res) => {
        res.json(archives); 
    }, 
    createArchive: (req, res) => {
        console.log('req.body', req.body); 
        const { nasaURL, text } = req.body; 
        const newArchive = {
            nasaURL, 
            text, 
            id
        }; 
        id++; 
        console.log('newArchive', newArchive); 
        archives.push(newArchive); 
        res.json(archives); 
    },
    updateArchive: (req, res) => {
        const archID = req.params.id; 
        const indexOfArch = archives.findIndex(arch => arch.id === parseInt(archID)); 
        console.log('indexOfArch', indexOfArch); 
        if (indexOfArch === -1) {
            res.status(404).send(`A book with ${archID} does not exist`); 
        } else {
            archives[indexOfArch] = { ...req.body, id: archives[indexOfArch].id }; 
            res.json(archives); 
        }
    }, 
    deleteArchive: (req, res) => {
        const archID = req.params.id; 
        const indexOfArch = archives.findIndex(arch => arch.id === parseInt(archID)); 
        console.log('indexOfArch', indexOfArch); 
        if (indexOfArch === -1) {
            res.status(404).send(`A book with ${archID} does not exist`); 
        } else {
            archives.splice(indexOfArch, 1); 
            res.json(archives); 
        }
    }
}