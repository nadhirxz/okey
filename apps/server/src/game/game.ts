import { NUMBER_OF_PLAYERS } from '@okey/utils/constants';
import Board from './board';
import Player from './player';
import { getRandomIndex } from './utils';
import { generateId } from '@okey/utils/generate';

class Game {
	public id: string;
	private _board: Board;
	private _playerPool: Player['id'][];
	private _players: Player[];
	private _isFirstPlay: boolean = true;
	private _started = false;

	constructor() {
		this._playerPool = [];
		this.id = generateId();
	}

	start() {
		if (this._started) {
			throw new Error('Game already started');
		}

		if (this._playerPool.length != NUMBER_OF_PLAYERS) {
			throw new Error('Invalid number of players');
		}

		this._board = new Board();

		const hands = this._board.distributeTiles(this._playerPool);

		const dealerId = getRandomIndex(this._playerPool.length);
		const firstPlayerId = (dealerId + 1) % this._playerPool.length;

		this._players = this._playerPool.map((id, index) => new Player(id, index, hands[id], index == dealerId, index == firstPlayerId));

		this._players[firstPlayerId].addTiles([this._board.drawTile()]);

		this._started = true;
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

	addPlayer(playerId: Player['id']) {
		if (this._playerPool.length >= NUMBER_OF_PLAYERS) {
			throw new Error('Player pool is full');
		}

		this._playerPool.push(playerId);

		return this._playerPool;
	}

	removePlayer(playerId: Player['id']) {
		if (this._started) {
			throw new Error('Game already started');
		}

		this._playerPool = this._playerPool.filter(id => id != playerId);

		return this._playerPool;
	}
}

export default Game;
