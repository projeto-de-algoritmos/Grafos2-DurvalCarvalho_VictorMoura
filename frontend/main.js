//                         ATUALIZAR DATA
// ============================================================ //
const today = document.querySelector('.date');
function todayis() {
  var ddmmyyyy = new Date().toLocaleString().slice(0, 9)
  today.insertAdjacentHTML("afterbegin",
    `${ddmmyyyy}`
  )
}
todayis();

// ============================================================ //

async function get_data(f, t, i) {
  let response = await fetch(`http://localhost:5000?f=${f}&t=${t}&i=${i}`);
  let data = await response.json()
  return data;
}

function show_result(data, initial){
  ee = document.querySelector('.end.currency .info .input input')
  final_value = data.conversion_factor * initial
  ee.value = final_value.toFixed(2)
  
  add_new_currency("JPY")
}

async function get_path_btn(event){
  var s = document.getElementsByClassName("start currency");
  var e = document.getElementsByClassName("end currency");

  ss = document.querySelector('.start.currency .info .input input')

  i = ss.value

  get_data(s[0].id, e[0].id, i)
  .then(data => show_result(data, i)); 
}



//               ABRIR E FECHAR LISTA DE MOEDAS
// ============================================================ //
const button_start = document.querySelector('.undefined.start button');
const button_end = document.querySelector('.undefined.end button');

button_start.addEventListener("click", add_currency_button_start);
button_end.addEventListener("click", add_currency_button_end);

var button_clicked = '';
const currency_list = document.querySelector('.add-currency-list');

function add_currency_button_start(event) {
  button_clicked = 'start';
  currency_list.classList.toggle("open");
}

function add_currency_button_end(event) {
  button_clicked = 'end';
  currency_list.classList.toggle("open");
}

// Selecionar a moeda clicada
const currencyList = document.querySelector(".currencies");
const addCurrencyList = document.querySelector(".add-currency-list");

