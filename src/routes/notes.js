const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) =>{
    res.render('notes/new-note');
})

router.post('/notes/new-note', async(req, res) =>{
    const {tittle, description} = req.body;
    const errors = [];
    if(!tittle){
        errors.push({text: 'Please Write a Tittle'})
    }
    if (!description){
        errors.push({text: 'Please Write a Description'})
    }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            tittle,
            description
        });
    } else {
        const newNote = new Note({tittle, description});
        await newNote.save();
        res.redirect('/notes')
    }
})

router.get('/notes', (req, res) =>{
    res.send('Notes from database');
})



module.exports = router;