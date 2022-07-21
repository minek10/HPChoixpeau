const imageArray = [
    "Images/gryffondor.png", 
    "Images/poufsouffle.png",
    "Images/serdaigle.png",
    "Images/serpentard.png"
    ];

//Compteur de tableau et interval pour
var cpt = 0;
var interval = 150;
var intervalId;

var RdnChoice = "";
var RdnSeconds = 0;

//Compteur d'équipe
var CptSerpentard = 0;
var CptSerdaigle = 0;
var CptPoufssoufle = 0;
var CptGryffondor = 0;



const image = document.querySelector("img");
const button = document.querySelector("#button");
var btnChoose = document.getElementById("btnChoose")
// var popup = document.getElementById("popup")

//Image de départ
image.setAttribute("src", imageArray[0]);

// let nbkids= prompt("Nombre d'élèves par équipe ?");
    
// window.onload = () => Start();
window.onload = () => ShowPopupNbKids();
    
btnChoose.addEventListener("click", () => Start())
popup.addEventListener("click", () => ShowPopup())
    

function generatePicture(){
    //Connaitre la taille du tableau (Nombre d'équipes)
    let arrayLength = imageArray.length; 

    //Afficher L'image x du tableau
    image.setAttribute("src", imageArray[cpt]);

    //Element du tableau choisi en string
    RdnChoice = imageArray[cpt];

    //Incrémentation du compteur
    cpt++;

    //Si le compteur est >= a la taille du tableau, alors cpt est remis a 0, ce qui regénère les photos
    if(cpt >= arrayLength ){
        cpt=0;
    }
}

function Stop(){

    //Stop le defilemennt des photos
    clearInterval(intervalId);

    //Va vers les voix
    Voice();
}

function Start(){

    //Si le tableau possède au moins 1 elements
    //Génère un nombre alratoire qui servira de timeout pour arreter le timer
    //Désactiver le bouton "Choisir" lors de cette opération
    if(imageArray.length > 0 && nbkids > 0 ){
        RdnSeconds = Math.random() * (5000 - 2500) + 2500;
        intervalId = setInterval(generatePicture, interval);
        setTimeout(Stop,RdnSeconds);
        btnChoose.disabled = true;
    }else{
        Swal.fire({
            title: 'Tous les élèves ont étés assignés à une maison',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }
}

function Voice(){

    var RdnChoiceSubstring = RdnChoice.substring(7);

    switch(RdnChoiceSubstring){
        case "gryffondor.png" : var audio = new Audio('Sons/gryffondor2.mp3');
        break;
        case "poufsouffle.png" : var audio = new Audio('Sons/pouffsouffle2.mp3');
        break;
        case "serdaigle.png" : var audio = new Audio('Sons/serdaigle.mp3');
        break;
        case "serpentard.png" : var audio = new Audio('Sons/serpentard2.mp3');
        break;
    }

    audio.play();
    CptTeam();
}

function CptTeam(){

    //Incrémenter le compteur d'équipe afin qu'ils n'apparaissent plus dans le défilement d'images
    var RdnChoiceSubstring = RdnChoice.substring(7);
    switch(RdnChoiceSubstring){
        case "gryffondor.png" : 
        CptGryffondor++;
        if (CptGryffondor == nbkids){
            imageArray.splice(imageArray.indexOf('Images/gryffondor.png'), 1);
        }
        break;

        case "poufsouffle.png" : 
        CptPoufssoufle++;
        if (CptPoufssoufle == nbkids){
            imageArray.splice(imageArray.indexOf('Images/poufsouffle.png'), 1);
        }
        break;

        case "serdaigle.png" : 
        CptSerdaigle++;
        if (CptSerdaigle == nbkids){
            imageArray.splice(imageArray.indexOf('Images/serdaigle.png'), 1);
        }
        break;

        case "serpentard.png" : 
        CptSerpentard++;
        if (CptSerpentard == nbkids){
            imageArray.splice(imageArray.indexOf('Images/serpentard.png'), 1);
        }
        break;
    }

    //Réactiver le bouton quand l'operation est terminée
    btnChoose.disabled = false;

}

function ShowPopupNbKids(){
    console.log("popup");
    swal.fire({
        title: "Nombre maximum d'élèves par maison",
        input: 'number',
        confirmButtonText: 'Valider',
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
            console.log("Max par équipe " + result.value);
            nbkids = result.value;
        }
    });
}

