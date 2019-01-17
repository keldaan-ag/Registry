window.onload      = function(){
	var timer      = 0;
	var cv         = document.getElementById("bubble"),		//init the canvas
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
		// Fonction clic: création bulle
		cv.addEventListener("click", new_bubble);
		then              = Date.now();
		main();
	}

	function main(){
		//Gestion des frames
		now               = Date.now();
		var dt            = (now - then)/1000;
		timer         = timer + dt;
		
		update(dt);
		render();

		if (timer>0.5){
			spawn_bubble();	
			timer = 0;
		}

		then = now;
		requestAnimationFrame(main);
	}

	function update(dt){
		var k=0;
			// update frame of the canvas
		
		for(var i=0; i<bubbles.length; i++){
			bubbles[i].x += bubbles[i].speed_x * dt;
			bubbles[i].y += bubbles[i].speed_y * dt;
			bubbles[i].radius=bubbles[i].radius-dt*cst;

			detection_mur(i);
			disparition_bulle(i);
			collision(i);
		}
	}
	
	function detection_mur(i){
	// on traite les cas de gestion de collsision avec les 4 murs. Quand une bulle touche un mur, elle change de couleur, de direction 
		// et de luminosité
		
		//Bord droit
		if(bubbles[i].x+bubbles[i].radius >cv.width){ 
			bubbles[i].speed_x = -bubbles[i].speed_x; bubbles[i].x=cv.width-bubbles[i].radius};
		// Bord gauche
		if(bubbles[i].x-bubbles[i].radius <0){ 
			bubbles[i].speed_x = -bubbles[i].speed_x; bubbles[i].x=bubbles[i].radius};
		// Bord inférieur
		if(bubbles[i].y+bubbles[i].radius >cv.height){ 
			bubbles[i].speed_y = -bubbles[i].speed_y; bubbles[i].y=cv.height-bubbles[i].radius};
		// Bord supérieur
		if(bubbles[i].y-bubbles[i].radius <0){ 
			bubbles[i].speed_y = -bubbles[i].speed_y; bubbles[i].y=bubbles[i].radius };
	}
	
	function collision(i){
		for(var j=0; j<bubbles.length; j++){
		try{
			if(i==j){continue};
			//détection de collision possible
			if( (Math.abs(bubbles[i].x-bubbles[j].x)<bubbles[i].radius+bubbles[j].radius) 
			&& (Math.abs(bubbles[i].y-bubbles[j].y)<bubbles[i].radius+bubbles[j].radius) ){
			//détection s'il y a vraiment collision
				if((bubbles[i].x-bubbles[j].x)*(bubbles[i].x-bubbles[j].x) + (bubbles[i].y-bubbles[j].y)*(bubbles[i].y-bubbles[j].y)<(bubbles[i].radius+bubbles[j].radius )*(bubbles[i].radius+bubbles[j].radius ))	
				{
					if(bubbles[i].radius<=bubbles[j].radius){max_b=j,min_b=i}
					else{max_b=i,min_b=j};
					bubbles[max_b].radius=Math.sqrt(bubbles[i].radius*bubbles[i].radius+bubbles[j].radius*bubbles[j].radius);
					bubbles.splice(min_b,1);
					i--;
					j--;	
					break;
				}
			}
		}
		catch(e){}		
	}
	}
	
	function disparition_bulle(i){
	// on regarde si le radius de la bulle est toujours positif
		if (bubbles[i].radius<=0){
			bubbles.splice(i,1);
			i--;
			
		}
	}
	function render(){
			//Affichage
			//On efface tout ce qui a été paint à la frame précédente
		ctx.clearRect(0,0, cv.width,cv.height);
			// on peint chaque bulle
		for(var i=0; i<bubbles.length; i++){
			ctx.beginPath()
			ctx.fillStyle = "hsla(" + bubbles[i].color + ",100%,"+bubbles[i].lightness+"%,1.00)";
			ctx.arc(bubbles[i].x,bubbles[i].y, bubbles[i].radius, 0,2*Math.PI, false);
			ctx.fill();
			ctx.closePath();



		}
	}

	function new_bubble(e){

		// On créé un objet bulle avec ses attributs
		var pos = get_mouse_pos(e);
		
		
		bubbles.push({
			x               : pos.x,
			y               : pos.y,
			radius          : 20,		//bubble's radius:
			speed_x         : Math.floor(Math.random()*200) - 100,	//bubble's speed along x axis
			speed_y         : Math.floor(Math.random()*200) - 100,	//bubble's speed along y axis
			color           : Math.floor(Math.random()*361),			//bubble's color in hsl
			lightness       :50
		})
	}

	function spawn_bubble(){

		bubbles.push({
			x               : Math.random()* cv.width,
			y               : Math.random()* cv.height,
			radius          : 20,		//bubble's radius:
			speed_x         : Math.floor(Math.random()*200) - 100,	//bubble's speed along x axis
			speed_y         : Math.floor(Math.random()*200) - 100,	//bubble's speed along y axis
			color           : Math.floor(Math.random()*361),			//bubble's color in hsl
			lightness       :50
		})
			
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
