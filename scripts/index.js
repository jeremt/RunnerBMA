
~function () {

var context = new THREE.Context();
var gui = new GUI(context);
var score = document.getElementById('score');
var lifes = document.getElementById('lifes');

// debug
window.context = context;

context.addEventListener("start", function () {

  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 10000, 3, 1),
    new THREE.MeshBasicMaterial({color: 0x222222, wireframe: true})
  );
  ground.rotation.x = -Math.PI / 2; // on tourne le plan de 90°
  ground.position.z -= ground.geometry.height / 2;
  ground.position.z += 50 * 10;
  this.scene.add(ground);

  this.player = new Player({
    camera: this.camera,
    scene: this.scene,
    lifes: 3
  });
  this.controls = this.player.controls;

  this.entityManager = new EntityManager({
    scene: this.scene,
    player: this.player
  });

  this.started = false;

});

context.addEventListener("frame", function (event) {

  // intro
  if (this.camera.position.x < 0.1 && this.started === false) {
    this.started = true;
    this.player.run();
  }

  // update
  this.player.update(event.deltaTime);
  this.entityManager.update(event.deltaTime);

  // gui (TODO)
  if (this.player.lifes < 0)
    window.location.reload();

  // hud
  score.innerHTML = "Score: " + this.player.score;
  lifes.innerHTML = "Lifes: " + this.player.lifes;

});

context.start();

}();