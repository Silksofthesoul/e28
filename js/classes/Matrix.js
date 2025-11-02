'use strict';
(function () {
  const { Base, Cell, rndFromArray} = $dep.import(['Base', 'Cell', 'rndFromArray']);

  class Matrix extends Base{
    elRoot = null;

    width  = 1;
    height = 1;
    lib = [0];
    data   = [];

    constructor(params = {}) {
      super({ ...params, name: 'Matrix' });
      const {width, height, lib = []} = params;
      if(lib) this.lib = [...new Set(lib)];
      this.width = width;
      this.height = height;
      this.init();
    }

    init() {
      this.initElement();
      this.initData();
      this.gen();
    }

    initElement() {
      this.elRoot = document.createElement('div');
      this.elRoot.classList.add('matrix');
      return this;
    }

    initData() {
      for(let y = 0; y < this.height; y++) {
        this.data.push([]);
        for(let x = 0; x < this.width; x ++) {
          this.data[y].push(new Cell());
        }
      }
    }

    gen() {
      for(let y = 0; y < this.height; y++) {
        for(let x = 0; x < this.width; x ++) {
          this.data[y][x] = rndFromArray(this.lib);
        }
      }
    }

    render() {
      for(let y = 0; y < this.height; y++) {
        let elRow = this.elRoot.children[y];
        if(!elRow) {
          elRow = document.createElement('div');
          elRow.classList.add('matrix__row');
          this.elRoot.appendChild(elRow);
        }
        for(let x = 0; x < this.width; x ++) {
          let elCell = this.elRoot.children[y].children[x];
          if(!elCell) {
            elCell = document.createElement('div');
            elCell.classList.add('matrix__cell');
            elRow.appendChild(elCell);
          }
          elCell.textContent = this.data[y][x];
        }
      }
    }

    get element (){return this.elRoot;}
  }

  $dep.export({ Matrix });
})();
