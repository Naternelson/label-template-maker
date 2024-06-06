import { useCallback, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { store, useTemplateDisplatch, useTemplateSelector } from './store';
import styled from '@emotion/styled';
import { Box, Stack, Toolbar } from '@mui/material';
import { PropertiesPanel } from '../PropertiesPanel';
import { BorderColor, PanelColor, backgroundColor, lineColor } from '../util';
import { incrementZoom, setViewPortDimensions } from './slice';
import { Sheet, SheetHeightIndicator, SheetWidthIndicator } from '../Sheet';

export const LabelTemplateRoom = () => {
	return (
		<Provider store={store}>
			<DesignBackground>
				<TemplateToolBar />
				<Stack direction={'row'} flex={1} sx={{ overflow: 'hidden' }}>
					<ElementViewPanel />
					<SheetsContainer />
					<PropertiesPanel />
				</Stack>
			</DesignBackground>
		</Provider>
	);
};

export const DesignBackground = styled('div')({
	overflow: 'hidden',
	color: 'white',
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	zIndex: -1,
	display: 'flex',
	flexDirection: 'column',
	backgroundImage: `linear-gradient(to right , ${lineColor} 1px, transparent 1px),
    linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
	backgroundSize: '80px 80px',
	backgroundColor: backgroundColor,
	backgroundPosition: '0px 0px',

	'&::before': {
		pointerEvents: 'none',
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: '100vh',
		backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
		backgroundSize: '20px 20px',
		backgroundPosition: '0px 0px',
		zIndex: -1,
	},
});

const TemplateToolBar = () => {
	return <Toolbar sx={{ zIndex: 2, border: `1px solid ${BorderColor}`, backgroundColor: PanelColor }} />;
};

const ElementViewPanel = () => {
	return (
		<Box
			sx={{
				zIndex: 2,
				border: `1px solid ${BorderColor}`,
				borderTop: 'none',
				boxSizing: 'border-box',
				backgroundColor: PanelColor,
				minWidth: '240px',
				height: '100%',
			}}></Box>
	);
};

const SheetsContainer = () => {
	const sheetsRef = useRef<HTMLDivElement>(null);
	const ref = useRef<HTMLDivElement>(null);
	const zoom = useTemplateSelector((s) => s.zoom);
	const dispatch = useTemplateDisplatch();

	useEffect(() => {
		const handleResize = () => {
			if (ref.current)
				dispatch(setViewPortDimensions({ width: ref.current.clientWidth, height: ref.current.clientHeight }));
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [dispatch]);

	const handleWheel = useCallback(
		(e: WheelEvent) => {
			if (e.ctrlKey) {
				e.preventDefault();
				e.stopPropagation();
				const delta = e.deltaY > 0 ? -0.25 : 0.25;
				if (zoom + delta < 0.25 || zoom + delta > 3) return;
				dispatch(incrementZoom(delta));
			}
		},
		[zoom, dispatch],
	);

	useEffect(() => {
		const r = ref.current;
		if (!r) return;
		r.addEventListener('wheel', handleWheel, { passive: false });
		return () => {
			r?.removeEventListener('wheel', handleWheel);
		};
	}, [handleWheel]);

	return (
		<StyledSheetContainer id="sheets-container" ref={ref}>
			<Sheet ref={sheetsRef} />
			<SheetWidthIndicator anchorRef={sheetsRef} />
			<SheetHeightIndicator anchorRef={sheetsRef} />
			{/* <MarginLeftIndicator anchorRef={sheetsRef} />
			<MarginRightIndicator anchorRef={sheetsRef} />
			<MarginTopIndicator anchorRef={sheetsRef} />
			<MarginBottomIndicator anchorRef={sheetsRef} /> */}
		</StyledSheetContainer>
	);
};

const StyledSheetContainer = styled('div')({
	zIndex: 1,
	position: 'relative',
	flex: 1,
	overflow: 'auto',
	padding: '5rem',
	maxHeight: '100%',
	paddingRight: 'calc(5rem + 12px)',
	paddingBottom: 'calc(5rem + 12px)',
	scrollbarColor: `${BorderColor} ${PanelColor}`,
	scrollbarWidth: 'thin',
	'&::-webkit-scrollbar': {
		width: '12px',
		height: '12px',
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: BorderColor,
		borderRadius: '6px',
		border: `3px solid ${PanelColor}`,
	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: PanelColor,
		borderRadius: '6px',
	},
});
