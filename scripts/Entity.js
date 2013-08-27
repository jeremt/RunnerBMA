
~function () {

function Entity(params, tag) {
  this.tag = tag;
  params || (params = {});
  for (var key in params)
    this[key] = params[key];
}

Entity.prototype.initialize = function () {
  this.mesh.position.y += 25;
  this.mesh.position.z -= 5000;
  this.mesh.position.x = -50 + 50 * this.line;
  this.scene.add(this.mesh);
}

Entity.prototype.update = function (delta) {
  if (this.dead)
    return ;
  if (this.mesh.position.z === 1000)
    this.kill();
  this.mesh.position.z += 10;
}

Entity.prototype.kill = function () {
  this.dead = true;
  this.scene.remove(this.mesh);
}

Entity.prototype.onHit = function (player) {}

window.Entity = Entity;

}();