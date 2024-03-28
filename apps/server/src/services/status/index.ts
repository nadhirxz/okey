import { UserStatusManager } from './manager';

interface NodeJsGlobal extends Global {
	userStatusManager: UserStatusManager;
}

declare const global: NodeJsGlobal;

if (!global.userStatusManager) {
	global.userStatusManager = new UserStatusManager();
}

export default global.userStatusManager;
