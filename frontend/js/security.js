// checken ob token existiert / user angemeldet ist

// auf localstorage zugreifen
var token = localStorage.getItem("token");

// falls token null = nicht angemeldet
if (token == null) {
    console.log("user ist nicht angemeldet");
    //location.href = "login.html";
}
// falls token abgelaufen = wieder zum login
// else if (token abgelaufen) {
//    console.log("user token ist abgelaufen");
//    location.href = "login.html";
//}  

// wenn ansonsten alles passt
// müssen nichts machen
else 
    console.log("user ist noch angemeldet");