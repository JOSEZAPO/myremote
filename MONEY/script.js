const API_KEY = 'f3c533a973f757038897a19d'; // Sustituye con tu clave real
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

const currencies = ['USD', 'EUR', 'MXN', 'JPY', 'GBP', 'CAD', 'BRL', 'CLP', 'CNY', 'INR'];

currencies.forEach((currency) => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.value = option1.text = currency;
  option2.value = option2.text = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = 'USD';
toCurrency.value = 'MXN';

convertBtn.addEventListener('click', async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt) || amt <= 0) {
    result.textContent = 'Por favor, ingresa una cantidad válida';
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`);
    const data = await response.json();

    if (data.result === 'success') {
      const converted = (amt * data.conversion_rate).toFixed(2);
      result.textContent = `${amt} ${from} = ${converted} ${to}`;
    } else {
      result.textContent = 'Error al obtener la tasa de cambio.';
    }
  } catch (error) {
    console.error('Error al convertir:', error);
    result.textContent = 'Ocurrió un error al consultar la API.';
  }
});
