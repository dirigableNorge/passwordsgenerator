import './styles/styles.css';

const settings = {
  length: 8,
  useSymbols: true,
  useNumbers: true,
  useLowercaseCharacters: true,
  useUppercaseCharacters: true
};

const lengthInput = document.getElementById('settingsLength');
const useSymbolsInput =document.getElementById('settingsSybmols');
const useNumbersInput = document.getElementById('settingsNumbers');
const useLowercaseCharactersInput = document.getElementById('settingsLowercaseCharacters');
const useUppercaseCharactersInput = document.getElementById('settingsUppercaseCharacters');
const generatedInput = document.getElementById('generated');
const generateButton = document.getElementById('generateButton');
const clearButton = document.getElementById('clearButton');
const copyButton = document.getElementById('copyButton');

const init = () => {  
  lengthInput.addEventListener('change', changeSettings);
  useSymbolsInput.addEventListener('change', changeSettings);
  useNumbersInput.addEventListener('change', changeSettings);
  useLowercaseCharactersInput.addEventListener('change', changeSettings);
  useUppercaseCharactersInput.addEventListener('change', changeSettings);

  generateButton.addEventListener('click', generate);
  clearButton.addEventListener('click', () => {
    generatedInput.value = '';
  });

  copyButton.addEventListener('click', () => {
    generatedInput.select();
    document.execCommand('copy');
  })
};

const changeSettings = () => {  
  settings.length = lengthInput.value;
  settings.useSymbols = useSymbolsInput.checked;
  settings.useNumbers = useNumbersInput.checked;
  settings.useLowercaseCharacters = useLowercaseCharactersInput.checked;
  settings.useUppercaseCharacters = useUppercaseCharactersInput.checked;

  generate();
}

const generate = () => {
  generatedInput.value = generatePassword(settings);
}

const generatePassword = ({useSymbols, useNumbers, useLowercaseCharacters, useUppercaseCharacters}) => {
  let password = '';
  let charactersArray = [];
  const symbols = `~\`!@#$%^&*()_-+={[}]|\\:;\"\'&lt;,>.?/`;
  const numbers = '0123456789';
  const lowercaseCharacters = 'abcdefghijklmopqrstuvwxyz';
  const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  if (useSymbols) charactersArray = charactersArray.concat(symbols.split(''));
  if (useNumbers) charactersArray = charactersArray.concat(numbers.split(''));
  if (useLowercaseCharacters) charactersArray = charactersArray.concat(lowercaseCharacters.split(''));
  if (useUppercaseCharacters) charactersArray = charactersArray.concat(uppercaseCharacters.split(''));
  if (charactersArray.length === 0) return password;
  for (let i = 0; i<=settings.length; i++) {
    const newSymbol = charactersArray[getRandom(charactersArray.length - 1)];
    password += newSymbol;
  }

  return password;
}

const getRandom = (max) => {
  return Math.floor(Math.random() * Math.floor(max)) ;
};

const copyToClipboard = (input) => {
  input.select();
  document.execCommand('copy');
};

const clearInput = (input) => {
  input.value = '';
}


window.onload = init;