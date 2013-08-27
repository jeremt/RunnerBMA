
~function () {

function EntityManager(params) {
  for (var key in params || {})
    this[key] = params[key];
  this.delay = 0;
  this.entities = [];
}

EntityManager.prototype.update = function (delta) {

  this.delay -= delta;
  if (this.delay < 0) {
    this.delay = Math.random() * 0.8 + 0.28;
    _spawnEntities(this);
  }

  for (var i = this.entities.length - 1; i >= 0; --i) {
    if (this.player.hit(this.entities[i]))
      this.entities[i].onHit(this.player);
    if (this.entities[i].dead)
      this.entities.splice(i, 1);
    else
      this.entities[i].update(delta);
  }

}

var _spawnEntities = function (self) {
  self.line = ~~(Math.random() * 3);

  var nbWalls = ~~(Math.random() * 3);
  for (var i = 0; i < nbWalls; ++i) 
    _addEntity(self, Block);

  var nbGuys = ~~(Math.random() * 3) + 1 - nbWalls;
  for (var i = 0; i < nbGuys; ++i)
    _addEntity(self, Coin);
}

var _addEntity = function (self, Type) {
  self.entities.push(new Type({
    scene: self.scene,
    line: self.line
  }));
  self.line = (self.line + 1) % 3;
}

var _handleCollision = function (player, entity) {
  if (entity.tag === "coin") {
    player.increaseScore();
    entity.kill();
  } else {
    player.decreaseLifes();
  }
}

window.EntityManager = EntityManager;

}();