'use strict';
(function () {
  const { Base, Cell, rndFromArray} = $dep.import(['Base', 'Cell', 'rndFromArray']);
  const { abs } = Math;

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
        for(let x = 0; x < this.width; x++) this.data[y].push(new Cell());
      }
    }
    
    gen() {

      for(let y = 0; y < this.height; y++) {
        for(let x = 0; x < this.width; x++) this.data[y][x].value = rndFromArray(this.lib);
      }

      this
        .clear()
        .analize();
      return this;
    }

    clear() {
      this.data.forEach(row => row.forEach(cell => cell.clearModificator()));
      return this;
    }

    analize() {
      const rowAnalize = (index, cell, row) => {
        if(index === row.length - 1) return null;
        const nextCell = row[index + 1];
        if(nextCell.value === cell.value) {
          cell.addModificator(cell.value);
          nextCell.addModificator(cell.value);
        }
      };

      for(let y = 0; y < this.height; y++) {
        const row = this.data[y];
        for(let index = 0; index < row.length; index++) rowAnalize(index, row[index], row);
      }

      for(let x = 0; x < this.width; x++) {
        const col = this.data90[x];
        for(let index = 0; index < col.length; index++) rowAnalize(index, col[index], col);
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
        for(let x = 0; x < this.width; x++) {
          let elCell = this.elRoot.children[y].children[x];
          if(!elCell) {
            elCell = document.createElement('div');
            elCell.classList.add('matrix__cell');
            this.data[y][x].setRoot(elCell);
            elRow.appendChild(elCell);
          }

          const classString = elCell.classList.value
            .split(' ')
            .filter(c => c.includes('--') === false)
            .join(' ');
          elCell.classList.value = classString;

          if(this.data[y][x].modificators.size) {
            elCell.classList.add(...[ ...this.data[y][x].modificators ].map(s => `matrix__cell--m-${s}`));
          }

          elCell.textContent = this.data[y][x].value;
        }
      }
    }

    toSketch(d) {
      let res = '';
      for(let y = 0; y < d.length; y++) {
        for(let x = 0; x < d[y].length; x++) {
          res += d[y][x].value;
        }
        res += '\n';
      }
      return res;
    }

    get element (){return this.elRoot;}
    get data90() {
      const data = [];
      let [x, y, isRun] = [0, 0 ,true];
      while(isRun) {
        data.push([]);
        data[x].unshift(this.data[y][x]);
        [x, y] = [x, y + 1];
        if(y === this.height) [x, y] = [x + 1, 0];
        if(x === this.width) {
          isRun = false;
          break;
        }
      }
      return data;
    }
  }

  $dep.export({ Matrix });
})();
