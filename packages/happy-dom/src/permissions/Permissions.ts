import PermissionStatus from './PermissionStatus.js';
import PermissionNameEnum from './PermissionNameEnum.js';
import BrowserWindow from '../window/BrowserWindow.js';

/**
 * Permissions API.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Permissions.
 */
export default class Permissions {
	#permissionStatus: {
		[name in PermissionNameEnum]?: PermissionStatus;
	} = {};
	#window: BrowserWindow;

	/**
	 * Constructor.
	 *
	 * @param window Window.
	 */
	constructor(window: BrowserWindow) {
		if (!window?.document) {
			new TypeError('Invalid constructor');
		}
		this.#window = window;
	}

	/**
	 * Returns scroll restoration.
	 *
	 * @param permissionDescriptor Permission descriptor.
	 * @param permissionDescriptor.name Permission name.
	 * @param [permissionDescriptor.userVisibleOnly] User visible only.
	 * @param [permissionDescriptor.sysex] Sysex.
	 * @returns Permission status.
	 */
	public async query(permissionDescriptor: {
		name: string;
		userVisibleOnly?: boolean;
		sysex?: boolean;
	}): Promise<PermissionStatus> {
		const name = <PermissionNameEnum>permissionDescriptor?.name;

		if (name && this.#permissionStatus[name]) {
			return this.#permissionStatus[name];
		}

		if (!Object.values(PermissionNameEnum).includes(name)) {
			throw new Error(
				`Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value '${name}' is not a valid enum value of type PermissionName.`
			);
		}

		this.#permissionStatus[name] = new this.#window.PermissionStatus('granted');

		return this.#permissionStatus[name];
	}
}
