'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  async selectAction(){
    let data = await this.model('user').select();
    this.success(data);
  }
  async addAction(){
    let id = await this.model('user').addUser();
    this.success(id)
  }
  async countSelectAction(){
    let model = this.model('user');
    let result = await model.page(this.get('page'), 3).order('name ASC').field('name').countSelect(true);
    this.success(result);
  }

  async findAction(){
    let model = this.model('user');
    let data = await model.find();
    this.success(data);
  }
  async indexesAction(){
    let model = this.model('user');
    let data = await model.getIndexes();
    this.success(data);
  }
}