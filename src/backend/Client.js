/* eslint-disable global-require */

import 'whatwg-fetch';
import ProductClient from './mixins/productClient';
import client_config from './config/global_client';
import Exception from '../utils/Exception';

class Client {
  initialize() {
    // if (token.sessionToken) {
    //   throw new Error('TokenMissing');
    // }

    this.API_BASE_URL = client_config.fetch_url;
  }

  async _fetch(opts) {
    opts = Object.assign({
      method: 'POST', // By default use post
      url: null,
      body: null,
      callback: null,
    }, opts);

    const reqOpts = {
      method: opts.method,
      headers: {},
      url: null,
    };

    // if (this.sessionToken) {
    //   reqOpts.headers.Authorization = `Bearer ${this.sessionToken}`;
    // }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers.Accept = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
      // reqOpts.headers.APPID = CONFIG.app.id;
      // reqOpts.headers.APPVER = CONFIG.app.version;
      // reqOpts.headers.VUSER = this.sessionToken;
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    reqOpts.url = this.API_BASE_URL + opts.url;
    console.log(reqOpts);
    const res = {};

    let response;
    try {
      response = await fetch(reqOpts.url,reqOpts);// Send a POST request

      res.status = response.status;
      res.code = response.code;
    } catch (error) {
      console.log(error);
    }

    return response.json()
      .then((json) => {
        if (res.status === 200 || res.status === 201) {
          if (json.status_no && json.status_no !== 0) {
            throw (new Exception(json.status_no, json.status_msg, json.data));
          }
          return json.data;
        }
        throw (new Exception(res.code, response.bodyInit));
      });
  }
}
Object.assign(
  Client.prototype,
  ProductClient,
);

export default new Client();
