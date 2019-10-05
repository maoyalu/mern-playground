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
const db = process.env.MONGODB_URI || require('./config/keys').mongoURI;
mongoose.connect(db)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(`An error occurred: ${err}`));


// Serve client
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));


// Use Routes
app.use('/api/todos', todosRouter);


app.get("*", (req, res) => {
    res.sendfile(path.join(__dirname, "client", "build", "index.html"));
});


// Serve App
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});