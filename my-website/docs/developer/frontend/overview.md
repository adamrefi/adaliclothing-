---
sidebar_position: 1
---

# Frontend áttekintés

Az Adali Clothing webáruház frontend része React.js keretrendszerre épül, modern webes technológiákat alkalmazva a felhasználói élmény optimalizálása érdekében.

## Technológiai stack

- **Keretrendszer**: React.js - Komponens alapú fejlesztés, virtuális DOM
- **Állapotkezelés**: React useState és useEffect hookokat használunk
- **Routing**: React Router - Kliens oldali útvonalkezelés
- **UI komponensek**: Material UI - Kész komponenskönyvtár
- **HTTP kliens**: Natív fetch API - API kommunikáció
- **Stílusok**: CSS és Material UI stílusok

## Projekt struktúra

A frontend projekt struktúrája egyszerű felépítésű:

```
adaliclothing/react2/
└── src/
    ├── App.js             # Fő alkalmazás komponens
    ├── index.js           # Alkalmazás belépési pont
    ├── [további .js fájlok] # Komponensek és egyéb logika
```

A projekt minden JavaScript fájlja közvetlenül az `src` mappában található, nem használunk külön alkönyvtárakat a különböző típusú fájlok szervezésére.

## Fő funkcionális területek

### Kezdőlap

<div style={{textAlign: 'center'}}>
  <img src="/img/kezd.png" alt="Kezdőlap" width="700" />
  <p><em>Ábra: Adali Clothing kezdőlap</em></p>
</div>


A kezdolap.js az AdaliClothing webshop főoldalának React-komponense, amely vonzó és interaktív felhasználói élményt nyújt. Két fő részből áll: 

<div style={{textAlign: 'center'}}>
  <img src="/img/kezdd.png" alt="Kezdőlap további nézet" width="700" />
  <p><em>Ábra: Kezdőlap funkciókártyák és értékelések</em></p>
</div>

A kezdőlap komponenst (kezdolap.js) elsősorban Csali Máté fejlesztette, aki a fő funkcionalitásért, állapotkezelésért, animációkért és API-integrációkért felelt. Réfi Ádám a komponens reszponzivitásának finomhangolását végezte, biztosítva a megfelelő megjelenést különböző képernyőméreteken.

A komponens főbb elemei:
- Navigációs fejléc bejelentkezési opciókkal
- Animált képváltó a termékek bemutatására
- Funkciókártyák a webáruház különböző részeinek eléréséhez
- Vásárlói vélemények megjelenítése
- Kuponnyerési lehetőség új felhasználóknak
- Sötét/világos mód váltás

Technikai megoldások:
- Modern React hooks (useState, useEffect) az állapotkezeléshez
- Material-UI komponensek a felhasználói felülethez
- CSS animációk a vizuális elemekhez
- localStorage és API-hívások az adatkezeléshez
- Reszponzív dizájn különböző eszközökhöz

A kezdőlap két különleges funkciója a kuponnyerési lehetőség (WheelOfFortune) és az inaktivitási figyelmeztetés (InactivityAlert), amelyek tovább növelik a felhasználói élményt és biztonságot.

### Regisztrációs oldal (signup.js)

<div style={{textAlign: 'center'}}>
  <img src="/img/regis.png" alt="Regisztrációs oldal" width="700" />
  <p><em>Ábra: Regisztrációs felület</em></p>
</div>

A regisztrációs oldal komponens (signup.js) az Adali Clothing webshop felhasználói regisztrációs felületét biztosítja. A komponens fejlesztése során a csapattagok között világos munkamegosztás érvényesült:

Réfi Ádám felelősségi köre:
- A regisztrációs űrlap alapstruktúrájának megtervezése és implementálása
- Az űrlapmezők (név, email, jelszó, jelszó megerősítés) kialakítása
- A reszponzív dizájn megvalósítása különböző képernyőméretekhez
- A navigációs fejléc és gombok elhelyezése
- A sötét/világos mód alapvető funkcionalitásának beépítése

