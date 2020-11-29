class productsDao {

    constructor(dbConnection) { 
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    getAllProducts(){
        var sql = "SELECT *, S.Bezeichnung as BezeichnungSpeise, G.Bezeichnung as BezeichnungGericht from Gericht G, Speisenart S where G.SpeiseartID = S.SpeisenartID";
        var statement= this._conn.prepare(sql);
        var result = statement.all()
        return result
    }

    getVorspeise(){
        var sql = "SELECT *, S.Bezeichnung as BezeichnungSpeise, G.Bezeichnung as BezeichnungGericht from Gericht G, Speisenart S where G.SpeiseartID = S.SpeisenartID AND S.SpeisenartID=1";
        var statement= this._conn.prepare(sql);
        var result = statement.all()
        return result
    }

    getHauptspeise(){
        var sql = "SELECT *, S.Bezeichnung as BezeichnungSpeise, G.Bezeichnung as BezeichnungGericht from Gericht G, Speisenart S where G.SpeiseartID = S.SpeisenartID AND S.SpeisenartID=2";
        var statement= this._conn.prepare(sql);
        var result = statement.all()
        return result

    }

    getNachspeise(){
        var sql = "SELECT *, S.Bezeichnung as BezeichnungSpeise, G.Bezeichnung as BezeichnungGericht from Gericht G, Speisenart S where G.SpeiseartID = S.SpeisenartID AND S.SpeisenartID=3";
        var statement= this._conn.prepare(sql);
        var result = statement.all()
        return result

    }

    getSpeiseBySpeiseart(speiseartId){
        var sql = "SELECT *, S.Bezeichnung as BezeichnungSpeise, G.Bezeichnung as BezeichnungGericht from Gericht G, Speisenart S where G.SpeiseartID = S.SpeisenartID AND S.SpeisenartID=" + speiseartId;
        var statement= this._conn.prepare(sql);
        var result = statement.all()
        return result

    }
    
    getDetails(id){
        var sql = "SELECT *, S.Bezeichnung as BezeichnungSpeise, G.Bezeichnung as BezeichnungGericht from Gericht G, Speisenart S where G.SpeiseartID = S.SpeisenartID AND G.GerichtID=" + id;
        var statement= this._conn.prepare(sql);
        var result = statement.get()
        return result 

    }

    addToSpeisekorb(gerichtID, UserID){
        var sql = "INSERT into Speisekorb (GerichtID, PersonID, Menge) VALUES (?, ?, ?)"
        var statement= this._conn.prepare(sql);
        var params = [gerichtID, UserID, 1];
        var resultPapa = statement.run(params)
        return resultPapa  
    }

    exist(gerichtID, UserID){
        var sql = "SELECT Menge from Speisekorb where PersonID =" + UserID + " and GerichtID =" + gerichtID;
        var statement= this._conn.prepare(sql);
        var menge = statement.get();
        return menge;
    }

    updateMenge(gerichtID, UserID, menge){
        var sql = "UPDATE Speisekorb SET Menge= " + menge.Menge+ " where PersonID =" + UserID + " and GerichtID =" + gerichtID;
        var statement= this._conn.prepare(sql);
        var gerichtId = statement.run();
        return gerichtId;
    }

    getSpeisekorb(UserID){
        var sql = "SELECT GerichtID from Speisekorb where PersonID =" + UserID
        var statement= this._conn.prepare(sql);
        var gerichtIds = statement.all()
        return gerichtIds
    }

    getGericht(GerichtID){
        var sql = "SELECT g.*, s.Menge from Gericht g , speisekorb s where s.GerichtID= g.GerichtID and s.GerichtID = "  + GerichtID;
        var statement= this._conn.prepare(sql);
        var gericht = statement.get();
        return gericht;
    }

    deleteItem(gerichtID){
        var sql = "DELETE from Speisekorb where GerichtID =" + gerichtID;
        var statement= this._conn.prepare(sql);
        var gericht = statement.run()
        return gericht
    }

    
    getZeit(UserID){                                                                
        var sql = "SELECT Zeitpunkt from Termin, Bestellung where Termin.TerminID = Bestellung.TerminID and PersonID=" + UserID;
        console.log("SQL",sql)
        var statement= this._conn.prepare(sql);
        var zeit = statement.get()
        return zeit
    }

    getZahlungsartKassenzettel(UserID){                                                         
        var sql = "SELECT Zahlungsart.Bezeichnung from Zahlungsart, Bestellung where Zahlungsart.ZahlungsartId = Bestellung.ZahlungsartId and PersonId=" + UserID;
        var statement= this._conn.prepare(sql);
        var zahlungsart = statement.get()
        return zahlungsart
    }

    getKunde(UserID){
        var sql = "SELECT Vorname, Nachname From Person p, Bestellung b WHERE p.PersonID = b.PersonID AND p.PersonID=" + UserID;
        var statement= this._conn.prepare(sql);
        var kunde = statement.get() 
        console.log("Kunde", kunde)
        return kunde
    }

    getBestellart(UserID){
        var sql = "SELECT Bezeichnung from Liefereart, Bestellung where Liefereart.LieferartID = Bestellung.LieferartID and PersonId=" + UserID;
        var statement= this._conn.prepare(sql);
        var bestellart = statement.get()
        return bestellart
    }


    uhrzeitFrei(){
        var sql = "SELECT TerminID from Bestellung"
        var statement = this._conn.prepare(sql);
        var result = statement.all();                   
        console.log("result uhzeitFrei()", result);
        return result
    }

    setTime(zeit){
        var sql = "SELECT TerminID from Termin where Termin.Zeitpunkt = " + zeit;
        var statement = this._conn.prepare(sql);
        var result = statement.get(); 
    }


    getZahlungsart(){
        var sql ="SELECT * From Zahlungsart "
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    getZahlungsartUser(UserID){
        var sql = "SELECT ZahlungsartID from Bestellung where Bestellung.PersonID=" + UserID;
        var statement = this._conn.prepare(sql);
        var result = statement.get();
        return result;
    }

    addToBestellung(UserID,TerminID, LieferartID){
        var sql = "UPDATE Bestellung SET TerminID= " + TerminID + ",ZahlungsartID=1 " + ",LieferartID=" + LieferartID + " where PersonID=" + UserID;
        var statement= this._conn.prepare(sql);
        var result = statement.run();
        return result 
    }

    

}

module.exports = productsDao;