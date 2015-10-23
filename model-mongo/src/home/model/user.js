'use strict';
/**
 * model
 */

export default class extends think.model.mongo {
  addUser(){
    return this.add({
      name: 'welefen' + Math.random(),
      title: 'haha'
    })
  }
}