import Client from './Client';
import MockClient from './MockClient';

const env = process.env.Node_ENV || 'development';

const isMock = process.env.FETCH_ENV.isMock || 'true';

export default class Backend {
  static getInstance(token = null) {
    let res;
    if (env !== 'development' && !isMock) {
      Client.initialize(token);
      res = Client;
    } else {
      console.log('This is Mock Env!!!!');
      console.log('This is Mock Env!!!!');
      console.log('This is Mock Env!!!!');
      console.log('===========================================');
      MockClient.initialize();
      res = MockClient;
    }
    return res;
  }
}
