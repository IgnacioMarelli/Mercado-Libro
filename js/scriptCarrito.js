$(function () {
    modoNocturno()
    let carrito = usarLS();
    let precioLibroFinal= document.querySelector(".precioFinal");
    let carritoDiv = document.getElementById("carrito");
    let btnEnvio= document.querySelector(".envioBTN");
    let precioReal;
    let cuentaFinal=0;
    let peso = JSON.parse(localStorage.getItem('contador'))*250;
    let zona;
    let ciudad; 
    let precioDomicilio;
    let precioCEnvio;
    let precioCEnvioHTML= document.getElementById("precioCEnvio");
    precioEnvioHtml()

    //Crear Precio final

    function precioFinal(libro) {
        cuentaFinal+=libro.precio;
        localStorage.setItem('cuentaFinal', JSON.stringify(cuentaFinal));
        return cuentaFinal
    }
    
    //Utilizar contador

    function sumaCantidad(e){
        carrito = usarLS();
        sumaInput  = e.target;
        let item = sumaInput.closest(".divJava");
        const title = item.querySelector('.nombreLibroSeleccionado').textContent;
        carrito.forEach(libro => {
            precioReal=libro.precio/libro.cantidad;
            cantidad= libro.cantidad;
            if (title==libro.nombre) {
                libro.cantidad=parseInt(sumaInput.value);
                libro.precio=precioReal*libro.cantidad;
                if ( libro.cantidad < 1) {
                    removerItemDelCarrito ( carrito, libro )
                    contador=carrito.length
                    localStorage.setItem('contador', JSON.stringify(contador));
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
            precioFinal(libro)
            precioEnvioHtml()
            renderCarrito(carrito, carritoDiv)
            renderPrecioTotal()
        })
        if (carrito.length==0) {
            vaciar()
        }
        cuentaFinal=0;
    }

    //Remover Item del Local Storage Carrito
    function removerItemDelCarrito ( arr, item ) {
        let i = arr.indexOf( item );
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
    }

    //renderizar el Carrito del LS    
    renderCarrito(carrito, carritoDiv)

    //Vaciar el Local Storage y remover todo lo renderizado
    $('.vaciarLS').click(vaciar);
    
    function vaciar() {
        carrito = usarLS();
        localStorage.clear();
        carritoDiv.innerHTML = "";
        precioLibroFinal.innerHTML= `<span id="precioFinal">No has seleccionado ningún libro</span>`;
        $('.lugar').css('display','flex');
        $('.lugar').html(`<label for="provincia">Seleccione su provincia</label><input type="text" name="provincia" placeholder="Ejemplo: Buenos Aires" id="provincia"><button class="envioBTN">OK</button>`);
        $('.lugarCiudad').css('display','none');
        $('#precioCEnvio').css('display','none');
        $('.mainPagar').css('display','none');
        precioDomicilio=false;
        
    }



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
                        <input class="text-center cantidadLibros"  type=number value="${carrito[i].cantidad}">
                    </div>
                </div>
                <hr id="separador">
            `;
            nuevoDiv.innerHTML=listado;
            carritoDiv.append(nuevoDiv); 
            $('.cantidadLibros').change(sumaCantidad)
        }  
    }

    //Crear Carrito si no esta en LS

    function usarLS() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
        return carrito;
    }

    // Precio total del carrito
    function renderPrecioTotal() {
        precioLibroFinal.innerHTML= JSON.parse(localStorage.getItem('cuentaFinal')) ? `<span id="precioFinal">Precio total (s/ envío) = $${JSON.parse(localStorage.getItem('cuentaFinal'))}</span>` : `<span id="precioFinal">No has seleccionado ningún libro</span>`;
    }
    
    renderPrecioTotal()


    // Precio envio a domicilio (Precios según el correo argentino)
  

    btnEnvio.addEventListener('click', zonaEnvio);
    
    
    //Designar Zona y Ciudad

    function zonaEnvio() {
        zona=$('#provincia').val().toUpperCase().replaceAll(" ", "");
        if (zona == "CATAMARCA"|| zona =="CHACO" || zona =="CORRIENTES" || zona =="FORMOSA" || zona =="LARIOJA" || zona =="MENDOZA" || zona =="MISIONES" || zona =="NEUQUEN" || zona =="RIONEGRO" || zona =="SANTIAGODELESTERO" || zona =="SANLUIS" || zona =="TUCUMAN"){
            zona = 3;
            $('.lugar').css('display','none');
            $('.lugarCiudad').css('display', 'block');
        }else if(zona == "CORDOBA" || zona == "BUENOSAIRES" || zona == "ENTRERIOS" || zona == "SANTAFE" || zona == "JUJUY" || zona == "SALTA" || zona == "LAPAMPA" || zona == "SANTACRUZ" || zona == "TIERRADELFUEGO" || zona == "CHUBUT"){
            zona= 2;
            $('.lugar').css('display','none');
            $('.lugarCiudad').css('display', 'block');
            
        }else{
            $('.lugar').html(`<p> Recorda que solo se hacen envíos dentro de Argentina</p>`);
        }        
        
    }
    
    
    $(".btnCiudad").click(precioTotalConEnvio);


    //Renderizar precio de libros con Envio

    function  precioEnvioHtml(){
        $('.lugar').css('display','block');
        $('.lugarCiudad').css('display','none');
        precioDomicilio=JSON.parse(localStorage.getItem('precioDomicilio'));
        if (precioDomicilio) {
            $('.lugar').html(`<span id=envioGratis>Precio envío: $${precioDomicilio}</span>`);
            precioCEnvio=JSON.parse(localStorage.getItem('cuentaFinal'))+precioDomicilio;
            localStorage.setItem('precioCEnvio', JSON.stringify(precioCEnvio));
            precioCEnvioHTML.innerHTML= `<span id="precioFinal">Precio total (c/ envío) = $${precioCEnvio}</span>`;
        } else {
            precioCEnvioHTML.innerHTML= `<span id="precioFinal">Por favor seleccione una provincia y una ciudad para calcular el envío</span>`;
        }
    }


    function precioTotalConEnvio(){
        ciudad=$('.ciudad').val().toUpperCase().replaceAll(" ", "");
        
        if(ciudad == "LAPLATA" && zona==2){
            precioDomicilio=0;
            localStorage.setItem('precioDomicilio', JSON.stringify(precioDomicilio));
            precioCEnvioHTML.innerHTML= ``;
            $('.lugarCiudad').html(`<span id=envioGratis>Envío Gratis</span>`);
        }else if(peso <=500 && zona==2){
            precioDomicilio= 413.09;
            localStorage.setItem('precioDomicilio', JSON.stringify(precioDomicilio));
            precioEnvioHtml()
        }else if(peso <= 1000 && zona==2){
            precioDomicilio=482.09;
            localStorage.setItem('precioDomicilio', JSON.stringify(precioDomicilio));
            precioEnvioHtml()
        }else if (peso <=2000 && zona==2){
            precioDomicilio=496.24;
            localStorage.setItem('precioDomicilio', JSON.stringify(precioDomicilio));
            precioEnvioHtml()
        }else if(peso <=500 && zona==3){
            precioDomicilio= 413.96;
            localStorage.setItem('precioDomicilio', JSON.stringify(precioDomicilio));
            precioEnvioHtml()
        }else if(peso <= 1000 && zona==3){
            precioDomicilio=483.85;
            localStorage.setItem('precioDomicilio', JSON.stringify(precioDomicilio));
            precioEnvioHtml()
        }else{
            precioDomicilio=499.79;
            localStorage.setItem('precioDomicilio', JSON.stringify(precioDomicilio));
            precioEnvioHtml()
        }
    }
    precioCEnvioHTML.innerHTML= ``;


    //Recurrir a una api para ver renderizar precio en bitcoins


    $('.cambiarMoneda').click(()=>{
        $.ajax({
            type: "GET",
            url:"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=ARS",
            success: function (response){
                let precioDelBTC = response.bitcoin.ars;
                let precioEnPesos = JSON.parse(localStorage.getItem('cuentaFinal'));
                precioCEnvio=parseInt(JSON.parse(localStorage.getItem('precioCEnvio')));
                let resultado = precioEnPesos / precioDelBTC;
                let resultadoCEnvio=precioCEnvio / precioDelBTC;
                if (precioCEnvio== 0) {
                    $('.cambiarMoneda').html(`<div style="d-block">El valor del libro en BitCoins es de : ${resultado}</div>`);
                } else if($('.lugarCiudad').html(`<span id=envioGratis>Envío Gratis</span>`)) {
                    $('.cambiarMoneda').html(`<div style="d-block">El valor del libro en BitCoins (S/ envío) es de : ${resultado}</div><div style="d-block">El valor del libro en BitCoins (C/ envío) es de : ${resultado}</div>`);
                }else{
                    $('.cambiarMoneda').html(`<div style="d-block">El valor del libro en BitCoins (S/ envío) es de : ${resultado}</div><div style="d-block">El valor del libro en BitCoins (C/ envío) es de : ${resultadoCEnvio}</div>`);
                }
                $('.volverElemento').css('display', 'block');
                $('.volverElemento').click(volver);
            },
            error:(error)=>{
                console.log(error);
            }
        })

    })
    //Crear Boton para Volver del "pago con bitcoins"
    function volver() {
        $('.cambiarMoneda').html(`<button class="cambiarMoneda">¡Pagá con bitcoins!</button>`);
        $('.volverElemento').css('display', 'none');
    }



    //MODO NOCTURNO

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
     //Finalizar Compra
     $('.fin').click(fin);


     function fin() {
         if (precioDomicilio) {
             $('.main').html(`<h1>Muchas gracias por tu compra. El envío está en camino</h1>`);
         }else{
             $('.aviso').text('Seleccione provincia y ciudad para el envío');
         }
     }
})