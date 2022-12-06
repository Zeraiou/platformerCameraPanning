class Player extends Sprite {
	constructor({ position, image, animations = [], hitbox, scale }) {
		super({ position, image, scale })
		this.animations = animations
		this.currentAnimation = this.animations.idleRight

		this.lastDirection = "right"
		this.lastPosition = {
			x: this.position.x,
			y: this.position.y,
		}

		this.velocity = {
			x: 0,
			y: 0,
		}
		this.jumpingSpeed = -8
		this.movementSpeed = 3

		this.gravity = 0.5
		this.onGround = false
		this.onPlatform = false
		this.droppingFromPlatform = false

		this.hitbox = hitbox
		this.cameraBox = {
			offset: {
				x: -35,
				y: 0,
			},
			width: 200,
			height: 100,
		}

		this.scaleHitbox()
	}

	scaleHitbox() {
		this.hitbox = {
			offset: {
				x: this.hitbox.offset.x * this.scale,
				y: this.hitbox.offset.y * this.scale,
			},
			width: this.hitbox.width * this.scale,
			height: this.hitbox.height * this.scale
		}
	}

	update() {

		// this.drawHitbox()
		// this.drawFullSize()
		// this.drawCameraBox()
		super.updateFrames()

		this.move()
		this.detectCollisionHorizontal() 
		this.detectLeftWallMap()
		this.detectRightWallMap()

		this.applyGravity()
		this.jump()
		if (this.onPlatform) this.dropFromPlatform()

		this.detectCollisionVertical() 
		if (!this.droppingFromPlatform) this.detectCollisionPlatform()

		this.determineSprite()
	}

	drawFullSize() {
		c.fillStyle = "rgba(0, 20, 210, 0.3)"
		c.fillRect(this.position.x, this.position.y , this.width, this.height)
	}

	drawHitbox() {
		c.fillStyle = "rgba(0, 210, 0, 0.8)"
		c.fillRect(this.position.x + this.hitbox.offset.x, this.position.y + this.hitbox.offset.y, this.hitbox.width, this.hitbox.height)
	}

	drawCameraBox() {
		c.fillStyle = "rgba(43, 43, 34, 0.3)"
		c.fillRect(this.position.x + this.cameraBox.offset.x, this.position.y + this.cameraBox.offset.y, this.cameraBox.width, this.cameraBox.height)
	}

	applyGravity() {
		this.velocity.y += this.gravity
		this.lastPosition.y = this.position.y
		this.position.y += this.velocity.y

		if (this.velocity.y > 0.5) {
			this.onGround = false
			this.onPlatform = false
		}

		if(this.velocity.y > 0.5) {
			this.droppingFromPlatform = false
		}

		this.detectCameraReachingBottom()
	}

	jump() {
		if ((this.onGround || this.onPlatform) && keys.KeyW.pressed) {
			this.onGround = false
			this.onPlatform = false
			this.velocity.y = this.jumpingSpeed
			this.lastPosition.y = this.position.y
			this.position.y += this.velocity.y
		}
	}

	dropFromPlatform() {
		if (keys.KeyS.pressed) {
			this.droppingFromPlatform = true
		}
	}

	move() {
		this.velocity.x = 0
		if (keys.KeyA.pressed) {
			this.velocity.x = -this.movementSpeed
			this.lastDirection = "left"
			this.detectCameraReachingLeftSide()
		}
		else if (keys.KeyD.pressed) {
			this.velocity.x = this.movementSpeed
			this.lastDirection = "right"
			this.detectCameraReachingRightSide()
		}
		this.lastPosition.x = this.position.x
		this.position.x += this.velocity.x
	}

	detectCollisionVertical() {
		for (let i = 0; i < collisionsBlocksPositionArr.length; i++) {
			const block = collisionsBlocksPositionArr[i]

			if (detectHitboxCollision(this, block)) {
				if (this.velocity.y > 0) {
					this.position.y = block.position.y - this.hitbox.offset.y - this.hitbox.height - 0.01
					this.lastPosition.y = this.position.y
					this.velocity.y = 0
					this.onGround = true
					break
				}
				else if (this.velocity.y < 0) {
					this.position.y = block.position.y + block.height - this.hitbox.offset.y + 0.01
					this.lastPosition.y = this.position.y
					this.velocity.y = 0
					break
				}
			}
		}
	}

	detectCollisionHorizontal() {
		for (let i = 0; i < collisionsBlocksPositionArr.length; i++) {
			const block = collisionsBlocksPositionArr[i]

			if (detectHitboxCollision(this, block)) {
				if (this.velocity.x > 0) {
					this.position.x = block.position.x - this.hitbox.offset.x - this.hitbox.width - 0.01
					this.lastPosition.x = this.position.x
					break
				}
				else if (this.velocity.x < 0) {
					this.position.x = block.position.x + block.width - this.hitbox.offset.x + 0.01
					this.lastPosition.x = this.position.x
					break
				}
			}
		}
	}

	detectCollisionPlatform() {
		for (let i = 0; i < collisionsPlatformsPositionArr.length; i++) {
			const platform = collisionsPlatformsPositionArr[i]

			if(detectHitboxCollision(this, platform) && this.velocity.y > 0) {
				if (this.lastPosition.y + this.hitbox.offset.y + this.hitbox.height <= platform.position.y) {
					this.onPlatform = true
					this.velocity.y = 0
					this.position.y = platform.position.y - this.hitbox.offset.y - this.hitbox.height - 0.01
					this.lastPosition.y = this.position.y
					break
				}
			}
		}
	}

	determineSprite() {
		if (this.velocity.y < 0 && this.lastDirection === "left") {
			this.switchSprite(this.animations.jumpLeft)
			this.detectCameraReachingTop()
		}
		else if (this.velocity.y < 0 && this.lastDirection === "right") {
			this.switchSprite(this.animations.jumpRight)
			this.detectCameraReachingTop()
		}
		else if (this.velocity.y > 0.5 && this.lastDirection === "left") {
			this.switchSprite(this.animations.fallLeft)
		}
		else if (this.velocity.y > 0.5 && this.lastDirection === "right") {
			this.switchSprite(this.animations.fallRight)
		}
		else if (this.velocity.x < 0) {
			this.switchSprite(this.animations.runLeft)
		}
		else if (this.velocity.x > 0) {
			this.switchSprite(this.animations.runRight)
		}
		else if (this.lastDirection === "left") {
			this.switchSprite(this.animations.idleLeft)
		}
		else if (this.lastDirection === "right") {
			this.switchSprite(this.animations.idleRight)
		}
	}

	switchSprite(animation) {
		if (this.currentAnimation !== animation) {
			this.currentAnimation = animation
			this.loaded = false
			this.image.onload = () => {
				this.width = (this.image.width / this.frameRate) * this.scale
				this.height = this.image.height * this.scale
				this.loaded = true
			}
			this.image.src = animation.image.imageSrc
			this.frameRate = animation.image.frameRate
			this.frameBuffer = animation.image.frameBuffer
			this.looping = animation.image.looping
			this.autoplay = animation.image.autoplay

			this.currentFrame = 0
			this.frameElapsed = 0
		}
	}

	detectLeftWallMap() {
		if (this.position.x + this.hitbox.offset.x <= 1) {
			this.position.x = -this.hitbox.offset.x + 1 + 0.01
			this.lastPosition.x = this.position.x
		}
	}

	detectRightWallMap() {
		if (this.position.x + this.hitbox.offset.x + this.hitbox.width >= 576) {
			this.position.x = 576 - this.hitbox.offset.x - this.hitbox.width - 1 - 0.01
			this.lastPosition.x = this.position.x
		}
	}

	detectCameraReachingRightSide() {
		const cameraBoxRightSide = this.position.x + this.cameraBox.offset.x + this.cameraBox.width

		console.log(-camera.position.x + this.cameraBox.width)

		if (cameraBoxRightSide >= scaledCanvas.width + scaledCanvas.offset.x &&
				-camera.position.x + this.cameraBox.width < 410) {
					camera.position.x -= this.velocity.x
					scaledCanvas.offset.x += this.velocity.x
		}
	}	

	detectCameraReachingLeftSide() {
		const cameraBoxLeftSide = this.position.x + this.cameraBox.offset.x

		if (cameraBoxLeftSide <= scaledCanvas.offset.x &&
			camera.position.x < 0) {
			camera.position.x += this.movementSpeed
			scaledCanvas.offset.x -= this.movementSpeed
		}
	}

	detectCameraReachingTop() {
		const cameraBoxTop = this.position.y + this.cameraBox.offset.y

		if (cameraBoxTop <= Math.abs(camera.position.y) &&
				camera.position.y <= 0) {
			camera.position.y -= this.velocity.y
		}
	}

	detectCameraReachingBottom() {
		const cameraBoxBottom = this.position.y + this.cameraBox.offset.y + this.cameraBox.height

		if (cameraBoxBottom >= Math.abs(camera.position.y) + scaledCanvas.height) {
			camera.position.y -= this.velocity.y
		}
	}
}