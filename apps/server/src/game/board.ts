import { NUMBER_OF_PLAYERS, NUMBER_OF_TILES_PER_PLAYER } from '@okey/utils/constants';
import Tile from './tile';
import { chooseJoker, getBoardTiles, shuffleBoardTiles } from './utils';

class Board {
	private _tiles: Tile[];
	private _joker: Tile;
	private _wildTile: Tile;

	constructor() {
		const allTiles = getBoardTiles();
		const shuffled = shuffleBoardTiles(allTiles);
		const { joker, wildTile, restOfDeck } = chooseJoker(shuffled);

		this._tiles = restOfDeck;
		this._joker = joker;
		this._wildTile = wildTile;
	}

	get tiles(): Tile[] {
		return this._tiles;
	}

	get joker(): Tile {
		return this._joker;
	}

	get wildTile(): Tile {
		return this._wildTile;
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
