import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Position {
	x: string;
	y: string;
	width?: string;
	height?: string;
	rotation?: string;
	zIndex?: number;
}

interface TextType {
	text: string;
	fontSize: string;
	fontStyle: string;
	color: string;
	backgroundColor: string;
	letterSpacing: string;
	lineHeight: string;
	paragraphSpacing: string;
	sizeType: 'auto-width' | 'auto-height' | 'fixed';
	alignX: 'left' | 'center' | 'right';
	alignY: 'top' | 'center' | 'bottom';
	decoration: 'none' | 'underline' | 'overline' | 'line-through';
	case: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
	verticalTrim: 'standard' | 'cap-height';
	truncate: 'none' | 'ellipsis';
	listStyle: 'unordered' | 'ordered' | 'none';
}
interface ShapeType {
	fill: string;
	stroke: string;
	strokeWidth: string;
	strokeDasharray: string;
	strokeLinecap: 'butt' | 'round' | 'square';
	strokeLinejoin: 'miter' | 'round' | 'bevel';
	strokeMiterlimit: string;
	fillRule: 'nonzero' | 'evenodd';
	clipRule: 'nonzero' | 'evenodd';
	shapeRendering: 'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision';
	textRendering: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
	imageRendering: 'auto' | 'optimizeSpeed' | 'optimizeQuality';
	pointerEvents: 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible';
	cursor:
		| 'auto'
		| 'default'
		| 'none'
		| 'context-menu'
		| 'help'
		| 'pointer'
		| 'progress'
		| 'wait'
		| 'cell'
		| 'crosshair'
		| 'text'
		| 'vertical-text'
		| 'alias'
		| 'copy'
		| 'move'
		| 'no-drop'
		| 'not-allowed'
		| 'grab'
		| 'grabbing'
		| 'all-scroll'
		| 'col-resize'
		| 'row-resize'
		| 'n-resize'
		| 'e-resize'
		| 's-resize'
		| 'w-resize'
		| 'ne-resize'
		| 'nw-resize'
		| 'se-resize'
		| 'sw-resize'
		| 'ew-resize'
		| 'ns-resize'
		| 'nesw-resize'
		| 'nwse-resize'
		| 'zoom-in'
		| 'zoom-out';
	filter: string;
	clipPath: string;
	mask: string;
	opacity: string;
	mixBlendMode:
		| 'normal'
		| 'multiply'
		| 'screen'
		| 'overlay'
		| 'darken'
		| 'lighten'
		| 'color-dodge'
		| 'color-burn'
		| 'hard-light'
		| 'soft-light'
		| 'difference'
		| 'exclusion'
		| 'hue'
		| 'saturation'
		| 'color'
		| 'luminosity';
	transform: string;
	transformOrigin: string;
	transformBox: 'fill-box' | 'view-box' | 'stroke-box' | 'border-box';
}

type BarcodeType = {
	width: string;
	height: string;
	elements: number[];
	barcodeType: BarcodeFonts;
	data: string;
	options: {
		width: string;
		height: string;
		format?: 'auto' | 'svg' | 'png' | 'jpg';
		displayValue?: boolean;
		text?: TextType;
		lineColor?: string;
		background?: string;
		fontSize?: string;
		font?: string;
		textAlign?: 'left' | 'center' | 'right';
		textPosition?: 'top' | 'bottom';
		margin?: string;
		marginTop?: string;
		marginBottom?: string;
		marginLeft?: string;
		marginRight?: string;
	};
};
enum BarcodeFonts {
	'code39',
	'code128',
	'ean13',
	'ean8',
	'upc',
	'upc-a',
	'upc-e',
	'itf',
	'itf14',
	'msi',
	'msi10',
	'msi11',
	'msi1010',
	'msi1110',
	'pharmacode',
	'codabar',
	'qrcode',
	'data-matrix',
}

type ElementType = Position & {
	type: BarcodeFonts | 'shape' | 'image' | 'text';
	text?: TextType;
	id: string;
	label: string;
	sheet: number;
	shape?: ShapeType;
	barcode?: BarcodeType;
};

type VariableType = {
	id: string;
	name: string;
	defaultValue: string;
	type:
		| 'labelPaginationIteration'
		| 'labelPaginationCount'
		| 'sheetPaginationIteration'
		| 'sheetPaginationCount'
		| 'currentSecond'
		| 'currentMinute'
		| 'currentHour'
		| 'currentDay'
		| 'currentMonth'
		| 'currentYear'
		| 'custom';
	mapTo?: string;
};

