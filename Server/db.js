"use strict";

const data = require("./data.js");
const reducer = require("./reducer.js");

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
            switch(NestedLevelsCount(opt.filter))
            {
                case 2:
                    tuples = FilterL2(tuples, opt.filter);
                    break;
                case 3:
                    tuples = FilterL3(tuples, opt.filter);
                    break;
                default: throw new Error("Unforeseen case");
            }
        }

        result = {
            summary: opt.totalSummary.length===0?null:[tuples.reduce((acc, i)=>acc+i[opt.totalSummary[0].selector], 0)],
            totalCount: tuples.length,
            data: GroupRecursive(opt.group, tuples, opt).sort((a,b)=>a.key.localeCompare(b.key)),
            groupCount: -1,
        };
    }
    return result;
}


function GroupRecursive(groupBy, tuples, opt){
    if(groupBy.length===0)  return null;
    else
    {
        var groups = Object.keys(
            tuples.reduce((acc,i)=>{acc[i[groupBy[0].selector]] = true; return acc;}, {})
        );

        var result = groups.map(gr=>{
            let filtered = tuples.filter(t=>t[groupBy[0].selector]===gr);
            let summary = opt.groupSummary.map(
                grsum => reducer[grsum.summaryType](
                    filtered.map(t=>t[grsum.selector])
                )
            );
            return {key:gr, items:GroupRecursive(groupBy.slice(1), filtered, opt), summary: summary, count: filtered.length};
        });

        return result;
    }
}

function NestedLevelsCount(filter){
    var result = 0;
    while(Array.isArray(filter)&&++result&&(filter=filter[0]));
    return result;
}

function FilterL1(tuples, filters){
    return tuples.filter(t => t[filters[0]]===filters[2] );
}

function FilterL2(tuples, filters){
    let result = FilterL1(tuples, filters[0]);

    let opReg = null;
    let prevFilter = JSON.stringify(filters[0]);
    for(let theFilter of filters.slice(1))
    {
        if(typeof(theFilter) === "string")
        {
            opReg = theFilter;
            continue;
        }
        else
        {
            if(prevFilter === JSON.stringify(theFilter))
                continue;// DevExtreme часто пресылает в таком виде: [["ShipCountry", "=", "Brazil"], "or", ["ShipCountry", "=", "Brazil"]]
            if(opReg === null)
                throw new Error(`Invalid opReg ${opReg}`);
            if(opReg === "or")
                result = result.concat(FilterL1(tuples, theFilter));
            else
                result = FilterL1(result, theFilter);
        }
    }
    return result;
}

function FilterL3(tuples, filters){
    let result = FilterL2(tuples, filters[0]);

    let opReg = null;
    for(let theFilter of filters.slice(1))
    {
        if(typeof(theFilter) === "string")
        {
            opReg = theFilter;
            continue;
        }
        else
        {
            if(opReg === null)
                throw new Error("Invalid opReg");
            if(opReg === "or")
                result = result.concat(FilterL2(tuples, theFilter));
            else
                result = FilterL2(result, theFilter);
        }
    }
    return result;
}

module.exports = {
    Calc
};