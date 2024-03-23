let upravitjOsobuForm = document.querySelector("#upravOsobu");
let upravJmeno =  document.querySelector("#jmeno");
let upravPrijmeni =  document.querySelector("#prijmeni");
let upravDatumNarozeni =  document.querySelector("#datum-narozeni");
let hlaska = document.querySelector(".info-hlaska");


upravitjOsobuForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    let jmeno = upravJmeno.value;
    let prijmeni = upravPrijmeni.value;
    let datumNarozeni = upravDatumNarozeni.value;
 
    if (!jmeno || !prijmeni || !datumNarozeni) {
       alert('Všechna pole musí být vyplněna!');
       return;
    }
 

    $.ajax({
     url: 'https://marketatrnkova.cz/api/narozeniny/', // URL endpointu, na který chcete odeslat požadavek
     type: 'PUT',
     data: JSON.stringify({ // Parametry co chceme odeslat prevedu na JSON
          'jmeno': jmeno,
          'prijmeni': prijmeni,
          'datum-narozeni': datumNarozeni
      }),
      contentType: 'application/json; charset=utf-8',

      success: function(response) {
         hlaska.innerHTML = `${response.message}`;
       },
       error: function(jqXHR, textStatus, errorThrown) {
           console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
       }
   });
});