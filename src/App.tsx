import React, { createRef, useEffect, useRef } from 'react';
import './App.css';
import { LabelTemplateRoom } from './components/Container';

function App() {
	return ( <LabelTemplateRoom/>
	
	);
}

export default App;
const roundTo2Decimals = (value: number) => {
	return Math.round(value * 100) / 100;
};
