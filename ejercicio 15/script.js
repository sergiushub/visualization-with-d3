console.log('running');

d3.csv("cars.csv", function(data) {
    crearVisualizacion(data);
});

function crearVisualizacion(data) {

	var margin = {top: 20, right: 20, bottom: 30, left: 40};
	var width = 900 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;
	var maxRadious = 10;

	// configuramos el eje x 
	var xValue = function(d) { return parseInt(d['weight (lb)'])};
    var xScale = d3.scale.linear().range([0, width]).domain([0,d3.max(data, xValue)]); 
    var xMap = function(d) { return xScale(xValue(d));};
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	// configuramos el eje y
	var yValue = function(d) { return parseInt(d['0-60 mph (s)']);};
    var yScale = d3.scale.linear().range([height, 0]).domain([0,d3.max(data, yValue)]);
    var yMap = function(d) { return yScale(yValue(d));};
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    // configuramos el radio del punto
    var rValue = function(d) {
					var power = parseInt(d['power (hp)']);
					if (isNaN(power)) {
						return 0;
					} else 
						return power;};
	var rScale = d3.scale.linear().range([0, maxRadious]).domain([0,d3.max(data, rValue)]); 
    var rMap = function(d) { return rScale(rValue(d));};


	// configuramos el color del punto con los cilindros
	var cValue = function(d) { return parseInt(d['cylinders']);};
	var color = d3.scale.category10();

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// eje x
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)

	// eje y
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	
	var dots = svg
		.append("g")
		.selectAll(".dot")
		.data(data);

	dots.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", rMap)
		.attr("cx", xMap)
		.attr("cy", yMap)
		.style("fill", function(d) { return color(cValue(d));})
		.style("opacity","0.5")
		.append("title")
		.text(function(d) {return d['name'];});

	dots.exit().remove();
}