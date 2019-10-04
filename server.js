const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const todosRouter = require('./routes/api/todos')


// Cors Middleware
app.use(cors());


// BodyParser Middleware
app.use(bodyParser.json());


// Set up mongoose connection
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(`An error occurred: ${err}`));


// Home
app.get('/', (req, res) => res.send('Hello World!'));


// Use Routes
app.use('/api/todos', todosRouter);


// Serve App
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});