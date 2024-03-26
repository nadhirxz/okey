// B - blue, R - red, Y - yellow, K - black
const TILE_COLORS = ['B', 'R', 'Y', 'K'] as const;
//  J - joker, F - fake
const SPECIAL_TILES = ['J', 'F'] as const;
// 0 joker or fake, 1 - 13 regular
const TILE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
const NUMBER_OF_PLAYERS = 4;
const NUMBER_OF_TILES_PER_PLAYER = 21;

export { TILE_COLORS, SPECIAL_TILES, TILE_NUMBERS, NUMBER_OF_PLAYERS, NUMBER_OF_TILES_PER_PLAYER };
