# Backend

Az Adali Clothing webáruház backend rendszerét a modern szoftverfejlesztési gyakorlatoknak megfelelően MVC (Model-View-Controller) architektúra szerint építettük fel. Ez a strukturált megközelítés nemcsak tiszta kódszerkezetet biztosít, hanem jól elkülöníthető felelősségi köröket is teremt a rendszer különböző komponensei között. A fejlesztés során a Node.js környezetet választottuk, amely a gyors, aszinkron működésével kiváló alapot biztosít egy e-kereskedelmi platform számára. Az Express.js keretrendszer használatával pedig hatékonyan tudtuk kezelni a HTTP kéréseket és válaszokat, miközben a MySQL adatbázis stabil és megbízható adattárolást biztosít.

<div style={{textAlign: 'center'}}>
  <img src="/img/database.png" alt="Backend architektúra" width="700" />
  <p><em>Ábra: Backend rendszer architektúrája</em></p>
</div>

## Architektúra és technológiai háttér

Rendszerünk az 5000-es porton fut, ahol minden funkcionalitást egyetlen, jól szervezett API szerver biztosít. Ez az egységes megközelítés jelentősen egyszerűsíti a rendszer telepítését és karbantartását, miközben továbbra is biztosítja a szükséges biztonsági intézkedéseket. A technológiai stack gondosan válogatott komponensekből áll: a Node.js futtatókörnyezet biztosítja a szerver működését, az Express.js keretrendszer kezeli a HTTP kéréseket, a MySQL adatbázis tárolja az adatokat, a bcrypt könyvtár gondoskodik a jelszavak biztonságos titkosításáról, míg a SendGrid API professzionális email kommunikációt tesz lehetővé. A rendszer különleges funkciója a Google Cloud Vision API integrációja, amely mesterséges intelligencia segítségével elemzi a feltöltött termékképeket.

## Modellek és adatbázis kapcsolatok

A modell réteg felelős az adatbázissal való kommunikációért és az üzleti logika jelentős részének megvalósításáért. A UserModel kezeli a felhasználói adatokat, beleértve a hitelesítést, jelszó-visszaállítást és a profilképek kezelését. A ProductModel a termékek teljes életciklusát menedzseli a létrehozástól a törlésig, különös figyelmet fordítva a készletkezelésre. A CategoryModel biztosítja a termékek rendszerezését kategóriákba, míg az OrderModel a teljes rendelési folyamatot kezeli a vásárlói adatok rögzítésétől a rendelési statisztikák generálásáig. A RatingModel az értékelési rendszert működteti, a CouponModel pedig a kedvezmények és kuponok kezelését biztosítja.

<div style={{textAlign: 'center'}}>
  <img src="/img/adatmodel.png" alt="Adatbázis modell" width="700" />
  <p><em>Ábra: Adatbázis kapcsolatok és modell struktúra</em></p>
</div>

Az adatbázis kapcsolatok gondosan tervezett rendszere biztosítja az adatok integritását és a hatékony lekérdezéseket. A user tábla kapcsolódik a ratings táblához, lehetővé téve a felhasználói értékelések nyomon követését. A termékek és kategóriák közötti kapcsolatot a termekek tábla kategoriaId mezője biztosítja. A rendelési folyamat során a rendeles tábla a vevo táblához kapcsolódik, míg az r_kapcsolo kapcsolótábla lehetővé teszi a sok-sok kapcsolatot a rendelések és termékek között.

## Vezérlők és API végpontok

A vezérlő réteg fogadja a HTTP kéréseket, kommunikál a modellekkel, és strukturált JSON válaszokat küld vissza a kliensnek. Az AuthController kezeli a felhasználói hitelesítést, beleértve a regisztrációt, bejelentkezést és jelszó-visszaállítást. A UserController a felhasználói profilok kezelését biztosítja, míg a ProductController a termékek teljes körű menedzselését végzi. A CategoryController a kategóriák kezelését, az OrderController pedig a rendelési folyamatot irányítja. A RatingController az értékelési rendszert működteti, a CouponController pedig a kedvezmények és kuponok kezelését biztosítja.

API végpontjaink átfogó hozzáférést biztosítanak a rendszer minden funkciójához. A termékkezelés végpontjai lehetővé teszik a termékek lekérdezését, létrehozását, frissítését és törlését. A kategóriakezelés végpontjai biztosítják a kategóriák kezelését és a kategóriákhoz tartozó termékek lekérdezését. A rendeléskezelés végpontjai támogatják a teljes rendelési folyamatot, míg a felhasználókezelés végpontjai lehetővé teszik a felhasználói fiókok kezelését. A hitelesítési végpontok biztosítják a biztonságos bejelentkezést és regisztrációt, az értékelési végpontok pedig lehetővé teszik a felhasználói visszajelzések kezelését.

## Biztonság és hibakezelés

A rendszer biztonságát több rétegű védelmi mechanizmus biztosítja. A jelszavakat bcrypt algoritmussal titkosítjuk, ami gyakorlatilag lehetetlenné teszi a visszafejtésüket. A jelszó-visszaállítási folyamat biztonságos tokeneket használ, amelyek korlátozott ideig érvényesek. Az adatbázis sémát gondosan ellenőrizzük, és a felhasználói bemeneteket alaposan validáljuk a controller rétegben. A hibakezelési rendszerünk átfogó és robusztus. A HTTP státuszkódokat megfelelően használjuk a különböző hibaállapotok jelzésére. Részletes hibaüzeneteket biztosítunk, amelyek segítenek a problémák gyors azonosításában és megoldásában. A try-catch blokkokat következetesen alkalmazzuk a váratlan hibák kezelésére, és minden hibát gondosan naplózunk a későbbi elemzés céljából.

Az Adali Clothing backend rendszere tehát egy jól strukturált, biztonságos és hatékony alapot biztosít a webáruház működéséhez, amely képes kiszolgálni a modern e-kereskedelmi platform összes igényét.
```

