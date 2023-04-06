var cameraOpen = false;

function openCamera() {
    if (cameraOpen) {
        return; // Si la cámara ya está abierta, no hacer nada
    }
    cameraOpen = true; // Marcar la cámara como abierta
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            var video = document.createElement('video');
            video.setAttribute('autoplay', '');
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('id', 'videoQR');
            video.srcObject = stream;
            document.getElementById("camera-container").appendChild(video);
        })
        .catch(function (err) {
            console.log(err);
        });
}