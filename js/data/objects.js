const canvas = document.querySelector('canvas')

canvas.width = 1024
canvas.height = 576

const scaleValue = 2.8

const scaledCanvas = {
	width: canvas.width / scaleValue,
	height: canvas.height / scaleValue,
	offset: {
		x: 0,
		y: 0,
	}
}

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	image: {
		imageSrc: "./assets/images/background.png",
		frameRate: 1,
		frameBuffer: 1, 
		looping: true,
		autoplay: true,
	}
})

const camera = {
	position: {
		x: 0,
		y: -432 + scaledCanvas.height,
	}
}

const player = new Player({
	position: {
		x: -39,
		y: 267,
	},
	image: {
		imageSrc: "./assets/images/Idle.png",
		frameRate: 8,
		frameBuffer: 10, 
		looping: true,
		autoplay: true,
	},
	hitbox: {
		offset: {
			x: 73,
			y: 55,
		},
		width: 22,
		height: 50,
	},
	animations: {
		"idleRight" : {
			image: {
				imageSrc: "./assets/images/Idle.png",
				frameRate: 8,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
		"idleLeft" : {
			image: {
				imageSrc: "./assets/images/IdleLeft.png",
				frameRate: 8,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
		"runRight" : {
			image: {
				imageSrc: "./assets/images/Run.png",
				frameRate: 8,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
		"runLeft" : {
			image: {
				imageSrc: "./assets/images/RunLeft.png",
				frameRate: 8,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
		"jumpRight" : {
			image: {
				imageSrc: "./assets/images/Jump.png",
				frameRate: 2,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
		"jumpLeft" : {
			image: {
				imageSrc: "./assets/images/JumpLeft.png",
				frameRate: 2,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
		"fallRight" : {
			image: {
				imageSrc: "./assets/images/Fall.png",
				frameRate: 2,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
		"fallLeft" : {
			image: {
				imageSrc: "./assets/images/FallLeft.png",
				frameRate: 2,
				frameBuffer: 10, 
				looping: true,
				autoplay: true,
			},
		},
	},
	scale: 0.8,
})

const drawableObjects = [background]

const collisionsBlocks2D = formatArrayIn2d(floorCollisions, 36)
const collisionsBlocksPositionArr = formatArrayForPosition(collisionsBlocks2D, 202, 16, 16, 16, "rgba(210, 0, 0, 0.3)")

const collisionsPlatforms2D = formatArrayIn2d(platformCollisions, 36)
const collisionsPlatformsPositionArr = formatArrayForPosition(collisionsPlatforms2D, 202, 16, 16, 4, "rgba(0, 0, 210, 0.3)")

const keys = {
	KeyA: {
		pressed: false,
	},	
	KeyD: {
		pressed: false,
	},	
	KeyW: {
		pressed: false,
	},	
	KeyS: {
		pressed: false,
	},
}