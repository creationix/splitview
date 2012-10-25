# SplitView

A simple web component for splitting a page into two frames with a movable separator.  Uses absolute positioning and fixed width css on the cells for maximum performance on mobile devices.

## Install

```sh
component install creationix/splitview
```

## Usage

```js
var SplitView = require('splitview').SplitView;

// The minimal interface to work as splitview items
function Cell() {
  // Must export your root element as this.el
  this.el = document.createElement("div");
}
// Must respond to resize commands and set your own width and height
// The offset (top or left) will be set by splitview
Cell.prototype.resize = function (width, height) {
  this.el.style.width = width + "px";
  this.el.style.height = height + "px";
};

var box = new SplitView({
  orientation: "left" // The side panel will be on the left
  size: 200           // The initial width of the side drawer
});
// el can also be passed in as an option, but will be created as a div if not.
document.body.appendChild(box.el);

// positive values are absolute sizes
box.addSide(new Cell());
box.addMain(new Cell());
// Tell box to resize itself and it's children
box.resize(500, 200);
```