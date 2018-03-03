$("#rows").on("input", function(e) {
    gridSize();
});

$("#columns").on("input", function(e) {
    gridSize();
});

function gridSize() {
    let rows = $("#rows").val();
    let columns = $("#columns").val();
    let divideVal = 0;
    let boardSize = 0;

    if(rows > columns) {
        boardSize = 484;
        divideVal = rows;
    } else {
        boardSize = 528;
        divideVal = columns;
    }

    $("#grid").empty();
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
    }
}
