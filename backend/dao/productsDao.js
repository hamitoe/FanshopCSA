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

}

module.exports = productsDao;