'use strict';
(function () {
  const { Scene, Matrix, rndInt, int } = $dep.import(['Scene', 'Matrix', 'rndInt', 'int']);


  // matrix
  const lib = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const width = int( window.innerWidth / 20 ) - 1;
  const height = int( window.innerHeight / 20 ) - 1;
  const matrix = new Matrix({width, height, lib});

  // scene
  const scene = new Scene();
  scene
    .append('matrix', matrix)
    .render();



  let direction = -1;
  const process = function () {
    matrix.lib = lib;
    matrix
      .gen()
      .analize();
    scene.render();

    const t = setTimeout(process, rndInt(500, 5000));

    if(direction === -1) lib.pop();
    else lib.push(lib[lib.length - 1] + 1);

    if(lib.length === 1) direction = 1;
    else if(lib.length === 9) direction = -1;
  };
  process();
})();
