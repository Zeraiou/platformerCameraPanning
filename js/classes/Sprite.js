class Sprite {
	constructor({ position, image, scale = 1 }) {
		this.position = position
		this.scale = scale
		this.image = new Image() 
		this.image.onload = () => {
			this.width = (this.image.width / this.frameRate) * this.scale
			this.height = this.image.height * this.scale
			this.loaded = true
		}

		this.image.src = image.imageSrc
		this.frameRate = image.frameRate
		this.frameBuffer = image.frameBuffer
		this.looping = image.looping
		this.autoplay = image.autoplay

		this.currentFrame = 0
		this.frameElapsed = 0 

		this.loaded = false
		
	}

	draw() {
		const cropbox = {
			x: this.currentFrame * (this.image.width / this.frameRate),
			y: 0,
			width: this.image.width / this.frameRate,
			height: this.image.height
		}

		c.drawImage(
			this.image,
			cropbox.x,
			cropbox.y,
			cropbox.width,
			cropbox.height,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		)
	}

	updateFrames() {
		if (!this.loaded) return

		this.draw()

		if (this.frameRate > 1) {
			this.frameElapsed++

			if (this.frameElapsed === this.frameBuffer) {
				this.frameElapsed = 0
				this.currentFrame++

				if (this.currentFrame === this.frameRate) this.currentFrame = 0
			}
		}
	}
}