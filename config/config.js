// RENAME file to config.js and place keys

const config = {};

config.jwtSecret = "FAKEKEY";
config.db = {
    dbLink: "mongodb://localhost:27017/clinic",
}
module.exports = config;

