

const c = canvas.getContext('2d')

let gameInterval = null

function animate() {
	gameInterval = window.requestAnimationFrame(animate)

	c.save()
	c.scale(scaleValue, scaleValue)
	c.translate(camera.position.x, camera.position.y)
	background.draw()
	// drawCollisions()
	player.update()
	c.restore()

	
	
}

function drawCollisions() {
	collisionsBlocksPositionArr.forEach(block => {
		block.draw()
	})

	collisionsPlatformsPositionArr.forEach(platform => {
		platform.draw()
	})
}

animate()
