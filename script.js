// Объединяем обе раскладки в один объект для удобства
const keyboardLayouts = {
    engToRu: { 
        "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г", 
        "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы", 
        "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д", 
        ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и", 
        "n": "т", "m": "ь", ",": "б", ".": "ю", "/": ".", "`": "ё", " ": " "
    },
    ruToEng: { 
        "й": "q", "ц": "w", "у": "e", "к": "r", "е": "t", "н": "y", "г": "u", 
        "ш": "i", "щ": "o", "з": "p", "х": "[", "ъ": "]", "ф": "a", "ы": "s", 
        "в": "d", "а": "f", "п": "g", "р": "h", "о": "j", "л": "k", "д": "l", 
        "ж": ";", "э": "'", "я": "z", "ч": "x", "с": "c", "м": "v", "и": "b", 
        "т": "n", "ь": "m", "б": ",", "ю": ".", ".": "/", "`": "ё", " ": " "
    }
};

// Добавляем цифры в обе раскладки (аналог .update в Python)
['1','2','3','4','5','6','7','8','9','0'].forEach(num => {
    keyboardLayouts.engToRu[num] = num;
    keyboardLayouts.ruToEng[num] = num;
});

// Функции перевода теперь обращаются к нужному вложенному объекту
function toRuLayout(text) { 
    return [...text].map(ch => keyboardLayouts.engToRu[ch] ?? ch).join(''); 
}

function toEnLayout(text) { 
    return [...text].map(ch => keyboardLayouts.ruToEng[ch] ?? ch).join(''); 
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputText');
  const output = document.getElementById('outputText');
  const toggle = document.getElementById('directionToggle');
  const label = document.querySelector('label[for="directionToggle"]');
  const clearBtn = document.getElementById('clearBtn');

  function updateLabel() {
    label.textContent = toggle.checked ? 'RU → EN' : 'EN → RU';
  }

  function convert() {
    const text = input.value;
    // Логика инвертирована: если чекбокс отмечен, мы идем из RU в EN
    output.value = toggle.checked ? toEnLayout(text) : toRuLayout(text);
  }

  input.addEventListener('input', convert);

  toggle.addEventListener('change', () => {
    updateLabel();
    convert();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    output.value = '';
    input.focus();
  });

  updateLabel();
  convert();
});