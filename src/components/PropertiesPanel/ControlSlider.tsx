import { Box, Grid, InputBase, Slider } from '@mui/material';
import { convertToNumber, decorateValue } from '../util';
import { ReactNode, useEffect, useState } from 'react';
interface ControlSliderProps {
	startAdornment?: ReactNode;
    endAdornment?: ReactNode;
	hideSlider?: boolean;
	label: string;
	onChange: (value: string) => void;
	append?: string;
	prepend?: string;
	value: string;
	decimalPlaces?: number;
	name: string;
	min?: number;
	max?: number;
	steps?: number;
}
export const ControlSlider = (props: ControlSliderProps) => {
	const {
		hideSlider,
		label,
		append,
		prepend,
		onChange,
		value,
		decimalPlaces,
		name,
		min = 0,
		max = 100,
		steps = 1,
	} = props;
	const options = { prepend, append, decimalPlaces };
	const [displayValue, setDisplayValue] = useState(value);
	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setDisplayValue(value);
	};
	const onBlur = () => {
		onChange(decorateValue(displayValue, options));
	};
	const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onBlur();
		}
	};

	const onSliderChange = (_event: Event, newValue: number | number[]) => {
		const value = decorateValue(newValue.toString(), options);
		onChange(value);
	};
	const SliderValue = convertToNumber(value);

	useEffect(() => {
		setDisplayValue(value);
	}, [value]);

	// Handle an on Click event when the grid element that contains the label and the input field is clicked, it should focus on the input field and select the text
	const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const input = e.currentTarget.querySelector('input');
		if (input) {
			input.focus();
			input.select();
		}
	};

	return (
		<Grid
			container
			aria-label={name}
			sx={{
				boxSizing: 'border-box',
				paddingTop: '0.25rem',
				fontSize: (t) => t.typography.caption.fontSize,
			}}>
			<Grid
				onClick={onClick}
				item
				xs={12}
				display={'flex'}
				sx={{
					alignItems: 'center',
					justifyContent: "space-between", // "flex-start
					border: '1px solid transparent',
					paddingX: '.5rem',
					paddingY: '.25rem',
					flexDirection: 'row',
					boxSizing: 'border-box',
					'&:hover': {
						border: (t) => `1px solid rgba(255,255,255,0.5)`,
					},
					'&:focus-within': {
						border: (t) => `1px solid ${t.palette.primary.main}`,
					},
				}}>
				{props.startAdornment}
				<Box sx={{ opacity: '.5', fontStyle: 'thin', marginRight: '0.75rem' }}>{label}</Box>
				<InputBase
					onKeyUp={onEnter}
					sx={{ fontSize: 'inherit', padding: 0, width: 'initial' }}
					inputProps={{ sx: { padding: 0 } }}
					type="text"
					name={name}
					value={displayValue}
					onChange={onInputChange}
					onBlur={onBlur}
				/>
                {props.endAdornment}
			</Grid>
			<Grid item xs={12} sx={{ paddingX: '0.5rem', display: hideSlider ? 'none' : 'block' }}>
				<Slider
					sx={{ paddingY: '.25rem' }}
					valueLabelDisplay="auto"
					size="small"
					value={SliderValue}
					onChange={onSliderChange}
					min={min}
					max={max}
					step={steps}
				/>
			</Grid>
		</Grid>
	);
};
