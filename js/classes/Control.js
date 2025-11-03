'use strict';
(function () {
  const { Base } = $dep.import(['Base']);

  class Control extends Base{
    elRoot  = null;
    elLabel = null;
    elInput = null;

    model   = null;
    labelText = '';
    type = 'text';
    id = '';

    constructor(params = {}) {
      super({ ...params, name: 'Control' });

      const {labelText, type, id, model} = params;

      if(labelText) this.labelText = labelText;
      if(type) this.type = type;
      if(id) this.id = id;
      if(model) this.model = model;

      this.init();
      this.initEvents();
    }

    init() {
      this.elRoot = document.createElement('div');
      this.elRoot.classList.add('control');

      const label = document.createElement('label');
      label.textContent = this.labelText;
      label.classList.add('control__label');
      label.setAttribute('for', this.id);

      const input = document.createElement('input');
      input.type = this.type;
      input.id = this.id;
      input.classList.add('control__input');
      input.value = this.model;
      this.elLabel = label;
      this.elInput = input;
      this.elRoot.appendChild(label);
      this.elRoot.appendChild(input);

      return this;
    }
    initEvents() {
      this.elInput.addEventListener('input', this.onInput.bind(this));
    }
    onInput(e) {
      this.model = e.target.value;
    }

    get element (){return this.elRoot;}
  }

  $dep.export({ Control });
})();
