const express = require('express');
const app = express();
const path = require("path");


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
mongoose.connect(db, {useNewUrlParser: true})
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(`An error occurred: ${err}`));


// Use Routes
app.use('/api/todos', todosRouter);


// Serve files on Heroku
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build/'));
    app.get("*", (req, res) => {
        res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


// Serve App
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});