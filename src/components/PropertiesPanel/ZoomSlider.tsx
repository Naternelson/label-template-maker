import { decorateValue, useZoomToWidth } from '../util';
import { ControlSlider } from './ControlSlider';

import { Box, IconButton, Tooltip } from '@mui/material';
import { convertToNumber, throttle } from '../util';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTemplateDisplatch, useTemplateSelector } from '../Container/store';
import { setZoom } from '../Container/slice';
import { FullscreenExit, Height } from '@mui/icons-material';

export const ZoomSlider = () => {
	const zoom = useTemplateSelector((state) => state.zoom);
	const zoomToWidth = useZoomToWidth();
	const [currentValue, setCurrentValue] = useState(decorateValue(zoom.toString()));
	const dispatch = useTemplateDisplatch();
	const onChange = (value: string) => {
		let numValue = convertToNumber(value);
		if (numValue < 0.25) {
			numValue = 0.25;
		}
		setCurrentValue(decorateValue(numValue.toString()));
	};
	const containerRef = useRef<HTMLDivElement | null>(null);
	const sheetRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		// Capture elements after the component has mounted
		const containerEl = document.getElementById('sheets-container') as HTMLDivElement;
		const sheetEl = document.getElementById('sheet') as HTMLDivElement;

		// Check if elements are found
		if (containerEl && sheetEl) {
			containerRef.current = containerEl;
			sheetRef.current = sheetEl;
			console.log(containerRef.current, sheetRef.current);
		} else {
			console.error('Elements not found');
		}
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttleDispatch = useCallback(
		throttle((value: string) => {
			dispatch(setZoom(parseFloat(value)));
		}, 100),
		[dispatch],
	);

	useEffect(() => {
		throttleDispatch(currentValue);
	}, [currentValue, throttleDispatch]);
	useEffect(() => {
		setCurrentValue(decorateValue(zoom.toString()));
	}, [zoom]);

	return (
		<ControlSlider
			startAdornment={
				<Box sx={{ opacity: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Height fontSize="small" sx={{ rotate: '45deg' }} />
				</Box>
			}
			label="Zoom"
			onChange={onChange}
			value={currentValue}
			name="zoom"
			min={0.25}
			max={3}
			steps={0.1}
			decimalPlaces={2}
			endAdornment={
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Tooltip title="Zoom to fit width" arrow>
						<IconButton
							sx={{
								width: '30px',
								height: '30px',
								transition: 'color 0.1s ease-out',
								color: 'rgba(255,255,255,.75)',
								'&:hover': {
									color: 'rgba(255,255,255,1)',
								},
							}}>
							<FullscreenExit
								onClick={() => {
									const containerEl = containerRef.current;
									const zoomPaddingEl = sheetRef.current;
									if (!containerEl || !zoomPaddingEl) return;
									zoomToWidth(zoomPaddingEl);
								}}
							/>
						</IconButton>
					</Tooltip>
				</Box>
			}
		/>
	);
};
