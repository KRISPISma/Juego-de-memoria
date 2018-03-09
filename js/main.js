// objetos de cada personaje
    // Images powered by Gema!!
/*                                          
const arrayPersonajes = [
    {
        nombre: "Anna",
        ruta: "img/Anna.png"  // como lo voy a insetar en el html, la ruta tiene q ser relativa a donde va a estar
    },
    {
        nombre: "Campanilla",
        ruta: "img/Campanilla.png"  
    },
    {
        nombre: "Elsa",
        ruta: "img/Elsa.png"  
    },
    {
        nombre: "Flynn",
        ruta: "img/Flynn.png"  
    },
    {
        nombre: "Genio",
        ruta: "img/Genio.png"  
    },
    {
        nombre: "HadaMadrina",
        ruta: "img/HadaMadrina.png"  
    },
    {
        nombre: "Kaa",
        ruta: "img/Kaa.png"  
    },
    {
        nombre: "Mushu",
        ruta: "img/Mushu.png"  
    },
    {
        nombre: "Pascal",
        ruta: "img/Pascal.png"  
    },
    {
        nombre: "Pepito",
        ruta: "img/Pepito.png"  
    },
    {
        nombre: "Primavera",
        ruta: "img/Primavera.png"  
    },
    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel.png"  
    }
];   
*/                                      
// con POKEMON
const arrayPersonajes = [
    {
        nombre: "abra",
        ruta: "img/POKEMON/abra.png"  
    },
    {
        nombre: "bullbasaur",
        ruta: "img/POKEMON/bullbasaur.png"  
    },
    {
        nombre: "charmander",
        ruta: "img/POKEMON/charmander.png"  
    },
    {
        nombre: "dratini",
        ruta: "img/POKEMON/dratini.png"  
    },
    {
        nombre: "eevee",
        ruta: "img/POKEMON/eevee.png"  
    },
    {
        nombre: "jigglypuff",
        ruta: "img/POKEMON/jigglypuff.png"  
    },
    {
        nombre: "mankey",
        ruta: "img/POKEMON/mankey.png"  
    },
    {
        nombre: "meowth",
        ruta: "img/POKEMON/meowth.png"  
    },
    {
        nombre: "pidgey",
        ruta: "img/POKEMON/pidgey.png"  
    },
    {
        nombre: "pikachu-2",
        ruta: "img/POKEMON/pikachu-2.png"  
    },
    {
        nombre: "psyduck",
        ruta: "img/POKEMON/psyduck.png"  
    },
    {
        nombre: "squirtle",
        ruta: "img/POKEMON/squirtle.png"  
    }
];                                         

const game = document.getElementById("game")
const rejilla = document.createElement("section");
const winner = document.getElementById("winner");

// CREAR LA REJILLA
rejilla.setAttribute("class", "rejilla");
game.appendChild(rejilla);
//

var song = document.getElementById("song");       // audio   
var clic = document.getElementById("clic");      // audio                                     
var bounce = document.getElementById("bounce"); // audio                                       
var win = document.getElementById("win");      // audio     
var fail = document.getElementById("fail");   // audio                               

var contador = 0;    
var primerSeleccionado = "";
var segundoSeleccionado = "";
var seleccionadoPrevio = null;
var eliminados = 0;

var start = document.getElementById("start");
var reloj = document.getElementById("reloj");
var gameover = document.getElementById("game-over");
var segundos = 90;  // 60 es "dificil"; 90 "fácil"  (está en tres sitios: aqui, en gameOver y en contEliminados)

//***** FUNCIÓN PARA BARAJAR LOS DIV CON CADA PERSONAJE

function baraja() {
    const personajesDoble = arrayPersonajes.concat(arrayPersonajes)
                            .sort(() => 0.5 - Math.random());

    personajesDoble.forEach(personaje => {
        const {nombre, ruta} = personaje;

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.dataset.name = nombre;

        const anverso = document.createElement("div");
        anverso.classList.add("anverso");

        const reverso = document.createElement("div");
        reverso.classList.add("reverso");
        reverso.style.backgroundImage = `url(${ruta})`;

        rejilla.appendChild(tarjeta);
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);
    });
    gameover.style.opacity = "0";  // quitamos el "Game Over"
    winner.classList.remove("open"); // quitamos el "WINNER" 
    rejilla.classList.remove("out");  // le quitamos la clase out a rejilla para que baje    
    rejilla.classList.add("start");  // le añadimos la clase start a rejilla para que baje
    start.style.display = "none";      // apaga el botón
    reloj.style.display = "initial";  // encendemos el reloj
    song.play();  // audio
    eliminados = 0;
    reloj.classList.remove("intermitente");    /* probando reloj intermitente */

}

