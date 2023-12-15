const express = require('express')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/todoDB');

const Todo = mongoose.model('Todo', { description: String });


app.get('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('Hello world!')
})

app.post('/addtodo',async (req,res) => {
    const todo = req.body;
    const newTodo = new Todo(req.body);
    const result = await newTodo.save();
    res.send(result);
});

app.get('/listtodos', async (req,res) => {
    const todos = await Todo.find({});

    res.send(todos);

});

app.delete('/deletetodos/:id', async (req,res) => {
    const id = req.params.id;

    console.log(id);

    const result = await Todo.deleteOne({_id: id});

    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
