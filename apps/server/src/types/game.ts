import { NUMBER_OF_PLAYERS, SPECIAL_TILES, TILE_COLORS, TILE_NUMBERS } from '@okey/utils/constants';

type TileColor = (typeof TILE_COLORS)[number] | (typeof SPECIAL_TILES)[number];
type TileNumber = (typeof TILE_NUMBERS)[number];
type TileString = `${TileNumber}-${TileColor}`;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
type PlayerId = IntRange<0, typeof NUMBER_OF_PLAYERS>;

export { TileColor, TileNumber, TileString, PlayerId };
