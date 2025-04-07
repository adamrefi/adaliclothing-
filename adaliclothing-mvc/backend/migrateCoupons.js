import mysql from 'mysql2/promise';
import crypto from 'crypto';

async function migrateCoupons() {
  try {
    console.log('Kupon migrációs szkript indítása...');
    
    // Adatbázis kapcsolat létrehozása közvetlenül megadott adatokkal
    // Cseréld ki ezeket a valós adatokkal
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'webshoppp',
      password: 'Premo900', // Add meg a tényleges jelszót
      database: 'webshoppp'
    });
    
    console.log('Adatbázis kapcsolat létrehozva.');
    
    
    // Ellenőrizzük, hogy léteznek-e az új táblák
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS coupons (
          coupon_id INT AUTO_INCREMENT PRIMARY KEY,
          code VARCHAR(50) NOT NULL UNIQUE,
          type ENUM('registration', 'email', 'special') NOT NULL,
          discount_type ENUM('percentage', 'fixed') NOT NULL DEFAULT 'percentage',
          discount_value DECIMAL(10,2) NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          expires_at DATETIME DEFAULT NULL,
          is_active TINYINT(1) NOT NULL DEFAULT 1
        )
      `);
      
      await db.execute(`
        CREATE TABLE IF NOT EXISTS user_coupons (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          coupon_id INT NOT NULL,
          is_used TINYINT(1) NOT NULL DEFAULT 0,
          used_at DATETIME DEFAULT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES user(f_azonosito),
          FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id)
        )
      `);
      
      console.log('Táblák ellenőrizve és létrehozva, ha szükséges.');
    } catch (error) {
      console.error('Hiba a táblák létrehozásakor:', error);
      process.exit(1);
    }
    
    // Felhasználók lekérése
    const [users] = await db.execute(`
      SELECT 
        f_azonosito, 
        felhasznalonev, 
        email, 
        kupon, 
        kupon_kod, 
        kupon_hasznalva, 
        kupon_lejar, 
        email_kupon, 
        email_kupon_hasznalva, 
        email_kupon_lejar 
      FROM user
    `);
    
    console.log(`${users.length} felhasználó található az adatbázisban.`);
    
    let registrationCouponCount = 0;
    let emailCouponCount = 0;
    
    // Felhasználónként végigmegyünk és migráljuk a kuponokat
    for (const user of users) {
      // Regisztrációs kupon migrálása
      if (user.kupon && user.kupon_kod) {
        try {
          // Ellenőrizzük, hogy már létezik-e ez a kupon az új rendszerben
          const [existingCoupons] = await db.execute(
            'SELECT coupon_id FROM coupons WHERE code = ?',
            [user.kupon_kod]
          );
          
          if (existingCoupons.length === 0) {
            // Kinyerjük a kedvezmény mértékét
            let discountValue = 15; // Alapértelmezett
            if (user.kupon && user.kupon.includes('%')) {
              const match = user.kupon.match(/(\d+)%/);
              if (match && match[1]) {
                discountValue = parseInt(match[1]);
              }
            }
            
            // Létrehozzuk a kupont az új rendszerben
            const [couponResult] = await db.execute(
              'INSERT INTO coupons (code, type, discount_type, discount_value, expires_at) VALUES (?, ?, ?, ?, ?)',
              [user.kupon_kod, 'registration', 'percentage', discountValue, user.kupon_lejar]
            );
            
            const couponId = couponResult.insertId;
            
            // Hozzárendeljük a felhasználóhoz
            await db.execute(
              'INSERT INTO user_coupons (user_id, coupon_id, is_used) VALUES (?, ?, ?)',
              [user.f_azonosito, couponId, user.kupon_hasznalva ? 1 : 0]
            );
            
            registrationCouponCount++;
            console.log(`Regisztrációs kupon migrálva: ${user.kupon_kod} (Felhasználó: ${user.felhasznalonev})`);
          } else {
            console.log(`A kupon már létezik: ${user.kupon_kod} (Felhasználó: ${user.felhasznalonev})`);
          }
        } catch (error) {
          console.error(`Hiba a regisztrációs kupon migrálásakor (${user.felhasznalonev}):`, error);
        }
      }
      
      // Email kupon migrálása
      if (user.email_kupon) {
        try {
          // Kinyerjük a kuponkódot
          let emailCouponCode = '';
          if (user.email_kupon.includes(':')) {
            emailCouponCode = user.email_kupon.split(':')[1].trim();
          } else {
            // Ha nincs kuponkód, generálunk egyet
            emailCouponCode = `ADALI15-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
          }
          
          // Ellenőrizzük, hogy már létezik-e ez a kupon az új rendszerben
          const [existingCoupons] = await db.execute(
            'SELECT coupon_id FROM coupons WHERE code = ?',
            [emailCouponCode]
          );
          
          if (existingCoupons.length === 0) {
            // Kinyerjük a kedvezmény mértékét
            let discountValue = 15; // Alapértelmezett
            if (user.email_kupon && user.email_kupon.includes('%')) {
              const match = user.email_kupon.match(/(\d+)%/);
              if (match && match[1]) {
                discountValue = parseInt(match[1]);
              }
            }
            
            // Létrehozzuk a kupont az új rendszerben
            const [couponResult] = await db.execute(
              'INSERT INTO coupons (code, type, discount_type, discount_value, expires_at) VALUES (?, ?, ?, ?, ?)',
              [emailCouponCode, 'email', 'percentage', discountValue, user.email_kupon_lejar]
            );
            
            const couponId = couponResult.insertId;
            
            // Hozzárendeljük a felhasználóhoz
            await db.execute(
              'INSERT INTO user_coupons (user_id, coupon_id, is_used) VALUES (?, ?, ?)',
              [user.f_azonosito, couponId, user.email_kupon_hasznalva ? 1 : 0]
            );
            
            // Frissítjük a régi rendszert is a generált kóddal, ha szükséges
            if (!user.email_kupon.includes(':')) {
              await db.execute(
                'UPDATE user SET email_kupon = ? WHERE f_azonosito = ?',
                [`15% kedvezmény: ${emailCouponCode}`, user.f_azonosito]
              );
            }
            
            emailCouponCount++;
            console.log(`Email kupon migrálva: ${emailCouponCode} (Felhasználó: ${user.felhasznalonev})`);
          } else {
            console.log(`A kupon már létezik: ${emailCouponCode} (Felhasználó: ${user.felhasznalonev})`);
          }
        } catch (error) {
          console.error(`Hiba az email kupon migrálásakor (${user.felhasznalonev}):`, error);
        }
      }
    }
    
    console.log('Migráció befejezve.');
    console.log(`Összesen ${registrationCouponCount} regisztrációs kupon és ${emailCouponCount} email kupon migrálva.`);
    
    await db.end();
    console.log('Adatbázis kapcsolat lezárva.');
  } catch (error) {
    console.error('Hiba a migráció során:', error);
    process.exit(1);
  }
}

migrateCoupons();
