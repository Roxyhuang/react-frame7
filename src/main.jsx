import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'zepto';
import frame7 from 'frame7';
import { App } from './App';
import './assets/css/global.less';


console.log(`jquery cdn>>>>>>>>> ${$}`);
console.log(`frame7 cdn>>>>>>>>> ${frame7}`);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
