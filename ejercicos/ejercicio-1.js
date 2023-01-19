class Conductor {
  constructor(nombre, licencia) {
    this.nombre = nombre;
    this.licencia = licencia;
    this.ganancias = 0;
  }
}

class Camion {
  constructor(capacidad, conductor) {
    this.capacidad = capacidad;
    this.pasajeros = 0;
    this.conductor = conductor;
  }
  
  subir(numPasajeros) {
    if (this.pasajeros + numPasajeros > this.capacidad) {
      console.log("No se pueden subir tantos pasajeros. Capacidad máxima alcanzada.");
    } else {
      this.pasajeros += numPasajeros;
      let total = this.capacidad - this.pasajeros;

      this.ganancias = numPasajeros * 15;

      console.log(`Al camion con el concutor de nombre ${this.conductor.nombre} se subieron ${numPasajeros} personas y la capacidad maxima es de ${this.capacidad} aun se pueden subir ${total} personas mas.`)
      
    }
  }
  
  bajar(numPasajeros) {
    if (this.pasajeros - numPasajeros < 0) {
      console.log("No se pueden bajar tantos pasajeros. No hay suficientes en el camión.");
    } else {
      this.pasajeros -= numPasajeros;
      console.log(`se bajaron ${numPasajeros} del camion y aun quedan ${this.pasajeros} pasajeros por bajar.`)
    }
  }
  
  asignarConductor(conductor) {
    this.conductor = conductor;
    console.log(this.conductor)
    console.log(`Se asigno al camion nuevo conductor con el nombre de ${this.conductor.nombre} y el numero de licencia es ${this.conductor.licencia}`)
  }

  gananciasConductor() {
    let ganancias = this.ganancias
    console.log(`El conductor lleva ${ganancias}$ de ganancias`)
  }
}


const conductor1 = new Conductor("Juan", 12345);
const camion1 = new Camion(20, conductor1);

// const conductor2 = new Conductor("Jose", 54321)
// camion1.asignarConductor(conductor2)

camion1.subir(10);
camion1.bajar(5);
camion1.gananciasConductor();


