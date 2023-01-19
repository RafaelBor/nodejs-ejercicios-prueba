class Cliente {
    constructor(nombre, email, telefono) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }
}

class Factura {
    constructor(idCliente, total) {
        this.idCliente = idCliente;
        this.total = total;
        this.estado = "pendiente";
    }

    cobrar() {
        this.estado = "pagada";
    }

    imprimir() {
        let cliente = clientes[this.idCliente];
        console.log(`Factura para: ${cliente.nombre}`);
        console.log(`Email: ${cliente.email}`);
        console.log(`Telefono: ${cliente.telefono}`);
        console.log(`Total: ${this.total}`);
        console.log(`Estado: ${this.estado}`);
    }
}

let clientes = [
    new Cliente("Juan", "juan@hotmail.com", "6421-45-67-89"),
    new Cliente("Maria", "maria@hotmail.com", "6421-22-47-12"),
    new Cliente("Pedro", "pedro@hotmail.com", "6421-98-87-65")
];

let factura1 = new Factura(1, 350);
factura1.imprimir();
factura1.cobrar();
factura1.imprimir();