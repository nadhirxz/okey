import { TILE_COLORS, TILE_NUMBERS } from '@okey/utils/constants';
import Tile from './tile';
import type { TileNumber } from '../types/game';
import { getRandomValues } from 'crypto';

const getRandomIndex = (length: number) => Math.floor((getRandomValues(new Uint32Array(1))[0] / 4294967296) * length);

const getBoardTiles = () => {
	// tileColors is the same as TILE_COLORS, but every item is used twice and kept the same order
	const tileColors = TILE_COLORS.map(color => [color, color]).flat();
	const regularTiles = tileColors.map(color => Array.from({ length: 13 }, (_, i) => new Tile(color, (i + 1) as TileNumber)));
	const fakeTiles = [new Tile('black', 0, true), new Tile('black', 0, true)];

	return regularTiles.concat(fakeTiles).flat();
};

const shuffleBoardTiles = (tiles: Tile[]) => {
	const shuffledTiles = [...tiles];
	for (let i = shuffledTiles.length - 1; i > 0; i--) {
		const j = getRandomIndex(i + 1);
		[shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
	}

	return shuffledTiles;
};

const chooseOkeyTile = (tiles: Tile[]) => {
	let index = getRandomIndex(tiles.length);
	let wildTile = tiles[index];

	while (wildTile.isFakeOkey) {
		index = getRandomIndex(tiles.length);
		wildTile = tiles[index];
	}

	const okey = new Tile(wildTile.color, ((wildTile.number + 1) % TILE_NUMBERS[TILE_NUMBERS.length - 1]) as TileNumber);

	return {
		wildTile,
		okey,
		tiles: tiles.filter((_, i) => i !== index),
	};
};

export { getRandomIndex, getBoardTiles, shuffleBoardTiles, chooseOkeyTile };
