import { Box, Divider, Grid, Stack } from '@mui/material';
import { BorderColor, PanelColor, convertToNumber, decorateValue, throttle } from '../util';
import { SheetWidthSlider } from './SheetWidthSlider';
import { SheetHeightSlider } from './SheetHeightSlider';
import { ZoomSlider } from './ZoomSlider';
import { ControlSlider } from './ControlSlider';
import { useTemplateDisplatch, useTemplateSelector } from '../Container/store';
import { useCallback, useEffect, useState } from 'react';
import { setSheetMarginBottom, setSheetMarginLeft, setSheetMarginRight, setSheetMarginTop } from '../Container/slice';
import { SelectTemplate } from './SelectTemplate';

export const PropertiesPanel = () => {
	return (
		<Box
			sx={{
				border: `1px solid ${BorderColor}`,
				borderTop: 'none',
				boxSizing: 'border-box',
				backgroundColor: PanelColor,
				width: '240px',
				height: '100%',
			}}>
			<SheetPropertyContainer />
		</Box>
	);
};

const SheetPropertyContainer = () => {
	return (
		<Stack direction={'column'} sx={{ borderTop: `1px solid ${BorderColor}`, paddingX: '1rem' }}>
			<Box
				sx={{
					paddingTop: '1rem',
					fontSize: (t) => t.typography.caption,
					fontWeight: '700',
				}}>
				Sheet
			</Box>
			<SelectTemplate />
			<SheetWidthSlider />
			<SheetHeightSlider />
			<ZoomSlider />
			<Divider sx={{ marginTop: '1rem' }} />
			<Box
				sx={{
					paddingTop: '1rem',
					fontSize: (t) => t.typography.caption,
					fontWeight: '700',
				}}>
				Margin
			</Box>
			<MarginBlock />
		</Stack>
	);
};

const MarginBlock = () => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<MarginTopControl />
			</Grid>
			<Grid item xs={6}>
				<MarginLeftControl />
			</Grid>
			<Grid item xs={6}>
				<MarginBottomControl />
			</Grid>

			<Grid item xs={6}>
				<MarginRightControl />
			</Grid>
		</Grid>
	);
};

const MarginTopControl = () => {
	const min = 0;
	const marginTop = useTemplateSelector((state) => state.sheet.marginTop);
	const height = useTemplateSelector((state) => state.sheet.height);
	const marginBottom = useTemplateSelector((state) => state.sheet.marginBottom);
	const max = parseFloat(height) + parseFloat(marginBottom);
	const [currentValue, setCurrentValue] = useState(marginTop);
	const dispatch = useTemplateDisplatch();
	const onChange = (value: string) => {
		let numValue = convertToNumber(value);
		if (numValue < min) {
			numValue = min;
		} else if (numValue > max) {
			numValue = max;
		}
		setCurrentValue(decorateValue(numValue.toString(), { append: 'in' }));
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttleDispatch = useCallback(
		throttle((value: string) => {
			dispatch(setSheetMarginTop(value));
		}, 100),
		[dispatch],
	);
	useEffect(() => {
		throttleDispatch(currentValue);
	}, [currentValue, throttleDispatch]);
	return (
		<ControlSlider
			hideSlider
			label={'Top'}
			onChange={onChange}
			value={currentValue}
			name="marginTop"
			min={min}
			max={parseFloat(height) + parseFloat(marginBottom)}
			steps={0.25}
		/>
	);
};

const MarginBottomControl = () => {
	const min = 0;
	const marginBottom = useTemplateSelector((state) => state.sheet.marginBottom);
	const height = useTemplateSelector((state) => state.sheet.height);
	const marginTop = useTemplateSelector((state) => state.sheet.marginTop);
	const max = parseFloat(height) + parseFloat(marginTop);
	const [currentValue, setCurrentValue] = useState(marginBottom);
	const dispatch = useTemplateDisplatch();
	const onChange = (value: string) => {
		let numValue = convertToNumber(value);
		if (numValue < min) {
			numValue = min;
		} else if (numValue > max) {
			numValue = max;
		}
		setCurrentValue(decorateValue(numValue.toString(), { append: 'in' }));
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttleDispatch = useCallback(
		throttle((value: string) => {
			dispatch(setSheetMarginBottom(value));
		}, 100),
		[dispatch],
	);
	useEffect(() => {
		throttleDispatch(currentValue);
	}, [currentValue, throttleDispatch]);
	return (
		<ControlSlider
			hideSlider
			label={'Bottom'}
			onChange={onChange}
			value={currentValue}
			name="marginBottom"
			min={min}
			max={parseFloat(height) + parseFloat(marginTop)}
			steps={0.25}
		/>
	);
};

const MarginLeftControl = () => {
	const min = 0;
	const marginLeft = useTemplateSelector((state) => state.sheet.marginLeft);
	const width = useTemplateSelector((state) => state.sheet.width);
	const marginRight = useTemplateSelector((state) => state.sheet.marginRight);
	const max = parseFloat(width) + parseFloat(marginRight);
	const [currentValue, setCurrentValue] = useState(marginLeft);
	const dispatch = useTemplateDisplatch();
	const onChange = (value: string) => {
		let numValue = convertToNumber(value);
		if (numValue < min) {
			numValue = min;
		} else if (numValue > max) {
			numValue = max;
		}
		setCurrentValue(decorateValue(numValue.toString(), { append: 'in' }));
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttleDispatch = useCallback(
		throttle((value: string) => {
			dispatch(setSheetMarginLeft(value));
		}, 100),
		[dispatch],
	);
	useEffect(() => {
		throttleDispatch(currentValue);
	}, [currentValue, throttleDispatch]);
	return (
		<ControlSlider
			hideSlider
			label={'Left'}
			onChange={onChange}
			value={currentValue}
			name="marginLeft"
			min={min}
			max={parseFloat(width) + parseFloat(marginRight)}
			steps={0.25}
		/>
	);
};

const MarginRightControl = () => {
	const min = 0;
	const marginRight = useTemplateSelector((state) => state.sheet.marginRight);
	const width = useTemplateSelector((state) => state.sheet.width);
	const marginLeft = useTemplateSelector((state) => state.sheet.marginLeft);
	const max = parseFloat(width) + parseFloat(marginLeft);
	const [currentValue, setCurrentValue] = useState(marginRight);
	const dispatch = useTemplateDisplatch();
	const onChange = (value: string) => {
		let numValue = convertToNumber(value);
		if (numValue < min) {
			numValue = min;
		} else if (numValue > max) {
			numValue = max;
		}
		setCurrentValue(decorateValue(numValue.toString(), { append: 'in' }));
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttleDispatch = useCallback(
		throttle((value: string) => {
			dispatch(setSheetMarginRight(value));
		}, 100),
		[dispatch],
	);
	useEffect(() => {
		throttleDispatch(currentValue);
	}, [currentValue, throttleDispatch]);
	return (
		<ControlSlider
			hideSlider
			label={'Right'}
			onChange={onChange}
			value={currentValue}
			name="marginRight"
			min={min}
			max={parseFloat(width) + parseFloat(marginLeft)}
			steps={0.25}
		/>
	);
};
