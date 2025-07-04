import HTMLElement from '../html-element/HTMLElement.js';
import TextTrack from '../html-media-element/TextTrack.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import TextTrackKindEnum from '../html-media-element/TextTrackKindEnum.js';
import ElementEventAttributeUtility from '../element/ElementEventAttributeUtility.js';
import Event from '../../event/Event.js';

/**
 * HTMLTrackElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTrackElement
 */
export default class HTMLTrackElement extends HTMLElement {
	// Events

	/* eslint-disable jsdoc/require-jsdoc */

	public get oncuechange(): ((event: Event) => void) | null {
		return ElementEventAttributeUtility.getEventListener(this, 'oncuechange');
	}

	public set oncuechange(value: ((event: Event) => void) | null) {
		this[PropertySymbol.propertyEventListeners].set('oncuechange', value);
	}

	/* eslint-enable jsdoc/require-jsdoc */

	/**
	 * Returns kind.
	 *
	 * @returns Kind.
	 */
	public get kind(): string {
		const kind = this.getAttribute('kind');
		if (kind === null) {
			return TextTrackKindEnum.subtitles;
		}
		if (!TextTrackKindEnum[<'subtitles'>kind]) {
			return TextTrackKindEnum.metadata;
		}
		return kind;
	}

	/**
	 * Sets kind.
	 *
	 * @param value Value.
	 */
	public set kind(value: string) {
		if (!TextTrackKindEnum[<'subtitles'>value]) {
			value = TextTrackKindEnum.metadata;
		}
		this.setAttribute('kind', value);
	}

	/**
	 * Returns source.
	 *
	 * @returns Source.
	 */
	public get src(): string {
		if (!this.hasAttribute('src')) {
			return '';
		}

		try {
			return new URL(this.getAttribute('src')!, this[PropertySymbol.ownerDocument].location.href)
				.href;
		} catch (e) {
			return this.getAttribute('src') || '';
		}
	}

	/**
	 * Sets source.
	 *
	 * @param src Source.
	 */
	public set src(src: string) {
		this.setAttribute('src', src);
	}

	/**
	 * Returns source language.
	 *
	 * @returns Source language.
	 */
	public get srclang(): string {
		return this.getAttribute('srclang') || '';
	}

	/**
	 * Sets source language.
	 *
	 * @param value Value.
	 */
	public set srclang(value: string) {
		this.setAttribute('srclang', value);
	}

	/**
	 * Returns label.
	 *
	 * @returns Label.
	 */
	public get label(): string {
		return this.getAttribute('label') || '';
	}

	/**
	 * Sets label.
	 *
	 * @param value Value.
	 */
	public set label(value: string) {
		this.setAttribute('label', value);
	}

	/**
	 * Returns default.
	 *
	 * @returns Default.
	 */
	public get default(): boolean {
		return this.hasAttribute('default');
	}

	/**
	 * Sets default.
	 *
	 * @param value Value.
	 */
	public set default(value: boolean) {
		if (value) {
			this.setAttribute('default', '');
		} else {
			this.removeAttribute('default');
		}
	}

	/**
	 * Returns ready state.
	 *
	 * @returns Ready state.
	 */
	public get readyState(): number {
		return 0;
	}

	/**
	 * Returns the TextTrack object corresponding to the track element.
	 *
	 * @returns TextTrack
	 */
	public get track(): TextTrack {
		const textTrack = new this[PropertySymbol.window].TextTrack(PropertySymbol.illegalConstructor);
		textTrack[PropertySymbol.kind] = <TextTrackKindEnum>this.kind;
		textTrack[PropertySymbol.label] = this.label;
		textTrack[PropertySymbol.language] = this.srclang;
		textTrack[PropertySymbol.mode] = this.default ? 'showing' : 'disabled';
		textTrack[PropertySymbol.id] = this.id;
		return textTrack;
	}
}
