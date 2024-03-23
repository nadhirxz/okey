import { NUMBER_OF_PLAYERS, NUMBER_OF_TILES_PER_PLAYER } from '@okey/utils/constants';
import Tile from './tile';
import { chooseOkeyTile, getBoardTiles, shuffleBoardTiles } from './utils';

class Board {
	private _tiles: Tile[];
	private _okey: Tile;

	constructor() {
		const allTiles = getBoardTiles();
		const shuffled = shuffleBoardTiles(allTiles);
		const { okey, tiles } = chooseOkeyTile(shuffled);

		this._tiles = tiles;
		this._okey = okey;
	}

	get tiles(): Tile[] {
		return this._tiles;
	}

	get okey(): Tile {
		return this._okey;
	}

	drawTile(): Tile {
		if (this._tiles.length == 0) {
			throw new Error('No tiles left');
		}

		return this._tiles.pop()!;
	}

	distributeTiles(): Tile[][] {
		const hands: Tile[][] = Array.from({ length: NUMBER_OF_PLAYERS }, () => []);

		for (let i = 0; i < NUMBER_OF_TILES_PER_PLAYER; i++) {
			for (let j = 0; j < NUMBER_OF_PLAYERS; j++) {
				hands[j].push(this.drawTile());
			}
		}

		console.log('hands', hands)

		return hands;
	}
}

export default Board;
