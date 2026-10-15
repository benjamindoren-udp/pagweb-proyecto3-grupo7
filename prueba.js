class Equipo{
    constructor(sucursal, id, falla, estado){
        this.estado = estado;
        this.falla = falla
        this.id = id;
        this.sucursal = sucursal;
    };

    getInfo(){
        const informacion = {
            estado = this.estado,
            falla = this.falla,
            id = this.id,
            sucursal = this.sucursal,
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



const equipo1 = new Equipo(true, 1,"Equipo funcionando", "La Florida");
const equipo2 = new Equipo(false, 2,"no registra las boletas", "La FLorida");
const equipos = [equipo1, equipo2];


const sucursal = new Sucursal(equipos, "La florida")
sucursal.getEquipos().forEach(element => {
    console.log(sucursal in element.getInfo());
});