// TODO: Popular essa variável com os nossos dados
let currencies = [
  {
    name: "US Dollar",
    abbreviation: "USD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/us.gif"
  },
  {
    name: "Euro",
    abbreviation: "EUR",
    symbol: "\u20AC",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
  },
  {
    name: "Japanese Yen",
    abbreviation: "JPY",
    symbol: "\u00A5",
    flagURL: "http://www.geonames.org/flags/l/jp.gif"
  },
  {
    name: "British Pound",
    abbreviation: "GBP",
    symbol: "\u00A3",
    flagURL: "http://www.geonames.org/flags/l/uk.gif"
  },
  {
    name: "Australian Dollar",
    abbreviation: "AUD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/au.gif"
  },
  {
    name: "Canadian Dollar",
    abbreviation: "CAD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/ca.gif"
  },
  {
    name: "Swiss Franc",
    abbreviation: "CHF",
    symbol: "\u0043\u0048\u0046",
    flagURL: "http://www.geonames.org/flags/l/ch.gif"
  },
  {
    name: "Chinese Yuan Renminbi",
    abbreviation: "CNY",
    symbol: "\u00A5",
    flagURL: "http://www.geonames.org/flags/l/cn.gif"
  },
  {
    name: "Swedish Krona",
    abbreviation: "SEK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/se.gif"
  },
  {
    name: "New Zealand Dollar",
    abbreviation: "NZD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/nz.gif"
  },
  {
    name: "Mexican Peso",
    abbreviation: "MXN",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/mx.gif"
  },
  {
    name: "Singapore Dollar",
    abbreviation: "SGD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/sg.gif"
  },
  {
    name: "Hong Kong Dollar",
    abbreviation: "HKD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/hk.gif"
  },
  {
    name: "Norwegian Krone",
    abbreviation: "NOK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/no.gif"
  },
  {
    name: "South Korean Won",
    abbreviation: "KRW",
    symbol: "\u20A9",
    flagURL: "http://www.geonames.org/flags/l/kr.gif"
  },
  {
    name: "Turkish Lira",
    abbreviation: "TRY",
    symbol: "\u20BA",
    flagURL: "http://www.geonames.org/flags/l/tr.gif"
  },
  {
    name: "Russian Ruble",
    abbreviation: "RUB",
    symbol: "\u20BD",
    flagURL: "http://www.geonames.org/flags/l/ru.gif"
  },
  {
    name: "Indian Rupee",
    abbreviation: "INR",
    symbol: "\u20B9",
    flagURL: "http://www.geonames.org/flags/l/in.gif"
  },
  {
    name: "Brazilian Real",
    abbreviation: "BRL",
    symbol: "\u0052\u0024",
    flagURL: "http://www.geonames.org/flags/l/br.gif"
  },
  {
    name: "South African Rand",
    abbreviation: "ZAR",
    symbol: "\u0052",
    flagURL: "http://www.geonames.org/flags/l/za.gif"
  },
  {
    name: "Philippine Peso",
    abbreviation: "PHP",
    symbol: "\u20B1",
    flagURL: "http://www.geonames.org/flags/l/ph.gif"
  },
  {
    name: "Czech Koruna",
    abbreviation: "CZK",
    symbol: "\u004B\u010D",
    flagURL: "http://www.geonames.org/flags/l/cz.gif"
  },
  {
    name: "Indonesian Rupiah",
    abbreviation: "IDR",
    symbol: "\u0052\u0070",
    flagURL: "http://www.geonames.org/flags/l/id.gif"
  },
  {
    name: "Malaysian Ringgit",
    abbreviation: "MYR",
    symbol: "\u0052\u004D",
    flagURL: "http://www.geonames.org/flags/l/my.gif"
  },
  {
    name: "Hungarian Forint",
    abbreviation: "HUF",
    symbol: "\u0046\u0074",
    flagURL: "http://www.geonames.org/flags/l/hu.gif"
  },
  {
    name: "Icelandic Krona",
    abbreviation: "ISK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/is.gif"
  },
  {
    name: "Croatian Kuna",
    abbreviation: "HRK",
    symbol: "\u006B\u006E",
    flagURL: "http://www.geonames.org/flags/l/hr.gif"
  },
  {
    name: "Bulgarian Lev",
    abbreviation: "BGN",
    symbol: "\u043B\u0432",
    flagURL: "http://www.geonames.org/flags/l/bg.gif"
  },
  {
    name: "Romanian Leu",
    abbreviation: "RON",
    symbol: "\u006C\u0065\u0069",
    flagURL: "http://www.geonames.org/flags/l/ro.gif"
  },
  {
    name: "Danish Krone",
    abbreviation: "DKK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/dk.gif"
  },
  {
    name: "Thai Baht",
    abbreviation: "THB",
    symbol: "\u0E3F",
    flagURL: "http://www.geonames.org/flags/l/th.gif"
  },
  {
    name: "Polish Zloty",
    abbreviation: "PLN",
    symbol: "\u007A\u0142",
    flagURL: "http://www.geonames.org/flags/l/pl.gif"
  },
  {
    name: "Israeli Shekel",
    abbreviation: "ILS",
    symbol: "\u20AA",
    flagURL: "http://www.geonames.org/flags/l/il.gif"
  }
];

addCurrencyList.addEventListener(
  "click", 
  open_currency_list
);

function open_currency_list(event) {
  const clickedListItem = event.target.closest("li");

  if(!clickedListItem.classList.contains("disabled"))
  {
    const newCurrency = currencies.find(
      c => c.abbreviation===clickedListItem.getAttribute(
        "data-currency"
      )
    );

    if(newCurrency) {
      currency_list.classList.toggle("open");
      add_new_currency(newCurrency);
    }
  }
}

