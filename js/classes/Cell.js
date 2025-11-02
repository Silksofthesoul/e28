'use strict';
(function () {
  const { Base } = $dep.import(['Base']);

  class Cell extends Base{
    value   = 0;

    constructor(params = {}) {
      super({ ...params, name: 'Cell' });
    }

    set(value) {this.value = value;}

  }


  $dep.export({ Cell });
})();
