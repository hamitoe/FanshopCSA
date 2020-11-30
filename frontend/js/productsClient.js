var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';


function renderError(){

    var sortiment = document.getElementById("sortimentID");
    sortiment.style.display = "block"


}

function renderProducts(entries){
var i = entries.length

if (entries[0].KatID != entries[i-1].KatID){
document.getElementsByClassName("")[0].innerHTML = "Sortimente"

} else{

    document.getElementsByClassName("")[0].innerHTML = 
        `
        
        ${entries[0].bezeichnungArtikel}

        
`
}
document.getElementById("sortimentID")[0].innerHTML =
`
${entries.map(function(entrie) {
    return `

    <div class="col-lg-4 col-md-6 mb-4" id="sortimentID">
            <div class="card h-100">
              <a href="shop2.html">
              
              <img class="card-img-top" src=${entrie.BildPfad} alt=""></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">${entrie.Bezeichnung}</a>
                </h4>
                <h5>49,99€</h5>
                <p class="card-text">${entrie.bezeichnungArtikel}</p>
              </div>
            </div>
          </div>
    
    
    
    `
}).join("")}
            
`

}





