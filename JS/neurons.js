var layers=2;
var numLay=10;
var numImp=23;
var numOut=3;
var mutRate=3;
var mult=layers*numLay*numImp*0.8;
function brain(){
	this.inputs=new Array();
	this.neurons=new Array();
	for(i=0;i<layers;i++){
		this.neurons[i]=new Array();
	}
	this.outputs=new Array();
	this.Cost=0;
}

function neuron(t){
	this.threeshold=t;
	this.sum=0;
}
function inputNeuron(t){
	neuron.call(this, t);
	this.synapses=new Array();
}
function outputNeuron(t){
	neuron.call(this, t);
}
function hiddenNeuron(t){
	neuron.call(this, t);
	this.synapses=new Array();
}


inputNeuron.prototype = Object.create(neuron.prototype);
inputNeuron.prototype.constructor = inputNeuron;

outputNeuron.prototype = Object.create(neuron.prototype);
outputNeuron.prototype.constructor = outputNeuron;

hiddenNeuron.prototype = Object.create(neuron.prototype);
hiddenNeuron.prototype.constructor = hiddenNeuron;


function synapse(w){
	this.weight=w;
}
brain.prototype.calculateCost = function(){
	var cost=0;
	for(var i=0;i<layers;i++){
		for(var j=0;j<numLay;j++){
			if(i<(layers-1)){
				for(var w=0;w<numLay;w++){
					cost+=Math.abs(this.neurons[i][j].synapses[w].weight)
				}
			}
			else{
				for(var w=0;w<numOut;w++){
					cost+=Math.abs(this.neurons[i][j].synapses[w].weight);
				}
			}
		}
	}
	for(var i=0;i<numImp;i++){
		for(var w=0;w<numLay;w++){
			cost+=Math.abs(this.inputs[i].synapses[w].weight);
		}
	}
	return cost;
}
brain.prototype.createRandom = function(){

	for(var i=0;i<numImp;i++){
		this.inputs[i]=new inputNeuron(Math.random())
	}

	for(var i=0;i<layers;i++){
		for(j=0;j<numLay;j++){
			this.neurons[i][j]= new hiddenNeuron(Math.random())
		}

	}

	for(var i=0;i<numOut;i++){
		this.outputs[i]=new outputNeuron(Math.random())
	}

for(var i=0;i<layers;i++){
		for(var j=0;j<numLay;j++){
				if(i<(layers-1)){
					for(var w=0;w<numLay;w++){
						this.neurons[i][j].synapses[w]= new synapse((Math.random()*4)-2);
					}
					}
				else{
					for(var w=0;w<numOut;w++){
						this.neurons[i][j].synapses[w]= new synapse((Math.random()*4)-2);
					}
					}
					}
		}
for(var i=0;i<numImp;i++){
	for(var w=0;w<numLay;w++){
		this.inputs[i].synapses[w]=new synapse((Math.random()*4)-2);
	}
	}
this.Cost=this.calculateCost();
}


brain.prototype.cycle = function(){
	this.clear();
	var cost=0;
	for(var i=0;i<numImp;i++){
		
		for(var w=0;w<numLay;w++){
		this.neurons[0][w].sum+=this.inputs[i].synapses[w].weight*this.inputs[i].sum;
		cost+=this.inputs[i].synapses[w].weight
		}

	}

for(var i=0;i<layers;i++){
		for(var j=0;j<numLay;j++){
				if(i<layers-1){
					for(var w=0;w<numLay;w++)
						this.neurons[i+1][w].sum+=this.neurons[i][j].synapses[w].weight*this.neurons[i][j].sum;
					}
				else{
					for(var w=0;w<numOut;w++)
						this.outputs[w].sum+=this.neurons[i][j].synapses[w].weight*this.neurons[i][j].sum;
					}
					}
		}
}

brain.prototype.clear = function(){



	for(var i=0;i<layers;i++){
		for(var j=0;j<numLay;j++){
			this.neurons[i][j].sum=0
		}

	}

	for(var i=0;i<numOut;i++){
		this.outputs[i].sum=0
	}
}

function draw(b){
	var d=0;
	var c=document.getElementById("canv");
	var ctx=c.getContext("2d");
	for(var i=0;i<b.inputs.length;i++){
				ctx.beginPath();

				d=parseInt(b.inputs[i].sum*20)+128
				if(d<0){
					d=0;
				}
				if(d>255){
					d=255;
				}
				ctx.fillStyle="rgb("+d+","+d+","+d+")";
				ctx.arc(50,i*32+50,10,0,2*Math.PI);
				ctx.fill();
				ctx.closePath();
				for(var j=0;j<b.inputs[i].synapses.length;j++){
						ctx.beginPath();
						d=parseInt(b.inputs[i].synapses[j].weight*128);
						if(d>0){
						ctx.strokeStyle="rgb("+d+","+d+","+d+")";
						}
						else
						{
						ctx.strokeStyle="rgb("+(-d)+",0,0)";
						}
						ctx.moveTo(50,i*32+50);
						ctx.lineTo(200,j*32+50);
						ctx.stroke();
						ctx.closePath();
				}
	}
	for(var i=0;i<layers;i++){
		for(var j=0;j<numLay;j++){
				ctx.beginPath();
			
				d=parseInt(b.neurons[i][j].sum*20)+128;
				if(d<0){
					d=0;
				}
				if(d>255){
					d=255;
				}
				ctx.fillStyle="rgb("+d+","+d+","+d+")";
				ctx.arc(i*100+200,j*32+50,10,0,2*Math.PI);
				ctx.fill();
				ctx.closePath();
				for(w=0;w<b.neurons[i][j].synapses.length;w++){
						ctx.beginPath();
						d=parseInt(b.neurons[i][j].synapses[w].weight*128);
						if(d>0){
						ctx.strokeStyle="rgb("+d+","+d+","+d+")";
						}
						else
						{
						ctx.strokeStyle="rgb("+(-d)+",0,0)";
						}
						ctx.moveTo(i*100+200,j*32+50);
						ctx.lineTo((i+1)*100+200,w*32+50);
						ctx.stroke();
						ctx.closePath();
				}
		}
	}

	for(var i=0;i<b.outputs.length;i++){
				ctx.beginPath();
				d=parseInt(b.outputs[i].sum*20)+128
				if(d<0){
					d=0;
				}
				if(d>255){
					d=255;
				}
				ctx.fillStyle="rgb("+d+","+d+","+d+")";
				ctx.arc(200+layers*100,i*32+50,10,0,2*Math.PI);
				ctx.fill();
				ctx.closePath();
	}
}

brain.prototype.mutate = function(){


for(var i=0;i<layers;i++){
		for(var j=0;j<numLay;j++){
				if(i<(layers-1)){
					for(var w=0;w<numLay;w++){
						if ((Math.random()*100)<mutRate){
						this.neurons[i][j].synapses[w].weight=(Math.random()*2)-1;
						}
					}
					}
				else{
					for(var w=0;w<numOut;w++){
						if ((Math.random()*100)<mutRate){
						this.neurons[i][j].synapses[w].weight=(Math.random()*2)-1;
						}
					}
					}
					}
		}
for(var i=0;i<numImp;i++){
	for(var w=0;w<numLay;w++){
		if ((Math.random()*100)<mutRate){
						this.inputs[i].synapses[w].weight=(Math.random()*2)-1;
			}
	}
	}
this.Cost=this.calculateCost();
}