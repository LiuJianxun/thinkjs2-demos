'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let session = await this.session('userInfo');
    this.success(session);
  }
  async insertAction(){
    await this.session('userInfo', {name: 'welefen'});
    this.success();
  }
}