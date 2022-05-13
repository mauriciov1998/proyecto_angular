$(document).ready(function () {
  document.querySelector('#pdfFile').addEventListener('change', () => {
    let pdfFile = document.querySelector('#pdfFile').files[0];
    let pdfFileURL = URL.createObjectURL(pdfFile);
    document.querySelector('#vistaPrevia').setAttribute('src', pdfFileURL);
    document.getElementById('bird-image').setAttribute('src', pdfFileURL);
  })
});

$(document).ready(function () {
//   document.getElementById('captura').addEventListener('click', () => {
//   Webcam.set({
//     width: 450,
//     height: 250,
//     image_format: 'png',
//     png_quality: 90,
//     force_flash: false
//   })
//   Webcam.attach("#camera")
// })
})
function take_snapshot(){
    // Webcam.snap(function(data_uri){
    //   document.getElementById('bird-image_1').setAttribute('src', data_uri);
    // })
  }
