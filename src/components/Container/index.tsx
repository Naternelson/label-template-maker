import { RefObject, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { store, useTemplateDisplatch, useTemplateSelector } from './store';
import styled from '@emotion/styled';
import { Box, Stack, Toolbar } from '@mui/material';
import { PropertiesPanel } from '../PropertiesPanel';
import { BorderColor, PanelColor, backgroundColor, lineColor, useZoomToWidth } from '../util';
import { setViewPortDimensions, setZoom } from './slice';
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
	return <Toolbar sx={{ border: `1px solid ${BorderColor}`, backgroundColor: PanelColor }} />;
};

const ElementViewPanel = () => {
	return (
		<Box
			sx={{
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
	const paddingRef = useRef<HTMLDivElement>(null);
	const ref = useRef<HTMLDivElement>(null);
    const zoomToFit = useZoomToWidth();
	const zoom = useTemplateSelector((s) => s.zoom);
	const width = useTemplateSelector((s) => s.sheet.width);
	const height = useTemplateSelector((s) => s.sheet.height);
	const dispatch = useTemplateDisplatch();

	useEffect(() => {
		// Set the container height and width when the component mounts or resizes
		const handleResize = () => {
			if (ref.current) {
				dispatch(setViewPortDimensions({ width: ref.current.clientWidth, height: ref.current.clientHeight }));
			}
			if (ref.current && sheetsRef.current) zoomToFit(sheetsRef.current);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [dispatch, zoomToFit]);

	// round to 2 decimal places
	const roundTo2Decimals = (num: number) => Math.round(num * 100) / 100;
	const handleWheel = useCallback(
		(e: WheelEvent) => {
			if (e.ctrlKey) {
				e.preventDefault();
				e.stopPropagation();
				const delta = e.deltaY > 0 ? -0.25 : 0.25;
				const newZoom = Math.max(0.25, Math.min(3, roundTo2Decimals(zoom + delta)));
				dispatch(setZoom(newZoom.toString()));
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
		<Box
			id="sheets-container"
			ref={ref}
			sx={{
				position: 'relative',
				padding: '5rem',
				maxHeight: '100%',
				flex: 1,
				overflow: 'auto',
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
			}}>
			<Sheet ref={sheetsRef} />
			<ZoomPadding ref={paddingRef} anchorRef={sheetsRef} width={width} height={height} zoom={zoom} />
			<SheetWidthIndicator anchorRef={sheetsRef} />
			<SheetHeightIndicator anchorRef={sheetsRef} />
		</Box>
	);
};
type ZooomPaddingProps = {
	width: string;
	height: string;
	zoom: number;
	anchorRef: RefObject<HTMLDivElement>;
};
const ZoomPadding = forwardRef<HTMLDivElement, ZooomPaddingProps>((props, ref) => {
	const [position, setPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		const r = props.anchorRef.current;
		if (!r) return;

		const updatePosition = () => {
			const parentRect = r.parentElement?.getBoundingClientRect();
			const childRect = r.getBoundingClientRect();
			if (parentRect && childRect) {
				const top = childRect.top - parentRect.top;
				const left = childRect.left - parentRect.left;
				setPosition({ top, left });
			}
		};

		// Initialize ResizeObserver
		const resizeObserver = new ResizeObserver(() => {
			updatePosition();
		});

		// Observe the anchor element
		resizeObserver.observe(r);

		// Update position initially
		updatePosition();

		// Cleanup observer on unmount
		return () => {
			resizeObserver.unobserve(r);
		};
	}, [props.anchorRef]);

	return (
		<Box
			id="zoom-padding"
			ref={ref}
			sx={{
				pointerEvents: 'none',
				width: `calc(calc(calc(${props.width} * ${props.zoom}) + ${position.left}px) - 10px)`,
				height: `calc(calc(calc(${props.height} * ${props.zoom}) + ${position.top}px), - 10px)`,
				position: 'absolute',
				// outline: '1px solid blue',
				top: position.top,
				left: position.left,
			}}
		/>
	);
});
