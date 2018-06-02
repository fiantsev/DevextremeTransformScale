const scaleXY = 0.5;
const scaleX = scaleXY;
const scaleY = scaleXY;


window.setTimeout(()=>{
    $("#dashboard").css("transform", `scale(${scaleX},${scaleY})`);
}, 1000);