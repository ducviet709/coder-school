let amountInput = document.getElementById("amount");

let convertButton = document.getElementById('convertButton');

convertButton.addEventListener("click",conversionRate);

function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
      currency: type,
      style: "currency"
    });
    return formatter.format(value);
  }

  const currencyRatio = {
    vnd: {
      usd: 0.000043,
      krw: 0.051,
      eur: 0.000039,
      vnd: 1
    },
    usd: {
      usd: 1,
      krw: 1193.27,
      eur: 0.9,
      vnd: 23235.5
    },
    krw: {
      usd: 0.00084,
      krw: 1,
      eur: 0.00075,
      vnd: 19.47
    }
  };
  
  function getConversionRate(from, to) {
         return currencyRatio[from.toLowerCase()][to.toLowerCase()];
  }

  function conversionRate() {
    
    let from = document.getElementById("fromCurrencyList").value
    let to = document.getElementById("toCurrencyList").value
    let input = amountInput.value;
    let exchangeRatio = getConversionRate(from,to)
    let convertedAmount = input * exchangeRatio
    const res = document.getElementById("result").innerHTML = `${convertedAmount}`
    }


