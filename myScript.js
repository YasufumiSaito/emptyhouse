var w = 1000,
		h = 1000;

	var svg = d3.select("#container").append("svg")
								.attr("width", w)
								.attr("height", h);

	d3.json("empty.json", function (error, json) {

		console.log(json);
		var japan = topojson.feature(json, json.objects.japan).features;

    	var projection = d3.geo.mercator()
					        .center([137, 37])
					        .translate([w/2, h/2])
					        .scale(2500);

		var path = d3.geo.path().projection(projection);

		
		var color = d3.scale.linear()
							.domain([9, 12, 16, 19, 22
								])
							.range(["#feebe2", "#fbb4b9","#f768a1","#c51b8a","#7a0177"]);

		svg.selectAll("path")
			.data(japan)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("stroke", "#ccc")
			.attr("stroke-width", .3)
			.attr("fill", function(d, i){
				
				return color(d.properties.empty);
			})
			.on("mouseover", function(d){
				//Show the tooltip
				var x = d3.event.pageX;
				var y = d3.event.pageY - 40;

				d3.select("#tooltip")
					.style("left", x + "px")
					.style("top", y + "px")
					.style("opacity", 1)
					.text( d.properties.empty + " % of the houses in " + d.id + " are vacant.");
			})
			.on("mouseout", function(){
				//Hide the tooltip
				d3.select("#tooltip")
					.style("opacity", 0);
			});

		console.log(japan);				

	});
	//Create the Legend

		var linear = d3.scale.linear()
						.domain([9, 12, 16, 19, 22])
						.range(["#feebe2", "#fbb4b9","#f768a1","#c51b8a","#7a0177"]);
		d3.select("svg").append("g")
			.attr("class", "legendLinear")
			.attr("transform", "translate(100,100)");

		var legendLinear = d3.legend.color()
								.title("Propotion of empty home (%)")
								.shapeHeight(20)
								.shapeWidth(60)
								.shapeRadius(10)
								.cells([9, 12, 16, 19, 22])
								.orient("horizontal")
								.labelAlign("start")
								.scale(linear);	

		svg.select(".legendLinear")
			.call(legendLinear);