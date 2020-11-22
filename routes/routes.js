const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    
    fs.readFile('db/db.json', 'utf8', (err,res)=>{
        if (err) throw err;

        const notes = JSON.parse(res);
        

        app.get('/api/notes', (req,res)=>{
            res.json(notes)
        });

        app.post('/api/notes', (req,res)=>{
            const newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log('New note made!')
        });

        app.get('/api/notes/:id', (req,res)=>{
            res.json(notes[req.params.id]);
        });

        app.delete('/api/notes/:id', (req,res)=>{
            notes.splice(req.params.id, 1);
            updateDb();
            console.log('Deleted note ID' + req.params.id)
        });

        app.get('/notes', (req,res)=>{
            res.sendFile(path.join(__dirname, '../public/notes.html'))
        });

        app.get('*', (req,res)=>{
            res.sendFile(path.join(__dirname,'../public/index.html'))
        });
        const updateDb = ()=>{
            fs.writeFile('db/db.json', JSON.stringify(notes,'\t'),err=>{
                if (err) throw err;
                return true;
            });
        };
    });  
};