Csali Máté felelősségi köre:
- A validációs rendszer kidolgozása és implementálása
- Az animált háttér létrehozása a mozgó logóval (Canvas animáció)
- A modális párbeszédablakok kialakítása (sikeres regisztráció, hibaüzenetek)
- A backend API-val való integrációs folyamat megvalósítása
- A jelszó láthatóság kapcsolók hozzáadása és működtetése
- A felhasználói visszajelzések és hibaüzenetek rendszerének kidolgozása

A komponens főbb funkciói:
- Felhasználóbarát regisztrációs űrlap a szükséges mezőkkel
- Valós idejű validáció és hibajelzések
- Vizuálisan vonzó, animált háttér
- Sötét/világos mód támogatás
- Biztonságos jelszókezelés láthatósági opcióval
- Sikeres regisztráció és hibajelzés modális ablakokon keresztül

Technológiai megoldások:
- React hooks (useState, useEffect, useRef) az állapotkezeléshez
- Material-UI komponensek a modern felhasználói felülethez
- Canvas API a háttéranimációhoz
- Fetch API a backend kommunikációhoz
- Részletes validációs logika (email formátum, jelszó erősség)
- localStorage a felhasználói adatok tárolásához

### Bejelentkezési oldal (sign.js)

<div style={{textAlign: 'center'}}>
  <img src="/img/bejel.png" alt="Bejelentkezési oldal" width="700" />
  <p><em>Ábra: Bejelentkezési felület</em></p>
</div>

A bejelentkezési oldal komponens (sign.js) az Adali Clothing webáruház felhasználói hitelesítési felületét biztosítja. A komponens fejlesztése során a csapattagok között hatékony munkamegosztás valósult meg:

Réfi Ádám felelősségi köre:
- A bejelentkezési űrlap alapstruktúrájának megtervezése és implementálása
- Az űrlapmezők (email, jelszó) kialakítása és elrendezése
- A reszponzív dizájn megvalósítása különböző képernyőméretekhez
- A navigációs elemek és gombok elhelyezése
- A sötét/világos mód alapvető funkcionalitásának beépítése

Csali Máté felelősségi köre:
- A validációs rendszer kidolgozása és implementálása
- Az animált háttér létrehozása a mozgó DVD logó-effektussal
- A jelszó-visszaállítási folyamat teljes implementálása
- A modális párbeszédablakok kialakítása (hibaüzenetek, sikeres műveletek)
- A backend API-val való integrációs folyamat megvalósítása
- A jelszó láthatóság kapcsoló hozzáadása és működtetése

A komponens főbb funkciói:
- Email és jelszó alapú felhasználói hitelesítés
- "Elfelejtett jelszó" funkció jelszó-visszaállítási lehetőséggel
- Valós idejű validáció és hibajelzések
- Vizuálisan vonzó, animált háttér
- Sötét/világos mód támogatás
- Biztonságos jelszókezelés láthatósági opcióval

### Terméklistázó oldal (oterm.js)

<div style={{textAlign: 'center'}}>
  <img src="/img/oterm.png" alt="Terméklistázó oldal" width="700" />
  <p><em>Ábra: Termékek listázása</em></p>
</div>

Az "oterm.js" az Adali Clothing webshop fő terméklistázó oldala, amely kártyás elrendezésben jeleníti meg a termékeket, és lehetőséget biztosít a kategóriák szerinti szűrésre.

Fejlesztői munkamegosztás:
- Csali Máté:
  - Komponens alapstruktúrájának kialakítása
  - Termékek lekérdezése és megjelenítése
  - Kategória szűrés implementálása
  - Kosár funkciók integrálása
  - Bejelentkezési állapot kezelése
  - Termékmegosztás funkció
  - Inaktivitás figyelés
  - Kijelentkezési dialógus
- Réfi Ádám:
  - Reszponzív kártyaelrendezés
  - Sötét/világos mód váltás

Fő funkciók:
- Termékek megjelenítése kártyás elrendezésben
- Kategóriák szerinti szűrés (Összes, Pólók, Nadrágok, Pulóverek, Zoknik)
- Bejelentkezési állapot kezelése és felhasználói menü
- Kosár kezelés és kosár ikon állapotjelzővel
- Termékek megosztása közösségi médiában
- Inaktivitás figyelés és figyelmeztetés

