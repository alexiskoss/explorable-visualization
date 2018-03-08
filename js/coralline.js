sr.reveal('#coral-line', { duration: 1000, delay: 1000 });
let lineData;
let highArray;
let mediumArray;
let lowArray;
let noArray;

let waypoint = new Waypoint({
  element: document.getElementById('coral-map-explain'),
  handler: function (direction) {
    intialize("all");
  }
})

d3.csv("data/CoralBleachingCleaned.csv", function (error, data) {

  //for creation of zipcode drop menu
  var select = d3.select("#bleaching-filter")
  .append("select")
  .attr("id", "filterBleaching")
  
  select
  .on("change", function(d) {
    console.log(this.value);
    intialize(this.value);
  });

  select
  .append("option")
  .attr("value", "all")
  .text("All")

  select
  .append("option")
  .attr("value", "high")
  .text("High")

  select
  .append("option")
  .attr("value", "medium")
  .text("Medium")

  select
  .append("option")
  .attr("value", "low")
  .text("Low")

  select
  .append("option")
  .attr("value", "none")
  .text("None")


});

/* reference on help with line graph: http://bl.ocks.org/markmarkoh/8700606 */
function intialize(filterVal) {
  var margin = { top: 80, right: 80, bottom: 80, left: 80 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


  // scales/axes
  var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true).tickFormat(d3.format("d")),
    yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

  // An area generator, for the light fill.
  var area = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) { return x(d.year); })
    .y0(height)
    .y1(function (d) { return y(parseFloat(d.percentage_affected)); });

  // A line generator, for the dark stroke.
  var line = d3.svg.line()
    .interpolate("monotone")
    .x(function (d) { return x(d.year); })
    .y(function (d) { return y(parseFloat(d.percentage_affected)); });

  //tool tip
  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("data/CoralBleachingCleaned.csv", function (error, data) {
    
    d3.select("#coral-line svg").remove();

    lineData = data;
    highArray = [];
    mediumArray = [];
    lowArray = [];
    noArray = [];

    if(filterVal == "high" || filterVal == "all") {
      console.log(filterVal);
      var high = data.filter(function (d) {
        return d.bleaching_severity == "HIGH";
      });

      var highBleaching = {}
      highArray = [];
      for (i = 0; i < high.length; i++) {
        if (highBleaching[high[i].year] == undefined) {
          highBleaching[high[i].year] = 1;
        } else {
          highBleaching[high[i].year] = highBleaching[high[i].year] + 1;
        }
      }

      for (var key in highBleaching) {
        highArray.push({ year: key, percentage_affected: highBleaching[key] })
      }
    }

    if(filterVal == "medium" || filterVal == "all") {
      console.log("what")
      var medium = data.filter(function (d) {
        return d.bleaching_severity == "Medium";
      });

      var mediumBleaching = {}
      mediumArray = [];
      for (i = 0; i < medium.length; i++) {
        if (mediumBleaching[medium[i].year] == undefined) {
          mediumBleaching[medium[i].year] = 1;
        } else {
          mediumBleaching[medium[i].year] = mediumBleaching[medium[i].year] + 1;
        }
      }

      for (var key in mediumBleaching) {
        mediumArray.push({ year: key, percentage_affected: mediumBleaching[key] })
      }
    }

    if(filterVal == "low" || filterVal == "all") {
      var low = data.filter(function (d) {
        return d.bleaching_severity == 'Low';
      });

      var lowBleaching = {}
      lowArray = [];
      for (i = 0; i < low.length; i++) {
        if (lowBleaching[low[i].year] == undefined) {
          lowBleaching[low[i].year] = 1;
        } else {
          lowBleaching[low[i].year] = lowBleaching[low[i].year] + 1;
        }
      }

      for (var key in lowBleaching) {
        lowArray.push({ year: key, percentage_affected: lowBleaching[key] })
      }
    }

    if(filterVal == "none" || filterVal == "all") {
      var no = data.filter(function (d) {
        return d.bleaching_severity == 'No Bleaching';
      });

      var noBleaching = {}
      noArray = [];
      for (i = 0; i < no.length; i++) {
        if (noBleaching[no[i].year] == undefined) {
          noBleaching[no[i].year] = 1;
        } else {
          noBleaching[no[i].year] = noBleaching[no[i].year] + 1;
        }
      }

      for (var key in noBleaching) {
        noArray.push({ year: key, percentage_affected: noBleaching[key] })
      }
    }

    x.domain(d3.extent(data, function (d) { return d.year; })).nice();
    y.domain([0, 260]);

    // Add an SVG element with the desired dimensions and margin.
    var svgLine = d3.select("#coral-line").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + 30 + "," + margin.top + ")")

    // Add the clip path.
    svgLine.append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    // Add the x-axis.
    svgLine.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", 420)
      .attr("y", 40)
      .style("text-anchor", "end")
      .text("Year");

    // Add the y-axis.
    svgLine.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (width + 10) + "," + -5 + ")")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 45)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("# Of Bleaching Cases Reported")

    /* for help on highlighting one line http://bl.ocks.org/Matthew-Weber/5645518*/
    svgLine.selectAll('.line')
      .data([highArray, mediumArray, lowArray, noArray])
      .enter()
      .append('path')
      .attr('class', 'line')
      .style('stroke', function (d) {
        if (d == highArray) {
          return "#ec4e4e";
        } else if (d == mediumArray) {
          return "#ee9a54";
        } else if (d == lowArray) {
          return "#f6df53";
        } else if (d == noArray) {
          return "#00994C";
        }
      })
      .on("mouseover", function (d) {
        d3.select(this)                          //on mouseover of each line, give it a nice thick stroke
          .style("stroke-width", '6px')
        var selectLines = $('.line').not(this);     //select all the rest of the lines, except the one you are hovering on and drop their opacity
        d3.selectAll(selectLines)
          .style("opacity", 0.3);
      })
      .on("mouseout", function (d) {        //undo everything on the mouseout
        d3.select(this)
          .style("stroke-width", '2.5px');
        var selectLines = $('.line').not(this);
        d3.selectAll(selectLines)
          .style("opacity", 1);
      })
      .attr('clip-path', 'url(#clip)')
      .attr('d', function (d) {
        return line(d);
      });

    svgLine.selectAll("dot")
      .data(highArray)
      .enter().append("circle")
      .attr("r", 3)
      .style("fill", '#942727')
      .attr("cx", function (d) { return x(d.year); })
      .attr("cy", function (d) { return y(d.percentage_affected); })
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Year: " + d.year + "<br/>" + "Cases: " + d.percentage_affected)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    svgLine.selectAll("dot")
      .data(mediumArray)
      .enter().append("circle")
      .attr("r", 3)
      .style("fill", '#b8850a')
      .attr("cx", function (d) { return x(d.year); })
      .attr("cy", function (d) { return y(d.percentage_affected); })
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Year: " + d.year + "<br/>" + "Cases: " + d.percentage_affected)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    svgLine.selectAll("dot")
      .data(lowArray)
      .enter().append("circle")
      .attr("r", 3)
      .style("fill", '#d8d00d')
      .attr("cx", function (d) { return x(d.year); })
      .attr("cy", function (d) { return y(d.percentage_affected); })
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Year: " + d.year + "<br/>" + "Cases: " + d.percentage_affected)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    svgLine.selectAll("dot")
      .data(noArray)
      .enter().append("circle")
      .attr("r", 3)
      .style("fill", '#075410')
      .attr("cx", function (d) { return x(d.year); })
      .attr("cy", function (d) { return y(d.percentage_affected); })
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Year: " + d.year + "<br/>" + "Cases: " + d.percentage_affected)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    //creates legend for the line graph
    var legend = svgLine.selectAll(".legend")
      .data(["#ec4e4e", "#ee9a54", "#f6df53", "#00994C"])
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) { return "translate(" + -600 + ',' + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function (d) {
        return d;
      });

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function (d) {
        if (d == "#ec4e4e") {
          return "High"
        } else if (d == "#ee9a54") {
          return "Med"
        } else if (d == "#f6df53") {
          return "Low"
        } else {
          return "None"
        }
      });

    /* Add 'curtain' rectangle to hide entire graph */
    var curtain = svgLine.append('rect')
      .attr('x', -1 * (width + 3))
      .attr('y', -1 * (height + 3))
      .attr('height', height + 3)
      .attr('width', width + 3)
      .attr('class', 'curtain')
      .attr('transform', 'rotate(180)')
      .style('fill', '#ffffff')

    /* Create a shared transition for anything we're animating */
    var t = svgLine.transition()
      .delay(750)
      .duration(6000)
      .ease('linear')
      .each('end', function () {
        d3.select('line.guide')
          .transition()
          .style('opacity', 0)
          .remove()
      });

    t.select('rect.curtain')
      .attr('width', 0);

  });
}
