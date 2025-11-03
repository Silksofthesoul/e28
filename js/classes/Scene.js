'use strict';
(function () {
  const { Base } = $dep.import(['Base']);

  class Scene extends Base{
    elRoot = null;
    childs = [];

    constructor(params = {}) {
      super({ ...params, name: 'Scene' });
      this.init();
      this.effector();
    }

    init() {
      this.elRoot = document.createElement('div');
      this.elRoot.classList.add('scene');
      document.body.appendChild(this.elRoot);
      return this;
    }

    append(key, instance) {
      const index = this.childs.findIndex(t => t.key === key);
      if(index >= 0) {
        this.childs[index].instance = instance;
        this.childs[index].instance.element.remove();
      } else {
        this.childs.push({key, instance});
      }
      this.elRoot.appendChild(instance.element);
      return this;
    }

    get(key) {
      const index = this.childs.findIndex(t => t.key === key);
      if(index >= 0) return this.childs[index].instance;
      return null;
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
    
    effector() {
      this.elRoot.addEventListener('mousemove', this.onEffector.bind(this));
      this.elRoot.addEventListener('click', this.onEffector.bind(this));
      return this;
    }
    
    onEffector(e) {
      const [min, max] = [0.1, 2.0];
      const x = (e.clientX / window.innerWidth) * 100;
      const val = (((max - min) / 100) * x) + min;
      this.elRoot.style.setProperty('--cell-scale', val);
    }

    render() {
      this.childs
        .forEach(({instance: t}) => (t.render ? t.render() : void null));
      return this;
    }
  }

  $dep.export({ Scene });
})();
