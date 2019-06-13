const socket = io()

let mensaje = document.getElementById('message');
let usuario = document.getElementById('username');
let btn = document.getElementById('enviar');
let salida = document.getElementById('salida');
let img = document.getElementById('imag')

btn.addEventListener('click', function() {
    socket.emit('mensaje', {
        mensaje: mensaje.value,
        usuario: usuario.value
    });
});

socket.on('mensaje', function(data) {
salida.innerHTML += `<p>
<strong>${data.usuario} dice: </strong> ${data.mensaje}
</p>`
});

let form = document.getElementById('uploadFile').onsubmit = function(e){
    e.preventDefault();
    let formData = new FormData()
    let imagefile = document.querySelector('#file')
    formData.append('file', imagefile.files[0])
    axios.post('/upload', formData).then( resp => {
        if(resp.data.file){
            let image = `<img src="/images/${resp.data.file}"  width ="80px"/>`;
            //salida.innerHTML = image;

            socket.emit('mensaje', {
                mensaje: image,
                usuario: usuario.value
            });
        }
    })
}        
