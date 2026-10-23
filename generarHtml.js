import {base, Equipo} from "./prueba.js";
const container = document.querySelector("#Sucursal");
const listaOn = document.querySelector("#listOn");
const listaOff = document.querySelector("#listOff");
base.forEach(element => {
    
    if(element.getInfo().estado && element.getInfo().sucursal == "La-FLorida"){
        const item = document.createElement("li");
        item.textContent = `Equipo ${element.getInfo().id}`
        listaOn.append(item);
    }else if(element.getInfo().sucursal == "La-FLorida"){
        const item = document.createElement("li");
        item.textContent = `Equipo ${element.getInfo().id}, Falla: ${element.getInfo().falla}`
        listaOff.append(item);


    }


});



