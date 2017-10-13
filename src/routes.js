import { Test1 } from './components/pages/Test1';
import { Test2 } from './components/pages/Test2';
import { Test3 } from './components/pages/Test3';

export const routes = [
  {
    path: '/',
    component: Test3,
  },
  {
    path: '/about/',
    component: Test1,
  }, {
    path: '/form/',
    component: Test2,
  }];
