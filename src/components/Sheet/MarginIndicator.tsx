import { Box, Theme, alpha, lighten, styled } from '@mui/material';
import { useTemplateSelector } from '../Container/store';
import { useEffect, useState } from 'react';

const useShowMargin = () => {
	const margins = useMargins();
	const height = useTemplateSelector((s) => s.sheet.height);
	const width = useTemplateSelector((s) => s.sheet.width);
	const [show, setShow] = useState(false);
	const [locked, setLocked] = useState(false);
	const mode = useTemplateSelector((s) => s.mode);
	const onMouseEnter = () => {
		if (mode === 'select' && locked === false) {
			setShow(true);
		}
	};
	const onMouseLeave = () => {
		if (locked === false) {
			setShow(false);
		}
	};
	useEffect(() => {
		setLocked(true);
		setShow(true);
		const t = setTimeout(() => {
			setShow(false);
			setLocked(false);
		}, 3000);
		return () => {
			clearTimeout(t);
		};
	}, [margins.marginLeft, margins.marginRight, margins.marginTop, margins.marginBottom, margins.zoom, height, width]);
	return { show, onMouseEnter, onMouseLeave };
};

const useMargins = () => {
	const marginLeft = useTemplateSelector((s) => s.sheet.marginLeft);
	const marginRight = useTemplateSelector((s) => s.sheet.marginRight);
	const marginTop = useTemplateSelector((s) => s.sheet.marginTop);
	const marginBottom = useTemplateSelector((s) => s.sheet.marginBottom);
	const zoom = useTemplateSelector((s) => s.zoom);
	return { marginLeft, marginRight, marginTop, marginBottom, zoom };
};
const createPolyon = (vectors: [string, string][]) => {
	return `polygon(${vectors.map(([x, y]) => `${x} ${y}`).join(', ')})`;
};
type Vectors = [string, string][];

const createClipPath = (margins: ReturnType<typeof useMargins>, variant: 'top' | 'bottom' | 'left' | 'right') => {
	const { marginLeft, marginRight, marginTop, marginBottom } = margins;
	const vectors: Vectors = [
		['0px', '0'],
		['100%', '0'],
		['100%', '100%'],
		['0', '100%'],
	];
	switch (variant) {
		case 'top':
			vectors[2] = [`calc(100% - ${marginRight})`, '100%'];
			vectors[3] = [`${marginLeft}`, '100%'];
			return createPolyon(vectors);
		case 'bottom':
			vectors[0] = [`${marginLeft}`, '0'];
			vectors[1] = [`calc(100% - ${marginRight})`, '0'];
			return createPolyon(vectors);
		case 'left':
			vectors[1][1] = marginTop;
			vectors[2][1] = `calc(100% - ${marginBottom})`;
			return createPolyon(vectors);
		case 'right':
			vectors[0][1] = marginTop;
			vectors[3][1] = `calc(100% - ${marginBottom})`;
			return createPolyon(vectors);
	}
};

const outline = (variant: 'top' | 'bottom' | 'left' | 'right', zoom: number) => {
	const thickness = 2;
	const line = (t: Theme) => `${thickness / zoom}px dashed ${alpha(t.palette.secondary.light, 0.5)}`;
	switch (variant) {
		case 'top':
			return { borderBottom: line };
		case 'bottom':
			return { borderTop: line };
		case 'left':
			return { borderRight: line };
		case 'right':
			return { borderLeft: line };
	}
};

export const MarginIndicator = (props: { variant: 'top' | 'bottom' | 'left' | 'right' }) => {
	const margins = useMargins();
	const show = useShowMargin();
	const text =
		props.variant === 'top'
			? margins.marginTop
			: props.variant === 'bottom'
			? margins.marginBottom
			: props.variant === 'left'
			? margins.marginLeft
			: margins.marginRight;
	const width =
		props.variant === 'top' || props.variant === 'bottom'
			? '100%'
			: props.variant === 'left'
			? margins.marginLeft
			: margins.marginRight;
	const height =
		props.variant === 'right' || props.variant === 'left'
			? '100%'
			: props.variant === 'top'
			? margins.marginTop
			: margins.marginBottom;
	const left = props.variant === 'right' ? `calc(100% - ${margins.marginRight})` : 0;
	const top = props.variant === 'bottom' ? `calc(100% - ${margins.marginBottom})` : 0;

	const displaceY = '-2rem';
	const displace = '-3rem';
	const marginTextProps: any = {};
	switch (props.variant) {
		case 'top':
			marginTextProps.left = '25%';
			marginTextProps.top = displaceY;
			break;
		case 'bottom':
			marginTextProps.left = '25%';
			marginTextProps.bottom = displaceY;
			break;
		case 'left':
			marginTextProps.top = '25%';
			marginTextProps.left = displace;
			break;
		case 'right':
			marginTextProps.top = '25%';
			marginTextProps.right = displace;
			break;
	}
	return (
		<StyledMarginIndicator
			onMouseEnter={() => show.onMouseEnter()}
			onMouseLeave={show.onMouseLeave}
			sx={{
				opacity: show.show ? 1 : 0,
				transition: 'opacity 0.1s ease-out',
				backgroundColor: (t) => alpha(t.palette.secondary.light, 0.3),
				...outline(props.variant, margins.zoom),
				width,
				height,
				left,
				top,
			}}>
			<Box
				className="marginText"
				sx={{
					transition: 'transform 0.1s ease-out',
					transform: `scale(${1 / margins.zoom})`,
					...marginTextProps,
				}}>
				{text}
			</Box>
		</StyledMarginIndicator>
	);
};

const StyledMarginIndicator = styled(Box)(({ theme }) => ({
	fontSize: theme.typography.caption.fontSize,
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: lighten(theme.palette.secondary.light, 0.5),
	'&::before': {
		content: "''",
		position: 'absolute',
		opacity: 0.75,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		pointerEvents: 'none',
	},
	'& .marginText': {
		cursorEvents: 'none',
		position: 'absolute',
	},
}));

export const MarginIndicators = () => {
	return (
		<>
			<MarginIndicator variant="left" />
			<MarginIndicator variant="right" />
			<MarginIndicator variant="bottom" />
			<MarginIndicator variant="top" />
		</>
	);
};
