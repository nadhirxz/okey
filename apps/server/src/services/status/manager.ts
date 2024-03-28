export class UserStatusManager {
	private userIds: string[];

	constructor() {
		this.userIds = [];
	}

	public goOnline(userId: string) {
		this.userIds.push(userId);
	}

	public goOffline(userId: string) {
		this.userIds = this.userIds.filter(id => id != userId);
	}
}
