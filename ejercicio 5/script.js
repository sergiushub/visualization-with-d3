console.log('running');

var datos = [1,10,20,30,40,50];

d3.select('body')
.selectAll("p")
.data(datos)
.enter()
.append("p")
.text(function(d){return "Párrafo " + String(d);})
.style("color", function(d,i){return (i%2)?"black":"red"});