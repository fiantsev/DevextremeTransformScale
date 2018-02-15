"use strict";

const data = require("./data.js");

function Calc(opt){
    var res = JSON.parse(JSON.stringify(data));

    if(opt.skip) res = res.slice(opt.skip);
    if(opt.take) res = res.slice(0, opt.take);

    return res;
}

module.exports = {
    Calc
};