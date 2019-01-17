window.onload      = function(){
	var timer      = 0;
	var cv         = document.getElementById("canvas"),		
		cst          = 1,
		ctx        = cv.getContext("2d");
	

	cv.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	cv.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var bubbles           = [],
		now               = 0,
		then              = 0,
		suspect           =[],
		distance          =[];

	var w                 = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	
	function init(){
		then              = Date.now();
		main();
	}

	function main(){
		//Gestion des frames
		now               = Date.now();
		var dt            = (now - then)/1000;
		timer         = timer + dt;
		
		update(dt);
		//render();

		then = now;
		requestAnimationFrame(main);
	}

	function update(dt){
	}


	function get_mouse_pos(e){
		var rect = cv.getBoundingClientRect();
		return {
			x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*cv.width),
			y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*cv.height)
		};
	}
		
	init();
}
