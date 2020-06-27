var begin = "thisthisthis";
var end = "   ";
var inc = "thisthis ";
var dec = " thisthis";
var right = "  this";
var left = "this  ";
var write = "this this";
var read = " this ";

this.cells = [0];
this.index = 0;
this.input_buffer = [];
this.output_buffer = [];
this.open_loops = 0;
this.loop = [];

function That(){
	
	this.brainFuck2That = function(){
		console.log("brainFuck2That");
	};
	this.that2BrainFuck = function(){
		console.log("that2BrainFuck");
	};
	this.that2Ascii = function(){
		var input = document.getElementById("That").value;
		this.resetParser();
		while(input.length > 0){
			if(input.indexOf(begin) === 0){
				console.log("found begin!")
				input = input.substring(12);
				this.begin();
			}
			else if(input.indexOf(end) === 0){
				console.log("found end!")
				input = input.substring(3);
				this.end();
			}
			else if(input.indexOf(inc) === 0){
				console.log("found inc!")
				input = input.substring(9);
				this.inc();
			}
			else if(input.indexOf(dec) === 0){
				console.log("found dec!")
				input = input.substring(9);
				this.dec();
			}
			else if(input.indexOf(right) === 0){
				console.log("found right!")
				input = input.substring(6);
				this.right();
			}
			else if(input.indexOf(left) === 0){
				console.log("found left!")
				input = input.substring(6);
				this.left();
			}
			else if(input.indexOf(write) === 0){
				console.log("found write!")
				input = input.substring(9);
				this.write();
			}
			else if(input.indexOf(read) === 0){
				console.log("found read!")
				input = input.substring(6);
				this.read();
			}
			else{
				input = "";
				console.log("Invalid Syntax");
			}
		}
		var output = this.asAscii();
		document.getElementById("Ascii").value = output;
	};
	this.asAscii = function(){
		console.log(this.output_buffer);
		var asciiArr = [];
		for(var i = 0; i < this.output_buffer.length; i++){
			asciiArr[i] = String.fromCharCode(this.output_buffer[i]);
		}
		return asciiArr.join("");
	};
	
	this.ascii2That = function(){
		var input = document.getElementById("Ascii").value;
		this.output = "";
		for(var i = 0; i < input.length; i++){
			for(var j = 0; j < input.charCodeAt(i); j++){
				this.output = this.output.concat(inc);
			}
			this.output = this.output.concat(write);
			this.output = this.output.concat(right);
		}
		document.getElementById("That").value = this.output;
	};	
	
	this.resetParser = function(){
        this.cells = [0];
		this.index = 0;
		this.input_buffer = [];
		this.output_buffer = [];
		this.open_loops = 0;
		this.loop = [];
	};
	
	this.inc = function(){
		this.cells[this.index] += 1;
	};
	
	this.dec = function(){
		this.cells[this.index] -= 1;
	};
	
	this.right = function(){
        this.index += 1;
		if(this.index === this.cells.length){
			this.cells.push(0);
		}
	};
	
	this.left = function(){
		if(this.index === 0){
			this.cells.unshift(0);
		}
		else{
			this.index -= 1;
		}
	};
	
	this.write = function(){
		this.output_buffer.push(this.cells[this.index]);
	};
	
	this.read = function(){
		console.log("Reading not implemented");
	};
	
	this.begin = function(){
		console.log("Loops not implemented");
	};
	
	this.end = function(){
		console.log("Loops not implemented");
	};
}
