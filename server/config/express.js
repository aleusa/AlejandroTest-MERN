const path = require('path'),
express = require('express'),
mongoose = require('mongoose'),
cors = require("cors");
morgan = require('morgan'),
bodyParser = require('body-parser'),
//exampleRouter = require('../routes/examples.server.routes');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err) => {
        if(err) throw err;
        console.log("MongoDB connection established.")
    }
    );
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //handle cross origin requests
    app.use(cors())

    // add a router
    app.use('/users', require("../routes/userRouter"));

    // for final build
    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/public')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/public', 'index.html'));
        });
    }

    return app
}

