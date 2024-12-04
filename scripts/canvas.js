function Canvas() {
    this.eventElements = {};
}

Canvas.prototype.dragElement = function(element) {
    this.eventElements.draggedElement = element;
};

Canvas.prototype.dropElement = function() {
    delete this.eventElements.draggedElement;
};

Canvas.prototype.mouseMoved = function(event) {
    ;
};

