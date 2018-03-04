$("#rows").on("input", function(e) {
    gridSize();
});

$("#columns").on("input", function(e) {
    gridSize();
});

function gridSize() {
    let rows = parseInt($("#rows").val());
    let columns = parseInt($("#columns").val());
    let divideVal = 0;
    let boardSize = 0;
    let value = 0;

    console.log(columns)
    console.log(rows)
    console.log(rows > columns)
    if(columns > rows) {
        console.log("cols<rows")
        boardSize = 528;
        divideVal = columns;
        value = Math.floor(boardSize/divideVal);
    } else {
        console.log("rows>cols")
        boardSize = 484;
        divideVal = rows;
        value = Math.floor(boardSize/divideVal);
    } 

    /*$("#grid").empty();
    for(let i = 1; i <= rows; i++) {
        for(let j = 1; j <= columns; j++) {
            if(j == 1) {
                $("#grid").append(`<div id=\"row${i}\"></div>`)
                $(`#row${i}`).css("height", Math.floor(boardSize/divideVal));
            }
            $(`#row${i}`).append("<div></div>")
            $(`#row${i} div`).css("height", Math.floor(boardSize/divideVal));
            $(`#row${i} div`).css("width", Math.floor(boardSize/divideVal));
        }
    }*/

    $("#grid-bg").empty();
    for(let i = 1; i <= rows; i++) {
        for(let j = 1; j <= columns; j++) {
            if(j == 1) {
                $("#grid-bg").append(`<div id="row${i}"></div>`)
                $(`#row${i}`).css("height", value);
            }
            $(`#row${i}`).append(`<div id="col${j}"><span><img src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`)
            $(`#row${i} #col${j} span img`).css("margin-top", "50%");
            $(`#row${i} #col${j}`).css("height", (value) - 2);
            $(`#row${i} #col${j}`).css("width", (value) - 2);
            $(`#row${i} #col${j}`).css("top", value * (i - 1));
            $(`#row${i} #col${j}`).css("left", value * (j - 1));
        }
    }
}
