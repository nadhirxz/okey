import { NUMBER_OF_PLAYERS } from '@okey/utils/constants';
import Board from './board';
import Player from './player';
import type { PlayerId } from '../types/game';
import { getRandomIndex } from './utils';

class Game {
	private _board: Board;
	private _players: Player[];
	private _isFirstPlay: boolean = true;

	init(players: PlayerId[]) {
		if (players.length != NUMBER_OF_PLAYERS) {
			throw new Error('Invalid number of players');
		}

		this._board = new Board();

		const hands = this._board.distributeTiles();

		const dealerId = getRandomIndex(NUMBER_OF_PLAYERS);
		const firstPlayerId = (dealerId + 1) % NUMBER_OF_PLAYERS;

		this._players = players.map(id => new Player(id, hands[id], id == dealerId, id == firstPlayerId));

		this._players[firstPlayerId].addTiles([this._board.drawTile()]);

		return this._players;
	}

	get board() {
		return this._board;
	}

	get players() {
		return this._players;
	}

	get dealer() {
		return this._players.find(player => player.isDealer);
	}

	get playerInTurn() {
		return this._players.find(player => player.isTurn);
	}

	get isFirstPlay() {
		return this._isFirstPlay;
	}
}

export default Game;
