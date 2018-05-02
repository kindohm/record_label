const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const Album = new Schema({
 artistId: String,
 title: String,
 releaseDate: Date,
 tracks: [String]
});

const Artist = new Schema({
    name: String,
    artistId: String
});

module.exports = {
    Artist: mongoose.model('Artist', Artist),
    Album: mongoose.model('Album', Album)
};