const socket = io();
window.addEventListener('load', ()=>{
    

	var w=5;
	var c='black';
     
	socket.on('draw',data=>{
		drawLine(data.ini,data.final,data.w,data.c);
	});


	socket.emit('join',{room:window.location.pathname});
	document.getElementById('width').value=w;
	var back=c;
	resize(); 
	document.getElementById('color').onchange=()=>{
		// alert('hey');
		c=document.getElementById('color').value;
		back=c;
	};

    const nav=document.getElementById('nav');
	document.getElementById('width').onchange=()=>{
		// alert('hey');
		w=document.getElementById('width').value;
	};

	document.getElementById('eraser').onclick=()=>{
		back=c;
		c='white';
	};

	document.getElementById('marker').onclick=()=>{
		
		c=back;
	};

	document.getElementById('erase').onclick=()=>{
		
		location.reload();
	};


	document.addEventListener('mousedown', startPainting);
	document.addEventListener('mouseup', stopPainting);
	document.addEventListener('mousemove', (e)=>{
		sketch(e,coord,w,c);
	});
	//  window.addEventListener('resize', resize);
	
});
	
const canvas = document.querySelector('#canvas');


const ctx = canvas.getContext('2d');
	
function resize(){
 nav.style.width=window.innerWidth;
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
}
	

let coord = {x:0 , y:0};

let paint = false;
	

function getPosition(event)
{

coord.x = event.clientX - canvas.offsetLeft;
coord.y = event.clientY - canvas.offsetTop;
}


function startPainting(event){
paint = true;
getPosition(event);
}
function stopPainting(){
paint = false;
}

function drawLine(ini,final,w,c)
{

	ctx.beginPath();
	
	ctx.lineWidth = w;
	
	
	ctx.lineCap = 'round';
		
	ctx.strokeStyle = c;
		
	
	
	ctx.moveTo(ini.x, ini.y);
	
	
	
	
	ctx.lineTo(final.x , final.y);
		
	
	ctx.stroke();

}


function sketch(event,coord,w,c)
{
if (!paint) return;

ctx.beginPath();
	
ctx.lineWidth = w;


ctx.lineCap = 'round';
	
ctx.strokeStyle = c;
	


ctx.moveTo(coord.x, coord.y);

const ini={x:coord.x,y:coord.y};

console.log(coord);



getPosition(event);

console.log(coord);
ctx.lineTo(coord.x , coord.y);
	

ctx.stroke();

console.log('emitting');
console.log(ini,coord);
socket.emit('draw',{room:window.location.pathname,ini,coord,w,c});

}
