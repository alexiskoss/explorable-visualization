let rows = parseInt($("#rows").val());
let columns = parseInt($("#columns").val());
let divideVal = 0;
let boardSize = 0;
let value = 0;
let tempChoice = 25;
let popTimer;
let shrinkPopTimer;
let popFishTimer;
let popTimerArray = [];
let shrinkPopArray = [];
let popFishArray = [];

gridSize();

var colors = d3.scale.threshold()
  .range(["#011628", "#0f5c9b", "#3e88c4", "#66a4d6", "#e8dede", "#c4a4a4"])
  .domain([0, 18, 23, 30, 41, 61]);

var coralColors = d3.scale.threshold()
  .range(["#FFFFFF", "#FFFFFF", "#e8acb8", "#E05073", "#e8acb8", "#EFE5E5"])
  .domain([8, 18, 23, 30, 41, 51]);

$('#start').click(function () {
  popTimer = setInterval(populate, 1500);
  popTimerArray.push(popTimer);
  $(this).attr("disabled", true);
  $('#stop').attr("disabled", false);
});

$('#stop').click(function () {
  // stop populating fish during stressed 
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish + coral during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }

  $(this).attr("disabled", true);
  $('#start').attr("disabled", false);
});

$('#cold-temp').click(function () {
  tempChoice = 17;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is below 18° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for (let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop removing fish + killing coral during hot bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // start shrinking fish pop + killing coral
  shrinkPopTimer = setInterval(shrink, 1500);
  shrinkPopArray.push(shrinkPopTimer);
  $('#start').attr("disabled", true);
  $('#stop').attr("disabled", false);

  // stop populating coral + fish during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }

  // stop populating fish during stressed
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }
});

$('#tolerable-cold-temp').click(function () {
  tempChoice = 18;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is between 18° C and 22° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for (let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop populating fish during heat stressed 
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }

  // start populating fish during stressed
  popFishTimer = setInterval(populateFish, 1500);
  popFishArray.push(popFishTimer);
  $('#start').attr("disabled", true);
  $('#stop').attr("disabled", false);

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish + coral during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }
});

$('#optimal-temp').click(function () {
  tempChoice = 23;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is between 23° C and 29° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for (let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // start populating coral + fish
  popTimer = setInterval(populate, 1500);
  popTimerArray.push(popTimer);
  $('#start').attr("disabled", true);
  $('#stop').attr("disabled", false);

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish during stressed
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }
});

$('#tolerable-hot-temp').click(function () {
  tempChoice = 30;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is between 30° C and 40° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for (let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop populating fish during cold stressed 
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }

  // start populating fish during stressed
  popFishTimer = setInterval(populateFish, 1500);
  popFishArray.push(popFishTimer);
  $('#start').attr("disabled", true);
  $('#stop').attr("disabled", false);

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish + coral during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }
});

$('#hot-temp').click(function () {
  tempChoice = 41;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is above 40° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for (let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop removing fish + killing coral during cold bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // start shrinking fish pop + killing coral
  shrinkPopTimer = setInterval(shrink, 1500);
  shrinkPopArray.push(shrinkPopTimer);
  $('#start').attr("disabled", true);
  $('#stop').attr("disabled", false);

  // stop populating coral + fish during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }

  // stop populating fish during stressed
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }
});

function populateFish() {
  let exit = false;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if ($(`#row${i} #col${j}`).html() == "") {
        if (randomNumber <= 3) {
          $(`#row${i} #col${j}`).append(`<span class="fish"><img class="fish" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span>`);
          exit = true;
        }
      }

      $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
      convertToSvg();

      if (exit) {
        break;
      }
    }
    if (exit) {
      break;
    }
  }
}

function shrink() {
  let exit = false;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if ($(`#row${i} #col${j} span`).html() != "") {
        if (randomNumber <= 7) {
          $(`#row${i} #col${j} span`).empty();
          exit = true;
        } else if (randomNumber <= 12) {
          $(`#row${i} #col${j} span`).addClass("dead");
          d3.select(`#row${i} #col${j} span .coral-svg`).selectAll('path')
            .transition()
            .duration(1000)
            .style('fill', "#3e3433");
          exit = true;
        }
      }
      if (exit) {
        break;
      }
    }
    if (exit) {
      break;
    }
  }
}

function populate() {
  let exit = false;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if ($(`#row${i} #col${j}`).html() == "") {
        if (randomNumber <= 5) {
          $(`#row${i} #col${j}`).append(`<span class="fish"><img class="fish" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span>`);
          exit = true;
        } else if (randomNumber <= 10) {
          $(`#row${i} #col${j}`).append(`<span class="coral"><img class="coral-svg" src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px"></span>`);
          exit = true;
        }
      }

      $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
      convertToSvg();

      if (exit) {
        break;
      }
    }
    if (exit) {
      break;
    }
  }
}

$("#rows").on("input", function (e) {
  // stop populating fish during stressed 
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish + coral during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }

  gridSize();
  popTimer = setInterval(populate, 1500);
  popTimerArray.push(popTimer);
});

$("#columns").on("input", function (e) {
  // stop populating fish during stressed 
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish + coral during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }

  gridSize();
  popTimer = setInterval(populate, 1500);
  popTimerArray.push(popTimer);
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

      let randomNumber = Math.floor((Math.random() * 100) + 1)
      if (randomNumber <= 40) {
        $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span class="fish"><img class="fish-svg" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`);
      } else if (randomNumber <= 70) {
        $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span class="coral"><img class="coral-svg" src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`);
      } else {
        $(`#row${i}`).append(`<div class="ocean" id="col${j}"></div>`);
      }


      $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j}`).css("height", (value) - 2);
      $(`#row${i} #col${j}`).css("width", (value) - 2);
      $(`#row${i} #col${j}`).css("top", value * (i - 1));
      $(`#row${i} #col${j}`).css("left", value * (j - 1));
    }
  }
}

$(document).ready(function () {
  convertToSvg();
});

// https://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
function convertToSvg() {
  $('img[src$=".svg"]').each(function () {
    var $img = jQuery(this);
    var imgURL = $img.attr('src');
    var attributes = $img.prop("attributes");

    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Remove any invalid XML tags
      $svg = $svg.removeAttr('xmlns:a');

      // Loop through IMG attributes and apply on SVG
      $.each(attributes, function () {
        $svg.attr(this.name, this.value);
      });

      // Replace IMG with SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
}

let tideslider = d3.select("#tide-slider");

function makeTideSlider() {
  tideslider.append('p')
    .text('Select tide height: normal')
    .attr("id", "tide-desc");

  tideslider.append('input')
    .style("text-align", "center")
    .attr('class', 'inputRadius')
    .attr('id', 'tideInput')
    .attr('type', 'range')
    .attr('min', 1)
    .attr('max', 3)
    .attr('step', 1)
    .attr('value', 3)
    .style("clear", 'both')
    .on('change', function () {
      tideslider.selectAll('p')
        .text(function () {
          let tideHeight = "";
          if (document.getElementById("tideInput").value == 1) {
            tideHeight = "low"
          } else if (document.getElementById("tideInput").value == 2) {
            tideHeight = "normal"
          } else if (document.getElementById("tideInput").value == 3) {
            tideHeight = "high"
          }
          return 'Select tide height: ' + tideHeight;
        })
    });
}

makeTideSlider();
