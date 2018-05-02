const uuidv4 = require('uuid/v4');
const models = require('./models');
const moment = require('moment');
const names = require('./names');
const makeName = names.makeName;
const words = require('./words');
const getRandomIntInclusive = require('./shared').getRandomIntInclusive;

const makeArtist = () => {
    const artist = new models.Artist();
    artist.name = makeName();
    artist.artistId = uuidv4();
    return artist;
};

const makeTrack = () => {

    const newName = makeName();
    if (Math.random > 0.98) {
        newName += ` (${makeName()})`;
    }
    return newName;
}

const makeAlbum = (artist) => {
    const album = new models.Album();
    album.artistId = artist.artistId;
    album.title = makeName();
    album.releaseDate = moment().subtract(getRandomIntInclusive(1, 1000), 'days').toDate();

    const trackCount = getRandomIntInclusive(2, 15);
    for (let t = 0; t < trackCount; t++) {
        album.tracks.push(makeTrack());
    }

    return album;
};

const generate = () => {

    console.log('generating new data');
    names.clearUsed();

    return words.fillAll()
        .then(() => {
            const newArtists = [];
            const newAlbums = [];
            const artistCount = getRandomIntInclusive(20, 50);
            for (let i = 0; i < artistCount; i++) {
                newArtists.push(makeArtist());
                const albumCount = getRandomIntInclusive(1, 7);
                for (let a = 0; a < albumCount; a++) {
                    newAlbums.push(makeAlbum(newArtists[newArtists.length - 1]));
                }
            }

            const calls = [
                models.Album.collection.insert(newAlbums),
                models.Artist.collection.insert(newArtists)
            ];

            console.log(`Creating ${newArtists.length} artists and ${newAlbums.length} albums.`);
            return Promise.all(calls);
        });
};

const clear = () => {
    console.log("deleting all data");
    return Promise.all([models.Artist.deleteMany({}), models.Album.deleteMany({})]);
};

module.exports = {
    generate,
    clear
};