Technológia:
- React, Material UI, React Router
- RESTful API kommunikáció
- localStorage a kosár és felhasználói adatok tárolásához
- Dinamikus képbetöltés
- React Hooks (useState, useEffect, useRef)

Felhasználói élmény:
- Reszponzív elrendezés különböző képernyőméretekhez
- Animált kártyák hover effektussal
- Betöltési animáció a termékek lekérésekor
- Vizuális visszajelzések (készlet állapot, ár badge)
- Intuitív kategória szűrés
- Egységes sötét/világos mód

### Termékfeltöltési oldal (add.js)

Az add.js komponens az Adali Clothing platform felhasználói termékfeltöltési felülete, amely lehetővé teszi a felhasználók számára saját ruhadarabok feltöltését és értékesítését.

Fejlesztői munkamegosztás:
- Csali Máté:
  - Komponens alapstruktúrájának kialakítása
  - Képfeltöltési és -feldolgozási rendszer implementálása
  - AI elemzés integrálása (kategória és leírás javaslatok)
  - Feltöltési folyamat és API kommunikáció
  - Alert komponensek és visszajelzések implementálása
- Réfi Ádám:
  - Reszponzív elrendezés optimalizálása
  - TextField komponensek és hibaüzenetek finomhangolása
  - Alert komponensek stílusának kialakítása
  - Mobilbarát felület finomítása
  - Vizuális visszajelzések egységesítése

Fő funkciók:
- Termékadatok megadása és validálása (név, ár, leírás, kategória, méret)
- Többképes feltöltés drag & drop támogatással
- AI-alapú ruhafelismerés és kategória javaslat
- Automatikus leírás generálás a feltöltött képek alapján
- Kategória-specifikus méretopciók
- Részletes visszajelzések a feltöltési folyamat során

Technológia:
- React, Material UI, React Router
- Képfeldolgozás: Canvas API, tömörítés, előnézet
- AI integráció: Külső API a képelemzéshez
- Állapotkezelés: useState, useEffect, useRef
- Adatvalidáció és hibaüzenetek

### Termék részletező oldal (ProductDetail.js)

A ProductDetail az Adali Clothing webshop termék részletező oldala, amely részletes információkat jelenít meg a kiválasztott termékről, és lehetőséget biztosít a kosárba helyezésre.

Fejlesztői munkamegosztás:
- Réfi Ádám:
  - Komponens alapstruktúrájának kialakítása
  - Termék adatok lekérése és megjelenítése
  - Reszponzív design implementálása
  - Kosárba helyezés alapfunkció
  - Képgaléria alapvető működése
- Csali Máté:
  - Feltöltő adatok és értékelések integrálása
  - Képgaléria továbbfejlesztése (miniatűrök, navigáció)
  - Értékelési rendszer és dialógus implementálása
  - Animált értesítések és visszajelzések
  - Inaktivitás figyelés

Fő funkciók:
- Termék részletes adatainak megjelenítése (név, ár, leírás, méret)
- Képgaléria előre-hátra lapozással és miniatűr képekkel
- Kosárba helyezés bejelentkezett felhasználóknak
- Feltöltő adatok és értékelési rendszer megjelenítése
- Sötét/világos mód váltási lehetőség
- Oldalsó menü és profil menü elérése

Új funkciók:
- Feltöltő adatok és profilkép megjelenítése
- Feltöltő értékelési rendszer és badge
- Értékelések megtekintése dialógusablakban
- Fejlett képgaléria miniatűrökkel
- Animált értesítések és visszajelzések
- Inaktivitás figyelés és figyelmeztetés

### Felhasználói fiók oldal (fiokom.js)

A fiokom.js az Adali Clothing webáruház felhasználói profil oldalát valósítja meg, amely átfogó áttekintést nyújt a felhasználó személyes adatairól, vásárlási statisztikáiról és kuponjairól.

