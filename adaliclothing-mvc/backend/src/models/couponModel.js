class CouponModel {
  constructor(db) {
    this.db = db;
  }

  async getAllActiveUsers() {
    const [users] = await this.db.execute('SELECT email, felhasznalonev, f_azonosito FROM user WHERE email_kupon_hasznalva = 0 OR email_kupon_hasznalva IS NULL');
    return users;
  }

  async updateUserCoupon(userId, couponType, couponCode, expiryDays = 30) {
  
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    const formattedExpiryDate = expiryDate.toISOString().slice(0, 19).replace('T', ' ');
    
  
    const [result] = await this.db.execute(
      'UPDATE user SET kupon = ?, kupon_kod = ?, kupon_lejar = ?, kupon_hasznalva = 0 WHERE f_azonosito = ?',
      [`${couponType}% kedvezmény`, couponCode, formattedExpiryDate, userId]
    );
    
    return result.affectedRows > 0;
  }

  async updateUserEmailCoupon(userId, couponCode, expiryDays = 30) {
   
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    const formattedExpiryDate = expiryDate.toISOString().slice(0, 19).replace('T', ' ');
    
    const [result] = await this.db.execute(
      'UPDATE user SET email_kupon = ?, email_kupon_kod = ?, email_kupon_lejar = ?, email_kupon_hasznalva = 0 WHERE f_azonosito = ?',
      ['15% kedvezmény', couponCode, formattedExpiryDate, userId]
    );
    return result.affectedRows > 0;
  }

  async markEmailCouponAsUsed(userId) {
    const [result] = await this.db.execute(
      'UPDATE user SET email_kupon_hasznalva = 1 WHERE f_azonosito = ?',
      [userId]
    );
    return result.affectedRows > 0;
  }

  async markCouponAsUsed(userId) {
    const [result] = await this.db.execute(
      'UPDATE user SET kupon_hasznalva = 1 WHERE f_azonosito = ?',
      [userId]
    );
    return result.affectedRows > 0;
  }

  async getUserCoupons(userId) {
    const [rows] = await this.db.execute(`
      SELECT 
        kupon, 
        kupon_kod,
        kupon_hasznalva, 
        kupon_lejar,
        email_kupon, 
        email_kupon_kod,
        email_kupon_hasznalva,
        email_kupon_lejar
      FROM user 
      WHERE f_azonosito = ?
    `, [userId]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const user = rows[0];
    const now = new Date();
    
    
    let coupons = [];
    
    
    if (user.kupon) {
      const kuponExpired = user.kupon_lejar && new Date(user.kupon_lejar) < now;
      
     
      let discountPercentage = 0;
      if (user.kupon.includes('%')) {
        const match = user.kupon.match(/(\d+)%/);
        if (match && match[1]) {
          discountPercentage = parseInt(match[1]);
        }
      } else if (user.kupon === 'Nincs nyeremény') {
        discountPercentage = 0;
      }
      
      coupons.push({
        type: 'registration',
        code: user.kupon_kod || '',
        discount: discountPercentage,
        description: user.kupon,
        isUsed: !!user.kupon_hasznalva,
        isExpired: kuponExpired,
        expiryDate: user.kupon_lejar
      });
    }
    
    
    if (user.email_kupon) {
      const emailKuponExpired = user.email_kupon_lejar && new Date(user.email_kupon_lejar) < now;
      
     
      let discountPercentage = 15; 
      if (user.email_kupon.includes('%')) {
        const match = user.email_kupon.match(/(\d+)%/);
        if (match && match[1]) {
          discountPercentage = parseInt(match[1]);
        }
      }
      
      coupons.push({
        type: 'email',
        code: user.email_kupon_kod || '',
        discount: discountPercentage,
        description: user.email_kupon,
        isUsed: !!user.email_kupon_hasznalva,
        isExpired: emailKuponExpired,
        expiryDate: user.email_kupon_lejar
      });
    }
    
    return coupons;
  }

  async sendCouponsToSelectedUsers(userIds, expiryDays = 30) {
    try {
      
      let users;
      if (userIds.length === 1) {
        [users] = await this.db.execute(
          'SELECT f_azonosito, felhasznalonev, email FROM user WHERE f_azonosito = ?',
          [userIds[0]]
        );
      } else {
        const placeholders = userIds.map(() => '?').join(',');
        [users] = await this.db.execute(
          `SELECT f_azonosito, felhasznalonev, email FROM user WHERE f_azonosito IN (${placeholders})`,
          userIds
        );
      }
      
      if (!users || users.length === 0) {
        throw new Error('Nem találhatók a kiválasztott felhasználók');
      }
      
      let successCount = 0;
      let errorCount = 0;
      const results = [];
      
     
      for (const user of users) {
        try {
        
          const crypto = await import('crypto');
          const couponCode = `ADALI15-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
          
        
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + expiryDays);
          const formattedExpiryDate = expiryDate.toISOString().slice(0, 19).replace('T', ' ');
          
          const updateResult = await this.db.execute(
            'UPDATE user SET email_kupon = ?, email_kupon_kod = ?, email_kupon_lejar = ?, email_kupon_hasznalva = 0 WHERE f_azonosito = ?',
            ['15% kedvezmény', couponCode, formattedExpiryDate, user.f_azonosito]
          );
          
          if (updateResult[0].affectedRows === 0) {
            throw new Error(`Nem sikerült frissíteni a felhasználót: ${user.f_azonosito}`);
          }
          
          results.push({
            userId: user.f_azonosito,
            email: user.email,
            username: user.felhasznalonev,
            couponCode,
            expiryDate
          });
          
          successCount++;
        } catch (error) {
          console.error(`Hiba a kupon frissítésekor ${user.email} felhasználónak:`, error);
          errorCount++;
        }
      }
      
      return {
        success: true,
        successCount,
        errorCount,
        results
      };
    } catch (error) {
      console.error('Hiba a kuponok küldésekor:', error);
      throw error;
    }
  }
  
  async validateCoupon(code, userId) {
    try {
     
      const [users] = await this.db.execute(
        `SELECT 
          kupon, kupon_kod, kupon_hasznalva, kupon_lejar,
          email_kupon, email_kupon_kod, email_kupon_hasznalva, email_kupon_lejar
        FROM user 
        WHERE f_azonosito = ?`,
        [userId]
      );
      
      if (users.length === 0) {
        return { valid: false, reason: 'user_not_found' };
      }
      
      const user = users[0];
      const now = new Date();
      
     
      if (user.kupon_kod && user.kupon_kod.toUpperCase() === code.toUpperCase() && !user.kupon_hasznalva) {
       
        if (user.kupon_lejar && new Date(user.kupon_lejar) < now) {
          return { valid: false, reason: 'expired' };
        }
        
       
        let discountPercentage = 0;
        if (user.kupon.includes('%')) {
          const match = user.kupon.match(/(\d+)%/);
          if (match && match[1]) {
            discountPercentage = parseInt(match[1]);
          }
        } else if (user.kupon === 'Nincs nyeremény') {
          return { valid: false, reason: 'no_discount' };
        }
        
        return { 
          valid: true, 
          type: 'registration',
          discount: discountPercentage
        };
      }
      
    
      if (user.email_kupon_kod && user.email_kupon_kod.toUpperCase() === code.toUpperCase() && !user.email_kupon_hasznalva) {
        
        if (user.email_kupon_lejar && new Date(user.email_kupon_lejar) < now) {
          return { valid: false, reason: 'expired' };
        }
        
        
        let discountPercentage = 15; 
        if (user.email_kupon.includes('%')) {
          const match = user.email_kupon.match(/(\d+)%/);
          if (match && match[1]) {
            discountPercentage = parseInt(match[1]);
          }
        }
        
        return { 
          valid: true, 
          type: 'email',
          discount: discountPercentage
        };
      }
      
      return { valid: false, reason: 'invalid_code' };
    } catch (error) {
      console.error('Hiba a kupon ellenőrzésekor:', error);
      throw error;
    }
  }

  async getCouponStats() {
    try {
     
      const [totalCouponsResult] = await this.db.execute(`
        SELECT COUNT(*) as total FROM (
          SELECT f_azonosito FROM user WHERE kupon IS NOT NULL
          UNION ALL
          SELECT f_azonosito FROM user WHERE email_kupon IS NOT NULL
        ) as all_coupons
      `);
      
     
      const [usedCouponsResult] = await this.db.execute(`
        SELECT COUNT(*) as total FROM (
          SELECT f_azonosito FROM user WHERE kupon IS NOT NULL AND kupon_hasznalva = 1
          UNION ALL
          SELECT f_azonosito FROM user WHERE email_kupon IS NOT NULL AND email_kupon_hasznalva = 1
        ) as used_coupons
      `);
      
     
      const [expiredCouponsResult] = await this.db.execute(`
        SELECT COUNT(*) as total FROM (
          SELECT f_azonosito FROM user 
          WHERE kupon IS NOT NULL AND kupon_hasznalva = 0 
          AND kupon_lejar IS NOT NULL AND kupon_lejar < NOW()
          UNION ALL
          SELECT f_azonosito FROM user 
          WHERE email_kupon IS NOT NULL AND email_kupon_hasznalva = 0 
          AND email_kupon_lejar IS NOT NULL AND email_kupon_lejar < NOW()
        ) as expired_coupons
      `);
      
    
      const [activeCouponsResult] = await this.db.execute(`
        SELECT COUNT(*) as total FROM (
          SELECT f_azonosito FROM user 
          WHERE kupon IS NOT NULL AND kupon_hasznalva = 0 
          AND (kupon_lejar IS NULL OR kupon_lejar > NOW())
          UNION ALL
          SELECT f_azonosito FROM user 
          WHERE email_kupon IS NOT NULL AND email_kupon_hasznalva = 0 
          AND (email_kupon_lejar IS NULL OR email_kupon_lejar > NOW())
        ) as active_coupons
      `);
      
     
      const [ordersWithDiscountResult] = await this.db.execute(`
        SELECT SUM(ar * mennyiseg * 0.15) as total_discount
          FROM rendeles r
          JOIN vevo v ON r.vevo_id = v.id
          JOIN user u ON v.email = u.email
          WHERE u.kupon_hasznalva = 1
      `);
      
      return {
        totalCoupons: totalCouponsResult[0].total || 0,
        usedCoupons: usedCouponsResult[0].total || 0,
        expiredCoupons: expiredCouponsResult[0].total || 0,
        activeCoupons: activeCouponsResult[0].total || 0,
        totalDiscount: ordersWithDiscountResult[0].total_discount || 0
      };
    } catch (error) {
      console.error('Hiba a kupon statisztikák lekérésekor:', error);
      throw error;
    }
  }
  
  
  async getCouponHistory() {
    try {
      const [registrationCoupons] = await this.db.execute(`
        SELECT 
          u.f_azonosito as userId,
          u.felhasznalonev as username,
          u.kupon as description,
          u.kupon_kod as code,
          u.kupon_hasznalva as isUsed,
          u.kupon_lejar as expiryDate,
          u.reg_datum as createdAt,
          'registration' as type,
          CASE 
            WHEN u.kupon LIKE '%5%' THEN 5
            WHEN u.kupon LIKE '%10%' THEN 10
            WHEN u.kupon LIKE '%15%' THEN 15
            WHEN u.kupon LIKE '%20%' THEN 20
            WHEN u.kupon LIKE '%25%' THEN 25
            ELSE 0
          END as discount
        FROM user u
        WHERE u.kupon IS NOT NULL
      `);
      
      const [emailCoupons] = await this.db.execute(`
        SELECT 
          u.f_azonosito as userId,
          u.felhasznalonev as username,
          u.email_kupon as description,
          SUBSTRING_INDEX(u.email_kupon, ':', -1) as code,
          u.email_kupon_hasznalva as isUsed,
          u.email_kupon_lejar as expiryDate,
          u.reg_datum as createdAt,
          'email' as type,
          CASE 
            WHEN u.email_kupon LIKE '%5%' THEN 5
            WHEN u.email_kupon LIKE '%10%' THEN 10
            WHEN u.email_kupon LIKE '%15%' THEN 15
            WHEN u.email_kupon LIKE '%20%' THEN 20
            WHEN u.email_kupon LIKE '%25%' THEN 25
            ELSE 0
          END as discount
        FROM user u
        WHERE u.email_kupon IS NOT NULL
      `);
      
     
      const allCoupons = [
        ...registrationCoupons.map(coupon => ({
          ...coupon,
          isExpired: coupon.expiryDate && new Date(coupon.expiryDate) < new Date()
        })),
        ...emailCoupons.map(coupon => ({
          ...coupon,
          isExpired: coupon.expiryDate && new Date(coupon.expiryDate) < new Date()
        }))
      ];
      
     
      allCoupons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return allCoupons;
    } catch (error) {
      console.error('Hiba a kupon történet lekérésekor:', error);
      throw error;
    }
  }
  
 
  async saveWheelPrize(userId, prize, couponCode) {
    try {
      
      const [existingCoupons] = await this.db.execute(
        'SELECT kupon, kupon_hasznalva, kupon_lejar FROM user WHERE f_azonosito = ?',
        [userId]
      );
      
      if (existingCoupons.length === 0) {
        throw new Error('Felhasználó nem található');
      }
      
      const user = existingCoupons[0];
      
     
      if (user.kupon && user.kupon_hasznalva === 0 && 
          (!user.kupon_lejar || new Date(user.kupon_lejar) > new Date())) {
        return false;
      }
      
      
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      
      
      const formattedExpiryDate = expiryDate.toISOString().slice(0, 19).replace('T', ' ');
      
    
      const [result] = await this.db.execute(
        'UPDATE user SET kupon = ?, kupon_kod = ?, kupon_hasznalva = 0, kupon_lejar = ? WHERE f_azonosito = ?',
        [prize, couponCode, formattedExpiryDate, userId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Hiba a nyeremény mentésekor:', error);
      throw error;
    }
  }
  
 
  async validateCoupon(code, userId) {
    try {
      
      if (userId) {
        const [user] = await this.db.execute(
          `SELECT 
            kupon, kupon_kod, kupon_hasznalva, kupon_lejar,
            email_kupon, email_kupon_hasznalva, email_kupon_lejar
          FROM user 
          WHERE f_azonosito = ?`,
          [userId]
        );
        
        if (user.length === 0) {
          return { valid: false, message: 'Felhasználó nem található' };
        }
        
        const userData = user[0];
        
       
        if (userData.kupon_kod === code) {
          if (userData.kupon_hasznalva === 1) {
            return { valid: false, message: 'Ez a kupon már fel lett használva' };
          }
          
         
          if (userData.kupon_lejar && new Date(userData.kupon_lejar) < new Date()) {
            return { valid: false, message: 'Ez a kupon már lejárt' };
          }
          
         
          let discount = 15; 
          if (userData.kupon && userData.kupon.includes('%')) {
            const discountMatch = userData.kupon.match(/(\d+)%/);
            if (discountMatch && discountMatch[1]) {
              discount = parseInt(discountMatch[1]);
            }
          }
        
          
        return { 
          valid: true, 
          discount, 
          type: 'registration' 
        };
      }
      
     
      let emailCouponCode = '';
      if (userData.email_kupon && userData.email_kupon.includes(':')) {
        emailCouponCode = userData.email_kupon.split(':')[1].trim();
      }
      
      if (emailCouponCode === code) {
        if (userData.email_kupon_hasznalva === 1) {
          return { valid: false, message: 'Ez a kupon már fel lett használva' };
        }
        
    
        if (userData.email_kupon_lejar && new Date(userData.email_kupon_lejar) < new Date()) {
          return { valid: false, message: 'Ez a kupon már lejárt' };
        }
        
       
        let discount = 15; 
        if (userData.email_kupon && userData.email_kupon.includes('%')) {
          const discountMatch = userData.email_kupon.match(/(\d+)%/);
          if (discountMatch && discountMatch[1]) {
            discount = parseInt(discountMatch[1]);
          }
        }
        
        return { 
          valid: true, 
          discount, 
          type: 'email' 
        };
      }
      
      return { valid: false, message: 'Érvénytelen kuponkód' };
    }
    
    
    const [users] = await this.db.execute(
      `SELECT 
        f_azonosito, kupon, kupon_kod, kupon_hasznalva, kupon_lejar,
        email_kupon, email_kupon_hasznalva, email_kupon_lejar
      FROM user 
      WHERE kupon_kod = ? OR email_kupon LIKE ?`,
      [code, `%${code}%`]
    );
    
    if (users.length === 0) {
      return { valid: false, message: 'Érvénytelen kuponkód' };
    }
    
  
    const user = users[0];
    
  
    if (user.kupon_kod === code) {
      if (user.kupon_hasznalva === 1) {
        return { valid: false, message: 'Ez a kupon már fel lett használva' };
      }
      
    
      if (user.kupon_lejar && new Date(user.kupon_lejar) < new Date()) {
        return { valid: false, message: 'Ez a kupon már lejárt' };
      }
      
      
      let discount = 15; 
      if (user.kupon && user.kupon.includes('%')) {
        const discountMatch = user.kupon.match(/(\d+)%/);
        if (discountMatch && discountMatch[1]) {
          discount = parseInt(discountMatch[1]);
        }
      }
      
      return { 
        valid: true, 
        discount, 
        type: 'registration',
        userId: user.f_azonosito
      };
    }
    
   
    let emailCouponCode = '';
    if (user.email_kupon && user.email_kupon.includes(':')) {
      emailCouponCode = user.email_kupon.split(':')[1].trim();
    }
    
    if (emailCouponCode === code) {
      if (user.email_kupon_hasznalva === 1) {
        return { valid: false, message: 'Ez a kupon már fel lett használva' };
      }
      
    
      if (user.email_kupon_lejar && new Date(user.email_kupon_lejar) < new Date()) {
        return { valid: false, message: 'Ez a kupon már lejárt' };
      }
      
      
      let discount = 15; 
      if (user.email_kupon && user.email_kupon.includes('%')) {
        const discountMatch = user.email_kupon.match(/(\d+)%/);
        if (discountMatch && discountMatch[1]) {
          discount = parseInt(discountMatch[1]);
        }
      }
      
      return { 
        valid: true, 
        discount, 
        type: 'email',
        userId: user.f_azonosito
      };
    }
    
    return { valid: false, message: 'Érvénytelen kuponkód' };
  } catch (error) {
    console.error('Hiba a kupon érvényesítésekor:', error);
    throw error;
  }
}

async validateCoupon(code, userId) {
  try {
    console.log(`Kupon validálás kezdete: Kód=${code}, UserId=${userId}`);
    
    
    const normalizedCode = String(code).trim().toUpperCase();
    
    
    const [regCoupons] = await this.db.execute(
      'SELECT f_azonosito, felhasznalonev, kupon, kupon_kod, kupon_lejar, kupon_hasznalva FROM user WHERE kupon_kod = ?',
      [normalizedCode]
    );
    
    console.log('Regisztrációs kupon keresés eredménye:', regCoupons);
    
    
    if (regCoupons.length > 0) {
      const coupon = regCoupons[0];
      
      
      if (coupon.f_azonosito !== userId) {
        console.log('A kupon más felhasználóhoz tartozik');
        return { valid: false, reason: 'not_your_coupon', message: 'Ez a kupon nem a te fiókodhoz tartozik' };
      }
      
      
      if (coupon.kupon_hasznalva) {
        console.log('A kupon már fel lett használva');
        return { valid: false, reason: 'already_used', message: 'Ez a kupon már fel lett használva' };
      }
      
      
      if (coupon.kupon_lejar && new Date(coupon.kupon_lejar) < new Date()) {
        console.log('A kupon lejárt');
        return { valid: false, reason: 'expired', message: 'Ez a kupon már lejárt' };
      }
      
      
      let discountPercentage = 15;
      if (coupon.kupon && coupon.kupon.includes('%')) {
        const match = coupon.kupon.match(/(\d+)%/);
        if (match && match[1]) {
          discountPercentage = parseInt(match[1]);
        }
      } else if (coupon.kupon === 'Nincs nyeremény') {
        console.log('Nincs kedvezmény');
        return { valid: false, reason: 'no_discount', message: 'Ez a kupon nem tartalmaz kedvezményt' };
      }
      
      console.log(`Érvényes regisztrációs kupon: ${discountPercentage}% kedvezmény`);
      return { 
        valid: true, 
        type: 'registration',
        discount: discountPercentage
      };
    }
    
   
    const [emailCoupons] = await this.db.execute(
      'SELECT f_azonosito, felhasznalonev, email_kupon, email_kupon_kod, email_kupon_lejar, email_kupon_hasznalva FROM user WHERE email_kupon_kod = ?',
      [normalizedCode]
    );
    
    console.log('Email kupon keresés eredménye:', emailCoupons);
    
   
    if (emailCoupons.length > 0) {
      const coupon = emailCoupons[0];
      
     
      if (coupon.f_azonosito !== userId) {
        console.log('A kupon más felhasználóhoz tartozik');
        return { valid: false, reason: 'not_your_coupon', message: 'Ez a kupon nem a te fiókodhoz tartozik' };
      }
      
     
      if (coupon.email_kupon_hasznalva) {
        console.log('A kupon már fel lett használva');
        return { valid: false, reason: 'already_used', message: 'Ez a kupon már fel lett használva' };
      }
      
      
      if (coupon.email_kupon_lejar && new Date(coupon.email_kupon_lejar) < new Date()) {
        console.log('A kupon lejárt');
        return { valid: false, reason: 'expired', message: 'Ez a kupon már lejárt' };
      }
      
      
      let discountPercentage = 10; 
      if (coupon.email_kupon && coupon.email_kupon.includes('%')) {
        const match = coupon.email_kupon.match(/(\d+)%/);
        if (match && match[1]) {
          discountPercentage = parseInt(match[1]);
        }
      }
      
      console.log(`Érvényes email kupon: ${discountPercentage}% kedvezmény`);
      return { 
        valid: true, 
        type: 'email',
        discount: discountPercentage
      };
    }
    
    
    console.log('Nem található kupon ezzel a kóddal');
    return { valid: false, reason: 'invalid_code', message: 'Érvénytelen kuponkód' };
  } catch (error) {
    console.error('Hiba a kupon ellenőrzésekor:', error);
    return { valid: false, reason: 'database_error', message: 'Adatbázis hiba történt' };
  }
}
}

export default CouponModel;
