"use strict";

const PORT = 3333;


const http = require("http");

const db = require("./db.js");


http.createServer((request,response)=>{
    return Promise.resolve()
        .then(() => console.log(`[${new Date().toISOString()}] ${request.url}`))
        .then(() => ParseBody(request))
        .then((opt) => {console.log(`\t${JSON.stringify(opt)}`); return opt;})
        .then((opt) => db.Calc(opt))
        .then((res) => {console.log(`\tcount: ${res.length}`); return res;})
        .then((res) => response.end(JSON.stringify(res, null, " ")))
        .catch((error) => console.error(error) && response.statusCode(500).end());
}).listen(PORT, ()=>{
    console.log("PORT", PORT);
});


function ParseBody(request){
    if(request.method.toLowerCase() !== "post")
        return Promise.resolve({});
    return new Promise((RESOLVE, REJECT)=>{
        var rawData = "";
        request
            .on("error", error => REJECT(error))
            .on("data", chunk => rawData+=chunk)
            .on("end", () => RESOLVE(JSON.parse(rawData)) );
    });
}