Fejlesztői munkamegosztás:
- Réfi Ádám:
  - Komponens alapstruktúrájának létrehozása
  - Felhasználói adatok megjelenítése
  - Reszponzív design kialakítása
  - Sötét/világos mód implementálása
  - Oldalsó menü és navigáció
- Csali Máté:
  - Profilkép feltöltési funkció fejlesztése
  - Kuponrendszer integrálása
  - Vásárlói statisztikák megjelenítése
  - Felhasználói szint és státusz rendszer
  - Vizuális visszajelzések és animációk

Fő funkciók:
- Felhasználói adatok megjelenítése (név, email)
- Profilkép feltöltése és kezelése
- Vásárlási statisztikák (rendelések száma, összérték, utolsó rendelés)
- Kupon információk (regisztrációs és email kuponok)
- Vásárlói szint rendszer (kezdő, bronz, ezüst, arany)
- Kosár kezelés és navigáció
- Sötét/világos mód váltás

### Kosár oldal (kosar.js)

<div style={{textAlign: 'center'}}>
  <img src="/img/kosar.png" alt="Kosár oldal" width="700" />
  <p><em>Ábra: Kosár tartalmának megjelenítése és kezelése</em></p>
</div>

A Kosar.js az Adali Clothing webshop kosár funkcionalitását valósítja meg, lehetővé téve a felhasználók számára a kosárban lévő termékek kezelését.

Fejlesztői munkamegosztás:
- Réfi Ádám:
  - Kosár alapstruktúra, termékek megjelenítése
  - Mennyiség módosítás, törlés funkciók
  - Összegzés és árak kalkulációja
  - Reszponzív elrendezés alapjai
  - Navigáció és adatáramlás a rendeléshez
- Csali Máté:
  - Vizuális design, animációk
  - Ingyenes szállítás logika
  - Mobil optimalizáció
  - Sötét/világos mód támogatás

Fő funkciók:
- Kosár tartalma termékenkénti bontásban
- Mennyiség növelése/csökkentése
- Termékek törlése (megerősítéssel)
- Összegzés számítása (részösszeg, szállítási költség)
- Ingyenes szállítás 20.000 Ft feletti rendelésnél

Technológia:
- React, Material UI, localStorage (kosár adatainak tárolása), React Router (navigáció)

Felhasználói élmény:
- Reszponzív design, sötét/világos mód
- Animált visszajelzések
- Üres kosár kezelése megfelelő üzenettel

Továbbfejlesztési lehetőségek:
- Kedvencek lista
- Mennyiségi kedvezmények
- Ajánlott termékek
- Kosár mentése a felhasználói fiókhoz

## Admin felület komponensei

### Admin vezérlőpult (admin.js)

Az Admin komponens az Adali Clothing webshop adminisztrációs rendszerének központi vezérlőpultja, amely átlátható hozzáférést biztosít az összes adminisztrációs funkcióhoz.

Fejlesztői munkamegosztás:
- Csali Máté:
  - Vezérlőpult alapstruktúrájának kialakítása
  - Navigációs kártyák elrendezése
  - Vizuális elemek és ikonrendszer kidolgozása
  - Animációk és interaktív effektek implementálása
  - API használat figyelő modul integrálása
- Réfi Ádám:
  - A vezérlőpult reszponzív design-jának megvalósítása

Fő funkciók:
- Kategorizált adminisztrációs funkciók vizuális kártyákkal
- Interaktív navigációs kártyák hover effektusokkal
- API használat figyelése (Google Vision API statisztikák monitorozása)
- Színkódolt ikonok és vizuális indikátorok a kvóta kihasználtságáról

Technológia:
- React, Material UI, React Router, RESTful API kommunikáció

Felhasználói élmény:
- Intuitív, vizuálisan vonzó kártyás elrendezés
- Animált interakciók a felhasználói élmény fokozásához
- Reszponzív design, hogy különböző képernyőméreteken is megfelelően működjön

### Felhasználó kezelő admin felület (fadmin.js)

A Fadmin komponens az Adali Clothing webshop adminisztrációs felülete, amely a felhasználók és kuponok kezelésére szolgál. Az adminisztrátorok itt láthatják a felhasználói adatokat, kezelhetik a kuponokat, valamint nyomon követhetik a kuponok statisztikáit és történetét.

