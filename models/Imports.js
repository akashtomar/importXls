const mongoose = require('mongoose');
const {Schema} = mongoose;

const ImportSchema = new Schema({
    path : String,
    mimetype: String
});


module.exports = mongoose.model('Imports', ImportSchema);