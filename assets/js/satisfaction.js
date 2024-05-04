let idImg = -1;
document.getElementById("form-satisfaction").style.display = "none";
document.getElementById("button-div-save-satisfaccion").style.display = "none";
document.getElementById("div-satisfaction").style.display = "none";


document.addEventListener("click", (e) => {
    if (e.target.matches("img.img")) {
        const $imgs = document.querySelectorAll("img.img");
        $imgs.forEach(($img) => {
            $img.classList.add("face");
        });
        e.target.classList.remove("face");
        const id = e.target.id;
        idImg = id.split("-")[1];

    document.getElementById("button-div-save-satisfaccion").style.display = "flex";

    
    }

    if (e.target.id == "face-1" || e.target.id == "face-2") {
        document.getElementById("form-satisfaction").style.display = "block";
    }
    if (e.target.id == "face-3" || e.target.id == "face-4" || e.target.id == "face-5") {
        document.getElementById("form-satisfaction").style.display = "none";
    }

    document.getElementById("value-img").value = idImg;
    document.getElementById("value-email").value = document.getElementById("email").value;


});


function saveSatisfaccion() {

    var email = $('#email').val();
    var value_satisfaction = $('#value-img').val();
    var reasons = (!document.querySelector('input[name="reasons"]:checked')) ? "" : document.querySelector('input[name="reasons"]:checked').value;
    // reasons = (!reasons) ? "" : reasons;
    var reasons_explained = $('#reasons_explained').val();
    reasons_explained = (!reasons_explained) ? "" : reasons_explained;

    console.log(reasons);

    var data = 'email=' + email + '&value_satisfaction=' + value_satisfaction + '&reasons=' + reasons + '&reasons_explained=' + reasons_explained;
    $.ajax({
        url: 'InsertarSatisfaccion.php',
        type: 'POST',
        data: data,
        success: function(response) {
            document.getElementById("div-satisfaction").style.display = "none";

            Swal.fire({
                title: 'Gracias',
                text: "Encuesta enviada con exito!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#ed1c27',
                confirmButtonText: 'Continuar navegando'
            })


        },
        error: function() {
            alert('error!');
        }

    })

}