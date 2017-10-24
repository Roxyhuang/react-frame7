/* eslint-disable */
const productClient = {
  async getProductList(data) {
    return await this._fetch({ url: 'base/3.0/pic/validateCode',method: data.method, body: data.body });
  },
};
export default productClient;
