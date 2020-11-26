class usersDao {

    constructor(dbConnection) { 
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }


    insert(name, lastname, nickname, email, password, street, housenumber, postcode, city, zahlungsart) {
        var sql = "INSERT INTO Person (Vorname, Nachname, Nutzername, AdressID, Email, Passwort) VALUES (?, ? ,?, ?, ?, ?)";
        var statement = this._conn.prepare(sql);
        
        try {
           
            var sql2 = "INSERT INTO Adresse (Strasse, Hausnummer, PLZ,Ort) VALUES (?, ? ,?,?)";
            var statement2 = this._conn.prepare(sql2);
            var params2 = [street, housenumber, postcode,city];
            var resultAdress = statement2.run(params2)
            var params = [name, lastname, nickname, resultAdress.lastInsertRowid,email, password];
            var resultPapa = statement.run(params)
         
            var sqlSelectZahlungsartID = "SELECT ZahlungsartID from Zahlungsart where Bezeichnung =" +  "'" + zahlungsart + "'"
            var zahlIDStatement = this._conn.prepare(sqlSelectZahlungsartID)
            var ZahlungsartID = zahlIDStatement.get()
         
            var sql3 = "INSERT INTO Bestellung (PersonID, ZahlungsartID) VALUES (?, ?)";
            var statement3 = this._conn.prepare(sql3)
            console.log(ZahlungsartID)
            var params3 = [resultPapa.lastInsertRowid, ZahlungsartID.ZahlungsartID]
            var resultBestellung = statement3.run(params3) 

            return resultPapa.lastInsertRowid;
        } catch (error) {
            console.log(error)
           return 0
        }

    }





    userLogIn(email,password){
        var sql = "Select rowid from Person where Email=? and Passwort=?";
        var statement = this._conn.prepare(sql);
            var result = statement.get(email,password)
            if (result == undefined) {
                return result
            } else {
                return result.PersonID;
            }
    }

    getProducts() {
        var sql = "SELECT * from Product";
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result
    }

    getDropdown(){
        var sql = "SELECT Bezeichnung from Speisenart"
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result
    }

    getProfile(userID){
        var sql = "Select AdressID from Person where rowid=?";
        var statement = this._conn.prepare(sql);
        var adressId = statement.get(userID)
        var sql2 = "SELECT Vorname, Nachname, Nutzername,Email, Strasse, Hausnummer,PLZ, Ort, Bezeichnung as Zahlungsart FROM Person, adresse, Zahlungsart, Bestellung where Person.AdressID = Adresse.AdressID and Bestellung.ZahlungsartID = Zahlungsart.ZahlungsartID and Person.PersonID = Bestellung.PersonID and adresse.adressID= " + adressId.AdressID;
        var statement2 = this._conn.prepare(sql2);
        var result = statement2.get()
        return result;
    }
    updateProfileInformationDao(userID,name,lastname,nickname,email,street,housenumber,postcode,city,zahlungsart){
        var sql = "UPDATE Person SET Vorname= " + "'"+ name + "'" + " , Nachname = "+ "'" + lastname + "'" +  " , Nutzername = " + "'" + nickname+ "'" + " , Email= " + "'" + email + "'" + " where PersonID =" + userID;
        var statement = this._conn.prepare(sql);
        var restult = statement.run();
        console.log(restult);

        var sql1 = "SELECT p.AdressID from Adresse a, Person p where a.AdressID = p.AdressID and p.PersonID= " + userID;
        var statement1= this._conn.prepare(sql1);
        var adressID = statement1.get();

        var sql2 = "UPDATE Adresse SET Strasse = " + "'" + street + "'" + " , Hausnummer = " + "'" + housenumber + "'" + " , PLZ = "+ "'" + postcode + "'" + " , Ort= "+ "'" + city + "'" + " where AdressID= " + adressID.AdressID;
        var statement2 = this._conn.prepare(sql2);
        statement2.run();

        var sql3 = "SELECT ZahlungsartID from Zahlungsart where Zahlungsart.Bezeichnung like " + "'"+ zahlungsart + "'";
        var statement3 = this._conn.prepare(sql3);
        var zahlungsartID = statement3.get();

        var sql4 = "UPDATE Bestellung set ZahlungsartID = " + zahlungsartID.ZahlungsartID + " where PersonID = " + userID;
        var statement4 = this._conn.prepare(sql4);
        statement4.run();
    }

    updatePasswordDao(userID,password){
        var sql = "UPDATE Person set Passwort = " + "'" + password + "'" + " where PersonID= " + userID;
        var statement = this._conn.prepare(sql);
        statement.run();
    }

    userLogged(userID){
        var sql = "Select PersonID from Person where PersonID=" + userID;
        var statement = this._conn.prepare(sql);
        var value = statement.get();
        return value
    }


}
module.exports = usersDao;