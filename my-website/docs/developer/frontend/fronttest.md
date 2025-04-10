---
sidebar_position: 5
---

# Frontend tesztelés

<div style={{textAlign: 'center'}}>
  <img src="/img/front.png" alt="Frontend tesztelés folyamat" width="700" />
  <p><em>Ábra: Frontend tesztelési folyamat és komponensek</em></p>
</div>

Az Adali Clothing webáruház frontend tesztjei átfogó ellenőrzést biztosítanak a felhasználói felület és a funkcionalitás szempontjából. A tesztek Selenium WebDriver segítségével automatizálják a böngésző interakciókat, így valós felhasználói élményt szimulálnak.

## Tesztelési keretrendszer

A frontend teszteléshez a következő technológiákat használjuk:
- **Mocha**: Tesztelési keretrendszer
- **Selenium WebDriver**: Böngésző automatizálási eszköz
- **Chai/Assert**: Ellenőrzési könyvtár
- **Page Object Model**: Tervezési minta a tesztek strukturálásához

## Tesztek futtatása

Az összes frontend teszt futtatásához a következő parancsot használhatjuk:

```bash
npx mocha "react2/frontendteszt/**/*.test.js"
```

Egy specifikus teszt futtatásához:

```bash
npx mocha react2/frontendteszt/auth.test.js
```

A tesztek futtatása előtt győződjünk meg arról, hogy:
1. A frontend alkalmazás fut a 3000-es porton
2. A backend szerver fut az 5000-ös porton
3. A megfelelő WebDriver telepítve van

## Tesztkészlet áttekintése

### auth.test.js
Ez a teszt a hitelesítési folyamatokat ellenőrzi:
- Sikeres bejelentkezés helyes adatokkal
- Sikertelen bejelentkezés hibás adatokkal
- Sikeres regisztráció új felhasználóval

A tesztek ellenőrzik, hogy a felhasználó megfelelően átirányítódik-e a kezdőlapra sikeres bejelentkezés után, illetve hogy megfelelő hibaüzenetek jelennek-e meg sikertelen bejelentkezés esetén.

### homePage.test.js
A kezdőlap funkcionalitását teszteli:
- Kezdőlap betöltése és tartalom ellenőrzése
- Oldalsáv megnyitása és bezárása
- Dark mode kapcsoló működése
- Bejelentkezés és kijelentkezés a kezdőlapról
- Navigáció a különböző oldalakra (kosár, termékek, stb.)
- Termék kártyák megjelenítése
- Értékelések megjelenítése
- Carousel animáció működése
- Kupon sorsológép működése

### products.test.js
A termék részletező oldal funkcionalitását teszteli:
- Termék adatok betöltése és megjelenítése
- Méret kiválasztása nélküli kosárba helyezés (hibaüzenet ellenőrzése)
- Sikeres kosárba helyezés
- Dark mode kapcsoló tesztelése
- Oldalsó menü tesztelése
- Kosár oldal megnyitása
- Nem bejelentkezett felhasználó kosárba helyezési kísérlete

### cart.test.js
A kosár funkcionalitását teszteli:
- Kosár oldal betöltése
- Termék mennyiség növelése a kosárban
- Termék mennyiség csökkentése a kosárban
- Termék eltávolítása a kosárból
- Továbblépés a fizetéshez

### checkout.test.js
A fizetési folyamatot teszteli:
- Checkout oldal betöltése a kosárból
- Szállítási adatok kitöltése
- Fizetési mód kiválasztása
- Rendelés leadása

### profile.test.js
A felhasználói fiók oldalt teszteli:
- Fiók oldal betöltése
- Felhasználói adatok megjelenítése
- Rendelési statisztikák megjelenítése
- Dark mode kapcsoló működése
- Oldalsó menü működése
- Kosár ikon működése

## Page Object Model

A tesztek a Page Object Model (POM) tervezési mintát követik, amely elválasztja a tesztlogikát az oldal struktúrájától. Minden oldalhoz tartozik egy megfelelő osztály a `pageObjects` mappában:

- `HomePage.js`: Kezdőlap műveletek
- `LoginPage.js`: Bejelentkezési műveletek
- `RegisterPage.js`: Regisztrációs műveletek
- `ProductPage.js`: Termék részletező oldal műveletek
- `CartPage.js`: Kosár műveletek
- `CheckoutPage.js`: Fizetési folyamat műveletek
- `AddProductPage.js`: Termék feltöltési műveletek

