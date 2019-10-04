const express = require('express');
const router = express.Router();


const Todo = require('../../models/todo');


router.get('/', (req, res) => {
    Todo.find()
        .then(todos => res.status(200).json(todos))
        .catch(err => res.status(404).send(err));
});


router.get('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => res.status(200).json(todo))
        .catch(err => res.status(404).send(err));
});


router.post('/add', (req, res) => {
    const newTodo = new Todo({
        description: req.body.description
    });
    newTodo.save()
            .then(todo => res.status(201).json(todo))
            .catch(err => res.status(400).send(err));
});


router.patch('/update/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(todo => res.status(200).json(todo))
        .catch(err => res.status(400).send(err));
});


router.delete('/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(todo => res.status(200).json(todo))
        .catch(err => res.status(400).send(err));
});

module.exports = router;