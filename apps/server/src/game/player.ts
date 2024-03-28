import { User } from '@okey/database';
import type Tile from './tile';

class Player {
	public id: User['id'];
	public index: number;
	private _hand: Tile[];
	private _isDealer: boolean = false;
	private _isTurn: boolean = false;
	private _opened: boolean = false;

	constructor(id: User['id'], index: number, hand: Tile[], isDealer: boolean = false, isTurn = false) {
		this.id = id;
		this.index = index;
		this._hand = hand;
		this._isDealer = isDealer;
		this._isTurn = isTurn;
	}

	get hand(): Tile[] {
		return this._hand;
	}

	get isDealer(): boolean {
		return this._isDealer;
	}

	get isTurn(): boolean {
		return this._isTurn;
	}

	get opened(): boolean {
		return this._opened;
	}

	open(): void {
		this._opened = true;
	}

	addTiles(tiles: Tile[]) {
		this._hand.push(...tiles);
	}
}

export default Player;
