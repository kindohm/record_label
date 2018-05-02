const Promise = require("bluebird");
const getRandomIntInclusive = require('./shared').getRandomIntInclusive;

let singularNouns = [];
let pluralNouns = [];
let verbs = [];
let ingVerbs = [];
let presentVerbs = [];
let adjectives = [];

const fill = (target, path) => {
    return new Promise((accept, reject) => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(path)
        });

        lineReader.on('line', function (line) {
            if (line.trim() !== '')
                target.push(line);
        });

        lineReader.on('close', () => {
            accept();
        });
    })
};

const getRandom = (target) => {
    return target[getRandomIntInclusive(0, target.length - 1)]
};

module.exports = {
    fillAll: () => {
        singularNouns = [];
        pluralNouns = [];
        verbs = [];
        ingVerbs = [];
        presentVerbs = [];
        adjectives = [];

        return Promise.all([
            fill(pluralNouns, 'data/word-files/nouns-plural.txt'),
            fill(singularNouns, 'data/word-files/nouns-singular.txt'),
            fill(ingVerbs, 'data/word-files/verbs-ing.txt'),
            fill(verbs, 'data/word-files/verbs.txt'),
            fill(presentVerbs, 'data/word-files/verbs-present.txt'),
            fill(adjectives, 'data/word-files/adjectives.txt')]);
    },
    nounSingular: () => {
        return getRandom(singularNouns);
    },
    nounPlural: () => {
        return getRandom(pluralNouns);
    },
    adjective: () => {
        return getRandom(adjectives);
    },
    verbIng: () => {
        return getRandom(ingVerbs);
    },
    verbPresent: () => {
        return getRandom(presentVerbs);
    },
    verb: () => {
        return getRandom(verbs);
    }
};