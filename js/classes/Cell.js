'use strict';
(function () {
  const { Base } = $dep.import(['Base']);

  class Cell extends Base{
    elRoot = null;
    value   = 0;
    modificators = new Set();

    constructor(params = {}) {
      super({ ...params, name: 'Cell' });
    }
    setRoot(elRoot) {
      this.elRoot = elRoot;
      return this;
    }

    addModificator(val) {
      this.modificators.add(val);
      return this;
    }

    removeModificator(val) {
      this.modificators.delete(val);
      return this;
    }
    clearModificator() {
      this.modificators.clear();
      return this;
    }

    destroy() {
      this.elRoot.remove();
      this.elRoot = null;
      return this;
    }

    set(value) {this.value = value;}

  }


  $dep.export({ Cell });
})();
