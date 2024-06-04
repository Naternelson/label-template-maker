
import { Box, } from '@mui/material';
import {  convertToNumber, decorateValue, throttle } from '../util';
import {  useCallback, useEffect,  useState } from 'react';
import { useTemplateDisplatch, useTemplateSelector } from '../Container/store';
import { setSheetHeight } from '../Container/slice';
import { Height } from '@mui/icons-material';
import { ControlSlider } from './ControlSlider';

export const SheetHeightSlider = () => {
	const min = 1;
	const height = useTemplateSelector((state) => state.sheet.height);
	const [currentValue, setCurrentValue] = useState(height);
	const dispatch = useTemplateDisplatch();
	const onChange = (value: string) => {
		let numValue = convertToNumber(value);
		if (numValue < min) {
			numValue = min;
		}
		setCurrentValue(decorateValue(numValue.toString(), { append: 'in' }));
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttleDispatch = useCallback(
		throttle((value: string) => {
			dispatch(setSheetHeight(value));
		}, 100),
		[dispatch],
	);

	useEffect(() => {
		throttleDispatch(currentValue);
	}, [currentValue, throttleDispatch]);

	return (
		<ControlSlider
			startAdornment={
				<Box sx={{ opacity: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Height fontSize="small" />
				</Box>
			}
			label="Height"
			append="in"
			onChange={onChange}
			value={currentValue}
			name="height"
			min={1}
			max={20}
			steps={0.25}
		/>
	);
};
