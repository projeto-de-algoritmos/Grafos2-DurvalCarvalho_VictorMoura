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



function put_path_cards(path) {

  let exchange_house = {
    "CC": "Currency Converter",
    "CL": "Currecy Layer",
    "ER": "Exchange Rates",
    "FI": "Fixer IO",
    "OE": "Open Exchange"
  }

  path.shift();

  destiny_node = document.querySelector('.end.currency');

  for(let i=0; i<path.length; i++) {

    console.log(path[i]);

    let n_cur = path[i].edge[0];
    
    let house_tag = n_cur.substring(4);

    if(!house_tag) {
      house_tag = 'Real Money';
    }

    n_cur = n_cur.substring(0, 3);
    
    let r_cur = currencies.find(c => c.abbreviation == n_cur);

    destiny_node.insertAdjacentHTML('beforebegin',
      `
        <li class="middle currency" id=${r_cur.abbreviation}>
          <img src=${r_cur.flagURL} class="flag">
          <div class="info">
            <p class="input">
              <span class="currency-symbol"> ${r_cur.symbol} </span>
              <input disabled="" value=${path[i].conversion_factor}>
            </p>
            <p class="currency-name"> ${r_cur.currency_name} </p>
            <p class="currency-name">  
              Exchange House: ${exchange_house[house_tag]}
            </p>
          </div>
        </li>

        <div class="arrow">
          <img src="arrow.png" alt="">
        </div>
      `
    )

  }

}




//    PEGAR AS DUAS MOEDAS SELECIONADAS E MANDAR PRO BACKEND
// ============================================================ //

// CHAMAR A BACKEND PARA PEGAR AS MOEDAS DE HOJE
async function get_data(f, t, i) {
  let response = await fetch(`http://localhost:5000?f=${f}&t=${t}&i=${i}`);
  let data = await response.json()

  put_path_cards(data.path);

  return data;
}

// COLOCAR O VALOR FINAL OBTIDO NA MOEDA DE DESTINO
function show_result(data, initial){
  ee = document.querySelector('.end.currency .info .input input')
  final_value = data.conversion_factor * initial
  ee.value = final_value.toFixed(2)
}

// MANDAR AS MOEDAS SELECIONADAS PARA O BACKEND PROCESSAR
async function get_path_btn(event){
  var s = document.getElementsByClassName("start currency");
  var e = document.getElementsByClassName("end currency");

  ss = document.querySelector('.start.currency .info .input input')

  i = ss.value

  get_data(s[0].id, e[0].id, i)
  .then(data => show_result(data, i)); 
}
// ============================================================ //










//               ABRIR E FECHAR LISTA DE MOEDAS
// ============================================================ //
// const button_start = document.querySelector('.undefined.start button');
// const button_end = document.querySelector('.undefined.end button');

// button_start.addEventListener("click", add_currency_button_start);
// button_end.addEventListener("click", add_currency_button_end);

var button_clicked = '';
const currency_list = document.querySelector('.add-currency-list');

// ABRIR E FECHAR LISTA DE MOEDAS
function add_currency_button_start(event) {
  button_clicked = 'start';
  currency_list.classList.toggle("open");
}

// ABRIR E FECHAR LISTA DE MOEDAS
function add_currency_button_end(event) {
  button_clicked = 'end';
  currency_list.classList.toggle("open");
}
// ============================================================ //








// PEGAR AS MOEDAS DISPONÍVEIS NO BACKEND
// ============================================================= //

// TODAS AS MOEDAS DE HOJE
var currencies = []

async function populate_countries_array() {
  let response = await fetch(`http://localhost:5000/country_data`);
  let data = await response.json()
  return data;
}

function fill_currencies(data){
  currencies = data;

  // currency_list = document.querySelector('.add-currency-list');

  for(var i=0; i<currencies.length; i++) {

    currency_list.insertAdjacentHTML("beforeend",
      `
        <li data-currency=${currencies[i].abbreviation}>
          <img src=${currencies[i].flagURL} class="flag">
          <span> ${currencies[i].currency_name} </span>
        </li>
      `
    )
  }
}

const fetched = false;

if(!fetched) {
  populate_countries_array().then(data => fill_currencies(data));
}


// ============================================================= //









// SELECIONAR A LISTA DE MOEDAS DISPONÍVEIS (ESCONDIDA)
const addCurrencyList = document.querySelector(".add-currency-list");

addCurrencyList.addEventListener(
  "click", 
  open_currency_list
);

function open_currency_list(event) {

  // PEGO A MOEDA MAIS PRÓXIMA DA POSICAO CLICADA
  const clickedListItem = event.target.closest("li");

  // SE ESSA MOEDA JÁ NÃO TIVER SIDO CLICADA
  if(!clickedListItem.classList.contains("disabled"))
  { 
    // ACHO ELA NA LISTA DE MOEDAS DISPONÍVEIS
    const newCurrency = currencies.find(
      c => c.abbreviation===clickedListItem.getAttribute(
        "data-currency"
      )
    );

    // SE EU TIVER ACHADO ADICIONO NA LISTA DE MOEDAS SELECIONDAS
    if(newCurrency) {
      currency_list.classList.toggle("open");
      add_new_currency(newCurrency);
    }
  }
}

function add_new_currency(currency) {

  // MARCO ESSA MOEDA COMO JÁ SELECIONADA
  addCurrencyList.querySelector(
    `[data-currency=${currency.abbreviation}]`
  ).classList.add("disabled");

  // DESCOBRO QUAL BOTÃO QUE CLICOU PARA RETIRÁ-LO DA TELA
  if(button_clicked === 'start') 
  {


    // ACHO O BOTÃO E REMOVO
    const child = document.querySelector(
      '.undefined.start button');
    child.parentNode.removeChild(child);


    // ACHO O ELEMENTO NA LISTA DE MOEDAS
    const li_button_start = document.querySelector(
      '.undefined.start');

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











//         TIRAR O MOEDA E ADCIONAR O BOTÃO NOVAMENTE
// ============================================================ //

// SELCIONAR A LISTA DE MOEDAS SELECIONADAS (A MOSTRA)
const currencyList = document.querySelector(".currencies");


currencyList.addEventListener(
  "click",
  remove_currency_and_add_button
);

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

    // REMOVER TODOS ELEMENTOS DENTRO DESSE LI
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

    const button_start = document.querySelector(
      '.start.undefined button');

    const button_end = document.querySelector(
      '.end.undefined button');

    if(button_start) {
      button_start.addEventListener("click", add_currency_button_start);
    }

    if(button_end) {
      button_end.addEventListener("click", 
        add_currency_button_end);
    }
  }
}
// ============================================================ //