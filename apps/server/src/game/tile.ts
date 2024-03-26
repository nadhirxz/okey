import type { TileColor, TileNumber, TileString } from '../types/game';

class Tile {
	color: TileColor;
	number: TileNumber;

	constructor(color: TileColor, number: TileNumber = 0) {
		this.color = color;
		this.number = number;
	}

	setJoker() {
		this.number = 0;
		this.color = 'J';
	}

	setFake() {
		this.number = 0;
		this.color = 'F';
	}

	isJoker() {
		return this.color == 'J';
	}

	isFake() {
		return this.color == 'F';
	}

	isSameColor(tile: Tile) {
		return this.color == tile.color;
	}

	isSameNumber(tile: Tile) {
		return this.number == tile.number;
	}

	isSame(tile: Tile) {
		return this.isSameColor(tile) && this.isSameNumber(tile);
	}

	toString() {
		return `${this.color}${this.number}`;
	}

	static fromString(tileString: TileString) {
		const color = tileString.split('-')[1] as TileColor;
		const number = (color == 'F' || color == 'J') ? 0 :  parseInt(tileString.split('-')[0]) as TileNumber ?? 0;

		return new Tile(color, number);
	}
}

export default Tile;
