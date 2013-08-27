
~function () {

function Block(params) {

  // call parent constructor
  Entity.call(this, params, "block");

  // create the mesh
  this.mesh = new THREE.Mesh(
    new THREE.CubeGeometry(50, 50, 50),
    new THREE.MeshBasicMaterial({
      map: new THREE.ImageUtils
        .loadTexture("resources/wall.gif")
    })
  );

  this.initialize();

}

Block.prototype.__proto__ = Entity.prototype;

Block.prototype.onHit = function (player) {
  player.decreaseLifes();
}

window.Block = Block;

}();