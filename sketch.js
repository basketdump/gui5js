var panes = [new GPane(200, 200, 500, 300), new GPane(300, 500, 530, 600)];

function setup() {
  // put setup code
  createCanvas(1280, 720);

  var test = function() {
    console.log("Hello");
  };

  panes[0].add(
    new GButton(
      0,
      0,
      panes[0].getWidth() / 3,
      panes[0].getHeight(),
      [0, 120, 255],
      "-",
      function() {
        console.log(this.text);
      }
    )
  );
  panes[0].add(
    new GButton(
      100,
      0,
      panes[0].getWidth() / 3,
      panes[0].getHeight(),
      [0, 255, 0],
      "[]",
      function() {
        console.log(this.text);
      }
    )
  );
  panes[0].add(
    new GButton(
      200,
      0,
      panes[0].getWidth() / 3,
      panes[0].getHeight(),
      [255, 0, 0],
      "x",
      function() {
        console.log(this.text);
      }
    )
  );
  panes[1].add(
    new GText(
      0,
      0,
      panes[1].getWidth(),
      panes[1].getHeight(),
      100,
      [120, 255, 255],
      "Hello",
      function() {
        console.log(this.text);
      }
    )
  )
}

function draw() {
  // put drawing code here
  background(100);
  for (var i = 0; i < panes.length; i++) {
    panes[i].draw();
  }
}
