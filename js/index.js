'use strict';
(function () {
  const { Scene, Matrix } = $dep.import(['Scene', 'Matrix']);
  const scene = new Scene();
  const matrix = new Matrix({width: 10, height: 10, lib: [1, 2, 3, 4]});
  scene
    .append('matrix', matrix)
    .render();
})();
