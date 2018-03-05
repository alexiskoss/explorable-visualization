let rows = parseInt($("#rows").val());
let columns = parseInt($("#columns").val());
let divideVal = 0;
let boardSize = 0;
let value = 0;
let coralRows = Math.floor(rows * 0.70);
let fishRows = rows - coralRows;
let tempChoice = 25;
let timer;
gridSize();

/*var colors = d3.scale.threshold()
  .range(["#011628", "#083051", "#1d5482", "#4f8ec1", "#a07070", "#752e2e"])
  .domain([0, 18, 23, 30, 41, 61]);*/

var coralColors = d3.scale.threshold()
  .range(["#FFFFFF", "#EFE5E5", "#E6A1B2", "#E05073", "#E6A1B2", "#EFE5E5"])
  .domain([0, 18, 23, 30, 41, 61]);

var oceanSlider = d3.select('#ocean-slider')
oceanSlider.append('input')
    .attr('id', 'ocean-input')
    .attr('type', 'range')
    .attr('min', 0)
    .attr('max', 60)
    .attr('step', 1)
    .attr('value', 25)
    .on('change', function () {
    $('#slider-value').empty();
    $('#slider-value').append(`Current water temperature: ${$("#ocean-input").val()}° C`)
    tempChoice = parseInt(d3.select('#ocean-input').property('value'));
    /*d3.selectAll('.ocean')
      .transition()
      .duration(1000)
      .style('background-color', colors(tempChoice));*/

    if(tempChoice < 23 || tempChoice > 29) {
      clearInterval(timer);
    } else {
      timer = setInterval(populate, 7000);
    }

    $('#ocean-status').empty();
    if(tempChoice < 18) {
      $('#ocean-status').append("Ocean temperature is too cold!")
    } else if(tempChoice >= 18 && tempChoice < 23) {
      $('#ocean-status').append("Ocean temperature is cold!")
    } else if(tempChoice >=23 && tempChoice <= 29) {
      $('#ocean-status').append("Ocean temperature is optimal!")
    } else if(tempChoice > 29 && tempChoice <=40) {
      $('#ocean-status').append("Ocean temperature is tolerable!")
    } else if(tempChoice > 40) {
      $('#ocean-status').append("Ocean temperature is too hot!")
    }

    d3.selectAll('.coral').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

    });

function populate() {
  let fishExit = false;
  let coralExit = false;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let = randomNumber = Math.floor((Math.random() * 100) + 1)
      if (fishRows >= i) {
        if (fishExit) {
          break;
        }
        if ($(`#row${i} #col${j} span`).html() == "") {
          if (randomNumber <= 5) {
            $(`#row${i} #col${j} span`).append(`<img class="fish" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px">`);
            fishExit = true;
          }
        }
      } else {
        if (coralExit) {
          break;
        }
        if ($(`#row${i} #col${j} span`).html() == "") {
          if (randomNumber <= 10) {
            $(`#row${i} #col${j} span`).append(`<img class="coral" src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px">`);
            coralExit = true;
          }
        }
      }
      $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
      convertToSvg();

      if (fishExit || coralExit) {
        break;
      }
    }
    if (fishExit || coralExit) {
      break;
    }
  }
}

$("#rows").on("input", function (e) {
  gridSize();
});

$("#columns").on("input", function (e) {
  gridSize();
});

function gridSize() {
  rows = parseInt($("#rows").val());
  columns = parseInt($("#columns").val());
  coralRows = Math.floor(rows * 0.70);
  fishRows = rows - coralRows;

  if (columns > rows) {
    boardSize = 528;
    divideVal = columns;
    value = Math.floor(boardSize / divideVal);
  } else {
    boardSize = 462;
    divideVal = rows;
    value = Math.floor(boardSize / divideVal);
  }

  $("#grid-bg").empty();
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      if (j == 1) {
        $("#grid-bg").append(`<div id="row${i}"></div>`)
        $(`#row${i}`).css("height", value);
      }

      let = randomNumber = Math.floor((Math.random() * 100) + 1)
      if (fishRows >= i) {
        if (randomNumber <= 40) {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span><img class="fish" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`);
        } else {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span></span></div>`);
        }
      } else {
        if (randomNumber <= 70) {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span><img class="coral" src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`);
        } else {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span></span></div>`);
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

    timer = setInterval(populate, 7000);
}

$(document).ready(function() {
  convertToSvg();
});

function convertToSvg() {
  $('img[src$=".svg"]').each(function() {
    var $img = jQuery(this);
    var imgURL = $img.attr('src');
    var attributes = $img.prop("attributes");

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Remove any invalid XML tags
        $svg = $svg.removeAttr('xmlns:a');

        // Loop through IMG attributes and apply on SVG
        $.each(attributes, function() {
            $svg.attr(this.name, this.value);
        });

        // Replace IMG with SVG
        $img.replaceWith($svg);
    }, 'xml');
  });
}
