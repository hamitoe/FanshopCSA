function toEuro(price) {
    
    // zu string konvertieren
    var tmp = price.toString();
    // punkt ersetzen mit komma
    tmp = tmp.replace(".", ",");
    // euro zeichen dranhängen
    tmp += ' €';
    // zurückgeben
    return tmp;
}