///////////////////////////  COPIADO del #14
//***** FUNCIÓN DE INICIO DEL JUEGO Y RELOJ CUENTA ATRÁS

function startGame() {

    var s = parseInt(segundos % 60); 
    var ss = ("0" + s).slice(-2);   
    var m = parseInt(segundos/60); 
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss; 

    if (eliminados === 24) {  // 24 (en dos sitios: aqui y abajo del todo)
        return;
    }

    if (segundos > 0) {
        var t = setTimeout(function(){
            startGame();
        },1000)     
    } else {
        gameOver();
    }
    segundos--;

    if (segundos < 10) {   /* probando reloj intermitente */
        reloj.classList.add("intermitente"); 
    };
}
//////////////////////////

//***** FUNCIÓN PARA EJECUTAR LA LÓGICA DE PARTIDA PERDIDA

function gameOver() {
    // console.log("ejecuto gameOver")
    segundos = 90;  // LO MISMO QUE ARRIBA
    song.pause();
    song.currentTime = 0;
    fail.play();   // audio
    rejilla.classList.add("out");
    gameover.style.opacity = "1";
    start.style.display = "initial";
    reloj.style.display = "none";
    setTimeout(function() {  // para retrasarlo
        while(rejilla.firstChild) {
            rejilla.removeChild(rejilla.firstChild);
        }    
    }, 1000);
};

//***** EVENTO CLICK PARA SELECCIONAR CADA PERSONAJE

rejilla.addEventListener("click",function(evento){
    clic.currentTime = 0;  // audio
    clic.play();          // audio

    var seleccionado = evento.target;

    if (seleccionado.nodeName === "SECTION" || 
        seleccionado.parentNode === seleccionadoPrevio ||
        seleccionado.parentNode.classList.contains("eliminado")) {
        return;
    }
    if (contador < 2) {
        contador++;
        if (contador === 1) {
            primerSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
            seleccionadoPrevio = seleccionado.parentNode; //versión fácil
            
        } else {
            segundoSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
            
        }
        //console.log(primerSeleccionado);
        //console.log(segundoSeleccionado);
        if (primerSeleccionado !== "" && segundoSeleccionado !== "") {
            if (primerSeleccionado === segundoSeleccionado) {
                bounce.currentTime = 0;  // audio
                bounce.play();          // audio   
                setTimeout(eliminar,500);     // originalmente 1200
                setTimeout(resetSeleccionados,500);     // originalmente 1200
                contEliminados();
            } else {
                setTimeout(resetSeleccionados,500);     // originalmente 1200
                seleccionadoPrevio = null; //versión fácil
            }
        }    
        // seleccionadoPrevio = seleccionado.parentNode; //versión difícil
    }
});

//***** FUNCIÓN PARA ELIMINAR LOS ELEMENTOS COINCIDENTES

var eliminar = function() {
    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.add("eliminado");
    });
}

//***** FUNCIÓN PARA RESETEAR LOS SELECCIONADOS DESPUÉS DE 2 INTENTOS

var resetSeleccionados = function() {
    contador = 0;
    primerSeleccionado = "";
    segundoSeleccionado = "";
    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.remove("seleccionado");
    });
}

 //***** FUNCIÓN PARA CONTAR LOS ELIMINADOS, Y, CUANDO LLEGUEN A 24, 
// EJECUTAR LA LÓGICA DE PARTIDA GANADA

var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length +2;
    // console.log(eliminados);
    if (eliminados === 24) {  // 24
        // console.log("ejecuto winner")        
        winner.classList.add("open");
        win.currentTime = 0;  // audio
        win.play();          // audio    
        segundos = 90;  // LO MISMO QUE ARRIBA (aunque se podría poner menos ;))
        song.pause();
        song.currentTime = 0;
        rejilla.classList.add("out");
        start.style.display = "initial";
        reloj.style.display = "none";
        setTimeout(function() {  // para retrasarlo
            while(rejilla.firstChild) {
                rejilla.removeChild(rejilla.firstChild);
            }    
        }, 1000);    
    }
}
