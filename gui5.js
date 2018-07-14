class GPane {
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
    this.x1 = x;
  }

  getY() {
    return this.y1;
  }

  setY(y) {
    this.y1 = y;
  }

  getRegion() {
    return { x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 };
  }

  getWidth() {
    return this.x2 - this.x1;
  }

  getHeight() {
    return this.y2 - this.y1;
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

class GComponent {
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

class GButton extends GComponent {
  constructor(x, y, l, w, rgba, text, onClick) {
    super(x, y, "BUTTON");
    this.l = l;
    this.w = w;
    this.rgba = rgba;
    this.text = text;
    this.onClick = onClick;
  }

  getRegion() {
    return { x1: this.x, y1: this.y, x2: this.x + this.w, y2: this.y + this.l };
  }

  draw() {
    fill(this.rgba[0], this.rgba[1], this.rgba[2], 255);
    rect(this.x, this.y, this.l, this.w);

    textSize(18);
    textAlign(CENTER);
    fill(0, 0, 0);
    text(this.text, this.x + this.w / 2, this.y + this.l / 2);
  }
}

class GText extends GComponent {
  constructor(x, y, w, l, size, rgba, text, onClick) {
    super(x, y, "TEXT");
    this.w = w;
    this.l = l;
    this.size = size;
    this.rgba = rgba;
    this.text = text;
    this.onClick = onClick;
  }

  getRegion() {
    return { x1: this.x, y1: this.y, x2: this.x + this.w, y2: this.y + this.l };
  }

  draw() {
    fill(this.rgba[0], this.rgba[1], this.rgba[2], 255);
    textSize(this.size);
    textAlign(LEFT);
    text(this.text, this.x, this.y, this.x + this.w, this.y + this.l);
  }
}

function mouseClicked() {
  // CREATE EVENT HANDLER THAT LOOPS INTELLIGENTLY
  for (var i = 0; i < panes.length; i++) {
    if (inRegion(mouseX, mouseY, panes[i].getRegion())) {
      for (var j = 0; j < panes[i].components.length; j++) {
        if (inRegion(mouseX, mouseY, panes[i].components[j].getRegion())) {
          panes[i].components[j].onClick();
        }
      }
      break;
    }
  }
}

function inRegion(x, y, region) {
  return x >= region.x1 && x <= region.x2 && y >= region.y1 && y <= region.y2;
}