const scaleXY = 1000;
var scaleX = scaleXY;
var scaleY = scaleXY;
var delta = Number.parseInt($("#delta").val());
var pausedState = true;
var reversedState = false;


window.setInterval(()=>{
    UpdateUI();
    if (pausedState) return;
    UpdateScale();
    UpdateInfo();
    var step = Number.parseInt($("#step").val());
    if (reversedState) {
        scaleX += step; scaleY += step;
    }
    else {
        scaleX -= step; scaleY -= step;
    }
}, delta);

function UpdateScale(){
    $("#dashboard").css("transform", `scale(${scaleX / 1000},${scaleY / 1000})`);
};

function UpdateInfo() {
    $("#scaleInfo").html(`scaleX: ${(scaleX / 10).toFixed(2)}%`);
    $("#dashboardInfo").html(`dashboardInfo: ${exHW($("#dashboard"))}`);
    $("#containerInfo").html(`containerInfo: ${exHW($("#container"))}`);
    $("#pivotInfo").html(`pivotInfo: ${exHW($("#pivot"))}`);
}
UpdateInfo();

function ForceScale() {
    scaleX = Number.parseInt($("#scale").val());
    scaleY = Number.parseInt($("#scale").val());
    UpdateScale();
    UpdateInfo();
}

function exHW(element) {
    var dims = element[0].getBoundingClientRect();
    var hw = { h: dims.height, w: dims.width };
    return `(${hw.h.toFixed(2)},${hw.w.toFixed(2)})`;
}


function UpdateUI(){
    if(pausedState)
    {
        $("#startButton").show();
        $("#stopButton").hide();
    }
    else
    {
        $("#startButton").hide();
        $("#stopButton").show();
    }
}

$("#startButton").click(() => {
    pausedState = false;
});

$("#stopButton").click(() => {
    pausedState = true;
});

$("#reverseButton").click(() => {
    reversedState = !reversedState;
});

$("#resetButton").click(() => {
    scaleX = scaleXY;
    scaleY = scaleXY;
    delta = 50;
    pausedState = true;
    reversedState = false;
    $("#dashboard").css("transform", `scale(${scaleX / 1000},${scaleY / 1000})`);
    window.setTimeout(() => $("#pivot").dxPivotGrid("instance").updateDimensions());
});

$("#updateDimensionsButton").click(() => {
    $("#pivot").dxPivotGrid("instance").updateDimensions();
});