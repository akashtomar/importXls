const app = require("express")();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })


const upload = multer({ storage: storage });
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);
app.use(bodyParser.json());
// app.use();
app.get('/', (req,res)=>{
    res.render('form');
});

app.post('/',upload.single('inputFile') ,(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.send('all set!');
});



app.listen(3000,()=>{
    console.log("lights @", 3000);
});