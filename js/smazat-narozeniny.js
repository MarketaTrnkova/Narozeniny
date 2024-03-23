let vypisVsechnyOsobyBtn = document.querySelector(".vypis");
let seznamNarozenin = document.querySelector("#seznam-narozenin");
let vyhledejJmeno = document.querySelector("#vyhledejJmeno");
let vyhledejPrijmeni = document.querySelector("#vyhledejPrijmeni");
let vyhledejSubmit = document.querySelector("#vyhledejSubmit");
let vyhledejOsobuForm = document.querySelector("#vyhledejOsobuForm");

let smazOsobu = function(jmeno, prijmeni){
    $.ajax({
        url: 'https://marketatrnkova.cz/api/narozeniny/?jmeno=' + jmeno + '&prijmeni=' + prijmeni, // URL endpointu, na který chcete odeslat požadavek
        type: 'DELETE',
        data:  JSON.stringify({ // Parametry co chceme odeslat
             'jmeno': jmeno,
             'prijmeni': prijmeni
         }),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            while(seznamNarozenin.firstChild){
                seznamNarozenin.removeChild(seznamNarozenin.firstChild);
            };
            
            let hledanaOsobaWrapper = document.createElement("div");
            hledanaOsobaWrapper.classList.add('hledanaOsobaWrapper');
            let hledanaOsoba = document.createElement("p");
            hledanaOsoba.classList.add('info-hlaska');
            seznamNarozenin.appendChild(hledanaOsobaWrapper);
            hledanaOsobaWrapper.appendChild(hledanaOsoba);
            hledanaOsoba.innerHTML = `${response.message}.`;
 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
        }
    });
}


vyhledejOsobuForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    let jmeno = vyhledejJmeno.value;
    let prijmeni = vyhledejPrijmeni.value;
 
    if (!jmeno || !prijmeni) {
       alert('Všechna pole musí být vyplněna!');
       return;
    };


    $.ajax({
       url: 'https://marketatrnkova.cz/api/narozeniny/?jmeno=' + jmeno + '&prijmeni=' + prijmeni, // URL endpointu, na který chcete odeslat požadavek
       type: 'GET', // Metoda požadavku
       success: function(response) {

        while(seznamNarozenin.firstChild){
            seznamNarozenin.removeChild(seznamNarozenin.firstChild);
        };

        let hledanaOsobaWrapper = document.createElement("div");
        hledanaOsobaWrapper.classList.add('hledanaOsobaWrapper');
        let hledanaOsoba = document.createElement("p");
        hledanaOsoba.classList.add('info-hlaska');
        seznamNarozenin.appendChild(hledanaOsobaWrapper);
        hledanaOsobaWrapper.appendChild(hledanaOsoba);
        if (response.hasOwnProperty('success') && response.success == false){
            hledanaOsoba.innerHTML = `${response.message}`;
        }else{
            let smazatOsobu = document.createElement("button");
            smazatOsobu.textContent = "Smazat osobu";
            smazatOsobu.classList.add('smazat-osobu-btn');
           
            hledanaOsobaWrapper.appendChild(smazatOsobu);
            
            hledanaOsoba.innerHTML = `<strong>${response.jmeno} ${response.prijmeni} </strong> ${response['datum-narozeni']} věk: ${response.vek}`;
    
    
            smazatOsobu.addEventListener("click", ()=>{
                smazOsobu(jmeno,prijmeni);
            });
        }
      
        
       },
       error: function(jqXHR, textStatus, errorThrown) {
           console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
       }
   });

});
