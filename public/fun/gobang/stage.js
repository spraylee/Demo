
class Cell {
  constructor (x, y, type, order) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.time = new Date();
    this.order = order;
  }
}

class Stage {

  constructor (size) {
    this.size = size;
    this.output = {};
  }

  init() {
    this.data = [];
    for (var i = 0; i < this.size; i++) {
      this.data[i] = [];
      for (var j = 0; j < this.size; j++) {
        this.data[i][j] = 0;
      }
    }
    this.count   = 0;
    this.count_1 = 0;
    this.count_2 = 0;
    this.startTime = new Date();
    this.toMove = 1;
    this.steps = [];
  }

  move(x, y) {
    this.data[x][y] = new Cell(x, y, this.toMove, this.count + 1);
    this.steps.push({x, y});
    this.count++;
    (this.toMove === 1) && this.count_1++;
    (this.toMove === 2) && this.count_2++;
    this.toMove = 3 - this.toMove;
  }

  back(num) {

  }

  setOutput(funcObj) {
    this.output = funcObj;
  }
}