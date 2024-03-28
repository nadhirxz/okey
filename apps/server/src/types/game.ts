import { SPECIAL_TILES, TILE_COLORS, TILE_NUMBERS } from '@okey/utils/constants';

type TileColor = (typeof TILE_COLORS)[number] | (typeof SPECIAL_TILES)[number];
type TileNumber = (typeof TILE_NUMBERS)[number];
type TileString = `${TileNumber}-${TileColor}`;

export { TileColor, TileNumber, TileString };
