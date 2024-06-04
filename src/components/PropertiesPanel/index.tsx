import { Box, IconButton, Stack } from '@mui/material';
import { BorderColor, PanelColor, useZoomToWidth } from '../util';
import { SheetWidthSlider } from './SheetWidthSlider';
import { SheetHeightSlider } from './SheetHeightSlider';
import { ZoomSlider } from './ZoomSlider';
import { FullscreenExit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

export const PropertiesPanel = () => {
	return (
		<Box
			sx={{
				border: `1px solid ${BorderColor}`,
				borderTop: 'none',
				boxSizing: 'border-box',
				backgroundColor: PanelColor,
				minWidth: '240px',
				height: '100%',
			}}>
			<SheetPropertyContainer />
		</Box>
	);
};

const SheetPropertyContainer = () => {
    
	return (
		<Stack direction={'column'} sx={{ borderTop: `1px solid ${BorderColor}` }}>
			<Box sx={{ paddingX: '1.5rem', paddingTop: "1rem", fontSize: (t) => t.typography.caption, fontWeight: '700' }}>
				Sheet
			</Box>
			<SheetWidthSlider />
			<SheetHeightSlider />
			<ZoomSlider />
          
		</Stack>
	);
};
