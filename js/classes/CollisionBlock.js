class CollisionBlock {
	constructor({ position, width, height, color }) {
		this.position = position
		this.width = width
		this.height = height
		this.color = color
	}

	draw() {
		c.fillStyle = this.color
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}