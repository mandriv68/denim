const range = document.querySelector('.range');
range.initial = range.querySelector('.range__initial');
range.final = range.querySelector('.range__final');
range.scale = range.querySelector('.range__scale');
range.slider = range.querySelector('.range__slider');
range.pointerInitial = range.querySelector('.range__pointer--initial');
range.pointerFinal = range.querySelector('.range__pointer--final');

const rangeCoordinates = {
  leftBorder: 0,
  rightBorder: 0,
  topBorder: 0,
  bottomBorder: 0,
  start: 0,
  current: 0,
  moveSize: 0,
  offsetLeft: 0,
};
const maxSize = 290;

let currentPointer = null;

let scaleRatio = 0;

function getNominationPointer() {
  return currentPointer.attributes.for.value.split('-')[0];
}

function setPointerPosition(offset) {
  currentPointer.style.left = `${offset}px`;
  currentPointer.dataset.value = offset * scaleRatio;
}

function onMousemove(e) {
  rangeCoordinates.current = ('ontouchstart' in window) ? e.changedTouches[0].clientX : e.clientX;
  rangeCoordinates.moveSize = rangeCoordinates.current - rangeCoordinates.start;
  rangeCoordinates.offsetLeft = currentPointer.offsetLeft + rangeCoordinates.moveSize;
  setPointerPosition(rangeCoordinates.offsetLeft);
  rangeCoordinates.start = rangeCoordinates.current;
  // eslint-disable-next-line no-use-before-define
  checkPointerMove();
}

function checkPointerMove() {
  if (getNominationPointer() === 'initial') {
    if (currentPointer.offsetLeft < 0) {
      setPointerPosition(0);
      window.removeEventListener('mousemove', onMousemove);
    } else if (currentPointer.offsetLeft > range.pointerFinal.offsetLeft - 16) {
      setPointerPosition(range.pointerFinal.offsetLeft - 40);
      window.removeEventListener('mousemove', onMousemove);
    }
    range.slider.style.left = `${currentPointer.offsetLeft}px`;
  } else {
    if (currentPointer.offsetLeft < range.pointerInitial.offsetLeft + 16) {
      setPointerPosition(range.pointerInitial.offsetLeft + 40);
      window.removeEventListener('mousemove', onMousemove);
    } else if (currentPointer.offsetLeft > range.scale.offsetWidth) {
      setPointerPosition(range.scale.offsetWidth);
      window.removeEventListener('mousemove', onMousemove);
    }
    range.slider.style.right = `${range.scale.offsetWidth - currentPointer.offsetLeft}px`;
  }
}

function initCoordinates() {
  rangeCoordinates.leftBorder = range.scale.getBoundingClientRect().left;
  rangeCoordinates.rightBorder = range.scale.getBoundingClientRect().right;
  rangeCoordinates.topBorder = range.scale.getBoundingClientRect().top;
  rangeCoordinates.bottomBorder = range.scale.getBoundingClientRect().bottom;
}

function onKeydown(event) {
  if (event.keyCode === 37) {
    rangeCoordinates.offsetLeft = currentPointer.offsetLeft - 1;
    setPointerPosition(rangeCoordinates.offsetLeft);
    checkPointerMove();
  } else if (event.keyCode === 39) {
    rangeCoordinates.offsetLeft = currentPointer.offsetLeft + 1;
    setPointerPosition(rangeCoordinates.offsetLeft);
    checkPointerMove();
  }
}

function pointerOnMousedown(event) {
  if (event.target.classList.contains('range__pointer')) {
    currentPointer = event.target;
    initCoordinates();
    scaleRatio = maxSize / range.scale.offsetWidth;
    rangeCoordinates.start = event.clientX;
    window.addEventListener('mousemove', onMousemove);
  }
}

function pointerOnMouseup() {
  currentPointer.control.value = currentPointer.dataset.value;
  window.removeEventListener('mousemove', onMousemove);
}

function pointerOnFocus() {
  currentPointer = this;
  window.addEventListener('keydown', onKeydown);
}

function pointerOnBlur() {
  currentPointer = null;
  window.removeEventListener('keydown', onKeydown);
}

function pointerOnTouchstart(event) {
  currentPointer = event.target;
  initCoordinates();
  scaleRatio = maxSize / range.scale.offsetWidth;
  rangeCoordinates.start = event.changedTouches[0].clientX;
}

range.addEventListener('mousedown', pointerOnMousedown);

range.addEventListener('mouseup', pointerOnMouseup);

range.pointerInitial.addEventListener('focus', pointerOnFocus);
range.pointerInitial.addEventListener('blur', pointerOnBlur);
range.pointerInitial.addEventListener('touchstart', pointerOnTouchstart);
range.pointerInitial.addEventListener('touchmove', onMousemove);

range.pointerFinal.addEventListener('focus', pointerOnFocus);
range.pointerFinal.addEventListener('blur', pointerOnBlur);
range.pointerFinal.addEventListener('touchstart', pointerOnTouchstart);
range.pointerFinal.addEventListener('touchmove', onMousemove);
