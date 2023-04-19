// mongodb+srv://fullstack:<password>@cluster0.cnba3y9.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose')

if (process.argv.length<4){
    console.log('Error, need provide password: node mongo.js <password> <nota>');
    process.exit(1)
}

const password = process.argv[2]
const message = process.argv[3]

const url = `mongodb+srv://fullstack:${password}@cluster0.cnba3y9.mongodb.net/app-note?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note',noteSchema)

const note = new Note({
    content: message,
    date: new Date(),
    important: true
})
/*
note.save().then(result => {
    console.log('note saved!');
    console.log(result);
    mongoose.connection.close()
})
*/
//consultar
Note.find({important: false}).then(result => {
    result.forEach(note =>{
        console.log(note);
    })
    mongoose.connection.close()
})