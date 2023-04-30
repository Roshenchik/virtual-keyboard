// create TextArea
const body = document.querySelector('body');
body.innerHTML += '<textarea class="textarea" autofocus></textarea>';

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
const letterCodes = ['Key', 'Backquote', 'BracketLeft', 'BracketRight', 'Backslash', 'Semicolon', 'Quote', 'Comma', 'Period', 'Slash'];
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
    else {
      letterCodes.forEach((letterCode) => {
        if (code.includes(letterCode)) {
          key.classList.add('letter-key');
        }
      });
    }
    key.textContent = symb;
    key.classList.add(code);
    key.dataset.code = code;
    row.append(key);
  }
}

// set language
const lettersRu = ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'];
const lettersEn = ['`', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];

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

const setLangSensetiveKeys = () => {
  letterKeys.forEach((letterKey) => {
    if (/[a-zа-яё]/i.test(letterKey.textContent)) {
      letterKey.classList.add('caps-sensetive');
    }
  });
};
setLangSensetiveKeys();

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
  setLangSensetiveKeys();
};
document.addEventListener('keydown', changeLang);

// Highlight keys when press button
const keys = document.querySelectorAll('.key');
const highlightButton = (e) => {
  keys.forEach((key) => {
    if (key.classList.contains(e.code)) {
      if (e.code === 'Tab') e.preventDefault();
      if (e.code.includes('Alt')) e.preventDefault();
      if (e.code.includes('CapsLock')) {
        e.preventDefault();
        key.classList.toggle('pressed');
        return;
      }
      key.classList.add('pressed');
    }
  });
};

const removeHighlightButton = (e) => {
  keys.forEach((key) => {
    if (key.classList.contains(e.code)) {
      if (e.code.includes('CapsLock')) return;
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
    if (e.target.classList.contains('CapsLock')) {
      e.target.classList.toggle('pressed');
      return;
    }
    e.target.classList.add('pressed');
    beingClickedButton = e.target;
  }
};

const removeHighlightButtonOnClick = () => {
  if (!beingClickedButton) return;
  if (beingClickedButton.classList.contains('CapsLock')) return;
  if (beingClickedButton) {
    beingClickedButton.classList.remove('pressed');
  }
};

document.addEventListener('mousedown', highlightButtonOnClick);
document.addEventListener('mouseup', removeHighlightButtonOnClick);

// handle input on key click
const textarea = document.querySelector('.textarea');

// get position of bar in text area
let cursorPos = textarea.selectionStart;
const getCursorPos = () => {
  cursorPos = textarea.selectionStart;
  console.log(`cursor position: ${cursorPos}`);
};
textarea.addEventListener('click', getCursorPos);
textarea.addEventListener('input', getCursorPos);

// to always keep focus
const regainFocus = () => {
  textarea.focus();
};

const typeSymbol = (symb) => {
  textarea.value = `${textarea.value.slice(0, cursorPos)}${symb}${textarea.value.slice(cursorPos)}`;
  cursorPos += symb.length;
};

const processMouseInput = (e) => {
  // only for keys
  if (!(e.target.classList.contains('key'))) return;

  // prevent default:)
  e.preventDefault();

  // handle backspace
  if (e.target.classList.contains('Backspace')) {
    if (cursorPos === 0) return;
    textarea.value = textarea.value.slice(0, cursorPos - 1) + textarea.value.slice(cursorPos);
    cursorPos -= 1;
    if (cursorPos < 0) cursorPos = 0;
  }

  // general keys
  if (e.target.classList.contains('letter-key') || e.target.classList.contains('digit')) {
    const symbol = e.target.textContent;
    typeSymbol(symbol);
  }
  // handle enter
  if (e.target.classList.contains('Enter')) {
    typeSymbol('\n');
  }
  // handle tab
  if (e.target.classList.contains('Tab')) {
    typeSymbol('    ');
  }
  // handle space
  if (e.target.classList.contains('Space')) {
    typeSymbol(' ');
  }
  // handle arrow keys
  if (e.target.classList.contains('ArrowLeft')) {
    typeSymbol('←');
  }
  if (e.target.classList.contains('ArrowRight')) {
    typeSymbol('→');
  }
  if (e.target.classList.contains('ArrowUp')) {
    typeSymbol('↑');
  }
  if (e.target.classList.contains('ArrowDown')) {
    typeSymbol('↓');
  }

  textarea.selectionStart = cursorPos;
  textarea.selectionEnd = cursorPos;
  console.log(`cursor position: ${cursorPos}`);

  regainFocus();
};

document.addEventListener('mousedown', processMouseInput);

// handle CapsLock
const shiftLeft = document.querySelector('.ShiftLeft');
const shiftRight = document.querySelector('.ShiftRight');

const setUpperCase = () => {
  const capsSensKeys = document.querySelectorAll('.caps-sensetive');
  capsSensKeys.forEach((sensKey) => {
    const upperCase = sensKey.textContent.toUpperCase();
    const key = sensKey;
    key.textContent = upperCase;
  });
};

const setLowerCase = () => {
  const capsSensKeys = document.querySelectorAll('.caps-sensetive');
  capsSensKeys.forEach((sensKey) => {
    const lowerCase = sensKey.textContent.toLowerCase();
    const key = sensKey;
    key.textContent = lowerCase;
  });
};

const capslock = document.querySelector('.CapsLock');
const toggleCapseLock = () => {
  if (capslock.classList.contains('pressed')) {
    setUpperCase();
  } else {
    setLowerCase();
  }
};
document.addEventListener('mousedown', toggleCapseLock);
document.addEventListener('keydown', toggleCapseLock);

// handle Shift
const shiftSensKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 'Backslash', 'Semicolon', 'Quote', 'Comma', 'Period', 'Slash'];
const AltShifKeysRu = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Х', 'Ъ', '/', 'Ж', 'Э', 'Б', 'Ю', ','];
const AltShifKeysEn = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];
const ShifKeysRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'х', 'ъ', '\\', 'ж', 'э', 'б', 'ю', '.'];
const ShifKeysEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/'];

