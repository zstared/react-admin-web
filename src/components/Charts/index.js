import numeral from 'numeral'
import './g2';
import Bar from './Bar';
import Pie from './Pie';
import TagCloud from './TagCloud';
import WaterWave from './WaterWave';
const yuan = val => `¥ ${numeral(val).format('0,0')}`;
const Charts = {
	yuan,
	Bar,
	Pie,
	TagCloud,
	WaterWave
};

export {
	Charts as default,
	yuan,
	Bar,
	Pie,
	TagCloud,
	WaterWave
};
