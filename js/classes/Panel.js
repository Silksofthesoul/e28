'use strict';
(function () {
  const { Base } = $dep.import(['Base']);

  class Panel extends Base{
    elRoot = null;
    cSize = null;
    isRendered = false;
    constructor(params = {}) {
      super({ ...params, name: 'Panel' });
      this.init();
    }

    init() {
      this
        .initRoot()
        .initSize();
      document.body.appendChild(this.elRoot);
      return this;
    }

    initRoot() {
      this.elRoot = document.createElement('div');
      this.elRoot.classList.add('panel');
      return this;
    }

    initSize() {
      this.cSize = new Control({labelText: 'cell size', id: 'csize', type: 'text', model: 20 });
    }

    render() {
      if(this.isRendered) return this;
      this.elRoot.appendChild(this.cSize.element);
      this.isRendered = true;
      return this;
    }
    get element (){return this.elRoot;}
  }

  $dep.export({ Panel });
})();
