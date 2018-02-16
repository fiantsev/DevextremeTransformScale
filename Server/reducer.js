"use strict";

function Sum(tuples){
    return tuples.reduce((acc,i)=>acc+i,0);
}

function Count(tuples){
    return tuples.length;
}

function Avg(tuples){
    return tuples.reduce((acc,i)=>acc+i,0)/tuples.length;
}

function Min(tuples){
    return tuples.reduce((acc,i)=>acc>i?i:acc,Number.MAX_SAFE_INTEGER);
}

function Max(tuples){
    return tuples.reduce((acc,i)=>acc<i?i:acc,Number.MIN_SAFE_INTEGER);
}

module.exports = {
    sum: Sum,
    count: Count,
    avg: Avg,
    min: Min,
    max: Max,
};