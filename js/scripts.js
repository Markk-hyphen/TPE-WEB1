document.addEventListener("DOMContentLoaded", (e_global)=>{
  'use strict'

/*
Actualizacion x 3er entrega
*/
  load();

async function load(){

    let home_url = "home.html";
    let mainCont = document.querySelector("main");
    
    add_load_listener();
    try {
      let prom = await fetch(`${window.location.origin}/${home_url}`);
      if (prom.ok){
        let data = await prom.text();
        mainCont.innerHTML = data;
      }else {mainCont.innerHTML = "URL error";}
    } catch (error) {
      mainCont.innerHTML = error;
    }
    windows_listeners();
    load_scripts();
  }

function add_load_listener(){

  window.addEventListener("load", (e)=>{
    let heroes = document.getElementById("heroes");
    let tienda = document.getElementById("tienda");
    let index = document.getElementById("home");
  
    heroes.addEventListener("click", update_page);
    tienda.addEventListener("click", update_page);
    index.addEventListener("click", update_page);
  
  })
}

/*
Actualizacion x 3er entrega
*/
function windows_listeners(){
    function initialize_page(){
      let stateObj = {id : "home"};
      document.title = `Dota ${stateObj.id}`;
      window.history.pushState(stateObj, `${stateObj.id}`, `${stateObj.id}`);
    }
    initialize_page()
    
    
    
    window.addEventListener("popstate", event => {
      let stateId = event.state.id;
      let to_active = document.getElementById(stateId);
      
      active_tab(to_active);
      load_content(stateId);
    });
  }
  
  function active_tab(to_active){
    document.querySelectorAll("nav a")
    .forEach(elm =>{
      elm.classList.remove("active");
    })
    to_active.classList.add("active");
  }
  
  async function load_content(id){
    
    let cont = document.querySelector("main");
    let htmlUrl = `${id}.html`;
    
    document.title = id;
    try {
      let prom = await fetch(`${window.location.origin}/${htmlUrl}`);
      if (prom.ok){
        let content = await prom.text();
        cont.innerHTML = "";
        cont.innerHTML = content;
      }else{cont.innerHTML = "URL error";}
      
    } catch (error) {
      cont.innerHTML = `Conection error: ${error}`;
    }
    if (id == "heroes"){
      load_heroes_tab();
    }
    load_scripts();
    
  }

  function update_page(){

    let stateObj = {id : this.id};
  
    document.title = this.id;
    active_tab(this);
    window.history.pushState(stateObj, `${this.id}`, `${this.id}`);
    load_content(this.id);

  }

  function load_scripts(){
    
    let boton_reg = document.querySelector(".login");
    let reg_cont = document.querySelector(".registro");
    let contenedor_global = document.querySelector(".contenedor");
    let conf = document.getElementById("confirmar");
    
    
boton_reg.addEventListener("click", (e) => {
  reg_cont.removeAttribute("hidden");
  reg_cont.classList.add("registro-on");
  let Y = e.pageY;
  let X = e.pageX;
  window.scroll({
    top: Y,
    left: X,
    behavior: "smooth",
  });
  initialize_captcha();
});

conf.addEventListener("click", () => {
  let captcha = document.getElementById("captcha-value");
  let resp = document.querySelector("#captcha-input");
  let captchaCont = document.querySelector(".registro");
  if (resp.value == captcha.innerHTML) {
    resp.value = "ACEPTADO";
    resp.style.background = "green";
    captchaCont.classList.add("removido");
  } else {
    if (resp.classList.contains("captcha-incorrecto-izq")) {
      resp.classList.remove("captcha-incorrecto-izq");
      resp.classList.add("captcha-incorrecto-der");
    } else {
      resp.classList.remove("captcha-incorrecto-der");
      resp.classList.add("captcha-incorrecto-izq");
    }
    captcha.value = Math.floor(Math.random() * 1000000) + 32471;
  }
});

reg_cont.addEventListener("animationend", (e) => {
  e.target.parentNode.removeChild(e.target);
  boton_reg.removeEventListener("click", () => {});

});


function initialize_captcha(){
  let captcha = document.getElementById("captcha-value");
  captcha.innerHTML = Math.floor(Math.random() * 1000000) + 32471;
}
  
}

function load_heroes_tab(){
  let url = "https://60d23bf2858b410017b2d69b.mockapi.io/api/heroes"
let tabla = document.querySelector(".contenedor-tabla table");
let addBtn = document.querySelector(".add-hero");
let vaciar = document.querySelector("#vaciar");
//Con estos contadores logro ponerle estilos a la filas ingresadas por el usuario
let cont_global = 0;
let cant_items = 0;
// Auxiliar para contener el header de la tabla
let tabla_copy = tabla.innerHTML;

updateTable();

/*
Actualizada x 3er entrega
*/
addBtn.addEventListener("click", () => {
  let hInputs = new_node();
  
  for (let i = 0; i < cant_items; i++) {
    let tr_tabl = create_tr_table(hInputs, cont_global);
    tabla.prepend(tr_tabl);
    update_api(hInputs);
  }


});


vaciar.addEventListener("click", ()=>{
  tabla.innerHTML = " " + tabla_copy;
})

function fillTable(arr) {
  let tr_table;
  arr.forEach((elm) => {
    tr_table = create_tr_table(elm);
    tabla.appendChild(tr_table)
  });
}



/*
Actualizada x 3er entrega
 */
function create_tr_table(elem){
  let i = 0;
  let tr_table = document.createElement("tr");
  let th_btn = document.createElement("th");
  for (let prop in elem) {
    //Si no hago un let en cada iteracion no interpreta que son distintos
    let th_table = document.createElement("th");
    if (elem.hasOwnProperty(prop) && (prop != "id")) {
        th_table.innerHTML = elem[prop];
        tr_table.appendChild(th_table);
    }
}

  create_delete_btn(th_btn);

  tr_table.appendChild(th_btn);
  if (cont_global % 2 == 0){
    tr_table.classList.add("tr_background");
  }

  cont_global++
  set_data_id(tr_table);
  
  return tr_table;
}

function set_data_id(tr){
  let id = `${cont_global}`;
  tr.dataset.id = id;
}

/*  
Actualizada x 3er entrega
*/
async function updateTable() {
  try {
    let prom = await fetch(url);
    if (prom.ok) {
      let json = await prom.json();
      fillTable(json);
    } else {
      tabla.innerHTML = "URL error";
    }
  } catch (error) {
    tabla.innerHTML += `Conection error: ${error}`;
  }
}


function new_node() {
  let inputs = document.querySelectorAll(".heros-form #add-heros input");
  cant_items = parseInt(cantidad_ingresada(inputs[6].value));
  let JSONinputs = {};

  JSONinputs = {
    heroe: inputs[0].value,
    winrate: inputs[1].value,
    item: inputs[2].value,
    kda: inputs[3].value,
    popularidad: inputs[4].value,
    contra: inputs[5].value,
  };
  return JSONinputs;
}

function cantidad_ingresada(cantidad){
  let resultado = (cantidad) ? cantidad : 1;
  return resultado;
}


/***************** INICIO TERCER ENTREGA******************************/

async function update_api(new_object){
  try {
      let p = await fetch(url,
        {
          method: "POST",
          headers: {"content-type" : "application/json"},
          body : JSON.stringify(new_object)
        });
      
    } catch (error) {
      console.log(error);
    }
}

function create_delete_btn(th_btn){

  th_btn.innerHTML =  `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                      <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                    `;
                    
  th_btn.addEventListener("click", e =>{
    let target = e.target;
    if (target.tagName == "path"){
      target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
    }else if (target.tagName == "svg"){
      target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
    }

  });

}

let editBtn = document.querySelector(".edit-hero");

editBtn.addEventListener("click", () =>{
  let editedInputs = edit_node();
  edit_table(editedInputs);
})

function edit_node(){
  let inputs = document.querySelectorAll("#edit-heros input");
  let json_inputs = 
                    {
                      heroe: inputs[0].value,
                      winrate: inputs[1].value,
                      item: inputs[2].value,
                      kda: inputs[3].value,
                      popularidad: inputs[4].value,
                      contra: inputs[5].value
                    }

  return json_inputs;
}

function edit_table(inputs){
  let rows = document.querySelectorAll("table tr");
  let to_edit = inputs.heroe.toLowerCase();
  let longitud = Object.keys(rows).length;
  var array_inputs = json_to_array(inputs);

  for (let i = 1; (i < longitud); i++) {

    if (to_edit == rows[i].firstElementChild.innerHTML.toLowerCase()){
        edit_hero(rows[i], array_inputs);
        put_api(inputs, rows[i].dataset.id);
        break;
    }
    
  }

}

async function put_api(data, id){
  let url_id = `${url}/${id}`;
  try {
    let p = await fetch(url_id,
      {
        method: "PUT",
        headers: {"content-type" : "application/json"},
        body : JSON.stringify(data)
      });
    
  } catch (error) {
    console.log(error);
  }
}

function json_to_array(json){
  let inputs = [];
  for (const prop in json) {
    if (Object.hasOwnProperty.call(json, prop)) {
       inputs.push(json[prop]);
    }
  }
  return inputs;
}

function edit_hero(hero_row, array_inputs){
  let features = hero_row.childNodes;
  let features_leng = Object.keys(features).length;

  for (let j = 1; j < (features_leng-1) ; j++) {
    features[j].innerHTML = array_inputs[j];
  }
}

let filterBtn = document.querySelector(".filter button");
filterBtn.addEventListener("click", () =>{
  let input = (document.querySelector(".filter input").value).toLowerCase();
  let rows = document.querySelectorAll("table tr");
  if (input){
    remove_hidden(rows);
    filter_rows(rows, input);
  }else{
    remove_hidden(rows);
  }
})

function filter_rows(heroes, to_find){
  heroes.forEach(heroe => {
    let to_compare = (heroe.firstElementChild.innerHTML).toLowerCase();
    if (!to_compare.includes(to_find) && (heroe.firstElementChild.innerHTML != "HEROE")){
      heroe.classList.add("oculto");
    }
  });
}

function remove_hidden(heroes){
  heroes.forEach(heroe => {
    heroe.classList.remove("oculto");
  });
}
}

})


//Funciones de uso personal para borrar inputs de prueba




async function deletex(id){
  let to_delete = `https://60d23bf2858b410017b2d69b.mockapi.io/api/heroes/${id}`
  try {
      let p = await fetch(to_delete,
        {
          method: "DELETE",
          headers: {"content-type" : "application/json"},
        });
        console.log("borrado");
      
    } catch (error) {
      console.log(error);
    }
}

async function deletex_mult(idInic = 1, idFin = 1){
  for (let i = idInic ; i <= idFin; i++) {
    
    let to_delete = `https://60d23bf2858b410017b2d69b.mockapi.io/api/heroes/${i}`
    try {
      let p = await fetch(to_delete,
        {
          method: "DELETE",
          headers: {"content-type" : "application/json"},
        });
        console.log("borrados");
      
    } catch (error) {
      console.log(error);
    }

  }
}

/******************************* FIN DEL TRABAJO  ********************************************/