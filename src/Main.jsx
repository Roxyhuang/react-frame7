import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'zepto'; // eslint-disable-line
// import frame7 from 'frame7'; // eslint-disable-line
import { App } from './App';
import './assets/css/global.less';

console.log(process.env.FETCH_ENV);
// console.log(`jquery cdn>>>>>>>>> ${$}`);
// console.log(`frame7 cdn>>>>>>>>> ${frame7}`);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
