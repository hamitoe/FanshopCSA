const functions = require('./functions');

test("Prüfe ob alle Produkte vorhanden sind", () => {

  functions.getAlleArtikel().then(data => {
    expect(data.length).toBe(24)
  })

})

test("Überprüfe auf response Datentyp", () => {
  functions.loadById().then(data => {
    expect(typeof data).not.toBe('string');
  })

})

 test("Prüfe ob aktuelle Angebote vorhanden sind", () => {
  functions.getAktuelleAngebote().then(data => {
    expect(data.length).toBe(6)
    })

  })

test("Prüfe ob Männer Produkte vorhanden sind", () => {
  functions.getMaenner().then(data => {
    expect(data.length).toBe(6)
      })
  
    })



