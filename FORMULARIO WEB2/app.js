document.getElementById('jsonbtn').addEventListener('click',cargarJSON);

function cargarJSON(){
    fetch('datatrabajadores.json')
    .then(function(res){
    //console.log(res);
    return res.json();
})
.then((data) =>{
    console.log(data);
    let html='';
    data.foreach((trabajador) =>{
        html += `
        ${trabajador.nombre}

        `;
    });
    document.getElementById('resultado').innerHTML= html;
   })
}