Fejlesztői munkamegosztás:
- Réfi Ádám:
  - Felhasználói adatok megjelenítése
  - Reszponzív elrendezés kialakítása
  - Oldalsó menü integrálása
- Csali Máté:
  - Kuponkezelési rendszer implementálása
  - Kupon statisztikák és történet megjelenítése
  - Tabfüles navigáció kialakítása

Fő funkciók:
- Felhasználók kezelése (adatok megtekintése, törlés)
- Kuponok küldése kiválasztott felhasználóknak vagy mindenkinek
- Kupon statisztikák áttekintése (összes, aktív, felhasznált, lejárt kuponok)
- Kupon történet részletes nyomon követése
- Felhasználónkénti kupon információk megjelenítése

Technológia:
- React, Material UI, RESTful API kommunikáció, React Hooks

Felhasználói élmény:
- Reszponzív kártyaelrendezés
- Vizuális visszajelzések
- Megerősítő dialógusok
- Értesítések
- Tabfüles navigáció

### Értékelés kezelő admin felület (rateadmin.js)

A RateAdmin komponens az Adali Clothing webshop adminisztrációs felületén található, és lehetővé teszi az értékelések kezelését. Az adminisztrátorok megtekinthetik, szerkeszthetik és törölhetik a felhasználói értékeléseket, valamint új értékeléseket is hozzáadhatnak.

Fejlesztői munkamegosztás:
- Csali Máté:
  - Komponens struktúrájának kialakítása
  - Értékelések lekérdezése, szerkesztése és törlése
  - Felhasználó-ellenőrzés
  - Tabfülek kialakítása
- Réfi Ádám:
  - Reszponzív elrendezés és mobiloptimalizálás
  - Vizuális elemek és dialógusablakok kialakítása

Fő funkciók:
- Webshop és felhasználói értékelések kezelése különböző tabokon
- Értékelések szerkesztése és törlése
- Új értékelések hozzáadása

Technológia:
- React, Material UI, RESTful API kommunikáció

Felhasználói élmény:
- Intuitív kártyás elrendezés
- Reszponzív design
- Egyszerű szerkesztési és törlési lehetőségek

### Termék hozzáadás admin felület (tadmin.js)

A Tadmin komponens az Adali Clothing webshop adminisztrációs felületének részeként az új termékek hozzáadására szolgál. Ez a felület lehetővé teszi az adminisztrátorok számára, hogy könnyedén bevigyenek új termékeket, beleértve a termékadatokat, képfeltöltést és kategória kiválasztást.

Fejlesztői munkamegosztás:
- Réfi Ádám:
  - Űrlap logika és adatkezelés implementálása
  - Képfeltöltési és -feldolgozási funkciók fejlesztése
  - Automatikus képtömörítés és API kommunikáció
- Csali Máté:
  - Vizuális design kidolgozása
  - Sötét téma és konzisztens megjelenés
  - Képelőnézet és vizuális visszajelzések

Fő funkciók:
- Termékadatok bevitele (név, ár, leírás, kategória)
- Képfeltöltés drag-and-drop vagy fájlválasztó interfészen keresztül
- Automatikus képfeldolgozás: Átméretezés, tömörítés
- Kategória és kategória ID összekapcsolása a termékekhez
- Oldalsó menü a gyors navigációhoz

Technológia:
- React, Material UI
- Canvas API a képfeldolgozáshoz
- FormData API a fájlfeltöltéshez
- RESTful API kommunikáció

### Termék kezelő admin felület (termadmin.js)

A Termadmin komponens az Adali Clothing webshop adminisztrációs rendszerének részeként a webshop hivatalos termékeinek kezelésére szolgáló felület, amely lehetővé teszi az adminisztrátorok számára a termékek megtekintését, szerkesztését, törlését, és készletkezelését.

Fejlesztői munkamegosztás:
- Réfi Ádám:
  - Komponens alapstruktúrájának kialakítása
  - Reszponzív kártyaelrendezés megvalósítása
  - Alap CRUD műveletek implementálása
  - Oldalsó menü integrálása
