/*http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html*/
var width = '100%',
    height = 560;

var projection = d3.geo.mercator()
    .center([0,5])
    .scale(300)
    .rotate([0,0]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g");

var circleScale = d3.scale.sqrt().domain([0, 100]).range([0, 10]);

// load and display the World
d3.json("json/world-110m2.json", function(error, topology) {
    d3.csv("data/CoralBleachingCleaned.csv", function(error, data) {
        g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
            })
            .attr("r", function(d) {
                /*
                if(parseFloat(d.percentage_affected) == 0) {
                    return 1;
                } else if(parseFloat(d.percentage_affected) > 0 && parseFloat(d.percentage_affected) <= 20) {
                    return 3;
                } else if(parseFloat(d.percentage_affected) > 20 && parseFloat(d.percentage_affected) <= 40) {
                    return 6;
                } else if(parseFloat(d.percentage_affected) > 40 && parseFloat(d.percentage_affected) <= 60) {
                    return 9;
                } else if(parseFloat(d.percentage_affected) > 60 && parseFloat(d.percentage_affected) <= 80) {
                    return 12;
                } else if(parseFloat(d.percentage_affected) > 80) {
                    return 15;
                }*/
                return circleScale(parseFloat(d.percentage_affected)+1);
            })
            .attr("opacity", "0.8")
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
            });
    });               

    g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
});

var body = d3.select('#coral-map')

body.append('p').text('Select radius size:')
body.append('input')
  .attr('class','inputRadius')
  .attr('type','range')
  .attr('min',1983)
  .attr('max',2010)
  .attr('step',1)
  .attr('value',40)
  .on('change',function() {
  	
  })

svg.call(zoom)