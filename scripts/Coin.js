
~function () {

function Coin(params) {

  // call parent constructor
  Entity.call(this, params, "coin");

  // create the mesh
  var texture = new THREE.ImageUtils.loadTexture("resources/guy.png");
  var mat = new THREE.MeshBasicMaterial({map: texture});
  mat.transparent = true;
  this.mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 80),
    mat
  );

  // initialize this entity
  this.initialize();

}

Coin.prototype.__proto__ = Entity.prototype;

Coin.prototype.onHit = function (player) {
  player.increaseScore();
  this.kill();
}

window.Coin = Coin;

}();