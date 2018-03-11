let rows = 8;
let columns = 9;
let divideVal = 0;
let boardSize = 0;
let value = 0;
let tempChoice = 25;
let popTimer;
let shrinkPopTimer;
let popFishTimer;
let shrinkTideTimer;
let shrinkTideArray = [];
let popTimerArray = [];
let shrinkPopArray = [];
let popFishArray = [];
let lowTide = Math.floor(rows * 0.50);
let normalTide = Math.floor(rows * 0.30);
let currentTide = 1;

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
  $('#tideInput').attr("disabled", false);
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
  $('#tideInput').attr("disabled", true);
});

$('#cold-temp').click(function () {
  tempChoice = 17;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is below 18° C`);

  removeDeadCoral();

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop removing fish + killing coral during hot bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // start shrinking fish pop + killing coral
  shrinkPopTimer = setInterval(shrink, 3000);
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

  removeDeadCoral();

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

  removeDeadCoral();

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

  removeDeadCoral();

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

  removeDeadCoral();

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
  shrinkPopTimer = setInterval(shrink, 3000);
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

  for (let i = currentTide; i <= rows; i++) {
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
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if ($(`#row${i} #col${j} span`).html() != "") {
        if (randomNumber <= 20 && ($(`#row${i} #col${j} span`).hasClass("dead") || $(`#row${i} #col${j} span`).hasClass("fish"))) {
          $(`#row${i} #col${j}`).empty();
        } else if (randomNumber >= 80 && $(`#row${i} #col${j} span`).hasClass("coral")) {
          $(`#row${i} #col${j} span`).addClass("dead");
          d3.select(`#row${i} #col${j} span .coral-svg`).selectAll('path')
            .transition()
            .duration(1000)
            .style('fill', "#3e3433");
        }
      }
    }
  }
}

function tideShrink() {
  for (let i = 1; i <= currentTide; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if ($(`#row${i} #col${j} span`).html() != "") {
        if (randomNumber > 70 && $(`#row${i} #col${j} span`).hasClass("stressed")) {
          $(`#row${i} #col${j} span`).addClass("bleached");
          $(`#row${i} #col${j} span`).removeClass("stressed");
          d3.select(`#row${i} #col${j} span .coral-svg`).selectAll('path')
            .transition()
            .duration(1000)
            .style('fill', "#FFFFFF");
        } else if (randomNumber > 70 && $(`#row${i} #col${j} span`).hasClass("bleached")) {
          $(`#row${i} #col${j} span`).addClass("dead");
          $(`#row${i} #col${j} span`).removeClass("bleached");
          d3.select(`#row${i} #col${j} span .coral-svg`).selectAll('path')
            .transition()
            .duration(1000)
            .style('fill', "#3e3433");
        } else if (randomNumber > 70 && $(`#row${i} #col${j} span`).hasClass("dead")) {
          $(`#row${i} #col${j}`).empty();
        } else if (randomNumber <= 70 && $(`#row${i} #col${j} span`).hasClass("coral") && (!$(`#row${i} #col${j} span`).hasClass("dead") && !$(`#row${i} #col${j} span`).hasClass("stressed") && !$(`#row${i} #col${j} span`).hasClass("bleached"))) {
          $(`#row${i} #col${j} span`).addClass("stressed");
          d3.select(`#row${i} #col${j} span .coral-svg`).selectAll('path')
            .transition()
            .duration(1000)
            .style('fill', "#e8acb8");

        }
      }
    }
  }
}

function populate() {
  let exit = false;

  for (let i = currentTide; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if ($(`#row${i} #col${j}`).html() == "") {
        if (randomNumber <= 5) {
          $(`#row${i} #col${j}`).append(`<span class="fish"><img class="fish" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span>`);
          exit = true;
        } else if (randomNumber >= 90) {
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

function gridSize() {
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
      $(`#row${i} #col${j}`).css("height", value);
      $(`#row${i} #col${j}`).css("width", value);
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
    .text('Select tide height: high')
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
    .attr('disabled', true)
    .style("clear", 'both')
    .on('change', function () {
      tideslider.selectAll('p')
        .text(function () {
          let tideHeight = "";
          if (document.getElementById("tideInput").value == 1) {
            // 50% 
            tideHeight = "low"
            makeTide(tideHeight);
          } else if (document.getElementById("tideInput").value == 2) {
            tideHeight = "normal"
            makeTide(tideHeight);
          } else if (document.getElementById("tideInput").value == 3) {
            tideHeight = "high"
            makeTide(tideHeight);
          }
          return 'Select tide height: ' + tideHeight;
        })
    });
}

makeTideSlider();

function makeTide(tideHeight) {
  if (tideHeight === "low") {
    currentTide = lowTide + 1;

    // stop previous tide shrink timers
    for (var idx in shrinkTideArray) {
      clearInterval(shrinkTideArray[idx]);
    }

    // start shrinking coral pop near water line
    shrinkTideTimer = setInterval(tideShrink, 3000);
    shrinkTideArray.push(shrinkTideTimer);

    for (let i = 1; i <= columns; i++) {
      $(`#row${currentTide} #col${i}`).removeClass("tide");
      $(`#row${currentTide} #col${i}`).addClass("ocean");
    }

    for (let i = 1; i <= currentTide - 1; i++) {
      for (let j = 1; j <= columns; j++) {
        $(`#row${i} #col${j}`).addClass("tide");
        $(`#row${i} #col${j}`).removeClass("ocean");
        $(`#row${i} #col${j}`).empty();
      }
    }

    d3.selectAll('.tide')
      .transition()
      .duration(500)
      .style('background-color', "#FFFFFF");
  } else if (tideHeight === "normal") {
    currentTide = normalTide + 1;

    // stop previous tide shrink timers
    for (var idx in shrinkTideArray) {
      clearInterval(shrinkTideArray[idx]);
    }

    // start shrinking coral pop near water line
    shrinkTideTimer = setInterval(tideShrink, 3000);
    shrinkTideArray.push(shrinkTideTimer);

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        $(`#row${i} #col${j}`).removeClass("tide");
        $(`#row${i} #col${j}`).addClass("ocean");
      }
    }

    for (let i = 1; i <= currentTide - 1; i++) {
      for (let j = 1; j <= columns; j++) {
        $(`#row${i} #col${j}`).addClass("tide");
        $(`#row${i} #col${j}`).removeClass("ocean");
        $(`#row${i} #col${j}`).empty();
      }
    }

    d3.selectAll('.tide')
      .transition()
      .duration(500)
      .style('background-color', "#FFFFFF");

    d3.selectAll('.ocean')
      .transition()
      .duration(500)
      .style('background-color', colors(tempChoice));
  } else if (tideHeight === "high") {
    currentTide = 1;

    // stop previous tide shrink timers
    for (var idx in shrinkTideArray) {
      clearInterval(shrinkTideArray[idx]);
    }

    removeDeadCoral();
    d3.selectAll('.coral-svg').selectAll('path')
      .transition()
      .duration(1000)
      .style('fill', coralColors(tempChoice));

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        $(`#row${i} #col${j}`).removeClass("tide");
        $(`#row${i} #col${j}`).addClass("ocean");
      }
    }

    d3.selectAll('.ocean')
      .transition()
      .duration(500)
      .style('background-color', colors(tempChoice));
  }
}

function removeDeadCoral() {
  let deadCoral = d3.selectAll('.dead');
  for (let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }
}
