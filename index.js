// create TextArea
const body = document.querySelector('body');
body.innerHTML += '<textarea class="textarea" autofocus></textarea>';
const textarea = document.querySelector('.textarea');

// Create keyboard
body.innerHTML += '<div class="keyboard"></div>';
const keyboard = document.querySelector('.keyboard');

// keys for rows
const row1 = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
const row2 = ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'];
const row3 = ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'];
const row4 = ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'];
const row5 = ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const rows = [row1, row2, row3, row4, row5];

// create 5 rows with keys
for (let i = 0; i < 5; i += 1) {
  const row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);
  for (let k = 0; k < rows[i].length; k += 1) {
    const key = document.createElement('div');
    const code = rows[i][k];
    key.className = 'key';
    key.classList.add(code);

    // insert symbol
    let symb;
    if (code.includes('Digit') || code.includes('Key')) symb = code.at(-1);
    else if (code === 'Backquote') symb = '`';
    else if (code === 'Minus') symb = '-';
    else if (code === 'Equal') symb = '=';
    else if (code === 'BracketLeft') symb = '[';
    else if (code === 'BracketRight') symb = ']';
    else if (code === 'Backslash') symb = '\\';
    else if (code === 'Semicolon') symb = ';';
    else if (code === 'Quote') symb = '\'';
    else if (code === 'Comma') symb = ',';
    else if (code === 'Period') symb = '.';
    else if (code === 'Slash') symb = '/';
    else if (code === 'ArrowUp') symb = '↑';
    else if (code === 'ArrowDown') symb = '↓';
    else if (code === 'ArrowLeft') symb = '←';
    else if (code === 'ArrowRight') symb = '→';
    else if (code.includes('Shift')) symb = 'Shift';
    else if (code.includes('Control')) symb = 'Ctrl';
    else if (code.includes('Alt')) symb = 'Alt';
    else if (code.includes('Meta')) symb = 'Win';
    else symb = code;
    key.textContent = symb;
    row.append(key);
  }
}

// Highlight keys when press button
const keys = document.querySelectorAll('.key');
const highlightButton = (e) => {
  keys.forEach((key) => {
    if (key.classList.contains(e.code)) {
      if (e.code === 'Tab') e.preventDefault();
      key.classList.add('pressed');
    }
  });
};

const removeHighlightButton = (e) => {
  keys.forEach((key) => {
    if (key.classList.contains(e.code)) {
      key.classList.remove('pressed');
    }
  });
};

document.addEventListener('keydown', highlightButton);
document.addEventListener('keyup', removeHighlightButton);

// Highlight keys when click on
let beingClickedButton;
const highlightButtonOnClick = (e) => {
  if (e.target.classList.contains('key')) {
    e.target.classList.add('pressed');
    beingClickedButton = e.target;
  }
};

const removeHighlightButtonOnClick = () => {
  beingClickedButton.classList.remove('pressed');
};

document.addEventListener('mousedown', highlightButtonOnClick);
document.addEventListener('mouseup', removeHighlightButtonOnClick);

// get focus on textarea
textarea.focus();
