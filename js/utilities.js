function formatArrayIn2d(arrToFormat, amountOfItemsPerRow) {
	const arrayTemp = []

	for (let i = 0; i < arrToFormat.length; i += amountOfItemsPerRow) {
		arrayTemp.push(arrToFormat.slice(i, i + amountOfItemsPerRow))
	}

	return arrayTemp
}

function formatArrayForPosition(arrToFormat, symbol, size, width, height, color) {
	const arrayTemp = []

	arrToFormat.forEach((row, rowIndex) => {
		row.forEach((tile, tileIndex) => {
			if (tile === symbol) {
				arrayTemp.push(new CollisionBlock({
					position: {
						x: tileIndex * size,
						y: rowIndex * size,
					},
					width: width,
					height: height,
					color: color,
				}))
			}
		})
	})

	return arrayTemp
}


function detectHitboxCollision(player, block) {
	return (
		player.position.x + player.hitbox.offset.x <= block.position.x + block.width &&
		player.position.x + player.hitbox.offset.x + player.hitbox.width >= block.position.x &&
		player.position.y + player.hitbox.offset.y <= block.position.y + block.height &&
		player.position.y + player.hitbox.offset.y + player.hitbox.height >= block.position.y
	)
}