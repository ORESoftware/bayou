"use strict";
var bayou_1 = require("bayou");
var fs = require("fs");
var strm = fs.createWriteStream('./fixtures/dundee.log');
bayou_1.default({
    both: [strm]
});
bayou_1.default({
    both: [strm]
});
console.log('smashing');
