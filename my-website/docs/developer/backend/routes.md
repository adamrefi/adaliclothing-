# Backend útvonalak

Az Adali Clothing webáruház backend rendszere jól strukturált útvonalakkal rendelkezik, amelyek biztosítják a frontend és a backend közötti kommunikációt. Az útvonalak moduláris felépítése lehetővé teszi a könnyű karbantarthatóságot és bővíthetőséget.

## Útvonalak áttekintése

A rendszer útvonalai funkcionális területek szerint vannak csoportosítva, és mindegyik egy-egy dedikált vezérlőhöz kapcsolódik. Az `index.js` fájl központilag regisztrálja az összes útvonalat az Express alkalmazásban, így biztosítva az egységes hozzáférést.

### Hitelesítési útvonalak

Az `authRoutes.js` fájl tartalmazza a felhasználói hitelesítéssel kapcsolatos végpontokat. Ezek kezelik a regisztrációt, bejelentkezést, jelszó-visszaállítást és a kuponokkal kapcsolatos műveleteket. A végpontok közé tartozik:

- `/register` - Új felhasználó regisztrálása
- `/login` - Felhasználói bejelentkezés
- `/forgot-password` - Elfelejtett jelszó kezelése
- `/reset-password` - Jelszó visszaállítása
- `/update-coupon` - Kupon frissítése
- `/mark-coupon-used` - Kupon felhasználtként jelölése

Ezek az útvonalak biztosítják a felhasználók biztonságos hozzáférését a rendszerhez, és lehetővé teszik a felhasználói fiókok kezelését.

### Felhasználói útvonalak

A `userRoutes.js` fájl a felhasználói profilok és adatok kezelésére szolgáló végpontokat tartalmazza. Ezek lehetővé teszik a felhasználók lekérdezését, törlését és a kuponok kezelését. Főbb végpontok:

- `/users` - Összes felhasználó lekérdezése
- `/users/:id` - Felhasználó törlése
- `/check-user/:username` - Felhasználónév ellenőrzése
- `/user-coupons/:userId` - Felhasználói kuponok lekérdezése
- `/mark-coupon-used` - Kupon felhasználtként jelölése
- `/mark-email-coupon-used` - Email kupon felhasználtként jelölése

A felhasználói útvonalak különlegessége, hogy saját adatbázis-kapcsolatot inicializálnak, biztosítva a megbízható működést még nagy terhelés esetén is.

### Kategória útvonalak

A `categoryRoutes.js` egyszerű, de fontos funkciót lát el: a termék kategóriák lekérdezését teszi lehetővé. A `/categories` végpont az összes kategória adatait szolgáltatja, amelyek elengedhetetlenek a termékek rendszerezéséhez és a navigációs struktúra kialakításához.

### Kupon útvonalak

A `couponRoutes.js` a webáruház kedvezményrendszerét működtető végpontokat tartalmazza. Ezek lehetővé teszik a kuponok kezelését, érvényesítését és nyomon követését. Főbb végpontok:

- `/send-coupons` - Kuponok küldése minden felhasználónak
- `/send-selected` - Kuponok küldése kiválasztott felhasználóknak
- `/mark-coupon-used` - Kupon felhasználtként jelölése
- `/validate-coupon` - Kupon érvényességének ellenőrzése
- `/stats` - Kupon statisztikák lekérdezése
- `/history` - Kupon használati történet lekérdezése
- `/check-coupon/:code` - Kuponkód ellenőrzése
- `/user/:userId` - Felhasználó kuponjainak lekérdezése
- `/generate-registration` - Regisztrációs kupon generálása

Ezek az útvonalak biztosítják a marketing kampányok és kedvezmények hatékony kezelését.

### Rendelési útvonalak

Az `orderRoutes.js` a vásárlási folyamat és a rendelések kezelésére szolgáló végpontokat tartalmazza. Ezek lehetővé teszik a vásárlók adatainak rögzítését, rendelések létrehozását és a rendelési statisztikák kezelését. Főbb végpontok:

- `/vevo/create` - Vásárlói adatok rögzítése
- `/orders/create` - Rendelés létrehozása
- `/api/order-stats/:userId` - Felhasználói rendelési statisztikák lekérdezése
- `/api/update-order-stats` - Rendelési statisztikák frissítése
- `/send-confirmation` - Rendelés-visszaigazolás küldése

