import React from 'react';
import ReactDOM from 'react-dom';
// import '@node_modules/test1/test.css';
import 'assets/css/global.less';
import $ from 'zepto'; // eslint-disable-line
// import frame7 from 'frame7'; // eslint-disable-line
import output from './test/output';
import { App } from './App';


console.log(process.env.FETCH_ENV);
console.log(output);
console.log(`jquery cdn>>>>>>>>> ${$}`);
// console.log(`frame7 cdn>>>>>>>>> ${frame7}`);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
