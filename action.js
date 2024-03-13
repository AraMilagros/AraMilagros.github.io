// Se seleciona los elementos necesarios para manejar las funcionalidades
// -textInput: es la text area dónde se ingresa el texto a cifrar o descifrar
// -btnenc: es el boton que al hacer click, se encargara de encriptar/cifrar el texto dado
// -btndesen: es el boton que se encargara de descifrar el texto dado
const textInput = document.querySelector('#textareaInput');
const btnenc = document.querySelector("#btnEncriptar");
const btndesen = document.querySelector("#btnDesencriptar");

// obj necesario para poder cifrar los textos
// se usará más abajo, en el método encriptarTxt()
const encriptador = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
};
// obj necesario para poder descifrar los textos
// se usará mas abajo, en el método descifrarTxt()
const claves = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
};

//método para eliminar los textos que se hayan ingresado
const limpiar = () =>{
    textInput.value="";
}


// método para mostrar un mensaje, ya sea cifrado o descifrado
// 1: sectionTranslader: se selecciona el elemento dónde se mostrara el msj
// 2: sectionNone: es el elemento que muestra la imagen y mensaje "No se ha encontrado texto para cifrar..."
//      y en este caso, se selecciona para poder ocultarlo
// 3: se remueve la clase 'oculto' del elemento guardado en sectionTranslader
// 4: se aumenta la clase 'oculto' del elemento guardado en sectionNone
// 5: Ahora en parrafo se guarda el elemnto con id 'translader-p'
// 6: Y ahora en parrafo se asigna el texto que anteriormente se haya capturado de textInput
//      que en este caso fue pasado por parametro y aquí es text
// 7: Ahora con btncopy se captura el boton encargado de copiar el texto cifrado o descifrado
// 8: Con la ayuda de una funcion asincrona capturamos el texto del input para copiarlo en el portapapeles
// Al ultimo de todo se llama un método limpiar() para eliminar el texto ingresado
const mostrarMensaje = (text) => {
    const sectionTranslader = document.getElementById('container-translader');
    const sectionNone = document.getElementById('container-none');
    sectionTranslader.classList.remove('oculto');
    sectionNone.classList.add('oculto');
        
    const parrafo = document.getElementById('translader-p');
    parrafo.innerHTML = text;
    const btncopy = document.getElementById('copiar');

    btncopy.addEventListener("click", () => copiarPortapapeles(parrafo.innerHTML));
    async function copiarPortapapeles(txt) {
        try {
            await navigator.clipboard.writeText(txt);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    limpiar();
}

//Este metodo mostrara una imagen y mensaje de "No se encontro texto para cifrar..."
// Es practicamente igual que las primeras lineas del anterior método mostrarMensaje()
// 1: seleccionamos el elemento que muestre el mensaje cifrado/descifrado
// 2: seleccionamos el elemento que muestre la imagen y texto de "No se encontro..."
// 3: a translader se le aumenta la clase 'oculto'
// 4: a hiden se le remueve la clase 'oculto'
const mostrarNone = () => {
    const translader = document.getElementById('container-translader');
    const hiden = document.getElementById('container-none');
    translader.classList.add('oculto');
    hiden.classList.remove('oculto');
}

//En verificar se pasa el texto ingresado antes de tener que pasarlo a los métodos encargados de cifrar/descifrar
// 1: inicializamos una bandera en true
// El primer if se encargara de verificar si el texto ingresado tenga algun acento
//      en caso de tenerlo, se mostrar un alert avisándolo y cambiando la bandera a false
// El segundo if se encargara de verificar si se ha ingresado realmente un texto
//      en caso de no haberlo hecho, se avisara y la bandera cambiara a false
// Al final se retorna bandera
const verificar = (text) => {
    let bandera = true;

    if(text.includes("á", "é", "í", "ó", "ú")){
        alert('No se permiten acentos')
        bandera=false;
    }

    if(text == ""){
        alert("No hay un texto que cifrar/descifrar")
        bandera=false;
    }

    return bandera;
}

// Aqui los eventos se cumpliran en caso de que se haga click en el boton, en este caso
// en una variable texto se guardara lo que tenga de valor el elemento de textInput
// Luego texto se envia a verificar() que retorna un bolean
//      En caso de ser true, el texto se enviara a cifrar
//          Y luego de ser cifrado se enviara ése texto a mostrarMensaje() dónde se mostrara el mensaje al user
//      pero en caso de ser false, se mostrara la imagen y texto de "No se encuentra texto..."
btnenc.addEventListener('click', ()=>{
    let texto = textInput.value;
    if (verificar(texto)){
        texto = encriptarTxt(texto.toLowerCase());
        mostrarMensaje(texto);
    }else{
        mostrarNone();
    }

})


// Aqui es practicamente igual que el anterior
// Lo unico que varia es que aquí se envian texto para descifrar.
btndesen.addEventListener('click', () => {
    let texto = textInput.value;
    if(verificar(texto)){
        texto = descifrarTxt(texto.toLowerCase());
        mostrarMensaje(texto);
    }else{
        mostrarNone();
    }
});

// Metodo encargado de encriptar/cifrar los textos. Utilizo la funcion replace
// Lo que se hace es recibir un texto (a cifrar, en este caso)
// y replace recibira un parametro de que se buscara en la cadena(en el texto pasado)
// en este caso se busca reconocer todas las vocales en la cadena
// Ahora, el segundo parametro es una funcion que recibe a su vez un parametro (que seran las coincidencias encontradas en el texto pasado)
// dentro de la funcion hay un return donde 
// se utiliza el objeto anteriormente definido y utilizando las coincidencias encontradas para hacer el replazo en el texto pasado
const encriptarTxt = (text) =>{
    return text = text.replace(/a|e|i|o|u/g, function (conincidencias) {
        return encriptador[conincidencias];
    });
}

// Este método es practicamente igual que el anterior
// lo que se diferencia es que es para descifrar un texto pasado
// Y el objeto utilizado dentro de replace es otro
const descifrarTxt = (text) => {
    return text = text.replace(/ai|enter|imes|ober|ufat/g, function(conincidencias){
        return claves[conincidencias];
    });
}