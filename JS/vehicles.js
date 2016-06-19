
function running(){
	var br;
	for(var i=0;i<nLife;i++){
		br= new brain()
		br.createRandom();
		Life.vida[i]= new organism(br);
	}
	for(var i=0;i<nFood;i++){
		Life.food[i]= new comida(Math.random()*mapSize,Math.random()*mapSize);
	}
	for(var i=0;i<nDan;i++){
		Life.peligro[i]= new danger(Math.random()*mapSize,Math.random()*mapSize);
	}
	runned=window.setTimeout(function(){run()}, 1);
	
}
function organism(b){
	this.x=Math.random()*mapSize;
	this.y=Math.random()*mapSize;
	this.vspeed=0;
	this.hspeed=0
	this.energy=100;
	this.Brain=b;
	this.size=20;
	this.r=parseInt(Math.random()*255)
	this.g=parseInt(Math.random()*255)
	this.b=parseInt(Math.random()*255)
	this.age=0
}
function life(){
	this.vida=new Array();
	this.food=new Array();
	this.peligro=new Array();
}

function comida(x,y){
	this.x=x;
	this.y=y;
	this.energy=1;
}
function danger(x,y){
	this.x=x;
	this.y=y;
	this.energy=1;
}
function run(){

	if(Life.vida.length<nLife){
		br= new brain()
		br.createRandom();
		Life.vida[Life.vida.length]= new organism(br);
	}
	var i=0;var j=0;var w=0;var l=null;var d=0;
	tick();
	var i=0;var j=0;var w=0;var l=null;var d=0;
	drawLife();
	var i=0;var j=0;var w=0;var l=null;var d=0;
	drawFood();
	var i=0;var j=0;var w=0;var l=null;var d=0;
	drawDan();
	var i=0;var j=0;var w=0;var l=null;var d=0;
		for(var i=0;i<Life.vida.length;i++){
		var l= Life.vida[i];
		if(isNaN(l.x))
		{
			Life.vida.splice(i,1)
		}
	}
	draw(Life.vida[selected].Brain)
	running=window.setTimeout(function(){run()}, 1);
}

