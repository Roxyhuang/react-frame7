import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'zepto'; // eslint-disable-line
// import frame7 from 'frame7'; // eslint-disable-line
import output from './test/output';
import { App } from './App';
import '../node_modules/test/test.css';
import './assets/css/global.less';

console.log(process.env.FETCH_ENV);
console.log(output);
// console.log(`jquery cdn>>>>>>>>> ${$}`);
// console.log(`frame7 cdn>>>>>>>>> ${frame7}`);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
