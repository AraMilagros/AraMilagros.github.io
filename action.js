const textInput = document.querySelector('#textareaInput');
const btnenc = document.querySelector("#btnEncriptar");
const btndesen = document.querySelector("#btnDesencriptar");

const encriptador = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
};
const claves = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
};

const limpiar = () =>{
    textInput.value="";
}

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


const mostrarNone = () => {
    const translader = document.getElementById('container-translader');
    const hiden = document.getElementById('container-none');
    translader.classList.add('oculto');
    hiden.classList.remove('oculto');
}

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

btnenc.addEventListener('click', ()=>{
    let texto = textInput.value;
    if (verificar(texto)){
        texto = encriptarTxt(texto);
        mostrarMensaje(texto);
    }else{
        mostrarNone();
    }

})

btndesen.addEventListener('click', () => {
    let texto = textInput.value;
    if(verificar(texto)){
        texto = descifrar(texto);
        mostrarMensaje(texto);
    }else{
        mostrarNone();
    }
});

const encriptarTxt = (text) =>{
    return text = text.replace(/a|e|i|o|u/g, function (conincidencias) {
        return encriptador[conincidencias];
    });
}

const descifrar = (text) => {
    return text = text.replace(/ai|enter|imes|ober|ufat/g, function(conincidencias){
        return claves[conincidencias];
    });
}