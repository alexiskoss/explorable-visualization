window.sr = ScrollReveal();

sr.reveal('.coral-container p', { duration: 1000, delay: 300 }, 100);
sr.reveal('#coral-map', { duration: 1000, delay: 1000 });

var dataset; //original dataset
var filterData = "";
let prevYear;
let year = 1983;
let timer;

/*http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html*/
var width = '100%',
    height = 560;

var projection = d3.geo.mercator()
    .center([0,5])
    .scale(300)
    .rotate([0,0]);

tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 
    return "Country: " + d.country + "</br>" + "Percentage Affected: " +  d.percentage_affected + "<br/>" + "Bleaching Severity: " + d.bleaching_severity + "<br/>" + "Year Reported: " + d.year});

var svg = d3.select("#coral-map").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

svg.call(tip)

var g = svg.append("g");

//scale for circle data points
var circleScale = d3.scale.sqrt().domain([0, 100]).range([0, 10]);

var mapLegend = d3.select("#coral-map-legend").append("svg")
    .attr("width", '100%')
    .attr("height", 80);

svg
    .data(["Percentage of coral affected:"])
    .append("text")
        .text(function (d) { return d; })
        .attr("x", 10)
        .attr("y", 20)

//legend for circle sizes
svg.append("g")
  .attr("class", "legendSize")
  .attr("transform", "translate(20, 40)");

var legendSize = d3.legend.size()
  .scale(circleScale)
  .shape('circle')
  .shapePadding(25)
  .labelOffset(20)
  .orient('horizontal');

svg.select(".legendSize")
  .call(legendSize);

// load and display the World
d3.json("json/world-110m2.json", function(error, topology) {
    if(error) throw error;
    d3.csv("data/CoralBleachingCleaned.csv", function(error, data) {
        if(error) throw error;

        dataset = data;

        g.selectAll("path")
            .data(topojson.object(topology, topology.objects.countries)
                .geometries)
            .enter()
            .append("path")
            .attr("d", path)

            var waypoint = new Waypoint({
                element: document.getElementById('coral-description'),
                handler: function(direction) {
                    timer = setInterval(automaticMap, 1000);
                    automaticMap();
                }
              })
    });               
});

//ensure that only points that aren't already on the map are added, so the entire map doesn't have to be rerendered
function keyfunc(d) {
    return d.id;
}

function drawVis(ndata) {
    var circle = g.selectAll("circle")
        .data(ndata, keyfunc)

    circle.exit()
        .transition()
        .duration(300)
        .ease("exp")
        .attr("r", 0)
            .remove()

    circle.enter().append("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
        })
        .style("opacity", 0.8)
        .style("fill", function(d) {
            if(d.bleaching_severity === "HIGH") {
                return "#ec4e4e"
            } else if(d.bleaching_severity === "Medium") {
                return "#ee9a54"
            } else if(d.bleaching_severity === "Low") {
                return "#f6df53"
            } else {
                return "#00994C"
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr("r", 0);

        circle
        .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
        })
        .style("fill", function(d) {
            if(d.bleaching_severity === "HIGH") {
                return "#ec4e4e"
            } else if(d.bleaching_severity === "Medium") {
                return "#ee9a54"
            } else if(d.bleaching_severity === "Low") {
                return "#f6df53"
            } else {
                return "#00994C"
            }
        })
        .transition()
        .ease("quad")
        .attr("r", function(d) {
            return circleScale(parseFloat(d.percentage_affected)+1);
        })
}

//zooming and panning
var zoom = d3.behavior.zoom()
    .scaleExtent([1, 5])
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
    
});

svg.call(zoom)
    .on("wheel", function() { d3.event.preventDefault(); });

var coralmaptitle = d3.select('#coral-map-title');
var coralmapdesc = d3.select('#coral-map-desc');
var coralmapslider = d3.select("#coral-map-slider");

coralmapdesc.append('p').style("text-align", "center").append('button').text('Reset map animation')
    .on('click', function() {
        clearInterval(timer)
        timer = setInterval(automaticMap, 1000);
        year = 1983;
        automaticMap();
    });

coralmapslider .append('input')
  .style("text-align", "center")
  .attr('class','inputRadius')
  .attr('id', 'yearInput')
  .attr('type','range')
  .attr('min',1983)
  .attr('max',2010)
  .attr('step',1)
  .attr('value',2010)
  .style("clear", 'both')
  .style("margin-top", "18px")
  .on('change',function() {
    coralmaptitle.selectAll('h1').remove()
    coralmaptitle.append('h1') 
        .text('Coral Bleaching in ' + document.getElementById("yearInput").value);
        
    coralmapslider .selectAll('p').remove();
    coralmapslider .append('p')
        .text('Select year: ' + document.getElementById("yearInput").value)
        .style("float", 'left')
        .attr("id", "#range-desc");

  	filterUpdate(dataset);
  });

coralmapslider .append('p')
    .text('Select year: ' + document.getElementById("yearInput").value)
    .style("float", 'left')
    .attr("id", "#range-desc");

function filterUpdate(dataset) {
    let currentYear = document.getElementById("yearInput").value;

    filterData = dataset;

    if(currentYear != '2010') {
        filterData = filterData.filter(d => d.year <= currentYear); 
    }
    
    drawVis(filterData);
}

function linkUpdate(year) {
    let currentYear = year;
    filterData = dataset;

    d3.select("#yearInput")
        .attr('value', year);

    coralmaptitle.selectAll('h1').remove()
    coralmaptitle.append('h1') 
        .text('Coral Bleaching in ' + document.getElementById("yearInput").value);

    if(currentYear != '2010') {
        filterData = filterData.filter(d => d.year <= currentYear); 
    }

    let coralMap = document.getElementById('coral-map-title');
    $("#coral-map-title").get(0).scrollIntoView();
    
    drawVis(filterData);
}

function automaticMap() {
    if(year <= 2010) {
        coralmaptitle.selectAll('h1').remove()
        coralmaptitle.append('h1') 
            .text('Coral Bleaching in ' + year)

        mapAnimation(dataset, year);
        year++;
    } else {
        clearInterval(timer)
    }
}

function mapAnimation(dataset, year) {
    let currentYear = parseInt(year);

    filterData = dataset;

    if(currentYear != '2010') {
        filterData = filterData.filter(d => d.year <= currentYear); 
    }
    
    drawVis(filterData);
}

//creates legend for the map graph
var legend = svg.selectAll(".legend")
    .data(["#ec4e4e", "#ee9a54", "#f6df53", "#00994C"])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + 320 + ',' + i * 20 + ")"; });

legend.append("rect")
    .attr("x", 30 - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d) {
        return d;
    });

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { 
        if(d == "#ec4e4e") {
            return "High"
        } else if(d == "#ee9a54") {
            return "Med."
        } else if(d == "#f6df53") {
            return "Low"
        } else {
            return "No bleaching"
        }
    });
