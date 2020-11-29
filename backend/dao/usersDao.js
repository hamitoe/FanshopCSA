

class usersDao{
    
    constructor(dbConnection){
    this.__conn = dbConnection;

}
loadById(id) {
    var sql = "SELECT * FROM Person WHERE PersonID=?";
    var statement = this.__conn.prepare(sql);
    var result = statement.get(id);

    if (helper.isUndefined(result)) 
        throw new Error("No Record found by id=" + id);

    return helper.objectKeysToLower(result);
}
getConnection(){
    return this.__conn;
}


getSortiment(){
    var sql = "select * from Sortiment;"
    var statement = this.__conn.prepare(sql)
    var result = statement.all()
    return result
}



create(Vorname,Nachname ,AdressID,Email, Passwort) {
    var sql = "INSERT INTO Person (Vorname, Nachname, AdressID, Email, Passwort) VALUES (?,?,?,?,?)"
    var statement = this.__conn.prepare(sql);
    var params = [Vorname, Nachname, AdressID, Email, Passwort];
    var result = statement.run(params);

    if (result.changes != 1) 
        throw new Error("Could not insert new Record. Data: " + params);

    var newObj = this.loadById(result.lastInsertRowid);
    return newObj;
}

}


 module.exports = usersDao;