const mongoose = require('mongoose');
const {Schema} = mongoose;

const ImportSchema = {
    path : String,
    mimetype: String
}








module.exports = mongoose.model('Imports', ImportSchema);