// mark shift sensetive keys
keys.forEach((key) => {
  if (shiftSensKeys.includes(key.dataset.code)) {
    const sensetiveKey = key;
    sensetiveKey.dataset.shiftSence = true;
  }
});
const shiftSensetiveKey = document.querySelectorAll('[data-shift-sence = "true"]');

// set when press shift
const setAlterKeys = () => {
  shiftSensetiveKey.forEach((key, i) => {
    const shiftSensKey = key;
    if (lang === 'ru') {
      shiftSensKey.textContent = AltShifKeysRu[i];
    } else {
      shiftSensKey.textContent = AltShifKeysEn[i];
    }
  });
};

// return when unpress shift
const returnNormalKeys = () => {
  shiftSensetiveKey.forEach((key, i) => {
    const shiftSensKey = key;
    if (lang === 'ru') {
      shiftSensKey.textContent = ShifKeysRu[i];
    } else {
      shiftSensKey.textContent = ShifKeysEn[i];
    }
  });
};

const pressShift = (e) => {
  // if ((!e.target.classList.contains('ShiftLeft') && e.code !== 'ShiftLeft') && (!e.target.classList.contains('ShiftRight') && e.code !== 'ShiftRight')) return;

  if (shiftRight.classList.contains('pressed') || shiftLeft.classList.contains('pressed')) {
    setAlterKeys();
    if (capslock.classList.contains('pressed')) {
      setLowerCase();
    } else {
      setUpperCase();
    }
  } else if (!shiftRight.classList.contains('pressed') && !shiftLeft.classList.contains('pressed')) {
    returnNormalKeys();
    if (capslock.classList.contains('pressed')) {
      setUpperCase();
    } else {
      setLowerCase();
    }
  }
};

document.addEventListener('mousedown', pressShift);
document.addEventListener('keydown', pressShift);
document.addEventListener('mouseup', pressShift);
document.addEventListener('keyup', pressShift);
