
~function () {

function GUI(context) {
  this.context = context;
  var elems = document.getElementsByClassName('gui-box');
  this.boxes = {};
  for (var i = 0; i < elems.length; ++i)
    this.boxes[elems[i].id] = elems[i];
  this.opened = true;
  this.close();
}

GUI.prototype.open = function (boxID) {
  if (this.opened)
    this.close();
  this.boxes[boxID].style.display = 'block';
  this.context.pause();
}

GUI.prototype.close = function () {
  if (!this.opened)
    return ;
  this.opened = false;
  for (var key in this.boxes)
    this.boxes[key].style.display = 'none';
  this.context.play();
}

window.GUI = GUI;

}();