function tick(){

	for(var i=0;i<Life.vida.length;i++){
		var l= Life.vida[i];

		l.age++
		var minD=mapSize;
		var closeX=0;
		var closeY=0;
		var minDl=mapSize;
		var closeXl=0;
		var closeYl=0;
		var enel=0;
		var minDd=mapSize;
		var closeXd=0;
		var closeYd=0;
		var col=0;
		var ri=0;
		var le=0;
		var up=0;
		var dow=0;
		var suck=0;
		var suckf=0;
		var suckd=0;
		for(var j=0;j<Life.food.length;j++){

			p=Life.vida[i];
			p2=Life.food[j];
			dx = p2.x - p.x;
			dy = p2.y - p.y;
			d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
			if(d<(p.size+Math.sqrt(p2.energy*10/Math.PI))){
				p.energy+=l.size*(l.Brain.outputs[2].sum/(mult*5))
				p2.energy-=l.size*(l.Brain.outputs[2].sum/(mult*5))
				suckf=1;
				if(p2.energy<0)
				{
				Life.food[j]=new comida(Math.random()*mapSize,Math.random()*mapSize);
				}
			}
			if(d<minD){
				minD=d;
				closeX=p2.x;
				closeY=p2.y;

			}
		}
		d=mapSize;
		p=null
		p2=null
		dx=null
		dy=null
		for(var j=0;j<Life.peligro.length;j++){

			p=Life.vida[i];
			p2=Life.peligro[j];
			dx = p2.x - p.x;
			dy = p2.y - p.y;
			d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
			if(d<(p.size+Math.sqrt(p2.energy*10/Math.PI))){
				p.energy-=l.size*(l.Brain.outputs[2].sum/(mult*5))
				p2.energy+=l.size*(l.Brain.outputs[2].sum/(mult*5))
				suckd=1;
				if(p2.energy<0)
				{
				Life.peligro[j]=new danger(Math.random()*mapSize,Math.random()*mapSize);
				}
			}
			if(d<minDd){
				minDd=d;
				closeXd=p2.x;
				closeYd=p2.y;
				enel=p2.energy

			}
		}
		d=mapSize;
		p=null
		p2=null
		dx=null
		dy=null
		j=0;
		for(var j=0;j<Life.vida.length;j++){
			if(j!=i){
				p=Life.vida[i];
				p2=Life.vida[j];
				dx = p2.x - p.x;
				dy = p2.y - p.y;
				d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
				if(d<(p.size+p2.size)){
					p.energy+=l.size*(1/Math.abs(l.Brain.outputs[2].sum+1))*0.3;
					p2.energy-=l.size*(1/Math.abs(l.Brain.outputs[2].sum+1))*0.3;
					suck=1;
				}
				if(d<minDl){
					minDl=d;
					closeXl=p2.x;
					closeYl=p2.y;

				}
			}
		}
		var cu=0;
		var cl=0;
		var cr=0;
		var cd=0;
		if(l.x>mapSize-10){
			l.x=mapSize-10;
			col=1;
			l.energy-=0.1
			cr=1;
		}
		if(l.y>mapSize-10){
			l.y=mapSize-10
			col=1;
			l.energy-=0.1
			cd=1;
		}
		if(l.x<10){
			l.x=10
			col=1;
			l.energy-=0.1
			cl=1;
		}
		if(l.y<10){
			l.y=10
			col=1;
			l.energy-=0.1
			cu=1;
		}
		if (closeX>l.x)
		{
			ri=1
		}
		else
		{
			le=1
		}
		if (closeY>l.y)
		{
			up=1
		}
		else
		{
			dow=1
		}
		l.Brain.inputs[0].sum=(l.x)/(mapSize/10) ||  1
		l.Brain.inputs[1].sum=(l.y)/(mapSize/10) ||  1
		l.Brain.inputs[2].sum=ri*10
		l.Brain.inputs[3].sum=le*10
		l.Brain.inputs[4].sum=up*10
		l.Brain.inputs[5].sum=dow*10
		l.Brain.inputs[6].sum=(l.energy)/50
		l.Brain.inputs[7].sum=col*10;
		le=0;
		up=0;
		dow=0;
		ri=0;
		if (closeXl>l.x)
		{
			ri=1
		}
		else
		{
			le=1
		}
		if (closeYl>l.y)
		{
			up=1
		}
		else
		{
			dow=1
		}
		l.Brain.inputs[8].sum=ri*10
		l.Brain.inputs[9].sum=le*10
		l.Brain.inputs[10].sum=up*10
		l.Brain.inputs[11].sum=dow*10
		l.Brain.inputs[12].sum=suck*10
		l.Brain.inputs[13].sum=10/minD
		l.Brain.inputs[14].sum=10/minDl
		l.Brain.inputs[15].sum=enel/50
		le=0;
		up=0;
		dow=0;
		ri=0;
		if (closeXd>l.x)
		{
			ri=1
		}
		else
		{
			le=1
		}
		if (closeYd>l.y)
		{
			up=1
		}
		else
		{
			dow=1
		}

		l.Brain.inputs[16].sum=ri*10
		l.Brain.inputs[17].sum=le*10
		l.Brain.inputs[18].sum=up*10
		l.Brain.inputs[19].sum=dow*10
		l.Brain.inputs[20].sum=10/minDd
		l.Brain.inputs[21].sum=suckf*10
		l.Brain.inputs[22].sum=suckd*10
		l.Brain.cycle();
		l.vspeed=l.Brain.outputs[0].sum/((mult*0.5)+(l.age/50));
		l.hspeed=l.Brain.outputs[1].sum/((mult*0.5)+(l.age/50));
		l.x+=l.hspeed;
		l.y+=l.vspeed;
		l.energy-=0.05;
	/*	l.energy-=l.size*Math.abs(l.hspeed/5000);
		l.energy-=l.size*Math.abs(l.vspeed/5000);
		l.energy-=l.age/200000;
		l.energy-=Math.abs(l.Brain.outputs[0].sum/5000);
		l.energy-=Math.pow(l.energy,2)/12000*/
		l.energy-=Math.pow(l.energy,2)/400000
		l.energy-=l.age/50000

		if(l.age>500 && l.energy>50 && Math.random()>0.990){
			var br=deepCopy(l.Brain);
			var son= new organism(br)

			Life.vida[Life.vida.length]=son;
			if (Math.random()>0.5)
			{
			son.Brain.mutate();
			}
			son.energy=l.energy*0.5;
			l.energy=l.energy*0.5;
			son.r=l.r+parseInt(Math.random()*10)-parseInt(Math.random()*10)
			son.g=l.g+parseInt(Math.random()*10)-parseInt(Math.random()*10)
			son.b=l.b+parseInt(Math.random()*10)-parseInt(Math.random()*10)


		}
		if (l.energy<0){
			Life.vida.splice(i,1);
			if (i<selected && selected>0){
				selected--
			}
			i--;

			
		}
	}

}