- Csali Máté:
  - Készletkezelési funkciók fejlesztése
  - Tömeges készletfeltöltés implementálása
  - Snackbar értesítési rendszer kidolgozása
  - Betöltési állapotok és animációk hozzáadása

Fő funkciók:
- Termékek listázása kártyás elrendezésben
- Termékadatok megjelenítése és szerkesztése
- Termékek törlése megerősítéssel
- Készletinformációk megjelenítése és szerkesztése
- Tömeges készletfeltöltés funkció
- Vizuális visszajelzések Snackbar komponensekkel

Technológia:
- React, Material UI, RESTful API kommunikáció
- React Hooks az állapotkezeléshez
- React Router a navigációhoz

### Felhasználói termék kezelő admin felület (user.js)

A user.js az Adali Clothing webshop adminisztrációs rendszerének részeként a felhasználók által feltöltött termékek kezelésére szolgáló komponens, amely lehetővé teszi az adminisztrátorok számára a termékek megtekintését, szerkesztését és törlését.

Fejlesztői munkamegosztás:
- Csali Máté:
  - Komponens alapstruktúrájának kialakítása
  - Termékek lekérdezése és megjelenítése
  - Szerkesztési és törlési funkciók implementálása
  - Aszinkron API kommunikáció megvalósítása
  - Billentyűkombináció-figyelés és navigációs logika
- Réfi Ádám:
  - Vizuális design kidolgozása és finomhangolása
  - Reszponzív kártyaelrendezés kialakítása
  - Szerkesztési felület UI/UX tervezése
  - Animációk és átmenetek implementálása

Fő funkciók:
- Felhasználói termékek listázása kártyás elrendezésben
- Részletes termékadatok megjelenítése
- Inline szerkesztési lehetőség közvetlenül a kártyákon
- Termékek törlése megerősítéssel
- Rejtett navigáció speciális billentyűkombinációval (Ctrl+Shift+Q)
- Oldalsó menü a gyors navigációhoz

Technológia:
- React, Material UI, RESTful API kommunikáció
- React Hooks (useState, useEffect) az állapotkezeléshez
- React Router a navigációhoz

### Shipping.js - Szállítási és rendelési adatok kezelése

A shipping.js az Adali Clothing webshop szállítási és rendelési adatainak megadását kezeli, ahol a felhasználó megadja a szállítási címét, ellenőrzi a kosár tartalmát, kiválasztja a fizetési módot, és véglegesíti a rendelést.

Fejlesztői munkamegosztás:
- Réfi Ádám:
  - Szállítási űrlap alapstruktúrájának kialakítása
  - Validációs rendszer implementálása (név, telefonszám, email, cím)
  - 20.000 Ft feletti ingyenes szállítás logika
  - Reszponzív elrendezés
  - Űrlapmezők hibaüzeneteinek kezelése
- Csali Máté:
  - Kuponkezelés és kedvezmény rendszer implementálása
  - Értékelési rendszer fejlesztése (csillagos és szöveges)
  - Visszaigazoló email küldése
  - Felhasználói visszajelzések (alert komponensek)
  - Vizuális design és animációk hozzáadása

Fő funkciók:
- Szállítási adatok megadása és validálása (név, telefonszám, email, cím)
- Fizetési mód kiválasztása (utánvét vagy online bankkártyás fizetés)
- Kuponkód beváltása és kedvezmény alkalmazása
- Rendelés összegzése (részösszeg, kedvezmény, szállítási költség, végösszeg)
- Rendelés véglegesítése és adatok mentése adatbázisba
- Visszaigazoló email küldése
- Vásárlói elégedettség értékelése (csillagos és szöveges)

Technológia:
- React, Material UI, React Router, API végpontok rendelés és vevőadatok kezeléséhez, email küldéshez, statisztikák frissítéséhez.

### Termekeink.js - Termék részletező oldal

<div style={{textAlign: 'center'}}>
  <img src="/img/term.png" alt="Termék részletező oldal" width="700" />
  <p><em>Ábra: Termék részletes nézete</em></p>
