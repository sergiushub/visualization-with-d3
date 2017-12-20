console.log('running');

d3.csv("cars.csv", function(data) {
    crearVisualizacion(data);
});

function crearVisualizacion(data) {

	var barWidth = 20;
	var height = 300;

	var pesos = data.map(
		function(d){
			return parseInt(d['weight (lb)']);
		}
	);

	var xScale = d3.scale.linear()
		.domain([0, d3.max(pesos)])
		.range([0, height]);

	// Generate a histogram using twenty uniformly-spaced bins.
	var layoutData = d3.layout.histogram()
		.bins(xScale.ticks(20))
		(pesos);

	var maxDomain = d3.max(layoutData, function(d){return d.y;});

	var yScale = d3.scale.linear()
		.domain([0, maxDomain])
		.range([0, height]);

	var svg = d3.select("body")
		.append("svg")
		.attr("width", barWidth * layoutData.length)
		.attr("height", height);

	var bar = svg.append("g")
		.selectAll("rect")
		.data(layoutData);

	bar.enter()
		.append("rect")
		.attr("x", function(d,i){return i*barWidth;})
		.attr("y", function(d){return height-yScale(d.y);})
		.attr("width", barWidth - 1)
		.attr("height", function(d){return yScale(d.y);})
		.append("title")
		.text(function(d){return d.y});

	bar.exit().remove();
}