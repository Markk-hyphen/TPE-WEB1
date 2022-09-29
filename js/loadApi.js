'use strict'

/* ESTE SCRIPT LO UTILIZAMOS, UNA UNICA VEZ, PARA CARGAR LOS DATOS INICIALES EN LA API, POR ESO NO ESTA INCLUIDO EN NINGUN HTML, PERO CONSIDERAMOS
NECESARIO DEJARLO EN CARPETA */


let heroes = [
    {
      heroe: "Dark Seer",
      winrate: "51.2%",
      item: "Cetro de Aghanim",
      kda: 7,
      popularidad: "105th",
      contra: "Terrorblade",
    },
  
    {
      heroe: "Dazzle",
      winrate: "53.14%",
      item: "Capa Fulgurante",
      kda: "2.22",
      popularidad: "23th",
      contra: "Pudge",
    },
    {
      heroe: "Ursa",
      winrate: "50.17%",
      item: "Daga de Traslacion",
      kda: "3.38",
      popularidad: "29th",
      contra: "Sven",
    },
    {
      heroe: "Lina",
      winrate: "47.6%",
      item: "Cetro de Aghanim",
      kda: "2.22",
      popularidad: "64th",
      contra: "Alchemist",
    },
    {
      heroe: "Alchemist",
      winrate: "51.13%",
      item: "Resplandor",
      kda: "5.9",
      popularidad: "96th",
      contra: "Broodmother",
    },
    {
      heroe: "Abbadon",
      winrate: "52.56%",
      item: "Sange y Yasha",
      kda: "3.6",
      popularidad: "84th",
      contra: "Lycan",
    },
    {
      heroe: "Juggernaut",
      winrate: "49.5%",
      item: "Furia de Batalla",
      kda: "4.7",
      popularidad: "70th",
      contra: "Centaur Warruner",
    },
    {
      heroe: "Lycan",
      winrate: "58.49%",
      item: "Vladimir",
      kda: "7.4",
      popularidad: "115th",
      contra: "Ursa",
    },
    {
      heroe: "Broodmother",
      winrate: "50.02%",
      item: "Orquidea",
      kda: "2.97",
      popularidad: "113th",
      contra: "Arc Warden",
    },
    {
      heroe: "Arc Warden",
      winrate: "53.11%",
      item: "Mjolnir",
      kda: "3.19",
      popularidad: "104th",
      contra: "Silencer",
    },
    {
      heroe: "Silencer",
      winrate: "53.5%",
      item: "Pica Huracan",
      kda: "2.93",
      popularidad: "34th",
      contra: "Bristleback",
    },
  ];

let api_url = "https://60d23bf2858b410017b2d69b.mockapi.io/api/heroes";

async function load_api(){
    let cant_heroes = heroes.length;
    try {
      for (let i = 0; i < cant_heroes; i++) {
        let p = await fetch(api_url,
          {
            method: "POST",
            headers: {"content-type" : "application/json"},
            body : JSON.stringify(heroes[i])
          });
          
        }
        
      } catch (error) {
        console.log(error);
      }

}


load_api();