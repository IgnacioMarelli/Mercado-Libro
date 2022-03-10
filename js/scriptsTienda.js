$(function () {
    modoNocturno()
    let carrito = usarLS();
    const contadorElemento = document.getElementById("contador");
    let contador= 0;
    let precioReal;
    let cuentaFinal=0;
    const btnAgregar = document.querySelectorAll(".añadir");
    let productos = document.querySelector(".productosCarrito");
    let carritoDiv = document.getElementById("carrito");
    renderCarrito(carrito, carritoDiv);
    $(".divCarrito").hover(function (){
        $(productos).fadeIn(700);
        $('.divBtnComprar').css('display', 'block');
    }, function () {
        $(productos).fadeOut(200);
    })
    //Creador de Libro
    class Libro {
        constructor(imagen, nombre, condicion, precio,cantidad) {
            this.imagen = imagen;
            this.nombre = nombre;
            this.condicion = condicion;
            this.precio = precio;
            this.cantidad=cantidad;
        }
        
    }
    //Boton desencadenante
    btnAgregar.forEach(btn => {
        btn.addEventListener('click', crearLibro)
    })

    //Crear objeto (libro)

    function crearLibro(e) {
        const button = e.target;
        const libro = button.closest('.card');
        const imagen = libro.querySelector(".imagenListada").src;
        const nombre = libro.querySelector(".nombreLibro").textContent;
        const condicion = libro.querySelector(".condicion").textContent;
        const precio = parseInt(libro.querySelector(".precio").textContent);
        const libroSeleccionado = new Libro(imagen, nombre, condicion, precio, cantidad= 1);
        precioReal=precio;
        precioFinal(precioReal)
        agregarLocalStorage(libroSeleccionado)
    }

    //Usar LocalStorage

    function agregarLocalStorage(libroSeleccionado) {
        carrito = usarLS();
        // agregar al carrito si no existe, pero si ya existe sumar cantidad
        if (carrito.length === 0) {
            carrito.push(libroSeleccionado);
        } else {
            let existe = false;
            carrito.forEach(libro => {
                if (libro.nombre === libroSeleccionado.nombre) {
                    libro.cantidad++;
                    libro.precio=precioReal*libro.cantidad;
                    existe = true;
                }
            })
            if (!existe) {
                carrito.push(libroSeleccionado);
            }
        }
        contador=carrito.length;
        let precioCEnvio= 0;
        localStorage.setItem('precioCEnvio', JSON.stringify(precioCEnvio));
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('cuentaFinal', JSON.stringify(cuentaFinal));
        localStorage.setItem('contador', JSON.stringify(contador));
        renderCarrito(carrito, carritoDiv);
    }

    let nuevoDiv=document.createElement('div');
    let comprarBtn=`<div class="divBtnComprar menuCarrito"><h4 class="envíoCarrito">Envíos a todo el país<img src="../Media/camion-de-reparto (1).png" alt=""><a href="./Carrito.html"></h4><button class="comprarBTN">COMPRAR</button></a><button class="vaciarLS">Vaciar Carrito</button></div>`;
    nuevoDiv.innerHTML=comprarBtn;
    productos.append(nuevoDiv);

    //Vaciar Carrito

    $('.vaciarLS').click(()=>{
        carrito = usarLS();
        localStorage.clear();
        carritoDiv.innerHTML = "";
        contadorElemento.innerHTML=0;
        contador= 0;
    });

    //Renderizar libros seleccionados

    function renderCarrito(carrito, carritoDiv) {
        carritoDiv.innerHTML = '';
        for(let i =0; i < carrito.length ; i++){
            const nuevoDiv= document.createElement('div');
            let listado = ` 
                <div class="row divJava text-center">
                    <div class="col-3">
                        <img src=${carrito[i].imagen} class="imagenLibroSeleccionado" alt="">
                    </div> 
                    <div class="col-3">
                        <h6 class="nombreLibroSeleccionado">${carrito[i].nombre}</h6>
                    </div> 
                    <div class="col-3">
                        <p class="condicionLibroSeleccionado">(${carrito[i].condicion})</p>
                    </div>
                    <div class="col-2">
                        <p class="precioLibroSeleccionado">$${carrito[i].precio}</p>
                    </div>
                    <div class="col-1">
                        <h4 class="text-center cantidadLibros"> ${carrito[i].cantidad}</h4>
                    </div>
                </div>
                <hr id="separador">
            `;
            nuevoDiv.innerHTML=listado;
            carritoDiv.append(nuevoDiv); 
        }  
        contadorElemento.innerHTML=JSON.parse(localStorage.getItem('contador'));
    }

    //Usar carrito LS o crear

    function usarLS() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
        return carrito;
    }

    // Precio total del carrito
    function precioFinal(precioReal) {
        cuentaFinal=JSON.parse(localStorage.getItem('cuentaFinal')) + precioReal;
        return cuentaFinal
    }
    //modo nocturno
    
    $('.slideThree #slideThree').click(function () {
           if (JSON.parse(localStorage.getItem('modoNocturno'))) {
            localStorage.setItem('modoNocturno', false);
            modoNocturno()
           }else{
            localStorage.setItem('modoNocturno', true);
            modoNocturno()
           }
        }
    );

    
    function modoNocturno(){
        if (JSON.parse(localStorage.getItem('modoNocturno'))) {
            $('.logo').replaceWith('<img src="../Media/Modo nocturno.jpg" class="logo" alt="Logo Mercado Libro">');
            $('.section1__imagen').replaceWith('<img src="./Media/nocturno main.png" class="col-6 section1__imagen" alt="">');
            $('.imagenMain').replaceWith('<img src="./Media/nocturnomain.jpg" class="imagenMain col-6"alt="">');
            $('.header').addClass("nocturno1");
            $('.section1').addClass("nocturno2");
            $('.section2').addClass("nocturno2");
            $('.section3').addClass("nocturno3");
            $('body').addClass("nocturno2");
            $('footer').addClass("nocturno4");
        } else {
            $('.logo').replaceWith('<img src="../Media/Mercado libro (1).png" class="logo" alt="Logo Mercado Libro">');
            $('.section1__imagen').replaceWith('<img class="col-6 section1__imagen" src="./Media/mujer leyendo conocimiento.png" alt="">');
            $('.imagenMain').replaceWith('<img src="./Media/main.jpeg" class="imagenMain col-6"alt="">');
            $('.header').removeClass("nocturno1");
            $('.section1').removeClass("nocturno2");
            $('.section2').removeClass("nocturno2");
            $('.section3').removeClass("nocturno3");
            $('body').removeClass("nocturno2");
            $('footer').removeClass("nocturno4");
        }
    }
})