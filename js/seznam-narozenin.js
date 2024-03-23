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
           if(response.hasOwnProperty('success')){
              hledanaOsoba.innerHTML = `${response.message}.`;
              
           }else{
              hledanaOsoba.innerHTML = `<strong>${response.jmeno} ${response.prijmeni} </strong> ${response['datum-narozeni']} věk: ${response.vek}`;
           };
           let zobrazSeznamNarozeninBtn = document.createElement("button");
           zobrazSeznamNarozeninBtn.classList.add("smazat-osobu-btn");
           zobrazSeznamNarozeninBtn.textContent="Zobrazit všechny narozeniny";
           hledanaOsobaWrapper.appendChild(zobrazSeznamNarozeninBtn);
           zobrazSeznamNarozeninBtn.addEventListener("click", ()=>{
              nactiSeznam();
           })
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
        }
    });
}


let nactiSeznam = function (){
    $.ajax({
        url: 'https://marketatrnkova.cz/api/narozeniny/', // URL endpointu, na který chcete odeslat požadavek
        type: 'GET', // Metoda požadavku
           success: function(response) {
            while(seznamNarozenin.firstChild){
                seznamNarozenin.removeChild(seznamNarozenin.firstChild);
            };
           response.forEach(function(objekt){
                let osobaInfo = document.createElement("div");
                osobaInfo.classList.add('osoba-info-seznam');

                let buttonsWrapper = document.createElement("div");
                buttonsWrapper.classList.add("buttonWrapper");
                let smazOsobuBtn = document.createElement("button");
                smazOsobuBtn.classList.add('smazat-osobu-btn');
                let upravOsobuBtn = document.createElement("a");
                upravOsobuBtn.classList.add('uprav-osobu-btn');
                upravOsobuBtn.setAttribute("href", `home/upravit-narozeniny?jmeno=${objekt.jmeno}&prijmeni=${objekt.prijmeni}&datum-narozeni=${objekt['datum-narozeni']}`);

                let paragraf = document.createElement("p");
                let paragrafVek = document.createElement("p");
                seznamNarozenin.appendChild(osobaInfo);
                osobaInfo.appendChild(paragraf);
                osobaInfo.appendChild(paragrafVek);
                paragraf.innerHTML = `<strong>${objekt.jmeno} ${objekt.prijmeni} </strong> `
                paragrafVek.innerHTML =`${objekt['datum-narozeni']} věk: ${objekt.vek}`;

                smazOsobuBtn.textContent = 'Smazat osobu';
                upravOsobuBtn.textContent = 'Upravit osobu';
                smazOsobuBtn.addEventListener("click", function(){
                    smazOsobu(objekt.jmeno, objekt.prijmeni)}
                );
                osobaInfo.appendChild(buttonsWrapper);
                buttonsWrapper.appendChild(smazOsobuBtn);;
                buttonsWrapper.appendChild(upravOsobuBtn);

               

           })
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
        }
    });
}



document.addEventListener("DOMContentLoaded", () => {
    nactiSeznam();
});

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
         let zobrazSeznamNarozeninBtn = document.createElement("button");
         zobrazSeznamNarozeninBtn.textContent="Zobrazit všechny narozeniny";
         zobrazSeznamNarozeninBtn.addEventListener("click", ()=>{
            nactiSeznam();
        });
        
         seznamNarozenin.appendChild(hledanaOsobaWrapper);
         hledanaOsobaWrapper.appendChild(hledanaOsoba);
         hledanaOsobaWrapper.appendChild(zobrazSeznamNarozeninBtn);
          if(response.hasOwnProperty('success')){
             hledanaOsoba.innerHTML = `${response.message}.`;
          }else{
             hledanaOsoba.innerHTML = `<strong>${response.jmeno} ${response.prijmeni} </strong> ${response['datum-narozeni']} věk: ${response.vek}`;

          };


       },
       error: function(jqXHR, textStatus, errorThrown) {
           console.log('Error: ' + textStatus + ' ' + jqXHR.status); // Zpracování chyby
       }
   });
 
 });





