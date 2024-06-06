import { RefObject, forwardRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTemplateSelector } from '../Container/store';
import { MarginIndicators } from './MarginIndicator';

export const SheetWidthIndicator = (props: { anchorRef: RefObject<HTMLDivElement> }) => {
	const [show, setShow] = useState(false);
	const width = useTemplateSelector((s) => s.sheet.width);
	const zoom = useTemplateSelector((s) => s.zoom);
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

		const resizeObserver = new ResizeObserver(() => {
			updatePosition();
		});

		resizeObserver.observe(r);

		updatePosition();

		return () => {
			resizeObserver.unobserve(r);
		};
	}, [props.anchorRef]);

	const buffer = '2rem';

	useEffect(() => {
		setShow(true);
		const t = setTimeout(() => {
			setShow(false);
		}, 3000);
		return () => {
			clearTimeout(t);
		};
	}, [width]);
	return (
		<Box
			sx={{
				opacity: show ? 1 : 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				transition: `width 0.1s ease-out, opacity ${show ? '0.1s' : '0.4s'} ease-out`,
				position: 'absolute',
				top: `calc(${position.top}px - ${buffer})`, // `calc(${position.top}px - ${buffer})`,
				left: position.left,
				width: `calc(${width} * ${zoom})`,
			}}>
			<Box
				sx={{
					fontSize: (t) => t.typography.caption.fontSize,
					padding: '0.05rem 0.5rem',
					borderRadius: '10px',
					backgroundColor: (t) => t.palette.primary.dark,
					color: 'rgba(255,255,255,1)',
					zIndex: 1,
				}}>
				{width}
			</Box>
			<Box
				sx={{
					position: 'absolute',
					backgroundColor: (t) => t.palette.primary.dark,
					height: '1px',
					width: '100%',
					top: '50%',
				}}
			/>
		</Box>
	);
};

export const SheetHeightIndicator = (props: { anchorRef: RefObject<HTMLDivElement> }) => {
	const [show, setShow] = useState(false);
	const height = useTemplateSelector((s) => s.sheet.height);
	const zoom = useTemplateSelector((s) => s.zoom);
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
		const resizeObserver = new ResizeObserver(() => {
			updatePosition();
		});
		resizeObserver.observe(r);
		updatePosition();
		return () => {
			resizeObserver.unobserve(r);
		};
	}, [props.anchorRef]);

	useEffect(() => {
		setShow(true);
		const t = setTimeout(() => {
			setShow(false);
		}, 3000);
		return () => {
			clearTimeout(t);
		};
	}, [height]);
	const buffer = '3rem';
	return (
		<Box
			sx={{
				width: '2rem',
				opacity: show ? 1 : 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				transition: `height 0.1s ease-out, opacity ${show ? '0.1s' : '0.4s'} ease-out`,
				position: 'absolute',
				top: position.top,
				left: `calc(${position.left}px - ${buffer})`,
				height: `calc(${height} * ${zoom})`,
			}}>
			<Box
				sx={{
					fontSize: (t) => t.typography.caption.fontSize,
					padding: '0.05rem 0.5rem',
					position: 'relative',
					top: 0,
					borderRadius: '10px',
					backgroundColor: (t) => t.palette.primary.dark,
					color: 'rgba(255,255,255,1)',
					zIndex: 1,
				}}>
				{height}
			</Box>
			<Box
				sx={{
					position: 'absolute',
					backgroundColor: (t) => t.palette.primary.dark,
					borderRadius: '25%',
					height: '100%',
					width: '1px',
					left: '50%',
				}}
			/>
		</Box>
	);
};

export const Sheet = forwardRef<HTMLDivElement>((_p, ref) => {
	const props = useTemplateSelector((s) => s.sheet);
	const zoom = useTemplateSelector((s) => s.zoom);
	return (
		<Box
			id={'sheet'}
			ref={ref}
			sx={{
				transformOrigin: 'top left',
				marginLeft: 'auto',
				marginRight: 'auto',
				transform: `scale(${zoom})`,
				transitionProperty: 'width, height, transform',
				transitionDuration: '0.1s',
				transitionTimingFunction: 'ease-out',	
				color: 'black',
				position: 'relative',
				width: props.width,
				height: props.height,
				boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1), 0 8px 16px rgba(0,0,0,.1)',
				backgroundColor: props.backgroundColor,
				borderRadius: '2.5px',
			}}>
			<MarginIndicators />
			<Box
				aria-label={'SheetContents'}
				sx={{
					width: '100%',
					height: '100%',
					paddingTop: props.marginTop,
					paddingBottom: props.marginBottom,
					paddingLeft: props.marginLeft,
					paddingRight: props.marginRight,
				}}>
				Sheet Contents
			</Box>
		</Box>
	);
});
