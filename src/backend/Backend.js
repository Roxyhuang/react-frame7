import Client from './Client';

export default class Backend {
  static getInstance(token = null, client = 'default') {
    let res;
    if (client === 'default') {
      Client.initialize(token);
      res = Client;
    }
    return res;
  }
}