Ez a megközelítés több előnnyel jár:
- Újrafelhasználható kód
- Könnyebb karbantarthatóság
- Jobb olvashatóság
- Az oldal struktúrájának változása csak egy helyen igényel módosítást

## Hibajavítások és kihívások

A tesztek fejlesztése során számos kihívással szembesültünk, amelyeket azóta sikeresen megoldottunk:

1. **Aszinkron műveletek kezelése**: A tesztek kezdetben nem várták meg megfelelően az aszinkron műveletek befejezését, ami instabil tesztekhez vezetett. Ezt explicit várakozások bevezetésével javítottuk.

2. **Szelektorok frissítése**: A felhasználói felület fejlődésével néhány CSS szelektor elavulttá vált, ami miatt a tesztek nem találták meg a megfelelő elemeket. Ezeket a szelektor problémákat kijavítottuk, és robusztusabb szelektorokat implementáltunk.

3. **Időzítési problémák**: Egyes tesztek túl gyorsan próbáltak interakcióba lépni az elemekkel, mielőtt azok teljesen betöltődtek volna. Ezt megfelelő várakozási stratégiákkal orvosoltuk.

4. **Adatfüggőség**: Néhány teszt olyan adatokra támaszkodott, amelyek nem mindig voltak jelen a tesztkörnyezetben (pl. kosárban lévő termékek). Ezeket a teszteket úgy módosítottuk, hogy ellenőrizzék az előfeltételeket, és szükség esetén létrehozzák a teszteléshez szükséges adatokat.

## Ismert korlátok

A tesztkészletben továbbra is vannak olyan hibák, amelyek nem tényleges funkcionalitási problémákból, hanem a tesztelési környezet sajátosságaiból adódnak:

1. **Adatérzékelési problémák**: Egyes tesztek nem észlelik megfelelően az adatokat, amelyeknek meg kellene jelenniük. Például a profile.test.js néha nem találja a rendelési statisztikákat, annak ellenére, hogy azok megjelennek a felhasználói felületen. Ez nem a webáruház hibája, hanem a tesztelési környezet korlátja.

2. **Dinamikus tartalom**: A webáruház dinamikus tartalmat jelenít meg, például a kezdőlapon lévő termékajánlásokat vagy értékeléseket. Ezek a tartalmak változhatnak, ami miatt a tesztek néha nem találják a várt elemeket, annak ellenére, hogy a funkció megfelelően működik.

3. **Környezetfüggő viselkedés**: Egyes tesztek eredménye függhet a tesztelési környezettől (pl. képernyőméret, böngésző verzió). Ezek a tesztek néha hibákat jelezhetnek, annak ellenére, hogy a funkció a legtöbb környezetben megfelelően működik.

Fontos megjegyezni, hogy ezek a korlátok nem a webáruház funkcionalitásának hibái, hanem a tesztelési megközelítés korlátai. A valós felhasználói élmény szempontjából a webáruház megfelelően működik.

## Képernyőképek

A tesztek futtatása során képernyőképeket készítünk a kritikus lépésekről, amelyek segítenek a hibák diagnosztizálásában. Ezek a képernyőképek a `screenshots` mappában találhatók, és a teszt nevével és a lépés nevével vannak ellátva.

## Tesztadatok

A tesztek a következő tesztadatokat használják:

- **Teszt email:** teszt@example.com
- **Teszt jelszó:** jelszo123

Ezek az adatok előre be vannak állítva a tesztkörnyezetben, és a tesztek során használjuk őket a bejelentkezési és regisztrációs folyamatok teszteléséhez.

## Jövőbeli fejlesztések

A tesztkészlet folyamatos fejlesztés alatt áll, és a következő fejlesztéseket tervezzük:

1. **Párhuzamos tesztfuttatás**: A tesztek futtatási idejének csökkentése érdekében
2. **Tesztlefedettség növelése**: További tesztek hozzáadása a még nem tesztelt funkciókhoz
3. **Vizuális regressziós tesztelés**: A felhasználói felület vizuális változásainak automatikus ellenőrzése
4. **Teljesítménytesztelés**: A frontend teljesítményének mérése és ellenőrzése

A tesztkészlet folyamatos fejlesztése biztosítja, hogy az Adali Clothing webáruház mindig magas minőségű felhasználói élményt nyújtson.