function drawLife(){
	var c=document.getElementById("canv");
	var ctx=c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.fillStyle="#000000";
	ctx.rect(0,0,c.width,c.height);
	ctx.fill();
	ctx.closePath();

	for(var i=0;i<Life.vida.length;i++){
		var l= Life.vida[i];
		ctx.beginPath();
		l.size=(Math.sqrt(l.energy*10/Math.PI))
		t=l.size;
		if(l.size>60){
		l.size=60
		t=l.size;
		}
		ctx.fillStyle="rgb("+l.r+","+l.g+","+l.b+")";
		ctx.arc(l.x,l.y,t,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}
}

function drawFood(){
	var c=document.getElementById("canv");
	var ctx=c.getContext("2d");
	for(var i=0;i<Life.food.length;i++){
		var l= Life.food[i];
		l.energy+=0.05;
		ctx.beginPath();
		t=Math.sqrt(l.energy*10/Math.PI);
		ctx.fillStyle="#00FF00";
		ctx.arc(l.x,l.y,t,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}


}

function drawDan(){
	var c=document.getElementById("canv");
	var ctx=c.getContext("2d");
	for(var i=0;i<Life.peligro.length;i++){
		var l= Life.peligro[i];
		l.energy+=0.05;
		ctx.beginPath();

		t=Math.sqrt(l.energy*10/Math.PI);
		ctx.fillStyle="#FF0000";
		ctx.arc(l.x,l.y,t,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}
	


}

function deepCopy(src, /* INTERNAL */ _visited) {
	if(src == null || typeof(src) !== 'object'){
		return src;
	}

    // Initialize the visited objects array if needed
    // This is used to detect cyclic references
    if (_visited == undefined){
    	_visited = [];
    }
    // Otherwise, ensure src has not already been visited
    else {
    	var i, len = _visited.length;
    	for (i = 0; i < len; i++) {
            // If src was already visited, don't try to copy it, just return the reference
            if (src === _visited[i]) {
            	return src;
            }
        }
    }

    // Add this object to the visited array
    _visited.push(src);

    //Honor native/custom clone methods
    if(typeof src.clone == 'function'){
    	return src.clone(true);
    }

    //Special cases:
    //Array
    if (Object.prototype.toString.call(src) == '[object Array]') {
        //[].slice(0) would soft clone
        ret = src.slice();
        var i = ret.length;
        while (i--){
        	ret[i] = deepCopy(ret[i], _visited);
        }
        return ret;
    }
    //Date
    if (src instanceof Date){
    	return new Date(src.getTime());
    }
    //RegExp
    if(src instanceof RegExp){
    	return new RegExp(src);
    }
    //DOM Elements
    if(src.nodeType && typeof src.cloneNode == 'function'){
    	return src.cloneNode(true);
    }

    //If we've reached here, we have a regular object, array, or function

    //make sure the returned object has the same prototype as the original
    var proto = (Object.getPrototypeOf ? Object.getPrototypeOf(src): src.__proto__);
    if (!proto) {
        proto = src.constructor.prototype; //this line would probably only be reached by very old browsers 
    }
    var ret = object_create(proto);

    for(var key in src){
        //Note: this does NOT preserve ES5 property attributes like 'writable', 'enumerable', etc.
        //For an example of how this could be modified to do so, see the singleMixin() function
        ret[key] = deepCopy(src[key], _visited);
    }i=0;
    return ret;
}

//If Object.create isn't already defined, we just do the simple shim, without the second argument,
//since that's all we need here
var object_create = Object.create;
if (typeof object_create !== 'function') {
	object_create = function(o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

function getPosition(event)
		{
			var sx;
			var sy;
			var canvas = document.getElementById("canv");

			if (event.x != undefined && event.y != undefined)
			{
				sx = event.x;
				sy = event.y;
			}
        else
        {
        	sx = event.clientX + document.body.scrollLeft +
        	document.documentElement.scrollLeft;
        	sy = event.clientY + document.body.scrollTop +
        	document.documentElement.scrollTop;
        }
        var minD=1000
        var id=0;
        var i=0;
        for(i=0;i<Life.vida.length;i++){

				p=Life.vida[i];
				dx = sx - p.x;
				dy = sy - p.y;
				d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
				if(d<minD){
					minD=d;
					 id=i;

				}
			}
		selected=id;
		}





var selected = 0;        
var nLife= 100;
var nDan = 150;
var nFood = 150;
var mapSize = 3000;
var Life = new life();
