import type { TileColor, TileNumber } from '../types/game';

class Tile {
	color: TileColor;
	number: TileNumber;
	isFakeOkey: boolean;

	constructor(color: TileColor, number: TileNumber, isFakeOkey = false) {
		this.color = color;
		this.number = number;
		this.isFakeOkey = isFakeOkey;
	}
}

export default Tile;
