import IBrowserFrame from '../types/IBrowserFrame.js';
import IBrowserPage from '../types/IBrowserPage.js';
import BrowserFrameFactory from './BrowserFrameFactory.js';

/**
 * Browser page utility.
 */
export default class BrowserPageUtility {
	/**
	 * Returns frames for a page.
	 *
	 * @param page Page.
	 * @returns Frames.
	 */
	public static getFrames(page: IBrowserPage): IBrowserFrame[] {
		return this.findFrames(page.mainFrame);
	}

	/**
	 * Aborts all ongoing operations and destroys the page.
	 *
	 * @param page Page.
	 */
	public static closePage(page: IBrowserPage): Promise<void> {
		if (page.closed) {
			return Promise.resolve();
		}

		(<boolean>page.closed) = true;

		const index = page.context.pages.indexOf(page);

		if (index !== -1) {
			page.context.pages.splice(index, 1);
		}

		page.virtualConsolePrinter.close();

		// Using Promise instead of async/await to prevent microtask
		return BrowserFrameFactory.destroyFrame(page.mainFrame);
	}

	/**
	 * Returns all frames.
	 *
	 * @param parentFrame Parent frame.
	 * @returns Frames, including the parent.
	 */
	private static findFrames(parentFrame: IBrowserFrame): IBrowserFrame[] {
		let frames = [parentFrame];
		for (const frame of parentFrame.childFrames) {
			frames = frames.concat(this.findFrames(frame));
		}
		return frames;
	}
}
