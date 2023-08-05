const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) =>{
    res.render('notes/new-note');
})

router.post('/notes/new-note', async(req, res) =>{
    const {title, description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please Write a Title'})
    }
    if (!description){
        errors.push({text: 'Please Write a description'})
    }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({title, description});
        await newNote.save();
        res.redirect('/notes')
    }
})

router.get('/notes', async (req, res) =>{
    try {
        const notes = await Note.find().sort({date: 'desc'});
        res.render('notes/all-notes', {notes});
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Error fetching notes');
    }
});


router.get('/notes/edit/:id', async (req, res) =>{
    try {
        const note = await Note.findById(req.params.id)
        res.render('notes/edit-note', {note})
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Error fetching notes');
    }
});

router.put('/notes/edit-note/:id', async (req, res) =>{
    try {
        const {title, description}= req.body;
        await Note.findByIdAndUpdate(req.params.id, {title, description});
        res.redirect('/notes')
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Error fetching notes');
    }
}); 

module.exports = router;