class Equipo{
    constructor(sucursal, id, falla, estado){
        this.estado = estado;
        this.falla = falla
        this.id = id;
        this.sucursal = sucursal;
    };

    getInfo(){
        const informacion = {
            estado: this.estado,
            falla: this.falla,
            id : this.id,
            sucursal : this.sucursal,
        };

        return informacion;
    };

    modificar(estado,falla, id, sucursal){
        if(falla != null){
            this.falla = falla;
        };

        if(id != null){
            this.id = id;
        };

        if(estado!= null){
            this.estado = estado;            
        };

    };

};
class Sucursal{
    constructor(Equipos, comuna){
        this.Equipos = Equipos;
        this.comuna= comuna;

    }
    


    getEquipos(){
        return this.Equipos;
    }
};

function obtenerEnteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarBase(n){
    let sucursales = ["La-FLorida", "Puente-Alto", "Maipu"];
    let base = [];
    let e;
    for(let i = 0; i<n; i++){
        let number = obtenerEnteroAleatorio(0,2);
        let number1 = obtenerEnteroAleatorio(1,2);
        if(number1 == 1){
            e = new Equipo(sucursales[number], i, "-", true); 
        }else {
            e = new Equipo(sucursales[number], i, "-", false); 
        }
        base.push(e);

    };
    return base;
}

let base = generarBase(20);
export {base, Equipo};
console.log("Base generada");