Ezek az útvonalak biztosítják a vásárlási folyamat zökkenőmentes lebonyolítását és a rendelések nyomon követését.

### Termék útvonalak

<div style={{textAlign: 'center'}}>
  <img src="/img/prod.png" alt="Termék útvonalak és API végpontok" width="700" />
  <p><em>Ábra: Termék API végpontok és adatáramlás</em></p>
</div>


A `productRoutes.js` a termékek kezelésére szolgáló végpontokat tartalmazza. Ezek lehetővé teszik a termékek lekérdezését, létrehozását, frissítését és törlését, valamint a készletkezelést. Az útvonalak két fő csoportra oszthatók: az adminisztrátorok által kezelt termékek és a felhasználók által feltöltött termékek kezelésére szolgáló végpontok. Főbb végpontok:

- `/termekek` - Összes termék lekérdezése
- `/products` - Felhasználói termékek lekérdezése
- `/termekek/:id` - Termék lekérdezése azonosító alapján
- `/products/:id` - Felhasználói termék lekérdezése azonosító alapján
- `/termekek/create` - Új termék létrehozása
- `/usertermekek` - Új felhasználói termék létrehozása
- `/termekek/:id` - Termék frissítése
- `/products/:id` - Felhasználói termék frissítése
- `/termekek/:id` - Termék törlése
- `/products/:id` - Felhasználói termék törlése
- `/termekek/:id/stock` - Készlet frissítése
- `/termekek/low-stock` - Alacsony készletű termékek lekérdezése
- `/termekek/:id/set-stock` - Készlet beállítása
- `/termekek/set-all-stock` - Összes termék készletének beállítása

Ezek az útvonalak biztosítják a termékek hatékony kezelését és a készletinformációk naprakészen tartását.

### Értékelési útvonalak

A `ratingRoutes.js` a felhasználói értékelések és visszajelzések kezelésére szolgáló végpontokat tartalmazza. Ezek lehetővé teszik az értékelések lekérdezését, létrehozását, frissítését és törlését. Főbb végpontok:

- `/get-all-ratings` - Összes értékelés lekérdezése
- `/save-rating` - Értékelés mentése
- `/add-rating` - Új értékelés hozzáadása
- `/update-rating/:id` - Értékelés frissítése
- `/delete-rating/:id` - Értékelés törlése
- `/admin/all-user-ratings` - Összes felhasználói értékelés lekérdezése (admin)
- `/admin/add-user-rating` - Felhasználói értékelés hozzáadása (admin)
- `/admin/update-user-rating/:id` - Felhasználói értékelés frissítése (admin)
- `/admin/delete-user-rating/:id` - Felhasználói értékelés törlése (admin)
- `/user-id/:username` - Felhasználói azonosító lekérdezése felhasználónév alapján
- `/user-ratings/:userId` - Felhasználói értékelések lekérdezése
- `/add-user-rating` - Felhasználói értékelés hozzáadása
- `/order-feedback` - Rendelési visszajelzés rögzítése

Ezek az útvonalak biztosítják a felhasználói visszajelzések hatékony kezelését és a vásárlói elégedettség nyomon követését.

## Útvonalak regisztrálása

Az `index.js` fájl központilag regisztrálja az összes útvonalat az Express alkalmazásban. Ez a megközelítés egyszerűsíti az útvonalak kezelését és biztosítja az egységes hozzáférést. A regisztráció során minden útvonal megkapja a megfelelő vezérlőt, így biztosítva a kérések megfelelő kezelését.

```javascript
export default (app, controllers) => {
  app.use(authRoutes(controllers.authController));
  app.use('/api', productRoutes(controllers.productController));
  app.use(categoryRoutes(controllers.categoryController));
  app.use(orderRoutes(controllers.orderController));
  app.use('/ratings', ratingRoutes(controllers.ratingController)); 
  app.use(userRoutes(controllers.userController));
  app.use('/api/ratings', ratingRoutes(controllers.ratingController));
  app.use('/api/coupons', couponRoutes(controllers.couponController));
};
```

Ez a központosított megközelítés lehetővé teszi az útvonalak egyszerű bővítését és módosítását, miközben biztosítja a rendszer skálázhatóságát és karbantarthatóságát.
