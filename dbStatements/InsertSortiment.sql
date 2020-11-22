-- Mehrwertsteuer -- 

INSERT INTO MehrwertSteuer (MwSt)
VALUES (00.16);
INSERT INTO MehrwertSteuer (MwSt)
VALUES (00.19);


-- Kategorien --

INSERT INTO Kategorien (KatName)
VALUES ("Frauen");
INSERT INTO Kategorien (KatName)
VALUES ("Männer");
INSERT INTO Kategorien (KatName)
VALUES ("Kinder");


-- Aktuelle Angebote --

INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'T-Shirt', 'GALATASARAY ISTANBUL TRAININGSSHIRT SCHWARZ/ORANGE HERREN', 49.99,'https://www.outfitter.de/dw/image/v2/BBDZ_PRD/on/demandware.static/-/Sites-master-catalog-out/default/dw6727babb/images/210/210300/2566970.jpg?sw=550');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'T-Shirt', 'GALATASARAY ISTANBUL TRAININGSSHIRT ORANGE HERREN', 49.99,'https://www.outfitter.de/on/demandware.static/-/Sites-master-catalog-out/default/dw50ebef64/images/213/213354/2573190.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'T-Shirt', 'GALATASARAY ISTANBUL FUßBALLTRIKOT ORANGE/ROT HERREN', 39.99,'https://intersport-de.imgdn.net/fsi/server?type=image&source=marktplatz/produktiv/imgtb/3/42/1342.jpg&effects=Pad(cc,ffffff),Matte(FFFFFF)&width=600&height=600');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'Trainingsjacke', 'GALATASARAY ISTANBUL TRAININGSJACKE SCHWARZ HERREN', 64.99,'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/i1-f8d1db05-fe1c-4ace-9cf3-9c54e098e55d/galatasaray-fussball-track-jacket-fur-herren-Chd598.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (3,1,'Trikot-Set', 'GALATASARAY ISTANBUL TRAININGSTRIKOT-SET ORANGE/ROT KINDER', 49.99,'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/33ba9eb8-8195-4147-8378-b5c716e886d3/galatasaray-2020-21-home-fussballtrikot-set-fur-babys-und-kleinkinder-Zx031d.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'Hose', 'GALATASARAY ISTANBUL TRAININGSHOSE SCHWARZ HERREN', 24.99,'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/7951bc96-c4e8-4a16-9d7c-b401d653b80a/galatasaray-2020-21-stadium-home-away-fussballshorts-fur-altere-wBF0QD.jpg');

-- Frauen --

INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (1,1,'T-Shirt', 'GALATASARAY ISTANBUL POLOSHIRT WEISS DAMEN', 39.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/K201141-50-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (1,1,'T-Shirt', 'GALATASARAY ISTANBUL TSHIRT GRAU DAMEN', 39.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/K201181-922-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (1,1,'T-Shirt', 'GALATASARAY ISTANBUL POLOSHIRT SCHWARZ DAMEN', 39.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/K201141-301-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (1,1,'T-Shirt', 'GALATASARAY ISTANBUL TSHIRT ROT DAMEN', 39.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/K201111-101-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (1,1,'Kapuzenjacke', 'GALATASARAY ISTANBUL KAPUZENJACKE ROT DAMEN', 49.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/K201184-101-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (1,1,'Kapuzenjacke', 'GALATASARAY ISTANBUL KAPUZENJACKE SCHWARZ DAMEN', 59.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/K201196-301-1_small.jpg');

-- Männer --

INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'T-Shirt', 'GALATASARAY ISTANBUL TSHIRT ORANGE/ROT HERREN', 39.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/2-kasim_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'Kapuzenjacke', 'GALATASARAY ISTANBUL KAPUZENJACKE ORANGE/SCHWARZ HERREN', 69.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/5-kasim_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'T-Shirt', 'GALATASARAY ISTANBUL TSHIRT SCHWARZ HERREN', 29.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/E201117-301-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'Trikot', 'GALATASARAY ISTANBUL FUßBALLTRIKOT ORANGE/ROT HERREN', 59.99,'https://img01.ztat.net/article/spp-media-p1/f629cb6add0a3dc9baf2735f19346f76/fbfc9b04268d41e6bf7ad4e6cb40b56b.jpg?imwidth=1800&filter=packshots');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'Trikot', 'GALATASARAY ISTANBUL FUßBALLTRIKOT SCHWARZ/ROT HERREN', 59.99,'https://img01.ztat.net/article/spp-media-p1/1a4ded3d70db3db893bf0d360c66aa51/0b5564fa0cc1465bbc8948685434f565.jpg?imwidth=1800&filter=packshot');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (2,1,'Trikot', 'GALATASARAY ISTANBUL FUßBALLTRIKOT ROT HERREN', 59.99,'https://img01.ztat.net/article/spp-media-p1/c19500667059380a84e6669d0c771c94/ef43a37e71794b7dad28a7d489a373c3.jpg?imwidth=1800&filter=packshot');

-- Kinder --

INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (3,1,'Tanktop', 'GALATASARAY ISTANBUL TANKTOP WEISS KINDER', 24.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/C201053-50-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (3,1,'Tanktop', 'GALATASARAY ISTANBUL TANKTOP ROT KINDER', 24.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/C201055-101-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (3,1,'Sweatshirt', 'GALATASARAY ISTANBUL SWEATSHIRT ROT/SCHWARZ KINDER', 39.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/C201196-301-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (3,1,'Tshirt', 'GALATASARAY ISTANBUL POLOSHIRT WEISS KINDER', 29.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/C201141-50-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (3,1,'Tshirt', 'GALATASARAY ISTANBUL POLOSHIRT SCHWARZ KINDER', 29.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/C201141-301-1_small.jpg');
INSERT INTO Sortiment (KatID, MwStID, Bezeichnung, Beschreibung, preis, BildPfad)
VALUES (3,1,'Tshirt', 'GALATASARAY ISTANBUL TSHIRT ROT KINDER', 24.99,'https://cdn.gsstore.org/UPLOAD/PRODUCT/thumb/C201063-101-1_small.jpg');

-- Zahlungsart --

INSERT INTO Zahlungsart (Bezeichnung)
VALUES ("PayPal");
INSERT INTO Zahlungsart (Bezeichnung)
VALUES ("Visa");
INSERT INTO Zahlungsart (Bezeichnung)
VALUES ("Sofort Überweisung");





