---
sidebar_position: 7
---

# Backend tesztelés

A backend rendszer tesztelése kulcsfontosságú a webáruház megbízható működésének biztosításához. Az Adali Clothing backend tesztelési stratégiája átfogó és módszeres megközelítést alkalmaz a rendszer minden kritikus komponensének ellenőrzésére.

## Tesztelési keretrendszer

A backend teszteléshez a Jest keretrendszert használjuk, amely lehetővé teszi a hatékony és megbízható tesztek írását. A tesztek automatizáltak és a CI/CD folyamat részeként futnak, biztosítva, hogy minden kódváltoztatás előtt ellenőrizzük a rendszer integritását.
<div style={{textAlign: 'center'}}>
  <img src="/img/test.png" alt="Backend tesztelési folyamat" width="600" />
  <p><em>Ábra: Backend tesztelési folyamat</em></p>
</div>
## Tesztfájlok áttekintése

A tesztkészlet átfogó ellenőrzést biztosít az Adali Clothing webáruház backend rendszerének minden kritikus komponensére. A Jest keretrendszert használtuk a backend tesztelésére, amely lehetővé tette a hatékony és megbízható tesztek írását.

### Regisztráció és bejelentkezés tesztelése

- **signup.test.js**: A regisztrációs folyamat tesztelése, beleértve az adatvalidációt, a hibakezelést és a sikeres regisztráció utáni állapotot.
- **sign.test.js**: A bejelentkezési folyamat tesztelése, ellenőrizve a hitelesítési mechanizmusokat, a token generálást és a hibakezelést.

### Termékkezelés tesztelése

- **server.products.test.js**: A termékkezelési rendszer tesztelése, lefedve a termékek teljes életciklusát:
  - Termékek létrehozása
  - Termékek lekérdezése
  - Termékek módosítása
  - Termékek törlése
  - Termékek szűrése és keresése

- **server.categories.test.js**: A kategóriarendszer tesztelése, ellenőrizve a kategóriák létrehozását, lekérdezését és a termékek kategóriákhoz rendelését.

### Felhasználói interakciók tesztelése

- **server.ratings.test.js**: Az értékelési rendszer tesztelése, beleértve az értékelések létrehozását, lekérdezését, módosítását és törlését.

- **server.users.test.js**: A felhasználói fiókkezelés funkcióinak tesztelése:
  - Felhasználói profil lekérdezése
  - Profil módosítása
  - Jelszóváltoztatás
  - Felhasználói jogosultságok ellenőrzése

### Rendelési folyamat tesztelése

- **register.test.js**: A vásárlási folyamat utolsó lépéseinek vizsgálata, különös tekintettel a rendelés-visszaigazolási mechanizmusra és a felhasználói statisztikák pontos vezetésére. A rendszer stressztűrő képességét is ellenőrzi nagy mennyiségű rendelési tétel esetén.

- **server.orders.test.js**: A rendelések feldolgozásának komplex folyamatának ellenőrzése:
  - Rendelés létrehozása
  - Rendelési állapot módosítása
  - Rendelések lekérdezése
  - Rendelési statisztikák

### API integrációk tesztelése

- **server.api.test.js**: A rendszer külső API-integrációinak tesztelése, különös tekintettel a képelemzési funkciókra, amelyek a termékfeltöltési folyamatot segítik.

## Tesztelési megközelítés

A tesztek nemcsak a funkcionális helyességet ellenőrzik, hanem a rendszer teljesítményét és robusztusságát is. A tesztkészlet a következő szempontokat vizsgálja:

### Funkcionális tesztelés

- Minden API végpont helyes működésének ellenőrzése
- Adatvalidáció és hibakezelés tesztelése
- Üzleti logika helyességének ellenőrzése

### Teljesítménytesztelés

- A rendszer válaszidejének mérése különböző terhelés alatt
- Nagy adatmennyiség kezelésének tesztelése
- Párhuzamos kérések kezelésének ellenőrzése

### Biztonsági tesztelés

- Jogosultságkezelés ellenőrzése
- Hitelesítési mechanizmusok tesztelése
- Adatvédelmi szempontok ellenőrzése

### Integrációs tesztelés

- Különböző komponensek együttműködésének ellenőrzése
- Adatbázis-műveletek helyességének tesztelése
- Külső szolgáltatásokkal való integráció tesztelése

## Tesztelési gyakorlat

A tesztek futtatása a következő paranccsal történik:

```bash
npm test
```

A tesztek részletes eredményeinek megtekintéséhez:

```bash
npm test -- --verbose
```

Egy specifikus tesztfájl futtatásához:

```bash
npm test -- server.products.test.js
```

## Tesztlefedettség

A backend kód tesztlefedettsége jelenleg 85% körül mozog, ami jó alapot biztosít a rendszer megbízható működéséhez. A kritikus komponensek, mint a hitelesítés, rendeléskezelés és termékkezelés lefedettsége 90% feletti.

A tesztlefedettség jelentés generálásához:

```bash
npm test -- --coverage
```

## Összegzés

Ez a tesztkészlet nemcsak azt nézi, hogy minden jól működik-e, hanem azt is, hogy a rendszer mennyire bírja a terhelést, és hogy jól kezelje a különböző helyzeteket, amik a valóságban előfordulhatnak. A rendszeres és alapos tesztelés biztosítja, hogy az Adali Clothing webáruház backend rendszere megbízhatóan és hatékonyan működjön, és képes legyen kezelni a valós használat során felmerülő kihívásokat.
