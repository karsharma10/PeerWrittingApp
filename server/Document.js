//create the schema

const{Schema, model} = require("mongoose")

//create the document in the database:
const Document = new Schema({
    _id: String,
    data: Object
})

module.exports = model("Document", Document)

