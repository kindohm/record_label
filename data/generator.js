const models = require('./models');
const words = require('./words');
const moment = require('moment');

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const used = [];

const makeNameFunctions = [
    words.nounSingular,
    words.nounPlural,
    words.verbPresent,
    words.verbIng,
    words.verb,
    () => { return `${words.adjective()} and ${words.verbIng()}` },
    () => { return `${words.adjective()} and ${words.adjective()}` },
    () => { return `${words.nounPlural()} ${words.verb()}` },
    () => { return `${words.verbIng()} ${words.adjective()} ${words.nounPlural()}` },
    () => { return `${words.adjective()} ${words.verbIng()} ${words.nounPlural()}` },
    () => { return `${words.verbIng()} ${words.adjective()} ${words.nounSingular()}` },
    () => { return `${words.adjective()} ${words.verbIng()} ${words.nounSingular()}` },
    () => { return `${words.adjective()} ${words.nounSingular()}` },
    () => { return `${words.adjective()} ${words.nounPlural()}` },
    () => { return `${words.verbIng()} ${Math.random() > 0.95 ? 'the ' : ''}${words.nounSingular()}` },
    () => { return `${words.verbIng()} ${Math.random() > 0.95 ? 'the ' : ''}${words.nounPlural()}` },
    () => { return `${words.verbPresent()} ${Math.random() > 0.8 ? 'the ' : ''}${words.nounPlural()}` },
    () => { return `${words.verbPresent()} ${Math.random() > 0.95 ? 'the ' : ''}${words.nounSingular()}` },
    () => { return `${words.verb()} ${words.nounSingular()}` },
    () => { return `${words.verb()} ${words.nounPlural()}` }];

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

const makeName = (addThe) => {
    let name = '';
    while (name === '' || used.includes(name)) {
        name = makeNameFunctions[getRandomIntInclusive(0, makeNameFunctions.length - 1)]();
        if (addThe && Math.random() > 0.95) {
            name = `the ${name}`;
        }

        if (Math.random() > 0.05) {
            name = toTitleCase(name);
        } else if (Math.random() > 0.025) {
            name = name.toUpperCase();
        }
    }
    return name;
}

const generate = () => {

    console.log('generating new data');

    return words.fillAll()
        .then(() => {
            const artistCount = getRandomIntInclusive(10, 50);
            for (let i = 0; i < artistCount; i++) {
                const artist = new models.Artist();
                artist.name = makeName();
                console.log(`Saving new artist ${artist.name}`);
                artist.save()
                    .then(newArtist => {
                        const albumCount = getRandomIntInclusive(1,10);
                        for (let a = 0; a < albumCount; a++){
                            const album = new models.Album();
                            album.artistId = newArtist._id;
                            album.title = makeName();
                            album.releaseDate = moment().subtract(getRandomIntInclusive(1,1000), 'days').toDate();
                            console.log(`new album: ${album.title}`);
                            album.save();
                        }
                    });
            }
            return;
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