var util = require("util");

var RedisCookieStore = require('redis-cookie-monster');
var CookieStorage = require('./cookie-storage');

function CookieRedisStorage(id, options) {
    if(!options) options = {
        port: 6379,
        host: '127.0.0.1'
    };

    CookieStorage.call(this, new RedisCookieStore(id,options));
}

CookieRedisStorage.prototype.destroy = function () {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.storage.removeCookies(CONSTANTS.HOSTNAME,null,function(err){
            if (err) return reject(err);
            resolve();
        })
    });
}

util.inherits(CookieRedisStorage, CookieStorage);
module.exports = CookieRedisStorage;