</div>

A termekeink.js az Adali Clothing webshopban egyes termékek részletes adatlapját kezeli. A felhasználó itt megtekintheti a kiválasztott termék adatait, kiválaszthatja a méretet, és kosárba helyezheti azt.

Fő funkciók:
- Termékadatok megjelenítése: név, ár, leírás, anyagösszetétel, mosási útmutató, garancia, szállítási információk
- Méretválasztás: betűs méretek ruhákhoz, számozott méretek zoknikhoz
- Kosárba helyezés:
  - Bejelentkezés ellenőrzése
  - Visszaigazolás sikeres hozzáadás esetén

Felhasználói élmény:
- Reszponzív dizájn
- Sötét/világos mód
- Kosár ikon valós idejű frissítése

Technológia:
- React
- Material UI
- React Router
- API hívások: https://adaliclothing.onrender.com/api/termekek/{id} – termékadatok betöltése
- Hibakezelés és betöltési állapotok kezelése

Készítők:
- A termekeink.js komponens teljes egészében Csali Máté munkája.
- A reszponzív megjelenést és a kosár funkciót Réfi Ádám készítette.

### Vinted.js - Felhasználói termékek oldal

<div style={{textAlign: 'center'}}>
  <img src="/img/vinted.png" alt="Felhasználói termékek oldal" width="700" />
  <p><em>Ábra: Felhasználók által feltöltött termékek böngészése</em></p>
</div>

A vinted.js az Adali Clothing felhasználói által feltöltött termékeket listázza, a Vinted platformhoz hasonló módon.