function add_new_currency(currency) {

  // marcar como já selecionado
  addCurrencyList.querySelector(
    `[data-currency=${currency.abbreviation}]`
  ).classList.add("disabled");

  // REMOVER BOTÃO QUE CHAMOU A LISTA
  if(button_clicked === 'start') 
  {
    const li_button_start = document.querySelector('.undefined.start');

    const child = document.querySelector('.undefined.start button');
    child.parentNode.removeChild(child);

    li_button_start.classList.remove('undefined');
    li_button_start.classList.add('currency');
    li_button_start.setAttribute('id', currency.abbreviation);

    li_button_start.insertAdjacentHTML("afterbegin", 
      `<img src=${currency.flagURL} class="flag">
        <div class="info">
          <p class="input">
            <span class="currency-symbol">
              ${currency.symbol}
            </span>
          <input placeholder="0.0000" value=1000>
          </p>

          <p class="currency-name">
            ${currency.abbreviation} - ${currency.name}
          </p>
        </div>
      <span class="close">&times;</span>`
    );
  }

  else {
    const li_button_end = document.querySelector('.undefined.end');

    const child = document.querySelector('.undefined.end button');
    child.parentNode.removeChild(child);

    li_button_end.classList.remove('undefined');
    li_button_end.classList.add('currency');

    li_button_end.setAttribute('id', currency.abbreviation);

    li_button_end.insertAdjacentHTML("afterbegin", 
      `<img src=${currency.flagURL} class="flag">
        <div class="info">
          <p class="input">
            <span class="currency-symbol">
              ${currency.symbol}
            </span>
          <input disabled>
          </p>

          <p class="currency-name">
            ${currency.abbreviation} - ${currency.name}
          </p>
        </div>
      <span class="close">&times;</span>`
    );
  }
}

// ============================================================ //








//           REMOVER MOEDA E ADC O BOTÃO NOVAMENTE
// ============================================================ //
currencyList.addEventListener("click", remove_currency_and_add_button);
function remove_currency_and_add_button(event) {
  
  if(event.target.classList.contains("close")) {

    const parentNode = event.target.parentNode;

    // permitir que a moeda removida seja selecionavel novamente
    addCurrencyList.querySelector(
      `[data-currency=${parentNode.id}]`
    ).classList.remove("disabled");

    parentNode.classList.remove('currency');
    parentNode.classList.add('undefined');

    parentNode.removeAttribute('id');

    while(parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }

    parentNode.insertAdjacentHTML("afterbegin", 
      `
      <button type="button">
        Selecionar moeda
      </button>
      `
    );

    const button_start = document.querySelector('.start.undefined button');
    const button_end = document.querySelector('.end.undefined button');

    if(button_start) {
      button_start.addEventListener("click", add_currency_button_start);
    }

    if(button_end) {
      button_end.addEventListener("click", add_currency_button_end);
    }
  }
}
// ============================================================ //


















/*

const addCurrencyBtn = document.querySelector(".add-currency-btn");



const dataURL = "https://api.exchangeratesapi.io/latest";

const initiallyDisplayedCurrencies = ["USD", "EUR", "GBP", "JPY", "RUB"];
let baseCurrency;
let baseCurrencyAmount;





// Event Listeners

addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);

function addCurrencyBtnClick(event) {
  addCurrencyBtn.classList.toggle("open");
}

addCurrencyList.addEventListener("click", addCurrencyListClick);

function addCurrencyListClick(event) {
  const clickedListItem = event.target.closest("li");
  if(!clickedListItem.classList.contains("disabled")) {
    const newCurrency = currencies.find(c => c.abbreviation===clickedListItem.getAttribute("data-currency"));
    if(newCurrency) newCurrenciesListItem(newCurrency);
  }
}

*/


