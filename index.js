function start_trg() {
    var canvas = document.getElementById("trg");
    var w = $("#trg").width();
    canvas.width = w;
    canvas.height = w;
    TRG(canvas);
}

function start_hotrg() {
    var canvas = document.getElementById("hotrg");
    var w = $("#hotrg").width();
    canvas.width = w;
    canvas.height = w;
    HOTRG(canvas);
}

$(function () {
    start_trg();
    start_hotrg();
});
