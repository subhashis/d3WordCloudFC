var lowerLimit = 0;
var lensAperture = 200;
var dis = 6;

var fill = d3.scale.category20b();

var w = window.innerWidth*0.9,
        h = window.innerHeight*0.8;

var max, fontSize;

var layout = d3.layout.cloud()
        .timeInterval(Infinity)
        .size([w, h])
        .fontSize(function(d) {
            if(d.value>lowerLimit){
				return fontSize(+d.value);	
			}
			else{
				return 0;
			} 
        })
        .text(function(d) {
			if(d.value>lowerLimit){
				return d.key;
			}
			else{
				return "";
			}
        })
        .on("end", draw);

var svg = d3.select("#vis").append("svg")
        .attr("width", w)
        .attr("height", h);

var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

//var fisheye = d3.fisheye();
var text;

var fisheye;

var offsetWidth = w >> 1;
var offsetHeight = h >> 1;
console.log([offsetWidth, offsetHeight]);

var xtest = document.getElementById("filter1");
console.log(xtest);
var lensCheck = false;
var disableRot = false;


svg.on("mousemove", function() {
        var mCoord = d3.mouse(this); 
        console.log(xtest);
        fisheye = d3.fisheye.circular().radius(lensAperture).distortion(dis);
        //console.log(d3.mouse(this));
        //console.log(mCoord[1]);
        //fisheye.focus(d3.mouse(this));
        if(lensCheck)
        {
        mCoord[0] = mCoord[0] - offsetWidth;
        mCoord[1] = mCoord[1] - offsetHeight;
        fisheye.focus(mCoord);
        text.each(function(d) { d.fisheye = fisheye(d); })
            .attr("transform", function(d) {
                console.log(d.size);
                if(!disableRot)
                {
                    if(d.fisheye.rot == -1)
                        return "translate(" + [d.fisheye.x  , d.fisheye.y] + ")rotate(" + d.rotate  + ")";
                    return "translate(" + [d.fisheye.x  , d.fisheye.y] + ")rotate(" + d.rotate  + ")";
                }
                else
                {
                    if(d.fisheye.rot == -1)
                        return "translate(" + [d.fisheye.x  , d.fisheye.y] + ")rotate(" + d.rotate  + ")";
                    return "translate(" + [d.fisheye.x  , d.fisheye.y] + ")rotate(" + d.fisheye.rot  + ")";
                }
            })
            .style("font-size", function(d) {
                if(d.fisheye.size == -1)
                    return d.size + "px";
                return d.fisheye.size + "px";
            })
        }
        });

update();

window.onresize = function(event) {
    update();
};

function draw(data, bounds) {
    var w = window.innerWidth*0.9,
        h = window.innerHeight*0.8;

    svg.attr("width", w).attr("height", h);
	
	

    scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
            h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

    text = vis.selectAll("text")
            .data(data, function(d) {
                return d.text.toLowerCase();
            });
    text.transition()
            .duration(1000)
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            });
    text.enter().append("text")
			.attr("class", "words")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("opacity", 0.1)
            .transition()
            .duration(300)
            .style("opacity", 1);
			
    text.style("font-family", function(d) {
				return d.font;
			})
            .style("fill", function(d) {
                return fill(d.text.toLowerCase());
            })
            .text(function(d) {
                return d.text;
            });

    vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
    //vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + 1.0 + ")");
}

function update() {
    layout.font('impact').spiral('archimedean');
    fontSize = d3.scale['sqrt']().range([10,100]);
    if (tags.length){
		fontSize.domain([+11 || 1, +813]);
//        fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
	//fontSize.domain([10, +tags[0].value]);
    }
    layout.stop().words(tags).start();
}




function updateData() {
		var elements = document.getElementsByClassName("words")
		for(var i = elements.length - 1; i >= 0; i--) {
				elements[i].remove();
		}
		update();
}

function lowerLimtSliderChanged() {
	var x = document.getElementById("filter").value;
	lowerLimit = x;
	document.getElementById('lowerLimitOutput').innerHTML = x;
	updateData();
}

function changeLensAperture() {
    var x = document.getElementById("aperture").value;
    lensAperture = x;
    document.getElementById('lenAperture').innerHTML = x;
}

function changeLensDistortion() {
    var x = document.getElementById("distortion").value;
    dis = x;
    document.getElementById('lenDistortion').innerHTML = x;
}

function activateLens(cb) {
    lensCheck = cb.checked;
    console.log("activateLens new value = " + cb.checked);
}

function rotateLens(cb) {
    disableRot = cb.checked;
    console.log("rotateLens new value = " + cb.checked);
}


