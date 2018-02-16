"use strict";

const data = require("./data.js");

function Calc(opt){
    var result = null;
    var tuples = JSON.parse(JSON.stringify(data));
    if(!opt.group)
    {
        if(opt.skip) tuples = tuples.slice(opt.skip);
        if(opt.take) tuples = tuples.slice(0, opt.take);
        result = tuples;
    }
    else
    {
        if(opt.filter)
        {
            if(opt.filter.length === 1)
                tuples = tuples.filter(i => i[opt.filter[0][0]] === opt.filter[0][2]);
            else
                opt.filter.forEach(f => {
                    if(typeof(f) === "string") return;
                    tuples = tuples.filter(i => i[f[0][0]] === f[0][2]);
                });
        }

        var groups = Object.keys(
            tuples.reduce((acc,i)=>{acc[i[opt.group[0].selector]] = true; return acc;}, {})
        );

        

        result = {
            summary: [tuples.reduce((acc, i)=>acc+i[opt.totalSummary[0].selector], 0)],
            totalCount: tuples.length,
            data: groups.map(gr=>{
                let filtered = tuples.filter(t=>t[opt.group[0].selector]===gr);
                let summary = filtered
                    .map(t=>t[opt.groupSummary[0].selector])
                    .reduce((acc,i)=>acc+i,0);
                return {key:gr, items:null, summary: [summary], count: filtered.length};
            }).sort((a,b)=>a.key.localeCompare(b.key)),
            groupCount: -1,
        };
    }
    return result;
}

module.exports = {
    Calc
};