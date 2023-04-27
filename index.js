// create TextArea
const body = document.querySelector('body');
body.innerHTML += '<textarea class="textarea" autofocus></textarea>';
const textarea = document.querySelector('.textarea');

// Create keyboard
body.innerHTML += '<div class="keyboard"></div>';
const keyboard = document.querySelector('.keyboard');

// keys and codes for rows
const row1 = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
const row2 = ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'];
const row3 = ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'];
const row4 = ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'];
const row5 = ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const rows = [row1, row2, row3, row4, row5];
const lettersRu = ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'];
const lettersEn = ['`', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
const letterCodes = ['Key', 'Backquote', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Comma', 'Period', 'Slash'];
// create 5 rows with keys
for (let i = 0; i < 5; i += 1) {
  const row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);
  for (let k = 0; k < rows[i].length; k += 1) {
    const key = document.createElement('div');
    const code = rows[i][k];
    key.className = 'key';

    // insert symbols and class names
    let symb;
    if (code.includes('Digit')) {
      symb = code.at(-1);
      key.classList.add('digit');
    } else if (code === 'Minus') symb = '-';
    else if (code === 'Equal') symb = '=';
    else if (code === 'ArrowUp') symb = '↑';
    else if (code === 'ArrowDown') symb = '↓';
    else if (code === 'ArrowLeft') symb = '←';
    else if (code === 'ArrowRight') symb = '→';
    else if (code.includes('Shift')) symb = 'Shift';
    else if (code.includes('Control')) symb = 'Ctrl';
    else if (code.includes('Alt')) symb = 'Alt';
    else if (code.includes('Meta')) symb = 'Win';
    else if (code.includes('Enter')) symb = 'Enter';
    else if (code.includes('Backspace')) symb = 'Backspace';
    else if (code.includes('CapsLock')) symb = 'CapsLock';
    else if (code.includes('Tab')) symb = 'Tab';
    else if (code.includes('Backslash')) symb = '\\';
    else {
      letterCodes.forEach((letterCode) => {
        if (code.includes(letterCode)) {
          key.classList.add('letter-key');
        }
      });
    }
    key.textContent = symb;
    key.classList.add(code);
    row.append(key);
  }
}

// set language
let lang = 'en';
const letterKeys = document.querySelectorAll('.letter-key');
const setLanguage = (language) => {
  if (language === 'en') {
    letterKeys.forEach((letterKey, i) => {
      const textContent = lettersEn[i];
      const key = letterKey;
      key.textContent = textContent;
    });
  } else if (language === 'ru') {
    letterKeys.forEach((letterKey, i) => {
      const textContent = lettersRu[i];
      const key = letterKey;
      key.textContent = textContent;
    });
  }
};
setLanguage(lang);

// change language
const changeLang = (e) => {
  if (e.ctrlKey && e.altKey) {
    e.preventDefault();
    if (lang === 'en') {
      setLanguage(lang = 'ru');
    } else {
      setLanguage(lang = 'en');
    }
  }
};
document.addEventListener('keydown', changeLang);

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
