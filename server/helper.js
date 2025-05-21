const bcrypt = require('bcrypt');

function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function hashPassword(name){
    const raw = name.toLowerCase().replace('/\s/g', '');
    return bcrypt.hashSync(raw, 12);
}
module.exports = {randomChoice, hashPassword};