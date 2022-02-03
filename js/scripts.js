/*
//Calcular precio final.
let precioFinal = nuevoProducto.calcularPrecioVenta();
mostrar("El precio de venta del producto es $"+ precioFinal);


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
*/


let carrito=[];
let i =1;
const contador = document.querySelector('#contador');
const btnAgregar = document.querySelectorAll(".añadir");
let productos= document.querySelector(".productosCarrito");
let divJava = document.querySelector(".divJava1");
const salir = document.querySelectorAll(".salir");

class Libro{
    constructor(imagen,nombre, condicion, precio){
        this.imagen = imagen;
        this.nombre = nombre;
        this.condicion= condicion;
        this.precio=precio;
    }
}
btnAgregar.forEach(btn => {
    btn.addEventListener('click', crearLibro)
  })
function crearLibro(e){
    const button = e.target;
    const libro = button.closest('.card');
    const imagen = libro.querySelector(".imagenListada").src;
    const nombre = libro.querySelector(".nombreLibro").textContent;
    const condicion = libro.querySelector(".condicion").textContent;
    const precio = libro.querySelector(".precio").textContent;
    const libroSeleccionado = new Libro(imagen,nombre,condicion,precio);
    contador.innerHTML=i;
    i++;
    agregarCarrito(libroSeleccionado);
}
function agregarCarrito(libroSeleccionado) {
    carrito.push(libroSeleccionado);
    agregarLocalStorage();
    contadorCarrito();
}
function contadorCarrito() {

}
function agregarLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
/*
function mostrarCarrito() {
    carrito.addEventListener("mouseover", function (e) {
        botonAgregar();
        
    });
    function botonAgregar() {
        btnAgregar.forEach(btnAgregar => {
            btnAgregar.addEventListener("click", function (e){
                const libro = e.currentTarget.classList;
                if (libro.contains("milNueveOchentaYCuatro")) {
                   let libroSeleccionado = milNueveOchentaYCuatro;
                   return libroSeleccionado;
                }
                for (const contenido in libroSeleccionado) {
                    let div = `<div class=divJava>${contenido}: ${libroSeleccionado[contenido]} </div>`;
                    return div;
                }
            });
        }); 
    }
}
mostrarCarrito();

/*

btnAgregar.forEach(btnAgregar => {
    btnAgregar.addEventListener("click", crearListado());
});  
function crearListado() {
    let items = [];
    for (const contenido in libroSeleccionado) {
        let div = `<div class=divJava>${contenido}: ${libroSeleccionado[contenido]} </div>`;
        items.push(div);
    }
    for (const item of items) {
        productos.insertAdjacentHTML('beforeend', item);
    }
}

carrito.addEventListener("mouseover", function () {
    productos.innerHTML= `<div class= "divJava"> <h2 class="h2Java">Productos seleccionados</h2><button class="salir">X</button></div>`;
    const salir = document.querySelector(".salir");
    salir.addEventListener("click", function () {
        this.parentNode.remove();
    })
});

const shoppingCartDiv = document.createElement( 'div' );
const cartModal =
    ` 
        <div class="row shoppingCartPlant mt-3 text-center">
            <div class="col-3">
                <img src=${plantImg} class="imagenesModal"/>
                <h6 class="mt-2 shoppingCartPlantTitle">${plantTitle}</h6>
            </div> 
            <div class="col-3">
                <p class="plant-price shoppingCartPlantPrice">${plantPrice}</p>
            </div>
            <div class="col-3">
                <input class="text-center shoppingCartPlantQuantity inputCuenta" type="number" value="1">
            </div>
            <div class="col-3">
                <button class="btn btn-danger" id="remove-plant-btn" data-name="${plantTitle}">
                    x
                </button>
            </div>
        </div>
    `
                        
shoppingCartDiv.innerHTML = cartModal;
showCart.append( shoppingCartDiv );

//Contador Carrito


let i =1;
const contador = document.querySelector('#contador');
const agregar = document.querySelectorAll('.añadir');


agregar.forEach(boton => {
    boton.addEventListener("click", function suma(){
        contador.innerHTML=i;
        i++;
    });
});  */

// ${"menu"}.hover(function(){
//     $(this).addClass("");
// }, function(){
//     $(this).removeClass("");
// })
// .slideUp() para que desaparezca

// $("").change(()=>{
//     console.log(this.value);
// })