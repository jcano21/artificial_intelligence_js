// MIT License
// Copyright (c) 2020 Luis Espino

const matriz_adyacencia4x4 = [
	[],
	[2,5,6],
	[1,3,5,6,7],
	[2,4,6,7,8],
	[3,7,8],
	[1,2,6,9,10],
	[1,2,3,5,7,9,10,11],
	[2,3,4,6,8,10,11,12],
	[3,4,7,11,12],
	[5,6,10,13,14],
	[5,6,7,9,11,13,14,15],
	[6,7,8,10,12,14,15,16],
	[7,8,11,15,16],
	[9,10,14],
	[9,10,11,13,15],
	[10,11,12,14,16],
	[11,12,15],
]


const matriz_adyacencia3x3 = [
	[],
	[2, 4, 5],
	[1, 3, 4, 5, 6],
	[2, 5, 6],
	[1, 2, 5, 7, 8],
	[1, 2, 3, 4, 6, 7 ,8, 9],
	[2, 3, 5, 8 ,9],
	[4, 5, 8],
	[4, 5, 6 ,7, 9],
	[5, 6 , 8],
]

function successors4x4(n){
	return matriz_adyacencia4x4[n]
}

function successors3x3(n){
	return matriz_adyacencia3x3[n]
}

function anchura(start, end, successors){
	document.getElementById("log").innerHTML+="<br>".concat("<h3>Breadth First Search</h3>");
	var list = [start];
	while (list.length > 0){
		var current = list.shift();
		document.getElementById("log").innerHTML+="<br>current: ".concat(current);
		if (current == end) {
			document.getElementById("log").innerHTML+="<br>".concat("GOAL FOUND");
			return;
		}
		var temp = successors(current);
		document.getElementById("log").innerHTML+="<br>successors: ".concat(temp);
		list = list.concat(temp);
		document.getElementById("log").innerHTML+="<br>stack: ".concat(list);
	}
	document.getElementById("log").innerHTML+="<br>error: ".concat("GOAL NOT FOUND");	
}

function profundidad(start, end, successors){
	document.getElementById("log").innerHTML+="<br><br>".concat("<h3>Depth First Search (reverse)</h3>");
	var list = [start];
	while (list.length > 0){
		var current = list.shift();
		document.getElementById("log").innerHTML+="<br>current: ".concat(current);
		if (current == end) {
			document.getElementById("log").innerHTML+="<br>".concat("GOAL FOUND");
			return;
		}
		var temp = successors(current);
		temp.reverse();
		document.getElementById("log").innerHTML+="<br>successors: ".concat(temp);
		list = temp.concat(list);
		document.getElementById("log").innerHTML+="<br>stack: ".concat(list);
	}
	document.getElementById("log").innerHTML+="<br>error: ".concat("GOAL NOT FOUND");	
}

//anchura(6, 14, successors4x4)
//profundidad(1, 16, successors4x4)
profundidad(2, 8, successors3x3)
//profundidad(1, 16, successors4x4)


//anchura(1, 9, successors3x3)
//profundidad(1, 16, successors3x3)
