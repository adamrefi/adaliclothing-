---
sidebar_position: 1
slug: /
---

# Adali Clothing Projektleírás: ruhavásárló weboldal

## Bevezetés

A projekt célja egy sajátmárkás online ruhavásárló platform létrehozása, amely lehetőséget biztosít a felhasználók számára, hogy könnyedén vásároljanak divatos ruhákat. Az online vásárlás népszerűsége folyamatosan növekvő trendet mutat, így a weboldalunk olyan lehetőséget kínál a vásárlóknak, ami nemcsak kényelmes, hanem modern is. A weboldal egy beléptető rendszert is tartalmaz, amely lehetővé teszi a felhasználói fiókok kezelését, a vásárlások nyomon követését, valamint személyre szabott ajánlatok nyújtását. A projektet Réfi Ádám és Csali Máté közösen valósítják meg, akik a divat és az online kereskedelem világában szeretnék kiteljesíteni elképzeléseiket.

Az Adali Clothing nem csupán egy webshop, hanem egy közösségi platform is, ahol a felhasználók saját ruháikat is feltölthetik eladásra, értékelhetik egymás termékeit és megoszthatják tapasztalataikat. A modern, reszponzív felületnek köszönhetően az oldal minden eszközön optimálisan használható, legyen szó asztali számítógépről, tabletről vagy mobiltelefonról. A beépített chatbot funkció azonnali segítséget nyújt a vásárlóknak, míg a fejlett keresési és szűrési lehetőségek megkönnyítik a kívánt termékek megtalálását.

## Témaválasztás

Az online ruhavásárlás rohamosan növekvő népszerűsége adta az inspirációt a weboldal létrehozásához. Az emberek egyre inkább az otthonról történő vásárlást választják, mivel így kényelmesebben, gyorsabban juthatnak hozzá kedvenc termékeikhez. A weboldalon elérhető beléptető rendszer és a személyre szabott ajánlatok növelik a vásárlók elégedettségét, hiszen könnyebben navigálhatnak a termékek között, és könnyebben követhetik nyomon a vásárlásaikat. Célunk, hogy a felhasználók számára ne csupán egy vásárlási lehetőség legyen, hanem egy élmény, amely során a személyre szabott ajánlások révén megtalálják az igényeiknek leginkább megfelelő termékeket.

A projekt egyedisége abban rejlik, hogy ötvözi a hagyományos webshop és a közösségi piactér előnyeit. Míg a legtöbb online ruhabolt csak saját termékeit kínálja, az Adali Clothing lehetőséget biztosít a felhasználóknak, hogy saját ruháikat is értékesítsék, így egy fenntarthatóbb, körforgásos divat modellt támogatva. A mesterséges intelligencia alapú képelemzés segít a felhasználóknak a feltöltött ruhák kategorizálásában és leírásában, míg a beépített értékelési rendszer növeli a bizalmat a vásárlók és eladók között.

A modern technológiai megoldások - mint a React frontend, Node.js backend, MySQL adatbázis és a reszponzív Material UI komponensek - biztosítják a gyors, biztonságos és felhasználóbarát működést. A sötét/világos mód váltási lehetőség, a többnyelvű felület és az akadálymentesítési funkciók szélesebb felhasználói kör számára teszik elérhetővé a platformot.

A projekt fejlesztése során kiemelt figyelmet fordítottunk a felhasználói élményre, a biztonságra és a skálázhatóságra. A JWT alapú hitelesítés, a biztonságos fizetési megoldások és az SMTP email értesítések növelik a platform megbízhatóságát, míg a moduláris kódszerkezet lehetővé teszi a rendszer könnyű bővíthetőségét és karbantarthatóságát a jövőben.

## Munkafolyamat

A projekt során a feladatokat világosan felosztottuk, hogy mindkét fél erősségeit maximálisan kihasználhassuk:

### Tervezés

A projekt elején közösen határoztuk meg a fő funkciókat, figyelembe véve a vásárlói élmény maximalizálását. A tervezés során kiemelt szerepet kapott a termékek keresése, a kosárba helyezés és a vásárlási folyamat zökkenőmentes lebonyolítása. A felhasználói felület intuitív és könnyen navigálható lesz, így a vásárlók gyorsan megtalálhatják, amit keresnek.

