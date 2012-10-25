
exports.SplitView = SplitView;
function SplitView(options) {
  this.orientation = options.orientation || "left";
  this.el = options.el || document.createElement("div");
  
  this.size = options.size || 200;

  if (this.orientation === "left" || this.orientation === "right") {
    this.el.classList.add("splitview");
    this.el.classList.add("horizontal");
    this.horizontal = true;
  }
  else if (this.orientation === "top" || this.orientation === "bottom") {
    this.el.classList.add("splitview");
    this.el.classList.add("vertical");
    this.horizontal = false;
  }
  else {
    throw new Error("options.orientation must be one of 'left', 'right', 'top', or 'bottom'");
  }
  
  var sliderEl = document.createElement("div");
  this.el.appendChild(sliderEl);
  this.sliderEl = sliderEl;

  sliderEl.classList.add("slider");
  var position = null;
  var self = this;
  sliderEl.addEventListener("mousedown", function (evt) {
    if (position !== null) return;
    evt.preventDefault();
    evt.stopPropagation();
    if (self.horizontal) {
      position = evt.clientX;
    }
    else {
      position = evt.clientY;
    }
    window.addEventListener("mousemove", onMouseMove, true);
    window.addEventListener('mouseup', onMouseUp, true);
  }, true);
  
  function onMouseMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var delta; 
    if (self.horizontal) {
      delta = evt.clientX - position;
      position = evt.clientX;
      if (self.orientation === "left") {
        self.size += delta;
      }
      else {
        self.size -= delta;
      }
    }
    else {
      delta = evt.clientY - position;
      position = evt.clientY;
      if (self.orientation === "top") {
        self.size += delta;
      }
      else {
        self.size -= delta;
      }
    }
    self.resize();
  }
  
  function onMouseUp(evt) {
    window.removeEventListener("mousemove", onMouseMove, true);
    window.removeEventListener('mouseup', onMouseUp, true);
    position = null;
  }
}

SplitView.prototype.resize = function (width, height) {
  if (!arguments.length) {
    if (this.width === null) return;
    width = this.width;
    height = this.height;
  }
  
  this.width = width;
  this.height = height;
  
  this.el.style.width = width + "px";
  this.el.style.height = height + "px";
  
  this.sliderEl.style[this.orientation] = this.size + "px";
  if (this.side) {
    this.side.el.style[this.orientation] = 0;
    if (this.horizontal) {
      this.side.resize(this.size, height);
    }
    else {
      this.side.resize(width, this.size);
    }
  }
  if (this.main) {
    this.main.el.style[this.orientation] = (this.size + 5) + "px";
    if (this.horizontal) {
      this.main.resize(width - this.size - 5, height);
    }
    else {
      this.main.resize(width, height - this.size - 5);
    }
  }

};

SplitView.prototype.addSide = function (obj) {
  if (this.side) {
    this.el.removeChild(this.side.el);
  }
  this.side = obj;
  this.el.appendChild(obj.el);
  this.resize();
};

SplitView.prototype.addMain = function (obj) {
  if (this.main) {
    this.el.removeChild(this.main.el);
  }
  this.main = obj;
  this.el.appendChild(obj.el);
  this.resize();
};
