const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const Album = new Schema({
 artistId: ObjectId,
 title: String,
 releaseDate: Date
});

const Artist = new Schema({
    name: String
});

module.exports = {
    Artist: mongoose.model('Artist', Artist),
    Album: mongoose.model('Album', Album)
};