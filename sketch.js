class Pane {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.components = [];
  }

  getX() {
    return this.x1;
  }

  setX(x) {
    this.x = x;
  }

  getY() {
    return this.y1;
  }

  setY(y) {
    this.y = y;
  }

  add(component) {
    this.components.push(component);
    component.setX(component.getX() + this.getX());
    component.setY(component.getY() + this.getY());
  }

  draw() {
    fill(0, 0, 0, 0);
    rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    for (var i = 0; i < this.components.length; i++) {
      this.components[i].draw();
    }
  }
}

class Component {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  getX() {
    return this.x;
  }

  setX(x) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y) {
    this.y = y;
  }
}

class Button extends Component {
  constructor(x, y, l, w, rgba, text, onClick) {
    super(x, y, "BUTTON");
    this.l = l;
    this.w = w;
    this.rgba = rgba;
    this.text = text;
    this.onClick = onClick;
  }

  draw() {
    fill(this.rgba[0], this.rgba[1], this.rgba[2], 255);
    rect(this.x, this.y, this.l, this.w);

    textSize(18);
    textAlign(CENTER);
    fill(0, 0, 0);
    text(this.text, this.x + this.w / 2, this.y + this.l / 2);
  }

  test() {
    console.log("Hello");
  }

}

function mouseClicked() {
  for(var i = 0; i < window_buttons.components.length; i++) {
    if (mouseX >= window_buttons.components[i].getX() && mouseX <= window_buttons.components[i].getX() + window_buttons.components[i].w &&
    mouseY >= window_buttons.components[i].getY() && mouseY <= window_buttons.components[i].getY() + window_buttons.components[i].l) {
      window_buttons.components[i].test();
      break;
    }
  }
}

var window_buttons = new Pane(980, 0, 1280, 100);

function setup() {
  // put setup code
  createCanvas(1280, 720);

  var test = function() {
    console.log("Hello");
  }

  window_buttons.add(new Button(0, 0, 100, 100, [0, 120, 255], "Minimize", test));
  window_buttons.add(new Button(100, 0, 100, 100, [0, 255, 0], "Maximize", test));
  window_buttons.add(new Button(200, 0, 100, 100, [255, 0, 0], "Exit", test));
}

function draw() {
  // put drawing code here
  background(100);
  window_buttons.draw();
}
