var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';


async function onRegister(){

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var nickname = document.getElementById("nickname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var street = document.getElementById("street").value;
    var housenumber = document.getElementById("housenumber").value;
    var postcode = document.getElementById("postcode").value;
    var city = document.getElementById("city").value;
    var zahlungsart = document.getElementById("zahlungsart")
    var zahlungsartChosen = zahlungsart.options[zahlungsart.selectedIndex].text;

    var nutzer= {
        Vorname: firstname,
        Nachname: lastname,
        Nutzername: nickname,
        Email: email,
        Passwort: password,
        Straße: street,
        Hausnummer: housenumber,
        Postleitzahl: postcode,
        Wohnort: city,
        Zahlungsart: zahlungsartChosen
    }

    
    for (var prop in nutzer){
        console.log(nutzer.prop)
        console.log(nutzer[prop])    
        if (nutzer[prop] == undefined || nutzer[prop] == null ) {
            return 0
        }
    }


        const response = await fetch("http://localhost:3000/eloc/registrieren",
        {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
          
            body: JSON.stringify({
                
                    nutzer
                
            })
        })
        if (response.status == 200  || response.status ==201) {
            var bla = await response.json()
        window.localStorage.setItem("userID", bla.rowID)
        window.localStorage.setItem("token", bla.token)
        window.location.href = "speisen.html";
        }
       
        else if (response.status==400){
            renderUserAlreadyExists()
            
        }
      

    
}

function renderUserAlreadyExists() {
    var modal = document.getElementById("modalId");
    modal.style.display = "block";
    
}