Az adatbázis tervezése különösen fontos lépés volt, ahol gondosan megterveztük a táblák közötti kapcsolatokat. Létrehoztuk a felhasználói adatokat kezelő user táblát, a termékeket tároló termekek táblát, valamint a rendeléseket kezelő rendeles és vevo táblákat. A táblák közötti kapcsolatokat kapcsolótáblákkal (r_kapcsolo, t_kapcsolo) oldottuk meg, biztosítva az adatok integritását és a rugalmas lekérdezési lehetőségeket.

A tervezési fázisban különös figyelmet fordítottunk a kuponrendszer kialakítására, amely lehetővé teszi a felhasználók számára különböző kedvezmények igénybevételét. Ezt a user táblában implementáltuk, ahol külön mezőket hoztunk létre a kuponok tárolására és állapotuk követésére.

Az értékelési rendszer tervezésekor két különböző megközelítést alkalmaztunk: a ratings táblában a webshop általános értékeléseit, míg a user_ratings táblában a felhasználók egymásról adott értékeléseit tároljuk. Ez a kettős megközelítés lehetővé teszi mind a termékek, mind a felhasználók megbízhatóságának értékelését.

A tervezési fázis végén részletes adatbázis-sémát és API-terveket készítettünk, amelyek alapján megkezdtük a fejlesztési munkát. A jól átgondolt tervezésnek köszönhetően a fejlesztés során minimális változtatásokra volt szükség az eredeti koncepcióhoz képest.

## Felhasznált programok

- **Discord**: Egy kommunikációra használt program amely azonnali üzenetváltásra alkalmas, így megkönnyítette számunkra a projektben való haladást, mivel hangot, képet, videot, szöveget, linket illetve számunkra ellengethetetlen volt a képernyő megosztás, és ezzel a programmal meg tudtuk ezt valósítani, ezáltal együtt tudtunk haladni a projekt feladat megvalósításában, és tudtunk egymás munkájában segítséget nyújtani. Ugyan erre a funkciokra használtuk a google drive-ot is.

- **GitHub**: A GitHub egy verziókövető és kódmegosztó platform, amely lehetővé tette számunkra, hogy hatékonyan végezzük el a munkánkat a projekt fejlesztésében. A programnak köszönhetően a projekt módosításai nyomon követhetők, így könnyen visszaállíthatók korábbi munkafolyamatra, és elkerülhetők voltak az adatvesztések. A projekt különböző részein azonos időben dolgozhattunk különböző eszközökön, így bármilyen számítógépen tudtuk folytatni zökkenőmentesen a munkánkat.

- **Visual Studio Code**: A Visual Studio Code egy ingyenes forráskódszerkesztő, amit tanulmányaink során folyamatosan hatékonyan használtunk: gyors, könnyű és átlátható munkavégzést biztosított. Hasznos volt a projektünk során, mivel támogatja a különböző programozási nyelveket és keretrendszerben tudtunk dolgozni. A beépített kiegészítők, például az automatikus kódformázás és hibajelzés, hatékonyabbá tették a fejlesztést, és tesztelést, mivel a problémákat jelezte (más színnel jelölte ki) így gyorsabban rá tudtunk jönni a elírásainkra.

- **Microsoft Office**: Word-el létrehoztuk a projekt dokumentációját és az ütemezések, idők betartásában segített. A PowerPoint programmal látványos prezentációt készítettünk, különböző funkciókkal színesítettük a bemutatónkat.

- **Material UI**: Modern, felhasználóbarát felületek készítését tette lehetővé a projekt során. Az előre elkészített dizájnok és stíluselemek használatával időt takarítottunk meg, és egy esztétikus, professzionális megjelenést értünk el a frontend során.

- **XAMPP**: Egy ingyenes és nyílt forráskódú szoftvercsomag, amely Apache webszervert, MySQL/MariaDB adatbázist, valamint PHP és Perl programozási nyelveket tartalmaz. Fejlesztők számára készült, hogy könnyen futtathassanak helyi szervereket webalkalmazások tesztelésére.

