const firebaseConfig = {
        apiKey: "AIzaSyB7sHqYBWUmvTKJF1PJHcfkF7AamVdSODw",
        authDomain: "registroweb-3f8b6.firebaseapp.com",
        projectId: "registroweb-3f8b6",
        storageBucket: "registroweb-3f8b6.appspot.com",
        messagingSenderId: "1089375285264",
        appId: "1:1089375285264:web:d374121f779f36ee115a95",
        measurementId: "G-59RZP2JSC2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//LLamando elementos de html
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById("contenidoDeLaWeb");
let formulario = document.getElementById('formulario');
let btnCerrarSesion= document.getElementById('btnCerrarSesion');
let btngoogle = document.getElementById('btngoogle');
let btnfacebook= document.getElementById('btnfacebook');


//Funcion Registrar
btnRegistrar.addEventListener('click',()=>{
    let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("Inicio de sesión correcto");
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    var user = userCredential.user;
    cargarJSON();
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
})


//funcion iniciar sesion
btnIngresar.addEventListener('click',() => {
  let email=document.getElementById('txtEmail').value;
  let password=document.getElementById('txtPassword').value;
  console.log("tu Email es"+ Email + " y tu Password es " + Password);

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("inicio sesion correctamente");
    cargarJSON();
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
})

//funcion cerrar sesion
btnCerrarSesion.addEventListener('click',()=> {
  firebase.auth().signOut().then(() => {
  console.log("cierre de sesion correcto");
  contenidoDeLaWeb.classList.replace('mostrar','ocultar');
  formulario.classList.replace('ocultar','mostrar')
  }).catch((error) => {
  console.log("error con el cierre de sesion");
  });
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    cargarJSON();
    console.log("inicio sesion correcto");
  } else {
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
    console.log("inicio de sesion error");
  }
});

//funcion login con google
btngoogle.addEventListener('click',()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    console.log("inicio sesion correctamente");
    cargarJSON();
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
console.log("error de login con google");
  });

})

//funcion login con facebook
btnfacebook.addEventListener('click',()=>{

var provider = new firebase.auth.FacebookAuthProvider();
firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /* @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    cargarJSON();
    console.log("inicio sesion con fb");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
})


//funcion llamando al JSON
function cargarJSON(){
    fetch('televisores.json')
    .then(function(res){
    //console.log(res);
    return res.json();
})
.then((data) =>{
    console.log(data);
    let html='';
    data.forEach((televisores)=>{
        html += `
        ${televisores.marca}

        `;
    });
    document.getElementById('resultado').innerHTML= html;
   })
}