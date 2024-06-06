import { Box, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
import { DefaultLabelSizes, setSheetHeight, setSheetWidth } from '../Container/slice';
import { useTemplateDisplatch, useTemplateSelector } from '../Container/store';
import { useEffect, useState } from 'react';

export const SelectTemplate = () => {
	const width = useTemplateSelector((state) => state.sheet.width);
	const height = useTemplateSelector((state) => state.sheet.height);
	const [displayValue, setDisplayValue] = useState(findTemplateKey(width, height) || merge('Custom', width, height));

	const options = Object.keys(DefaultLabelSizes);
	const dispatch = useTemplateDisplatch();

	const onChange = (e: any) => {
		const newValue = e.target.value;
		setDisplayValue(newValue);
		const displayWidth = DefaultLabelSizes[newValue]?.width;
		const displayHeight = DefaultLabelSizes[newValue]?.height;
		if (displayWidth && displayHeight) {
			dispatch(setSheetWidth(displayWidth));
			dispatch(setSheetHeight(displayHeight));
		}
	};

	useEffect(() => {
		const key = findTemplateKey(width, height);
		if (key) {
			setDisplayValue(key);
		} else {
			setDisplayValue(merge('Custom', width, height));
		}
	}, [width, height]);
	const mergedOptions = [displayValue, ...options].filter((v, i, a) => a.indexOf(v) === i);
	return (
		<Tooltip arrow title={'Template Size'} placement={'top'}>
			<TextField
				sx={{
					paddingX: '.5rem',
					marginY: '0.5rem',
					'&:focus-within': {
						backgroundColor: 'rgba(255,255,255,.1)',
					},
					'& .MuiSelect-icon': { color: 'rgba(255,255,255,.5)' },
				}}
				size="small"
				variant="standard"
				select
				value={displayValue}
				onChange={onChange}
				InputProps={{
					sx: {
						fontSize: (t) => t.typography.caption,
						padding: 0,
						width: 'initial',
						'&:focus-within': {
							backgroundColor: 'rgba(255,255,255,.1)',
						},
					},
				}}>
				{mergedOptions.map((option) => (
					<MenuItem key={option} value={option} sx={{ fontSize: (t) => t.typography.caption.fontSize }}>
						<Stack direction={'row'} justifyContent={'space-between'} width={'100%'} gap={'1rem'}>
							<Box component={'span'} flex={1}>
								{option}
							</Box>
							<Box component={'span'} flex={1} sx={{ color: 'rgba(255,255,255,.5)' }}>
								{DefaultLabelSizes[option]
									? merge2(DefaultLabelSizes[option].width, DefaultLabelSizes[option].height)
									: option.replace('Custom ', '')}
							</Box>
						</Stack>
					</MenuItem>
				))}
			</TextField>
		</Tooltip>
	);
};

const findTemplateKey = (width: string, height: string) => {
	for (const [key, value] of Object.entries(DefaultLabelSizes)) {
		if (value.width === width && value.height === height) {
			return key;
		}
	}
	return null;
};

const merge = (preface: string, width: string, height: string) => {
	return `${preface} ${width} x ${height}`;
};

const merge2 = (width: string, height: string) => {
	return `${width} x ${height}`;
};
