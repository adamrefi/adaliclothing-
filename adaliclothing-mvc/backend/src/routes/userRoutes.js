import express from 'express';


const router = express.Router();


export default (userController) => {
 
  router.get('/users', userController.getAllUsers.bind(userController));
  

  router.delete('/users/:id', userController.deleteUser.bind(userController));
  

  router.post('/profile-image', userController.uploadProfileImage.bind(userController));


  router.get('/profile-image/:username', userController.getProfileImage.bind(userController));

  
  router.get('/check-user/:username', userController.checkUser.bind(userController));


  router.post('/mark-coupon-used', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email cím megadása kötelező' });
      }
      
      const [result] = await db.execute(
        'UPDATE user SET kupon_hasznalva = 1 WHERE email = ?',
        [email]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Felhasználó nem található' });
      }
      
      res.json({ success: true, message: 'Kupon sikeresen felhasználva' });
    } catch (error) {
      console.error('Hiba a kupon használat jelzésekor:', error);
      res.status(500).json({ error: 'Szerver hiba történt' });
    }
  });
  

  router.post('/mark-email-coupon-used', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email cím megadása kötelező' });
      }
      
      const [result] = await db.execute(
        'UPDATE user SET email_kupon_hasznalva = 1 WHERE email = ?',
        [email]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Felhasználó nem található' });
      }
      
      res.json({ success: true, message: 'Email kupon sikeresen felhasználva' });
    } catch (error) {
      console.error('Hiba az email kupon használat jelzésekor:', error);
      res.status(500).json({ error: 'Szerver hiba történt' });
    }
  });

  router.get('/user-coupons/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      
      if (!userId) {
        return res.status(400).json({ error: 'Felhasználó azonosító szükséges' });
      }
      
      const [rows] = await db.execute(
        'SELECT kupon, kupon_hasznalva, email_kupon, email_kupon_hasznalva FROM user WHERE f_azonosito = ?',
        [userId]
      );
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Felhasználó nem található' });
      }
      
      res.json(rows[0]);
    } catch (error) {
      console.error('Hiba a kupon adatok lekérésekor:', error);
      res.status(500).json({ error: 'Szerver hiba történt' });
    }
  });

  return router;
};
