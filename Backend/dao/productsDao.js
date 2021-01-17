class productsDao {

    constructor(dbConnection) { 
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

 

    getFrauen(){
        var sql = "SELECT * FROM SORTIMENT WHERE KatID = 1";
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result

    }
    getMaenner(){
        var sql = "SELECT * FROM SORTIMENT WHERE KatID = 2";
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result

    }

    getKinder(){
        var sql = "SELECT * FROM SORTIMENT WHERE KatID = 3";
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result

    }

    getAktuelleAngebote(){
        var sql = "SELECT * FROM SORTIMENT WHERE KatID = 4";
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result

    }
    getAlleArtikel(){
        var sql = "SELECT * FROM SORTIMENT";
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result

    }

   
    loadById(id) {
        var sql = "SELECT * FROM Sortiment WHERE SortID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
      
    }

    create(SortID = "", Beschreibung = "", Preis="", BildPfad="") {
        var sql = "INSERT INTO Warenkorb (SortID,Beschreibung,Preis,BildPfad) VALUES (?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [SortID, Beschreibung, Preis, BildPfad];
        var result = statement.run(params);
        return result;
    }

}

module.exports = productsDao;