- **phpMyAdmin**: Egy webalapú adatbázis-kezelő eszköz, amely lehetővé teszi a MySQL és MariaDB adatbázisok egyszerű kezelését. Segítségével adatbázisokat, táblákat, rekordokat hozhatunk létre, módosíthatunk és törölhetünk böngészőn keresztül.

- **ChatGPT**: Egy mesterséges intelligencián alapuló chatbot, amely képes természetes nyelvű párbeszédre, információkeresésre, szöveggenerálásra és különböző feladatok elvégzésére. Az OpenAI fejlesztette és folyamatosan frissíti.

- **Spotify**: Egy népszerű online zenei streaming szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy milliónyi dalt hallgassanak, lejátszási listákat készítsenek, valamint podcastokat fedezzenek fel és hallgassanak. Ingyenes és prémium előfizetéses verziója is elérhető.

- **Docker**: Egy konténerizációs platform, amely lehetővé teszi az alkalmazások és függőségeik egy egységesített konténerben való futtatását. Segítségével könnyen hordozható, skálázható és biztonságos fejlesztői környezetek hozhatók létre.

- **Gmail**: A Google által fejlesztett és üzemeltetett ingyenes e-mail szolgáltatás. Kiemelkedik a nagy tárhelyével, hatékony spamszűrőjével és a Google szolgáltatásokkal való szoros integrációjával.

- **Messenger**: A Meta (Facebook) üzenetküldő alkalmazása, amely lehetővé teszi a felhasználók számára a szöveges üzenetek küldését, videóhívásokat, hangüzeneteket és egyéb interaktív funkciók használatát.

- **Moodle**: Egy nyílt forráskódú tanulásmenedzsment rendszer (LMS), amelyet oktatási intézmények és vállalatok használnak online kurzusok kezelésére. Lehetővé teszi tananyagok megosztását, tesztek készítését és diákok nyomon követését.

## Adatbázis modell

A projekt egyik alapvető eleme az adatbázis, ahol a felhasználói adatokat, termékeket és vásárlási előzményeket tároljuk. A MySQL használata biztosítja, hogy az adatok gyorsan és biztonságosan legyenek lekérdezhetők, miközben az adatbázis felépítése optimalizált a legjobb teljesítmény érdekében.

Az Adali Clothing webshop adatbázisát több táblából építettük fel, amelyek együttesen biztosítják a webáruházunk teljes funkcionalitását. Az alábbiakban részletesen bemutatjuk az egyes táblák szerepét és felépítését.

### Felhasználói adatok kezelése

A user táblában tároljuk a regisztrált felhasználóink adatait. Minden felhasználóhoz egyedi azonosítót (f_azonosito) rendelünk, amely elsődleges kulcsként szolgál. A felhasználónév (felhasznalonev) szintén egyedi, így biztosítva, hogy ne lehessen két azonos nevű felhasználó. A jelszavakat természetesen titkosítva tároljuk (jelszo), a biztonság érdekében bcrypt algoritmussal hashelve. A felhasználók profilképét base64 formátumban tároljuk a profile_image mezőben, így közvetlenül megjeleníthető a weboldalon.

A kuponrendszer kezelésére több mezőt is létrehoztunk: a kupon és email_kupon mezők tárolják a kedvezmény mértékét, míg a kupon_hasznalva és email_kupon_hasznalva jelzik, hogy a felhasználó már beváltotta-e az adott kupont. A kuponok lejárati idejét a kupon_lejar és email_kupon_lejar mezőkben tároljuk.

### Termékek kezelése

A termekek táblában tartjuk nyilván a webshopban elérhető összes terméket. Minden termékhez egyedi azonosítót (id) rendelünk, valamint tároljuk a termék nevét (nev), leírását (termekleiras), árát (ar) és a készleten lévő mennyiséget (keszlet). A termékeket kategóriákba soroljuk, amelyeket a kategoriaId mező segítségével kapcsolunk össze a kategoriak táblával. A termékekhez tartozó képek elérési útját az imageUrl mezőben tároljuk.

A kategoriak tábla egyszerű felépítésű: egy azonosítóból (cs_azonosito) és a kategória nevéből (cs_nev) áll. Ez lehetővé teszi a termékek rendszerezését és a könnyebb kereshetőséget a webshopunkban.

