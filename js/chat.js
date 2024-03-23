let zprava = document.querySelectorAll(".zprava");
let vsechnyOdpovedi = document.querySelector(".vsechny-odpovedi");
let modalZprava=document.querySelector(".modalBtnMessage");
let dialogOdeslatZpravu= document.querySelector(".odeslatZpravuDialog");
let dialogOdeslatOdpoved= document.querySelector(".odeslatOdpovedDialog");
let modalBtnZprava=document.querySelector(".modalBtnZprava");
let modalBtnOdpoved=document.querySelector(".modalBtnOdpoved");
let modalBtnWrapper=document.querySelector(".modalBtnWrapper");
let odeslatZpravuForm = document.querySelector("#odeslatZpravuForm");
let odeslatOdpovedForm = document.querySelector("#odeslatOdpoved");
let hiddenInputOdpovedi = document.querySelector("[name='mainMessage']"); 

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".zprava-active")){
        let aktivniZprava = document.querySelector(".zprava-active");
        aktivniZprava.click(); 
    }
});

// oznaceni aktivni zpravy a vygenerovani odpovidajich odpovedi pomoci AJAXU
zprava.forEach((zprava)=>{
    zprava.addEventListener("click", (event)=>{
        let predchoziOznacenaZprava = document.querySelector(".zprava-active");
        if (predchoziOznacenaZprava){
            predchoziOznacenaZprava.classList.remove("zprava-active");
        }
        event.target.classList.add("zprava-active");
        let messageId = event.target.getAttribute('messageid');
        hiddenInputOdpovedi.value = messageId;
        /* AJAXEM bych mela zavolat databazi, aby mi vratila odpovedi ke konretni zprave */
        $.ajax({
            url: 'https://marketatrnkova.cz/api/narozeniny/chat?messageId=' + messageId, // URL endpointu, na který chcete odeslat požadavek
            type: 'GET', // Metoda požadavku
            success: function(response) {
                  while(vsechnyOdpovedi.firstChild){
                   vsechnyOdpovedi.removeChild(vsechnyOdpovedi.firstChild);
              };
      
            if(Array.isArray(response)){ //pokud je response typu pole - jedna se o vysledek z DB, budu ho iterovat a vypisovat odpovedi (pole obsahuje JSON objekty)
                response.forEach(function(zprava){
                    let paragraf = document.createElement("p");
                    paragraf.innerHTML = `<strong>${zprava.name}: </strong> ${zprava.message}`;
                    vsechnyOdpovedi.appendChild(paragraf);
                });
            }else{ // response neni typu pole, tudiz obsahuje jen jednu odpoved typu JSON - tato odpoved neni z databaze, nic nebylo nalezeno.
                let paragraf = document.createElement("p");
                paragraf.innerHTML = `${response.message}`;
                vsechnyOdpovedi.appendChild(paragraf);
            } modalBtnWrapper.classList.remove("hidden");
          
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
            }
        });

    });
    
});

modalBtnZprava.addEventListener("click",(event)=>{
    dialogOdeslatZpravu.showModal();
});

modalBtnOdpoved.addEventListener("click",(event)=>{
    dialogOdeslatOdpoved.showModal();
});


dialogOdeslatZpravu.addEventListener("click", (event)=>{
    let souradniceDialogOkna = dialogOdeslatZpravu.getBoundingClientRect();
    if(
        event.clientX < souradniceDialogOkna.left ||
        event.clientX > souradniceDialogOkna.right ||
        event.clientY < souradniceDialogOkna.top ||
        event.clientY > souradniceDialogOkna.bottom
    ){
        dialogOdeslatZpravu.close();
    }
});

dialogOdeslatOdpoved.addEventListener("click", (event)=>{
    let souradniceDialogOkna = dialogOdeslatOdpoved.getBoundingClientRect();
    if(
        event.clientX < souradniceDialogOkna.left ||
        event.clientX > souradniceDialogOkna.right ||
        event.clientY < souradniceDialogOkna.top ||
        event.clientY > souradniceDialogOkna.bottom
    ){
        dialogOdeslatOdpoved.close();
    }
});
