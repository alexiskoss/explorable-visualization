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
    let coralRows = Math.floor(rows * 0.70);
    let fishRows = rows - coralRows;

    if(columns > rows) {
        boardSize = 528;
        divideVal = columns;
        value = Math.floor(boardSize/divideVal);
    } else {
        boardSize = 484;
        divideVal = rows;
        value = Math.floor(boardSize/divideVal);
    } 
    
    $("#grid-bg").empty();
    for(let i = 1; i <= rows; i++) {
        for(let j = 1; j <= columns; j++) {
            if(j == 1) {
                $("#grid-bg").append(`<div id="row${i}"></div>`)
                $(`#row${i}`).css("height", value);
            }
            
            let = randomNumber = Math.floor((Math.random() * 100) + 1)
            if(fishRows >= i) {
                console.log("fish!")
                console.log(fishRows)
                console.log(i);
                if(randomNumber <= 40) {
                    $(`#row${i}`).append(`<div id="col${j}"><span><img src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`) 
                } else {
                    $(`#row${i}`).append(`<div id="col${j}"><span></span></div>`)
                }
            } else {
                console.log("coral!")
                if(randomNumber <= 70) {
                    $(`#row${i}`).append(`<div id="col${j}"><span><img src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`) 
                } else {
                    $(`#row${i}`).append(`<div id="col${j}"><span></span></div>`)
                }
            } 

            $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
            $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
            $(`#row${i} #col${j}`).css("height", (value) - 2);
            $(`#row${i} #col${j}`).css("width", (value) - 2);
            $(`#row${i} #col${j}`).css("top", value * (i - 1));
            $(`#row${i} #col${j}`).css("left", value * (j - 1));
        }
    }


    console.log($(`#row1 #col1 span`).html());
}
