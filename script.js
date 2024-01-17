function convertCurrency () {
    let amountInput = document.getElementById ("amount");
    let amount = amountInput.value;
    let fromCurrency = document.getElementById ("fromCurrency").value;
    let toCurrency = document.getElementById ("toCurrency").value;
    let converterResult = document.getElementById ("converterResult");
    let converterError = document.getElementById ("converterError");

    let api = `https://v6.exchangerate-api.com/v6/e4e727bf8593a093bbbd574f/latest/${fromCurrency}`;

    function isValidInput (input) {
        return !isNaN (parseFloat(input));
    }
    
    fetch(api)
        .then (response => response.json())

        .then (data => {
            if (data.conversion_rates.hasOwnProperty(toCurrency)) {
                let rate = data.conversion_rates[toCurrency];
                let result = amount*rate;
                converterResult.innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
                converterError.innerHTML = "";
            } else {
                converterResult.innerHTML = "";
                converterError.innerHTML = "Не удается найти валютную пару";
            }
            
        })
        .catch (error => {
            converterResult.innerHTML = "";
            converterError.innerHTML = "API недоступно";
        });
}

window.convertCurrency = convertCurrency;
