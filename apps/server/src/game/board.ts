import { NUMBER_OF_PLAYERS, NUMBER_OF_TILES_PER_PLAYER } from '@okey/utils/constants';
import Tile from './tile';
import { chooseJoker, getBoardTiles, shuffleBoardTiles } from './utils';
import Player from './player';

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

	distributeTiles(ids: Player['id'][]): Record<Player['id'], Tile[]> {
		const hands: Record<Player['id'], Tile[]> = ids.reduce(
			(acc, id) => {
				acc[id] = [];
				return acc;
			},
			{} as Record<Player['id'], Tile[]>
		);

		for (let i = 0; i < NUMBER_OF_TILES_PER_PLAYER; i++) {
			ids.forEach(id => {
				hands[id].push(this.drawTile());
			});
		}

		return hands;
	}
}

export default Board;
