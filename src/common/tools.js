var bcrypt = require('bcrypt');

exports.hash = function(str) {
    return function(cb) {
        bcrypt.hash(str, 10, cb);
    }
}

exports.compare = function(str, hash) {
    return function(cb) {
        bcrypt.compare(str, hash, cb);
    }
}
