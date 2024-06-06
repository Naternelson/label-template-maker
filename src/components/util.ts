import { RefObject, useCallback } from 'react';
import { useTemplateDisplatch, useTemplateSelector } from './Container/store';
import { setZoom } from './Container/slice';

export const PanelColor = 'rgba(40,40,40,1)';
export const BorderColor = 'rgba(255,255,255,.1)';
export const backgroundColor = 'rgba(20,20,20,1)';
export const lineColor = 'rgba(255,255,255,.02)';
export const convertToNumber = (value: string, decimalPlaces: number = 2) => {
	// Convert a number string to a number, if decimal places are specified, round to that number of decimal places
	let numberValue = parseFloat(value);
	if (isNaN(numberValue)) numberValue = 0; // If the value is not a number, default to 0
	if (decimalPlaces) {
		return parseFloat(numberValue.toFixed(decimalPlaces));
	} else {
		return numberValue;
	}
};

type ThrottledFunction = (...args: any[]) => void;

export function throttle(func: ThrottledFunction, limit: number): ThrottledFunction {
	let inThrottle: boolean;
	let lastFunc: ReturnType<typeof setTimeout>;
	let lastRan: number;

	return function (this: any, ...args: any[]) {
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			lastRan = Date.now();
			inThrottle = true;
			lastFunc = setTimeout(function () {
				inThrottle = false;
				func.apply(context, args);
			}, limit - (Date.now() - lastRan));
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(function () {
				if (Date.now() - lastRan >= limit) {
					func.apply(context, args);
					lastRan = Date.now();
				}
			}, limit - (Date.now() - lastRan));
		}
	};
}

export const decorateValue = (
	value: string,
	options?: {
		prepend?: string;
		append?: string;
		decimalPlaces?: number;
	},
) => {
	const { prepend, append, decimalPlaces } = options || {};
	let newValue = parseFloat(value); // Make it round to the given decimal places
	if (isNaN(newValue)) {
		newValue = 0;
	}
	if (decimalPlaces) {
		newValue = parseFloat(newValue.toFixed(decimalPlaces));
	}
	value = newValue.toString();
	if (prepend) {
		value = prepend + value;
	}
	if (append) {
		value = value + append;
	}
	return value;
};

export const useZoomToWidth = () => {
	const dispatch = useTemplateDisplatch();
	const width = useTemplateSelector((state) => state.sheet.width);

	return useCallback(
		(content: HTMLDivElement) => {
			// const parentWidth = content.parentElement?.getBoundingClientRect()?.width || 0
			// if (parentWidth === 0) return;

			// const contentRect = content.getBoundingClientRect();
			// const padding = contentRect.left

			// // Width is written in inches, so we need to convert it to pixels
			// const convertedWidth = parseFloat(width) * 96;
			// const perfectWidth = parentWidth
			// const newZoom = ((perfectWidth) / (convertedWidth+ padding)).toFixed(2);

			// console.log({parent: content.parentElement?.getBoundingClientRect(), contentRect});

			// dispatch(setZoom(newZoom));
			const parent = content.parentElement;
			if (!parent) return;
			const parentWidth = parent.offsetWidth;
			const contentWidth = parseFloat(width) * 96;
			if (contentWidth === 0 || parentWidth === 0) return;
			const newZoom =  parentWidth /(contentWidth +300)
			dispatch(setZoom(newZoom.toFixed(2)));
		},
		[dispatch, width],
	);
};
