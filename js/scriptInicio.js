$(function () {
    modoNocturno()
    let carrito = usarLS();
    const contadorElemento = document.getElementById("contador");
    let contador= 0;
    let productos = document.querySelector(".productosCarrito");
    let carritoDiv = document.getElementById("carrito");
    renderCarrito(carrito, carritoDiv);
    $(".divCarrito").hover(function (){
        $(productos).fadeIn(700);
        $('.divBtnComprar').css('display', 'block');
    }, function () {
        $(productos).fadeOut(200);
    })

    let nuevoDiv=document.createElement('div');
    let comprarBtn=`<div class="divBtnComprar menuCarrito"><h4 class="envíoCarrito">Envíos a todo el país<img src="../Media/camion-de-reparto (1).png" alt=""><a href="./Paginas/Carrito.html"></h4><button class="comprarBTN">COMPRAR</button></a><button class="vaciarLS">Vaciar Carrito</button></div>`;
    nuevoDiv.innerHTML=comprarBtn;
    productos.append(nuevoDiv);

    //Vaciar carrito

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
                        <h3 class="text-center cantidadLibros"> ${carrito[i].cantidad}</h3>
                    </div>
                </div>
                <hr id="separador">
            `;
            nuevoDiv.innerHTML=listado;
            carritoDiv.append(nuevoDiv); 
        }  
        contadorElemento.innerHTML=JSON.parse(localStorage.getItem('contador'));
    }

    //Utilizar Carrito o crear

    function usarLS() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
        return carrito;
    }

    //MODO NOCTURNO

    modoNocturno()
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
            $('.logo').replaceWith('<img src="./Media/Modo nocturno.jpg" class="logo" alt="Logo Mercado Libro">');
            $('.section1__imagen').replaceWith('<img src="./Media/nocturno main.png" class="col-6 section1__imagen" alt="">');
            $('.imagenMain').replaceWith('<img class="col-6 imagenMain" src="./Media/noc.png" alt="">');
            $('.luces').replaceWith('<img src="./Media/lucesAPAGADAS.png" class= "luces" alt="">');
            $('.header').addClass("nocturno1");
            $('.section1').addClass("nocturno2");
            $('.section2').addClass("nocturno2");
            $('.section3').addClass("nocturno3");
            $('body').addClass("nocturno2");
            $('footer').addClass("nocturno4");
        } else {
            $('.logo').replaceWith('<img src="./Media/Mercado libro (1).png" class="logo" alt="Logo Mercado Libro">');
            $('.section1__imagen').replaceWith('<img class="col-6 section1__imagen" src="./Media/mujer leyendo conocimiento.png" alt="">');
            $('.imagenMain').replaceWith('<img class="col-6 imagenMain" src="./Media/Mercado Libro.jpg" alt="">');
            $('.luces').replaceWith('<img src="./Media/luces.png" class= "luces" alt="">');
            $('.header').removeClass("nocturno1");
            $('.section1').removeClass("nocturno2");
            $('.section2').removeClass("nocturno2");
            $('.section3').removeClass("nocturno3");
            $('body').removeClass("nocturno2");
            $('footer').removeClass("nocturno4");
        }
    }

        $("#menu-celular").click(menu);
        function menu() {
            $('.menu-barra').animate({width:'toggle'},300);
        }


})