Az usertermekek táblában a felhasználóink által feltöltött termékeket tároljuk, hasonló struktúrával, mint a termekek tábla, de kiegészítve a feltöltő felhasználó azonosítójával (feltolto).

### Rendelések kezelése

A rendelési folyamatot több tábla együttesen kezeli. A rendeles táblában tároljuk a rendelések alapadatait: egyedi azonosítót (id), a rendelt termék azonosítóját (termek), a rendelés státuszát (statusz), a rendelt mennyiséget (mennyiseg), a vevő azonosítóját (vevo_id), a rendelés dátumát (date) és a rendelés összegét (ar).

A vevo táblában a rendelésekhez kapcsolódó vásárlói adatokat tároljuk: név (nev), telefonszám (telefonszam), email (email), irányítószám (irsz), település (telepules), közterület (kozterulet) és fizetési mód (fizetesi_mod).

A r_kapcsolo kapcsolótáblával a rendelések és termékek közötti sok-sok kapcsolatot kezeljük, lehetővé téve, hogy egy rendelésben több termék is szerepeljen. Ez a tábla három fő mezőből áll: saját azonosító (id), rendelés azonosító (rendeles_id) és termék azonosító (termek_id). Ezzel a megoldással egy rendeléshez tetszőleges számú terméket tudunk hozzárendelni, és egy termék több rendelésben is szerepelhet.

### Értékelések kezelése

A felhasználói visszajelzések kezelésére két táblát hoztunk létre. A ratings táblában a webshopunk általános értékeléseit tároljuk, míg a user_ratings táblában a felhasználók egymásról adott értékeléseit. Mindkét táblában tároljuk az értékelés pontszámát (rating), dátumát (date) és a szöveges véleményt (velemeny).

### API használat követése

Az api_usage táblával követjük a külső API-k használatát. Ebben tároljuk az API nevét (api_name), a használat számát (usage_count), a limiteket (limit_count) és a legutóbbi frissítés időpontját (last_updated). Ez segít a költségek kontrollálásában és a limitek betartásában.

## Relációs adatmodell

Ez az adatbázismodell a "webshoppp" nevű adatbázisunk kapcsolatait mutatja be, amely a Ruhavásárló weboldalhoz készült webshop adatbázisában a táblák között jól definiált kapcsolatok vannak, amelyek biztosítják az adatok integritását és a megfelelő működést. Íme a részletes leírás az adatbázis kapcsolatairól:

### Fő kapcsolatok

#### Felhasználók és Értékelések kapcsolata

A felhasználói értékelések rendszerét két fő kapcsolattal valósítottuk meg:

A ratings tábla f_azonosito mezője a user tábla f_azonosito mezőjére hivatkozik. Ez a kapcsolat biztosítja, hogy minden értékelés egy létező felhasználóhoz tartozzon, és ha egy felhasználót törlünk, az összes hozzá tartozó értékelés is törlődik (CASCADE).

A user_ratings táblában két kapcsolatot is létrehoztunk a user táblával:

- A rater_user_id mező a véleményt adó felhasználót azonosítja
- A rated_user_id mező azt a felhasználót azonosítja, akiről a vélemény szól

Mindkét mező a user tábla f_azonosito mezőjére hivatkozik, és CASCADE törlési szabályt alkalmaztunk, hogy a felhasználók törlésekor a kapcsolódó értékelések is törlődjenek.

#### Termékek és Kategóriák kapcsolata

A termékek kategorizálását a következő kapcsolatokkal oldottuk meg:

A termekek tábla kategoriaId mezője a kategoriak tábla cs_azonosito mezőjére hivatkozik, így minden termék pontosan egy kategóriába tartozik.

A t_kapcsolo kapcsolótábla összetett kapcsolatokat tesz lehetővé:

- A kategoria_id mező a kategoriak táblára hivatkozik
- A termek_id mező a termekek táblára hivatkozik
- Az utermek_id mező az usertermekek táblára hivatkozik