type LabelType = Position & {
	id: string;
	width: string;
	height: string;
	borderRadius?: string;
	elements: string[];
};
export const DefaultLabelSizes: { [key: string]: { width: string; height: string; borderRadius: string } } = {
	// Most common sizes at the top
	'Standard Letter': {
		width: '8.5in',
		height: '11in',
		borderRadius: '0',
	},
	'Standard A4': {
		width: '8.27in',
		height: '11.69in',
		borderRadius: '0',
	},
	'Avery 5169': {
		width: '6in',
		height: '4in',
		borderRadius: '0',
	},
	'Avery 5163': {
		width: '4in',
		height: '2in',
		borderRadius: '0',
	},
	'Avery 5160': {
		width: '2.63in',
		height: '1in',
		borderRadius: '0',
	},

	'Avery 5164': {
		width: '4in',
		height: '3.33in',
		borderRadius: '0',
	},
	'Avery 5165': {
		width: '8.5in',
		height: '11in',
		borderRadius: '0',
	},
	'Avery 5168': {
		width: '3.5in',
		height: '5in',
		borderRadius: '0',
	},
	'Avery 5395': {
		width: '2.25in',
		height: '3.5in',
		borderRadius: '0',
	},
	'Avery 8160': {
		width: '2.63in',
		height: '1in',
		borderRadius: '0',
	},
	'Avery 8163': {
		width: '4in',
		height: '2in',
		borderRadius: '0',
	},
	'Avery 8164': {
		width: '4in',
		height: '3.33in',
		borderRadius: '0',
	},
	'Avery 8460': {
		width: '2.63in',
		height: '1in',
		borderRadius: '0',
	},
	'Avery 8463': {
		width: '4in',
		height: '2in',
		borderRadius: '0',
	},
	'Avery 8464': {
		width: '4in',
		height: '3.33in',
		borderRadius: '0',
	},
	// Full-page and 6x4 labels

	'Avery 8520': {
		width: '2.625in',
		height: '1in',
		borderRadius: '0',
	},
	'Avery 5383': {
		width: '4in',
		height: '1.33in',
		borderRadius: '0',
	},
};

type SheetType = {
	id: string;
	width: string;
	height: string;
	marginTop: string;
	marginRight: string;
	marginBottom: string;
	marginLeft: string;
	dataRules: 'same-sheet' | 'new-sheet';
	name: string;
	backgroundColor: string;
	labels: LabelType[];
	labelOrigin: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	rows: number;
	columns: number;
	justifyContent: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
	defaultLabel: { width: string; height: string; borderRadius: string };
};

const initialState = {
	variables: {} as { [key: string]: VariableType },
	targetElement: null as null | string,
	targetLabel: null as null | string,
	targetSheet: 1 as number,
	elements: {} as { [key: string]: ElementType },
	sheet: {
		id: '1',
		width: '6in',
		height: '4in',
		marginTop: '0.25in',
		marginRight: '0.25in',
		marginBottom: '0.25in',
		marginLeft: '0.25in',
		dataRules: 'same-sheet' as 'same-sheet' | 'new-sheet',
		name: 'Sheet 1',
		backgroundColor: 'rgba(255,255,240,1)',
		labels: [] as LabelType[],
		labelOrigin: 'top-left' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
		rows: 1,
		columns: 1,
		justifyContent: 'start' as 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly',
		defaultLabel: { width: '2.63in', height: '1in', borderRadius: '0' },
	} as SheetType,
	zoom: 1 as number,
	showGrid: true,
	viewPortWidth: 0 as number,
	viewPortHeight: 0 as number,
	mode: "select" as "select" | "insert-text"
};

