console.log('running');

d3.csv("cars.csv", function(data) {
    crearVisualizacion(data);
});

function crearVisualizacion(data) {

	var pesos = data.map(
		function(d){
			return parseInt(d['weight (lb)']);
		}
	);

	var margin = {top: 10, right: 30, bottom: 30, left: 30};
	var height = 500 - margin.top - margin.bottom;
	var width = 900 - margin.left - margin.right;
	
	var maxDomain = d3.max(pesos);

	var xScale = d3.scale.linear()
		.domain([0, maxDomain])
		.range([0, width]);

	var layoutData = d3.layout.histogram()
		.bins(xScale.ticks(20))
		(pesos);

	var barWidth = width/layoutData.length-1;

	var maxDomain = d3.max(layoutData, function(d){return d.y;});

	var yScale = d3.scale.linear()
		.domain([0, maxDomain])
		.range([height, 0]);

	var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

	var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
	.attr("class", "y axis")
    .call(yAxis);

    svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
    .call(xAxis);
	
	var bar = svg
		.append("g")
		.selectAll("rect")
		.data(layoutData);

	bar.enter()
		.append("rect")
		.attr("x", function(d,i){return i*barWidth;})
		.attr("y", function(d){return yScale(d.y);})
		.attr("width", barWidth-1)
		.attr("height", function(d){return height - yScale(d.y);})
		.append("title")
		.text(function(d){return d.y});

	bar.exit().remove();
}