import { decorateValue, useZoomToWidth } from '../util';
import { ControlSlider } from './ControlSlider';

import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { convertToNumber, throttle } from '../util';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTemplateDisplatch, useTemplateSelector } from '../Container/store';
import { setZoom } from '../Container/slice';
import { CenterFocusStrong, FullscreenExit, Height } from '@mui/icons-material';

export const ZoomSlider = () => {
	const zoom = useTemplateSelector((state) => state.zoom);
	const zoomToWidth = useZoomToWidth();
	const [currentValue, setCurrentValue] = useState(decorateValue(zoom.toString()));
	const dispatch = useTemplateDisplatch();
	const onChange = (value: string) => {
		let numValue = convertToNumber(value);
		if (numValue < 0.25) {
			numValue = 0.25;
		} else if (numValue > 3) {
			numValue = 3;
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
				<Stack direction="row">
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Tooltip title="Zoom to fit width" arrow>
							<IconButton
								onClick={() => {
									const containerEl = containerRef.current;
									const zoomPaddingEl = sheetRef.current;
									if (!containerEl || !zoomPaddingEl) return;
									zoomToWidth(zoomPaddingEl);
								}}
								sx={{
									width: '30px',
									height: '30px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									border: '1px solid rgba(255,255,255,.1)',
									borderRadius: '5px 0 0 5px',
								}}>
								<FullscreenExit />
							</IconButton>
						</Tooltip>
					</Box>
					<Box
						sx={{
							width: '30px',
							height: '30px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							border: '1px solid rgba(255,255,255,.1)',
							borderRadius: '0 5px 5px 0',
						}}>
						<Tooltip title="Reset zoom" arrow>
							<IconButton
								onClick={() => {
									setCurrentValue(decorateValue('1'));
								}}
								sx={{
									transition: 'color 0.1s ease-out',
									color: 'rgba(255,255,255,.75)',
									'&:hover': {
										color: 'rgba(255,255,255,1)',
									},
								}}>
								<CenterFocusStrong fontSize="small" />
							</IconButton>
						</Tooltip>
					</Box>
				</Stack>
			}
		/>
	);
};
