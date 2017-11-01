import { Test1 } from './components/container/Test1';
import { Test2 } from './components/container/Test2';
import { Test3 } from './components/container/Test3';

// const Test1 = () => import('./components/container/Test1').Test1;
// const Test2 = () => import('./components/container/Test2').Test2;
// const Test3 = () => import('./components/container/Test3').Test3;

export const routes = [
  {
    path: '/',
    // component: import('./components/container/Test1').Test2,
    component: Test3,
  },
  {
    path: '/about/',
    // component: import('./components/container/Test2').Test1,
    component: Test1,
  }, {
    path: '/form/',
    // component: import('./components/container/Test3').Test2,
    component: Test2,
  }];
