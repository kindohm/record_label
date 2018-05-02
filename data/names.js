const words = require('./words');
const getRandomIntInclusive = require('./shared').getRandomIntInclusive;

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

let used = [];

const makeNameFunctions = [
    words.nounSingular,
    words.verbPresent,
    words.verbIng,
    words.verb,
    () => { return words.nounPlural() },
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


const makeName = (addThe) => {
    let name = '';
    while (name === '' || (used.includes(name))) {
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

const clearUsed = () => {
    used = [];
};

module.exports = { makeName, clearUsed };
