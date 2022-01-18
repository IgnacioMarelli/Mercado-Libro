/*function mostrar(mensaje) {
    alert(mensaje);
}
function multiplicar(a,b) {
    return a*b;
}

class Libro{
    constructor(nombre, condicion, editorial, precio){
        this.nombre = nombre;
        this.condicion= condicion;
        this.editorial=editorial;
        this.precio=precio;
        this.vendido=false;
    }
    calcularPrecioVenta(){
        let precioVenta = this.precio*1.21;
        return precioVenta;
    }

    mostrarProducto(){
        alert("Libro: "+this.nombre+"\n"+"Editorial: " +this.editorial+"\n" + "Condicion: " +this.condicion+"\n"+"Precio: " +this.precio);
    }
}

let band = true;
let nombreProducto;
let editorialProducto;
let condicionProducto;
let precioProducto;

function campoVacio(a,b) {
    if (a == "" & b){ 
        mostrar("Ingrese el dato correctamente");
        return true;
    }else{
        return false;
    }
}

while (band){
    nombreProducto = prompt("Ingrese el título del libro");
    campoVacio(nombreProducto,band);
    band=false;
}

band=true;

while (band){
    editorialProducto = prompt("Ingrese la editorial del libro");
    campoVacio(editorialProducto,band);
    band=false
}

band=true;

while (band){
    condicionProducto = prompt("Ingrese la condicion del libro");
    campoVacio(condicionProducto,band);
    band=false
}
band=true;

while (band){
    precioProducto = Number(prompt("Ingrese el precio del libro"));
    campoVacio(precioProducto,band);
    band=false
}

//Instanciación de un nuevo objeto.
let nuevoProducto= new Libro(nombreProducto,editorialProducto,condicionProducto,precioProducto);

//Método para ver los datos del Libro.
nuevoProducto. mostrarProducto();

//Calcular precio final.
let precioFinal = nuevoProducto.calcularPrecioVenta();
mostrar("El precio de venta del producto es $"+ precioFinal);

//CARRITO 
const carrito = [];

carrito.push(nuevoProducto);

// Precio envio a domicilio (correo argentino)
let cantidad = parseInt(prompt("¿cuantos libros desea llevar?"));
let peso = multiplicar(cantidad,250);
let zona = prompt("Envíamos a todo Argentina ¿De que provincia sos? (Escribirla sin tildes)").toUpperCase();
let ciudad = prompt("¿De que ciudad sos?").toUpperCase();

if (zona == "CATAMARCA"|| zona =="CHACO" || zona =="CORRIENTES" || zona =="FORMOSA" || zona =="LA RIOJA" || zona =="MENDOZA" || zona =="MISIONES" || zona =="NEUQUEN" || zona =="RIO NEGRO" || zona =="SANTIAGO DEL ESTERO" || zona =="SAN LUIS" || zona =="TUCUMAN"){
	zona = 3;
}else{
	zona= 2;
}

if(zona == 2 && ciudad == "LA PLATA"){
    precioDomicilio=0;
    mostrar("el envío a domicilio es gratis");
}else if(peso <= 1000 && zona==2){
    precioDomicilio=482.09;
    mostrar("el envío a domicilio vale $"+ precioDomicilio);
}else if (peso <=2000 && zona==2){
    precioDomicilio=496.24;
    mostrar("el envío a domicilio vale $"+ precioDomicilio);
}else if(peso <=500 && zona==3){
    precioDomicilio= 413.96;
    mostrar("el envío a domicilio vale $"+ precioDomicilio);
}else if(peso <= 1000 && zona==3){
    precioDomicilio=483.85;
    mostrar("el envío a domicilio vale $"+ precioDomicilio);
}else if(peso <=500 && zona==2){
    precioDomicilio= 413.09;
    mostrar("el envío a domicilio vale $"+ precioDomicilio);
}else{
    precioDomicilio=499.79;
    mostrar("el envío a domicilio vale $"+ precioDomicilio);
}
//Precio final con envio a domicilio
mostrar("El precio del producto con el envio a domicilio es de $" + (precioFinal+precioDomicilio));

//  Ordenador de productos

const libros = [];
libros.push(new Libro("1984", "nuevo", "lucemar", 550, false));
libros.push(new Libro("it", "nuevo", "lucemar", 2500, false));
libros.push(new Libro("el amor en los tiempos del colera", "nuevo", "lucemar", 950, true)); 

libros.sort(function (a, b) {
    if (a.precio > b.precio) {
      return 1;
    }
    if (a.precio < b.precio) {
      return -1;
    }else{
    return 0;
    }
  });
console.log(libros);
*/