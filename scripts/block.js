let $blockBoard = document.querySelector('#block-board');
let topIndex = 1;

function getTopIndex() {
    return topIndex++;
}

function Block(name) {
    this.$block = document.createElement('div');
    this.name = name;

    this.interactionState = Block.STATES.IDLE;
    this.interactionData = {};
}

Block.STATES = {
    IDLE: 'idle',
    DRAGGING: 'dragging'
}

Block.prototype.init = function() {
    this.$block.classList.add('block');
    this.$block.innerHTML = `
        <div class="block-name">
            ${this.name}
        </div>
    `;

    $blockBoard.appendChild(this.$block);
    this.attachListeners();
};

Block.prototype.attachListeners = function() {
    this.$block.addEventListener('mousedown', this.mousePressed.bind(this));
    this.$block.addEventListener('mouseup', this.mouseReleased.bind(this));
    this.$block.addEventListener('mouseleave', this.mouseReleased.bind(this));
    this.$block.addEventListener('mousemove', this.mouseMoved.bind(this));
};

Block.prototype.mousePressed = function(event) {
    this.interactionState = 'dragging';
    this.$block.style.cursor = 'grabbing';
    this.$block.style.position = 'fixed';
    this.$block.style.zIndex = getTopIndex();

    let boundingRect = this.$block.getBoundingClientRect();
    let offX = event.clientX - boundingRect.left;
    let offY = event.clientY - boundingRect.top;
    
    this.interactionData.drag = {
        offX,
        offY
    }
};

Block.prototype.mouseReleased = function() {
    this.interactionState = 'idle';
    this.$block.style.cursor = 'grab';
    
    delete this.interactionData.drag;
};

Block.prototype.mouseMoved = function(event) {
    if (this.interactionState !== 'dragging') {
        return;
    }

    let mouseX = event.clientX;
    let mouseY = event.clientY;
    
    let { offX, offY } = this.interactionData.drag;

    mouseX -= offX;
    mouseY -= offY;

    this.$block.style.left = `${mouseX}px`;
    this.$block.style.top = `${mouseY}px`;
};

let dummyBlock = new Block('dummy');
dummyBlock.init();
let dummyBlock2 = new Block('dummy');
dummyBlock2.init();

