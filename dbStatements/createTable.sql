--Tabelle Kategorien -- 

create table Kategorien(
KatID Integer Primary KEY autoincrement,
KatName Text NOT NULL
);


--Tabelle Mehrwertsteuer-- 

CREATE table MehrwertSteuer(
MwStID integer Primary Key autoincrement,
MwSt real not Null
);

--Tabelle Sortiment -- 


CREATE table Sortiment (
SortID Integer Primary key autoincrement, 
KatID integer NOT NULL,
MwStID INTEGER NOT NULL,
Bezeichnung Text NOT NULL,
Beschreibung Text NOT NULL,
Preis real NOT NULL,
BildPfad text NOT NULL,

CONSTRAINT fk_KatID FOREIGN KEY (KatID) REFERENCES Kategorien(KatID),
CONSTRAINT fk_MwSt FOREIGN KEY (MwStID) REFERENCES MehrwertSteuer(MwStID)
);


--Tabelle Zahlungsart -- 

CREATE Table Zahlungsart(
ZahlungsartID INTEGER PRIMARY KEY AUTOINCREMENT,
Bezeichnung TEXT NOT NULL
);


--Tabelle Adresse -- 

CREATE TABLE Adresse(
AdressID INTEGER PRIMARY KEY Autoincrement,
Strasse Text NOT NULL,
Hausnummer TEXT NOT NULL,
PLZ TEXT NOT NULL,
Ort TEXT NOT NULL
);


--Tabelle Bestellung -- 

CREATE Table Bestellung(
BestellID INTEGER PRIMARY KEY Autoincrement,
ZahlungsartID INTEGER NOT NULL,
PersonID INTEGER NOT NULL,

CONSTRAINT fk_ZahlungsartID FOREIGN KEY (ZahlungsartID) REFERENCES Zahlungsart(ZahlungsartID),
CONSTRAINT fk_PersonID FOREIGN KEY (PersonID) REFERENCES Person(PersonID)
);


--Tabelle Person-- 

Create Table Person(
PersonID INTEGER Primary Key Autoincrement,
Vorname Text NOT NULL,
Nachname Text NOT NULL,
AdressID INTEGER NOT NULL,
Email Text NOT NULL,
Passwort Text NOT NULL,

CONSTRAINT fk_AdressID FOREIGN KEY (AdressID) REFERENCES Adresse(AdressID)
);


--Tabelle Warenkorb-- 

Create Table Warenkorb(
PersonID INTEGER NOT NULL,
SortID INTEGER NOT NULL,
Menge INTEGER NOT NULL,
BestellID INTEGER NOT NULL, 

CONSTRAINT fk_Person_ID FOREIGN KEY (PersonID) REFERENCES Person(PersonID),
CONSTRAINT fk_Sort_ID FOREIGN KEY (SortID) REFERENCES Sortiment(SortID),
CONSTRAINT fk_Bestell_ID FOREIGN KEY (BestellID) REFERENCES Bestellung(BestellID)
);