/*

function setNewBaseCurrency(newBaseCurrencyLI) {
  newBaseCurrencyLI.classList.add("base-currency");
  baseCurrency = newBaseCurrencyLI.id;
  const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
  currenciesList.querySelectorAll(".currency").forEach(currencyLI => {
    const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
    const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
    currencyLI.querySelector(".base-currency-rate").textContent = `1 ${baseCurrency} = ${exchangeRate} ${currencyLI.id}`;
  });
}

currenciesList.addEventListener("input", currenciesListInputChange);

function currenciesListInputChange(event) {
  const isNewBaseCurrency = event.target.closest("li").id!==baseCurrency;
  if(isNewBaseCurrency) {
    currenciesList.querySelector(`#${baseCurrency}`).classList.remove("base-currency");
    setNewBaseCurrency(event.target.closest("li"));
  }
  const newBaseCurrencyAmount = isNaN(event.target.value) ? 0 : Number(event.target.value);
  if(baseCurrencyAmount!==newBaseCurrencyAmount || isNewBaseCurrency) {
    baseCurrencyAmount = newBaseCurrencyAmount;
    const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
    currenciesList.querySelectorAll(".currency").forEach(currencyLI => {
      if(currencyLI.id!==baseCurrency) {
        const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
        const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
        currencyLI.querySelector(".input input").value = exchangeRate*baseCurrencyAmount!==0 ? (exchangeRate*baseCurrencyAmount).toFixed(4) : "";
      }
    });
  }
}

currenciesList.addEventListener("focusout", currenciesListFocusOut);

function currenciesListFocusOut(event) {
  const inputValue = event.target.value;
  if(isNaN(inputValue) || Number(inputValue)===0) event.target.value="";
  else event.target.value = Number(inputValue).toFixed(4);
}

currenciesList.addEventListener("keydown", currenciesListKeyDown);

function currenciesListKeyDown(event) {
  if(event.key==="Enter") event.target.blur();
}

// Auxiliary Functions



function populateAddCyrrencyList() {
  for(let i=0; i<currencies.length; i++) {
    addCurrencyList.insertAdjacentHTML(
      "beforeend", 
      `<li data-currency=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} - ${currencies[i].name}</span>
      </li>`
    );
  }
}

function populateCurrenciesList() {
  for(let i=0; i<initiallyDisplayedCurrencies.length; i++) {
    const currency = currencies.find(c => c.abbreviation===initiallyDisplayedCurrencies[i]);
    if(currency) newCurrenciesListItem(currency);
  }
}

function newCurrenciesListItem(currency) {
  if(currenciesList.childElementCount===0) {
    baseCurrency = currency.abbreviation;
    baseCurrencyAmount = 0;
  }
  addCurrencyList.querySelector(`[data-currency=${currency.abbreviation}]`).classList.add("disabled");
  const baseCurrencyRate = currencies.find(c => c.abbreviation===baseCurrency).rate;
  const exchangeRate = currency.abbreviation===baseCurrency ? 1 : (currency.rate/baseCurrencyRate).toFixed(4);
  const inputValue = baseCurrencyAmount ? (baseCurrencyAmount*exchangeRate).toFixed(4) : "";

  currenciesList.insertAdjacentHTML(
    "beforeend",
    `<li class="currency ${currency.abbreviation===baseCurrency ? "base-currency" : ""}" id=${currency.abbreviation}>
      <img src=${currency.flagURL} class="flag">
      <div class="info">
        <p class="input"><span class="currency-symbol">${currency.symbol}</span><input placeholder="0.0000" value=${inputValue}></p>
        <p class="currency-name">${currency.abbreviation} - ${currency.name}</p>
        <p class="base-currency-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
      </div>
      <span class="close">&times;</span>
    </li>`
  );
}

fetch(dataURL)
  .then(res => res.json())
  .then(data => {
    data.rates["EUR"] = 1;
    currencies = currencies.filter(currency => data.rates[currency.abbreviation]);
    currencies.forEach(currency => currency.rate = data.rates[currency.abbreviation]);
    populateAddCyrrencyList();
    populateCurrenciesList();
  })
  .catch(err => console.log(err));

*/