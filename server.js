/**
 * Imports
 */
const app = require("express")();
require('dotenv').config();
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Imports = require('./models/Imports');
const { exec } = require('child_process');
/**
 * env vars
 */
const DbUser = process.env.DB_USER;
const DbPass =  process.env.DB_PASS;
const DbString = process.env.DB_STRING;

var urlencodedParser = bodyParser.urlencoded({extended: true});
//storage and filename config.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

mongoose.connect('mongodb://'+DbUser+':'+DbPass+DbString);


const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(urlencodedParser);
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.render('form');
});

//inserting file meta into mongoDB
app.post('/',upload.single('inputFile') ,(req,res)=>{
    var newImport = new Imports(req.file);
    console.log(req.body);
    newImport.save();
    

    res.send('all set!');
});

//route to get list of imports
app.get('/imports', (req,res)=>{
    Imports.find({}, function(err, docs){
        res.json(docs);
    });
});
app.get('/runImport', (req,res)=>{
    exec("python3 python/import_file.py arg1 arg2", (err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }
        res.send(stdout);

    });
});

app.listen(process.env.PORT,()=>{
    console.log("lights @", process.env.PORT);
});