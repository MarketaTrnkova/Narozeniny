let pridejOsobu = document.querySelector("#pridej");
let pridejOsobuForm = document.querySelector("#pridejOsobuForm");

let pridejJmeno = document.querySelector("#jmeno");
let pridejPrijmeni = document.querySelector("#prijmeni");
let pridejDatumNarozeni = document.querySelector("#datum-narozeni");
let vysledkyHledani = document.querySelector("#vysledkyHledani");

pridejOsobuForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    let jmeno = pridejJmeno.value;
    let prijmeni = pridejPrijmeni.value;
    let datumNarozeni = pridejDatumNarozeni.value;
 
     console.log(jmeno,prijmeni, datumNarozeni);
 
    if (!jmeno || !prijmeni || !datumNarozeni) {
       alert('Všechna pole musí být vyplněna!');
       return;
    }
 
     while(vysledkyHledani.firstChild){
         vysledkyHledani.removeChild(vysledkyHledani.firstChild);
     }
 
    $.ajax({
     url: 'https://marketatrnkova.cz/api/narozeniny/', // URL endpointu, na který chcete odeslat požadavek
     type: 'POST',
     data:  JSON.stringify({ // Parametry co chceme odeslat
          'jmeno': jmeno,
          'prijmeni': prijmeni,
          'datum-narozeni': datumNarozeni
      }),
      contentType: 'application/json; charset=utf-8',
      success: function(response) {
         let paragraf = document.createElement("p");
         vysledkyHledani.appendChild(paragraf);
         paragraf.innerHTML = `${response.message}`;
       },
       error: function(jqXHR, textStatus, errorThrown) {
           console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
       }
   });
 
 });
 