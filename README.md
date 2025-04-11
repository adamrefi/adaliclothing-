# ADALICLOTHING - Emeld fel a stílusod, erősítsd meg az önbizalmad

**Fejlesztve a következő eszközökkel és technológiákkal:**

## 📝 Áttekintés

Az Adali Clothing egy átfogó fejlesztői eszköz, amely az e-kereskedelmi alkalmazások létrehozását és kezelését egyszerűsíti, biztosítva a robusztus és skálázható architektúrát.

### Miért az Adali Clothing?

Ez a projekt egyszerűsíti a fejlesztési folyamatot azáltal, hogy olyan alapvető funkciókat biztosít, amelyek növelik a produktivitást és a megbízhatóságot. A főbb jellemzők közé tartoznak:

- ✅ **Adatbázis inicializálás**: Gyorsan beállíthatja az adatbázis sémáját SQL dump-okkal a konzisztens környezetek érdekében.
- 🐳 **Docker támogatás**: Könnyen kezelhetők a több konténeres alkalmazások, egyszerűsítve a telepítést és fejlesztést.
- 🧪 **Automatizált tesztelés**: Biztosítja a megbízhatóságot átfogó tesztekkel mind a frontend, mind a backend funkcionalitásokhoz.
- 📱 **Reszponzív dizájn**: A Material-UI használatával modern, felhasználóbarát felületet biztosít, amely zökkenőmentesen alkalmazkodik a különböző eszközökhöz.
- 🔐 **Felhasználói hitelesítés**: Robusztus hitelesítési rendszert implementál a biztonság és a felhasználói élmény növelése érdekében.

## 🚀 Kezdeti lépések

### Előfeltételek

A projekthez a következő függőségek szükségesek:
- **Programozási nyelv**: JavaScript
- **Csomagkezelő**: Npm
- **Konténer futtatókörnyezet**: Docker

### Telepítés

A projekt két fő részből áll: backend (adaliclothing-mvc) és frontend (react2). Mindkettőt külön kell telepíteni:

1. **Klónozza a repository-t:**
```bash
git clone https://github.com/adamrefi/adaliclothing-
```

2. **Backend telepítése:**
```bash
cd adaliclothing-/adaliclothing-mvc/backend
npm install
```

3. **Frontend telepítése:**
```bash
cd adaliclothing-/react2
npm install
```

4. **Backend szerver indítása:**
```bash
cd adaliclothing-/adaliclothing-mvc/backend
node server.js
```

5. **Frontend fejlesztői szerver indítása (új terminál ablakban):**
```bash
cd /adaliclothing-/react2/src
npm start
```

## Használat

A telepítés után az alkalmazás elérhető a http://localhost:3000 címen

## Tesztelés

Futtassa az automatizált teszteket, hogy megbizonyosodjon arról, hogy minden megfelelően működik:

```bash
# Backend tesztek futtatása
cd adaliclothing-mvc/backend/test
npm test

# Frontend tesztek futtatása
cd /adaliclothing-/react2/frontendteszt
npx mocha "react2/frontendteszt/**/*.test.js"
```

## 📖 Dokumentáció

Részletesebb dokumentációért látogasson el a [Docusaurus oldalunkra](https://adalidocument.vercel.app) vagy tekintse meg a [webszerveres alkalmazásunkat](https://adaliclothing.vercel.app). 

A webszerveres alkalmazás GitHub repository-ja: https://github.com/Mutyii0425/webes

## 📂 Adatbázis beállítása phpMyAdmin segítségével

A backend megfelelő működéséhez szükséges, hogy a webshoppp.sql fájl be legyen importálva a MySQL adatbázisba. Az alábbi lépésekkel tudod ezt egyszerűen megtenni a phpMyAdmin felületén keresztül:

### 1. Adatbázis-felhasználó létrehozása
- Nyisd meg a phpMyAdmin-t http://localhost/phpmyadmin.
- Navigálj a "Felhasználók" fülre.
- Kattints az "Új felhasználó hozzáadása" gombra.
- Töltsd ki az alábbi mezőket:
  - Felhasználónév: webshoppp
  - Host: localhost
  - Jelszó: Premo900
  - Jelszó megerősítése: Premo900
- Jelöld be: "Adatbázis létrehozása ugyanazzal a névvel és minden jogosultság megadása".
- Kattints a "Végrehajtás" gombra.

### 2. Az webshoppp.sql importálása
- Válaszd ki az webshoppp nevű adatbázist a bal oldali menüből.
- Kattints a "Importálás" fülre.
- Tallózd be a webshoppp.sql fájlt a gépedről.
- Kattints a "Végrehajtás" gombra.

Ezzel az adatbázis kész és a backend kapcsolat is biztosított.
