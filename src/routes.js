import { Test1 } from './components/container/Test1';
import { Test2 } from './components/container/Test2';
import { Test3 } from './components/container/Test3';

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
