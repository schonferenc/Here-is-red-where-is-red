let buttonIsClicked = false;
let circleIsClicked = false;
let selectedIndex = 0;

const moveAnimations = [
  'left-circle-moves',
  'middle-circle-moves',
  'right-circle-moves',
];

const colors = {
  mixButtonColor: 'rgba(92, 184, 92, 0.8)',
  restartButtonColor: 'rgba(92, 184, 92, 0.5)',
  innerCircleColor: 'rgba(91, 192, 222, 0.8)',
  danger: 'rgba(217, 83, 79, 0.5)',
  warning: 'rgba(240, 173, 78, 0.5)',
  inf: 'rgba(91, 192, 222, 0.5)',
  succsess: 'rgba(67, 126, 67, 1)',
};

const button = document.querySelector('button');
const info = document.querySelector('p');
const circles = [...document.getElementsByClassName('circle')];

function mix() {
  const randomNumbers = random_numbers(3);

  if (!buttonIsClicked) {
    circles[randomNumbers[0]].children[0].firstChild.style.backgroundColor =
      colors.danger;

    button.disabled = true;
    setClicks(true, false);
    for (let i = 0; i < circles.length; i++) {
      setAnimation(circles[i], moveAnimations[i]);
    }
    setInfo(info, '...', colors.inf);
    setButton(button, 'Restart', colors.restartButtonColor);
  } else {
    setClicks(false, false);
    resetCircles(circles);
    setInfo(info, 'Stir', colors.inf);
    setButton(button, 'Mix', colors.mixButtonColor);
  }
}

function setClicks(buttonClick, circleClick) {
  buttonIsClicked = buttonClick;
  circleIsClicked = circleClick;
}

function setButton(button, text, color) {
  button.innerHTML = text;
  button.style.background = color;
  button.style.borderColor = color;
}

function setInfo(info, text, color) {
  info.innerHTML = text;
  info.style.backgroundColor = color;
  info.style.borderColor = color;
}

function setAnimation(obj, animation) {
  obj.classList.add(animation);
}

function resetCircles(circle) {
  for (let i = 0; i < circle.length; i++) {
    if (i == selectedIndex) {
      setAnimation(circle[i], 'spin-y', true);
      circle[i].style.animationDirection = 'reverse';
      circle[i].style.animationDelay = '2.5s';
    } else {
      setAnimation(circle[i], 'spin-y', true);
      circle[i].style.animationDirection = 'reverse';
      circle[i].style.animationDelay = '3s';
    }

    setTimeout(() => {
      circle[i].classList = 'circle';
      circle[i].children[0].firstChild.style.backgroundColor = colors.innerCircleColor;
      circle[i].style.animationDelay = '';
      circle[i].style.animationDirection = '';
    }, 1500);
  }
}

function show(circle) {
  selectedIndex = circle.id;

  if (buttonIsClicked && !circleIsClicked) {
    circleIsClicked = true;
    for (let i = 0; i < circles.length; i++) {
      setAnimation(circles[i], 'spin-y', true);
      if (i != selectedIndex) {
        circles[i].style.animationDelay = '0.5s';
      }
    }

    if (circle.children[0].firstChild.style.backgroundColor === colors.danger) {
      setInfo(info, 'Congratulations, you won!', colors.succsess);
    } else {
      setInfo(info, 'Try again!', colors.warning);
    }
  } else {
    setInfo(info, 'Stir!', colors.danger);
  }
  setTimeout(() => {
    setButton(button, 'Restart', colors.mixButtonColor);
    button.disabled = false;
  }, 1500);
}

function random_numbers(max) {
  const n = max;

  if (n == 0) console.log(null);

  let randomnumbers = new Set(),
    ans;

  while (randomnumbers.size < n) {
    randomnumbers.add(Math.floor(Math.random() * n));
  }
  ans = [...randomnumbers];

  return ans;
}