const slice = createSlice({
	name: 'root',
	initialState,
	reducers: {
		setTargetElement: (state, action) => {
			// Change the target element, as well as the target label and sheet
			state.targetElement = action.payload;
			state.targetLabel = state.elements[action.payload]?.label;
			state.targetSheet = state.elements[action.payload]?.sheet;
		},
		setTargetLabel: (state, action) => {
			// Change the target label && sheet && set the target element to the first element in the label
			state.targetLabel = action.payload;
			const elements = Object.values(state.elements);
			const targetElement = elements.find((element) => element.label === action.payload);
			state.targetElement = targetElement ? targetElement.id : null;
			state.targetSheet = targetElement ? targetElement.sheet : 1;
		},
		setTargetSheet: (state, action) => {
			// Change the target sheet && set the target element to the first element in the sheet
			state.targetSheet = action.payload;
			const elements = Object.values(state.elements);
			const targetElement = elements.find((element) => element.sheet === action.payload);
			state.targetElement = targetElement ? targetElement.id : null;
			state.targetLabel = targetElement ? targetElement.label : null;
		},
		setZoom: (state, action) => {
			state.zoom = action.payload;
		},
		resetZoom: (state) => {
			state.zoom = 1;
		},
		setShowGrid: (state, action) => {
			state.showGrid = action.payload;
		},
		setSheetWidth: (state, action) => {
			state.sheet.width = action.payload;
		},
		setSheetHeight: (state, action) => {
			state.sheet.height = action.payload;
		},
		setSheetMarginTop: (state, action) => {
			state.sheet.marginTop = action.payload;
		},
		setSheetMarginRight: (state, action) => {
			state.sheet.marginRight = action.payload;
		},
		setSheetMarginBottom: (state, action) => {
			state.sheet.marginBottom = action.payload;
		},
		setSheetMarginLeft: (state, action) => {
			state.sheet.marginLeft = action.payload;
		},
		setSheetDataRules: (state, action) => {
			state.sheet.dataRules = action.payload;
		},
		setSheetName: (state, action) => {
			state.sheet.name = action.payload;
		},
		setSheetBackgroundColor: (state, action) => {
			state.sheet.backgroundColor = action.payload;
		},
		setSheetLabelOrigin: (state, action) => {
			state.sheet.labelOrigin = action.payload;
		},
		setSheetRows: (state, action) => {
			state.sheet.rows = action.payload;
		},
		setSheetColumns: (state, action) => {
			state.sheet.columns = action.payload;
		},
		setSheetJustifyContent: (state, action) => {
			state.sheet.justifyContent = action.payload;
		},
		setDefaultLabelWidth: (state, action) => {
			state.sheet.defaultLabel.width = action.payload;
		},
		setDefaultLabelHeight: (state, action) => {
			state.sheet.defaultLabel.height = action.payload;
		},
		setDefaultLabelBorderRadius: (state, action) => {
			state.sheet.defaultLabel.borderRadius = action.payload;
		},
		setLabelWidth: (state, action: PayloadAction<{ id: string; width: string }>) => {
			state.sheet.labels.find((label) => label.id === action.payload.id)!.width = action.payload.width;
		},
		setLabelHeight: (state, action: PayloadAction<{ id: string; height: string }>) => {
			state.sheet.labels.find((label) => label.id === action.payload.id)!.height = action.payload.height;
		},
		setLabelBorderRadius: (state, action: PayloadAction<{ id: string; borderRadius: string }>) => {
			state.sheet.labels.find((label) => label.id === action.payload.id)!.borderRadius =
				action.payload.borderRadius;
		},
		addLabel: (state, action: PayloadAction<LabelType>) => {
			state.sheet.labels.push(action.payload);
		},
		removeLabel: (state, action: PayloadAction<string>) => {
			state.sheet.labels = state.sheet.labels.filter((label) => label.id !== action.payload);
		},
		addElement: (state, action: PayloadAction<ElementType>) => {
			state.elements[action.payload.id] = action.payload;
		},
		removeElement: (state, action: PayloadAction<string>) => {
			delete state.elements[action.payload];
		},
		updateElement: (state, action: PayloadAction<ElementType>) => {
			state.elements[action.payload.id] = action.payload;
		},
		addVariable: (state, action: PayloadAction<VariableType>) => {
			state.variables[action.payload.id] = action.payload;
		},
		removeVariable: (state, action: PayloadAction<string>) => {
			delete state.variables[action.payload];
		},
		updateVariable: (state, action: PayloadAction<VariableType>) => {
			state.variables[action.payload.id] = action.payload;
		},
		setViewPortDimensions: (state, action: PayloadAction<{ width: number; height: number }>) => {
			state.viewPortWidth = action.payload.width;
			state.viewPortHeight = action.payload.height;
		},
		incrementZoom: (state, action: PayloadAction<number>) => {
			state.zoom += action.payload;
			if(state.zoom > 3) state.zoom = 3
			if(state.zoom < 0.25) state.zoom = 0.25
		}, 
		resetMode: (state) => {
			state.mode = "select"
		}, 
		setMode: (state, action: PayloadAction<typeof initialState["mode"]>) => {
			state.mode = action.payload
		}
	},
});

export const {
    setTargetElement,
    setTargetLabel,
    setTargetSheet,
    setZoom,
    resetZoom,
    setShowGrid,
    setSheetWidth,
    setSheetHeight,
    setSheetMarginTop,
    setSheetMarginRight,
    setSheetMarginBottom,
    setSheetMarginLeft,
    setSheetDataRules,
    setSheetName,
    setSheetBackgroundColor,
    setSheetLabelOrigin,
    setSheetRows,
    setSheetColumns,
    setSheetJustifyContent,
    setDefaultLabelWidth,
    setDefaultLabelHeight,
    setDefaultLabelBorderRadius,
    setLabelWidth,
    setLabelHeight,
    setLabelBorderRadius,
    addLabel,
    removeLabel,
    addElement,
    removeElement,
    updateElement,
    addVariable,
    removeVariable,
    updateVariable,
	setViewPortDimensions,
	incrementZoom
} = slice.actions;

export default slice.reducer;