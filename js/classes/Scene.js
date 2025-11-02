'use strict';
(function () {
  const { Base } = $dep.import(['Base']);

  class Scene extends Base{
    elRoot = null;
    childs = [];
    constructor(params = {}) {
      super({ ...params, name: 'Scene' });
      this.init();
    }

    init() {
      this.elRoot = document.createElement('div');
      this.elRoot.classList.add('scene');
      document.body.appendChild(this.elRoot);
      return this;
    }
    append(key, instance) {
      this.childs.push({key, instance});
      this.elRoot.appendChild(instance.element);
      return this;
    }
    remove(key) {
      const index = this.childs.findIndex(t => t.key === key);
      if(index >= 0) {
        const {instance} = this.childs[index];
        const {element} = instance;
        element.remove();
        this.childs.splice(index, 1);
      }
      return this;
    }
    render() {
      this.childs
        .forEach(({instance: t}) => (t.render ? t.render() : void null));
      return this;
    }
  }

  $dep.export({ Scene });
})();
