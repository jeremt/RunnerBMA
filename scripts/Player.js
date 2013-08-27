
~function () {

/**
 * Create a new player.
 */
function Player(params) {

  params || (params = {});
  for (var key in params)
    this[key] = params[key];

  _createAnimation(this);
  _createMesh(this);
  _setThirdPersonCamera(this);

  this.score = 0;
  this.target = this.mesh.position.clone();

}

Player.prototype.run = function () {
  this.anim.play("run");
}

/**
 * Update the player at each frame.
 * @param delta The delta time between this frame and
 * the previous one.
 */
Player.prototype.update = function (delta) {

  this.anim.update(delta * 1000);

  if (THREE.Input.isKeyDown('leftArrow'))
    _moveLeft(this);
  if (THREE.Input.isKeyDown('rightArrow'))
    _moveRight(this);

  this.mesh.position.lerp(this.target, delta * 10);

  if (this.isInvinsible()) {
    this.invinsibleDelay -= delta;
    this.mesh.visible = ~~(this.invinsibleDelay * 10) % 2;
  } else
    this.mesh.visible = true;

}

/**
 * Check collision between the player and another entity.
 */
Player.prototype.hit = function (entity) {
  var d = entity.mesh.position.z + 35 - this.mesh.position.z;
  return d >= 0 && d <= 50 &&
          entity.mesh.position.x === this.target.x;
}

/**
 * Return true if the player is in invisible mode.
 */
Player.prototype.isInvinsible = function () {
  return this.invinsibleDelay > 0;
}

/**
 * Increase player score.
 */
Player.prototype.increaseScore = function () {
  this.score++;
}

/**
 * Decrease player lifes.
 */
Player.prototype.decreaseLifes = function () {
  if (this.isInvinsible())
    return ;
  this.lifes--;
  this.invinsibleDelay = 2;
}

/**
 * Translate the player to the left.
 */
var _moveLeft = function (self) {
  if (self.target.x === -50)
    return ;
  self.target.x -= 50;
}

/**
 * Translate the player to the right.
 */
var _moveRight = function (self) {
  if (self.target.x === 50)
    return ;
  self.target.x += 50;
}

/**
 * Create the player sprite animation.
 */
var _createAnimation = function (self) {
  var texture = new THREE.ImageUtils.loadTexture("resources/mario.png");
  self.anim = new THREE.SpriteAnimation({
    texture: texture,
    tilesHorizontal: 6,
    tilesVertical: 4,
    numberOfTiles: 24,
    delay: 42
  });
  self.anim.add("idle",     {from: 22, to: 22});
  self.anim.add("run",  {from: 18, to: 23});
  self.anim.play("idle");
}

/**
 * Create the player mesh.
 */
var _createMesh = function (self) {
  var material = new THREE.MeshBasicMaterial({
    map: self.anim.texture
  });
  material.transparent = true;
  self.mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    material
  );
  self.mesh.position.y += 25;
  self.mesh.position.z += 25;
  self.scene.add(self.mesh);
}

/**
 * Attach a third person camera to the player.
 */
var _setThirdPersonCamera = function (self) {
  self.controls = new THREE.ThirdPersonControls({
    camera: self.camera,
    target: self.mesh,
    lerp: 0.05,
    offset: new THREE.Vector3(0, 90, 200),
    moveSpeed: 0, // on block les mouvements
    contraints: new THREE.Vector2(1, 1) // et les rotations
  });
  self.camera.position.set(5000, 4000, 5000);
}

window.Player = Player;

}();