Fő funkciók:
- Termékek megjelenítése: név, ár, kép, méret, leírás
- Kategória szerinti szűrés (12 kategória + „Összes" opció)
- Bejelentkezési állapot kezelése (profilmenü, kijelentkezés, kosár ikon)
- Admin felület elérése rejtett billentyűkombinációval: Ctrl+Shift+Q
- Feltöltő adatainak megjelenítése (felhasználónév, profilkép)
- Feltöltő értékeléseinek megjelenítése (UploaderRatingBadge komponens)
- Termékek megosztása (ShareProduct komponens)
- Inaktivitás figyelése (InactivityAlert komponens)
- Kupon megjelenítés (felhasználói profilban)

Technológia:
- React, Material UI, React Router
- API hívások:
  - https://adaliclothing.onrender.com/api/products – termékek lekérése
  - https://adaliclothing.onrender.com/profile-image/{username} – profilképek lekérése

Készítők:
- A vinted.js teljes funkcionalitását Csali Máté készítette.
- A reszponzív dizájnt és a kosár funkciót Réfi Ádám valósította meg.

### Vision.js - Stílustanácsadó oldal

A stílustanácsadó oldal komponens (vision.js) az Adali Clothing webáruház innovatív funkciója, amely mesterséges intelligencia segítségével személyre szabott stílustanácsokat nyújt a felhasználóknak.

Fejlesztői munkamegosztás:
- Csali Máté felelősségi köre:
  - A komponens teljes alapstruktúrájának és architektúrájának kialakítása
  - A képfeltöltési és kamera használati funkciók implementálása
  - A képelemzési folyamat és API integráció megvalósítása
  - Az eredmények megjelenítésének és értelmezésének kidolgozása
  - A modális párbeszédablakok és információs panelek kialakítása
  - A sötét/világos mód funkcionalitásának beépítése
  - A felhasználói visszajelzések rendszerének kidolgozása
  - Az inaktivitást figyelő rendszer beépítése
  - A kijelentkezési dialógus implementálása
- Réfi Ádám felelősségi köre:
  - A komponens reszponzív megjelenítésének kidolgozása különböző képernyőméretekhez
  - A felhasználói felület elemeinek méretezése és elhelyezése mobil eszközökön
  - A média lekérdezések (media queries) implementálása
  - A különböző képernyőméretekre optimalizált betűméretek beállítása

A komponens főbb funkciói:
- Kép feltöltése vagy készítése a kamera használatával
- Mesterséges intelligencia alapú stíluselemzés
- Személyre szabott színtípus, testalkat és arcforma meghatározás
- Javasolt stílus és színek ajánlása
- Részletes stílustanácsok megjelenítése
- Sötét/világos mód támogatás
- Felhasználói bejelentkezés kezelése

### ChatBot.js - Chatbot segítség oldal

A chatbot segítség oldal komponens (ChatBot.js) az Adali Clothing webáruház felhasználói támogatási felületét biztosítja, amely előre definiált válaszokkal segíti a vásárlókat.

Fejlesztői munkamegosztás:
- Csali Máté felelősségi köre:
  - A komponens alapstruktúrájának és architektúrájának kialakítása
  - A chatbot válaszadási logikájának implementálása
  - Az előre definiált válaszok rendszerének kidolgozása
  - A chat felület és üzenetbuborékok megjelenítése
  - A bejelentkezési állapot kezelése és felhasználói menü működtetése
  - Az inaktivitást figyelő rendszer beépítése
  - A kijelentkezési dialógus implementálása
  - A sötét/világos mód alapvető funkcionalitásának beépítése
  - A gyorskérdés gombok funkcionalitásának megvalósítása
- Réfi Ádám felelősségi köre:
  - A komponens reszponzív megjelenítésének kidolgozása különböző képernyőméretekhez
  - A segítség tartalmak kimásolási funkciójának implementálása
  - A toast üzenetek megjelenítése a sikeres másolás visszajelzéséhez
  - A felhasználói felület elemeinek méretezése és elhelyezése mobil eszközökön
  - A média lekérdezések (media queries) implementálása
  - A különböző képernyőméretekre optimalizált betűméretek beállítása

A komponens főbb funkciói:
- Interaktív chat felület kérdések feltevéséhez
- Előre definiált válaszok különböző témakörökben (szállítás, fizetés, méretezés, stb.)
- Gyorskérdés gombok a gyakori kérdésekhez
- Segítség panel a használható kulcsszavakkal
- Válaszok kimásolási lehetősége
- Sötét/világos mód támogatás
- Felhasználói bejelentkezés kezelése

### PaymentSimulation.js - Fizetési szimuláció oldal

A fizetési szimuláció oldal komponens (PaymentSimulation.js) az Adali Clothing webáruház online bankkártyás fizetési folyamatát szimulálja, amely biztonságos és felhasználóbarát módon teszi lehetővé a vásárlások véglegesítését.

A komponens fejlesztését teljes egészében Csali Máté végezte, felelősségi köre:
- A komponens teljes struktúrájának és architektúrájának kialakítása
- A bankkártya adatbeviteli űrlap implementálása
- A valós idejű validációs rendszer kidolgozása
- A fizetési folyamat szimulációjának megvalósítása
- A sikeres és sikertelen fizetési állapotok kezelése
- A rendelési összegzés panel kialakítása
- A modális párbeszédablakok és értesítések implementálása
- A reszponzív dizájn megvalósítása különböző képernyőméretekhez
- A sötét mód dizájn teljes kidolgozása
- A felhasználói visszajelzések rendszerének kidolgozása

A komponens főbb funkciói:
- Bankkártya adatok bevitele (kártyaszám, név, lejárati dátum, CVV)
- Valós idejű validáció és formázás (pl. kártyaszám 4 számjegyenként tagolása)
- Fizetési folyamat szimuláció betöltési animációval
- Rendelési összegzés megjelenítése (termékek, árak, szállítási adatok)
- Sikeres fizetés visszajelzés és átirányítás
- Sikertelen fizetés kezelése hibaüzenetekkel
- Biztonságos jelszókezelés (CVV mező)

Technológiai megoldások:
- React hooks (useState, useEffect) az állapotkezeléshez
- Material-UI komponensek a modern felhasználói felülethez
- Részletes validációs logika a kártyaadatok ellenőrzéséhez
- Időzített folyamatok a fizetés szimulálásához
- React Router a navigáció és átirányítás kezeléséhez
- Snackbar és Alert komponensek a felhasználói visszajelzésekhez