Ezekkel a kapcsolatokkal rugalmasan tudjuk kezelni a termékek és kategóriák közötti sok-sok kapcsolatot, valamint a felhasználók által feltöltött termékeket is be tudjuk sorolni a megfelelő kategóriákba.

#### Rendelések kapcsolatrendszere

A rendelési folyamat több tábla együttműködésével valósul meg:

A rendeles tábla vevo_id mezője a vevo tábla id mezőjére hivatkozik, így minden rendelés egy konkrét vásárlóhoz kapcsolódik.

Az r_kapcsolo kapcsolótábla a rendelések és termékek közötti sok-sok kapcsolatot kezeli:

- A rendeles_id mező a rendeles tábla id mezőjére hivatkozik
- A termek_id mező a termekek tábla id mezőjére hivatkozik

Mindkét kapcsolatnál CASCADE törlési szabályt alkalmaztunk, így ha egy rendelést vagy terméket törlünk, a kapcsolótáblából is törlődnek a megfelelő bejegyzések.

#### Felhasználók és Feltöltött termékek kapcsolata

Az usertermekek tábla feltolto mezője a user tábla felhasznalonev mezőjére hivatkozik. Ez a kapcsolat teszi lehetővé, hogy nyomon kövessük, melyik felhasználó mely termékeket töltötte fel. Ha egy felhasználót törlünk, a feltöltött termékeinél a feltöltő mező NULL értékre változik (SET NULL), így a termékek megmaradnak, de már nem kapcsolódnak felhasználóhoz.

### Egyéb fontos kapcsolatok

- A kuponrendszer közvetlenül a user táblába integrálódik, ahol a kupon_hasznalva és email_kupon_hasznalva mezők jelzik a kuponok állapotát.
- A jelszó-visszaállítási folyamat szintén a user táblában kezelt, a reset_token és reset_expires mezőkkel.
- A profilképek közvetlenül a user táblában tárolódnak a profile_image mezőben, így nincs szükség külön táblára a képek kezeléséhez.

Ezek a kapcsolatok együttesen biztosítják, hogy az adatbázisunk konzisztens maradjon, miközben hatékonyan támogatja a webshop összes funkcióját. A megfelelően kialakított idegen kulcsok és a CASCADE szabályok segítenek az adatintegritás megőrzésében, még a komplex műveletek során is.

## Reflexió az Adali Clothing webáruház projektről

Az Adali Clothing webáruház projekt egy átfogó e-kereskedelmi megoldás, amely modern technológiák felhasználásával biztosít teljes értékű online vásárlási élményt. A projekt elemzése során számos erősséget és néhány fejlesztési lehetőséget azonosítottam.

### Technológiai megvalósítás

A projekt technológiai szempontból jól strukturált, modern megközelítést alkalmaz:

- **Backend**: Node.js és Express.js alapú API szerver, amely MVC architektúrát követ, MySQL adatbázissal
- **Frontend**: React.js alapú felhasználói felület, Material UI komponenskönyvtárral
- **Tesztelés**: Átfogó tesztelési stratégia mind a backend (Jest), mind a frontend (Mocha, Selenium) oldalon
- **Integráció**: Külső szolgáltatások integrációja (Google Cloud Vision API, SendGrid)

A kódbázis jól szervezett, moduláris felépítésű, ami megkönnyíti a karbantartást és a továbbfejlesztést. A frontend komponensek logikus struktúrát követnek, a backend pedig tiszta API végpontokat biztosít.

### Funkcionális gazdagság

A webáruház funkcionalitása kiemelkedő:

- Teljes értékű felhasználói regisztráció és bejelentkezés
- Termékek böngészése, szűrése és részletes megtekintése
- Kosárkezelés és rendelési folyamat
- Felhasználói értékelések és visszajelzések
- Kuponrendszer és kedvezmények
- Felhasználói termékfeltöltés (Vinted-szerű funkció)
- Adminisztrációs felület a termékek, felhasználók és rendelések kezeléséhez
- Sötét/világos mód támogatás
- Reszponzív design különböző eszközökhöz

Különösen innovatív megoldásnak tartom a Google Cloud Vision API integrációját, amely mesterséges intelligencia segítségével elemzi a feltöltött termékképeket, valamint a stílustanácsadó funkciót.
