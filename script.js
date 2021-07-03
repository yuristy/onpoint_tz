/* variables */
const CONTAINER = document.querySelector('.container');
const SLIDES_NUMBER = CONTAINER.children.length;
const HOME_BUTTON = document.querySelector('#home');
const NEXT_BUTTON = document.querySelector('#what-next');

/* transition between slides */
CONTAINER.style.setProperty('--current-slide-index', '0');

function next() {
  CONTAINER.style.setProperty('--current-slide-index', '1');
}

function home() {
  CONTAINER.style.setProperty('--current-slide-index', '0');
}

NEXT_BUTTON.addEventListener('click', next);
HOME_BUTTON.addEventListener('click', home);

/* vanilla js full page slider */
let currentSlideIndex = 0;
let xCoordinate = null;
let isLocked = false;
let windowWidth;

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

function lock(e) {
  xCoordinate = unify(e).clientX;
  CONTAINER.classList.toggle('smooth', !(isLocked = true));
}

function drag(e) {
  if (e.target !== document.querySelector('.page-2-text-block')) {
    e.preventDefault();
  }

  if (isLocked)
    CONTAINER.style.setProperty(
      '--x-difference',
      `${Math.round(unify(e).clientX - xCoordinate)}px`
    );
}

function move(e) {
  if (isLocked) {
    let xCoordinateDifference = unify(e).clientX - xCoordinate;
    let xCoordinateDifferenceSign = Math.sign(xCoordinateDifference);
    let factor = +(
      (xCoordinateDifferenceSign * xCoordinateDifference) /
      windowWidth
    ).toFixed(2);

    if (
      (currentSlideIndex > 0 || xCoordinateDifferenceSign < 0) &&
      (currentSlideIndex < SLIDES_NUMBER - 1 ||
        xCoordinateDifferenceSign > 0) &&
      factor > 0.2
    ) {
      CONTAINER.style.setProperty(
        '--current-slide-index',
        (currentSlideIndex -= xCoordinateDifferenceSign)
      );
      factor = 1 - factor;
    }

    CONTAINER.style.setProperty('--x-difference', '0px');
    CONTAINER.style.setProperty('--factor', factor);
    CONTAINER.classList.toggle('smooth', !(isLocked = false));
    xCoordinate = null;
  }
}

function size() {
  windowWidth = window.innerWidth;
}

size();
CONTAINER.style.setProperty('--slides-number', SLIDES_NUMBER);

addEventListener('resize', size, false);

CONTAINER.addEventListener('mousedown', lock, false);
CONTAINER.addEventListener('touchstart', lock, false);

CONTAINER.addEventListener('mousemove', drag, false);
CONTAINER.addEventListener('touchmove', drag, false);

CONTAINER.addEventListener('mouseup', move, false);
CONTAINER.addEventListener('touchend', move, false);

/* open/close modal window */
const modal = document.querySelector('#modal');

const btn = document.querySelector('#detail');

const span = document.querySelector('.close');

btn.addEventListener('click', function () {
  modal.style.display = 'flex';
});

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

/* change ordered list pages in modal window */
const BLOCK1 = document.querySelector('#block1');
const BLOCK2 = document.querySelector('#block2');
const PREV_PAGE = document.querySelector('#prev-page');
const NEXT_PAGE = document.querySelector('#next-page');
const FIRST_PAGE = document.querySelector('.first-page');
const SECOND_PAGE = document.querySelector('.second-page');
BLOCK2.style.display = 'none';
SECOND_PAGE.style.display = 'none';

function nextPage() {
  if ((BLOCK2.style.display = 'none')) {
    BLOCK2.style.display = 'flex';
    BLOCK1.style.display = 'none';
  }
  if ((SECOND_PAGE.style.display = 'none')) {
    SECOND_PAGE.style.display = 'block';
    FIRST_PAGE.style.display = 'none';
  }
}

function prevPage() {
  if ((BLOCK1.style.display = 'none')) {
    BLOCK1.style.display = 'flex';
    BLOCK2.style.display = 'none';
    if ((FIRST_PAGE.style.display = 'none')) {
      FIRST_PAGE.style.display = 'block';
      SECOND_PAGE.style.display = 'none';
    }
  }
}

PREV_PAGE.addEventListener('click', prevPage);
NEXT_PAGE.addEventListener('click', nextPage);
