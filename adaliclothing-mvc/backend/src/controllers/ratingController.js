class RatingController {
  constructor(ratingModel, db) {  // Adj hozzá egy db paramétert
    this.ratingModel = ratingModel;
    this.db = db;  // Inicializáld a db objektumot
  }

  async getAllRatings(req, res) {
    try {
      const ratings = await this.ratingModel.getAllRatings();
      res.json(ratings);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Adatbázis hiba' });
    }
  }

  async saveRating(req, res) {
    try {
      const { rating, email, velemeny } = req.body;
      const userId = await this.ratingModel.getUserIdByEmail(email);
      
      if (!userId) {
        return res.status(404).json({ error: 'Felhasználó nem található' });
      }
      
      await this.ratingModel.createRating({ userId, rating, velemeny });
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Mentési hiba' });
    }
  }

  async addRating(req, res) {
    try {
      const { felhasznalonev, rating, velemeny } = req.body;
      console.log('Received rating data:', { felhasznalonev, rating, velemeny });
      
      // Ellenőrizzük, hogy a felhasználónév meg van-e adva
      if (!felhasznalonev) {
        return res.status(400).json({ success: false, error: 'Felhasználónév megadása kötelező' });
      }
      
      const userId = await this.ratingModel.getUserIdByUsername(felhasznalonev);
      console.log('User ID found:', userId);
      
      if (!userId) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      await this.ratingModel.createRating({ userId, rating, velemeny });
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  }

  async updateRating(req, res) {
    try {
      const { rating, velemeny } = req.body;
      const ratingId = req.params.id;
      
      await this.ratingModel.updateRating(ratingId, { rating, velemeny });
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  }

  async deleteRating(req, res) {
    try {
      const ratingId = req.params.id;
      await this.ratingModel.deleteRating(ratingId);
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Adatbázis hiba' });
    }
  }

  // Új metódusok a felhasználói értékelésekhez
  async getUserIdByUsername(req, res) {
    try {
      const { username } = req.params;
      console.log(`Felhasználó ID lekérése: ${username}`);
      
      const userId = await this.ratingModel.getUserIdByUsername(username);
      
      if (!userId) {
        console.log(`Nem található felhasználó: ${username}`);
        return res.status(404).json({ 
          success: false, 
          error: 'Felhasználó nem található' 
        });
      }
      
      console.log(`Felhasználó ID: ${userId} (${username})`);
      res.json({ 
        success: true, 
        userId 
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Adatbázis hiba' 
      });
    }
  }

  async getUserRatings(req, res) {
    try {
      const userId = req.params.userId;
      console.log(`Értékelések lekérése: ${userId}`);
      
      // Ellenőrizzük, hogy a ratings táblában van-e rated_user_id oszlop
      const hasRatedUserColumn = await this.ratingModel.checkRatedUserColumn();
      
      let ratings = [];
      let avgRating = 0;
      let count = 0;
      
      if (hasRatedUserColumn) {
        // Ha van rated_user_id oszlop, akkor az alapján kérjük le az értékeléseket
        const result = await this.ratingModel.getUserRatingsByRatedUserId(userId);
        ratings = result.ratings;
        avgRating = result.avgRating;
        count = result.count;
      } else {
        // Ha nincs rated_user_id oszlop, akkor a felhasználó által adott értékeléseket kérjük le
        // Ez nem ideális, de átmeneti megoldásként működhet
        const result = await this.ratingModel.getUserRatingsByUserId(userId);
        ratings = result.ratings;
        avgRating = result.avgRating;
        count = result.count;
      }
      
      console.log(`Értékelések száma: ${count}, átlag: ${avgRating}`);
      res.json({
        success: true,
        ratings,
        avgRating,
        count
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Adatbázis hiba' 
      });
    }
  }

  async getUserRatings(req, res) {
    try {
      const userId = req.params.userId;
      const result = await this.ratingModel.getUserRatings(userId);
      
      res.json({
        success: true,
        ratings: result.ratings,
        avgRating: result.avgRating,
        count: result.count
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Adatbázis hiba' });
    }
  }

  async addUserRating(req, res) {
    try {
      const { raterUsername, ratedUsername, rating, velemeny } = req.body;
      console.log('Received user rating data:', { raterUsername, ratedUsername, rating, velemeny });
      
      // Ellenőrizzük, hogy a felhasználónevek meg vannak-e adva
      if (!raterUsername || !ratedUsername) {
        return res.status(400).json({ 
          success: false, 
          error: 'Mindkét felhasználónév megadása kötelező' 
        });
      }
      
      // Lekérjük a felhasználók azonosítóit
      const raterUserId = await this.ratingModel.getUserIdByUsername(raterUsername);
      console.log('Rater user ID:', raterUserId, 'for username:', raterUsername);
      
      const ratedUserId = await this.ratingModel.getUserIdByUsername(ratedUsername);
      console.log('Rated user ID:', ratedUserId, 'for username:', ratedUsername);
      
      if (!raterUserId) {
        return res.status(404).json({ 
          success: false, 
          error: `Értékelő felhasználó nem található: "${raterUsername}"` 
        });
      }
      
      if (!ratedUserId) {
        return res.status(404).json({ 
          success: false, 
          error: `Értékelt felhasználó nem található: "${ratedUsername}"` 
        });
      }
      
      // Ellenőrizzük, hogy a felhasználó nem értékeli-e saját magát
      if (raterUserId === ratedUserId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Nem értékelheted saját magad' 
        });
      }
      
      // Ellenőrizzük, hogy létezik-e már értékelés a két felhasználó között
      // FONTOS: Ne használd a this.db.execute() hívást, hanem a ratingModel-t!
      // Adj hozzá egy új metódust a ratingModel-hez:
      try {
        const existingRating = await this.ratingModel.getUserRating(raterUserId, ratedUserId);
        
        if (existingRating) {
          return res.status(400).json({ 
            success: false, 
            error: `Már létezik értékelés a(z) "${raterUsername}" és "${ratedUsername}" felhasználók között` 
          });
        }
      } catch (error) {
        console.error('Error checking existing ratings:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Hiba az értékelések ellenőrzésekor: ' + error.message 
        });
      }
      
      // Hozzáadjuk az értékelést
      try {
        await this.ratingModel.createUserRating({ raterUserId, ratedUserId, rating, velemeny });
        res.json({ success: true });
      } catch (error) {
        console.error('Error creating user rating:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ 
            success: false, 
            error: `Már létezik értékelés a(z) "${raterUsername}" és "${ratedUsername}" felhasználók között` 
          });
        }
        
        return res.status(500).json({ 
          success: false, 
          error: 'Hiba az értékelés létrehozásakor: ' + error.message 
        });
      }
    } catch (error) {
      console.error('Database error in addUserRating:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Adatbázis hiba: ' + error.message 
      });
    }
  }
  
  

  async getAllRatings(req, res) {
    try {
      const ratings = await this.ratingModel.getAllRatings();
      res.json(ratings);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Adatbázis hiba' });
    }
  }
  
  async saveUserRating(req, res) {
    try {
      const { raterUsername, ratedUsername, rating, velemeny } = req.body;
      
      // Get user IDs from usernames
      const raterId = await this.ratingModel.getUserIdByUsername(raterUsername);
      const ratedId = await this.ratingModel.getUserIdByUsername(ratedUsername);
      
      if (!raterId || !ratedId) {
        return res.status(404).json({ success: false, error: 'One or both users not found' });
      }
      
      // Save the rating
      await this.ratingModel.createUserRating({ 
        raterId, 
        ratedId, 
        rating, 
        velemeny 
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  }
  
  async addUserRating(req, res) {
    try {
      const { raterUsername, ratedUsername, rating, velemeny } = req.body;
      console.log('Received user rating data:', { raterUsername, ratedUsername, rating, velemeny });
      
      // Ellenőrizzük, hogy a felhasználónevek meg vannak-e adva
      if (!raterUsername || !ratedUsername) {
        return res.status(400).json({ 
          success: false, 
          error: 'Mindkét felhasználónév megadása kötelező' 
        });
      }
      
      // Lekérjük a felhasználók azonosítóit
      const raterUserId = await this.ratingModel.getUserIdByUsername(raterUsername);
      console.log('Rater user ID:', raterUserId, 'for username:', raterUsername);
      
      const ratedUserId = await this.ratingModel.getUserIdByUsername(ratedUsername);
      console.log('Rated user ID:', ratedUserId, 'for username:', ratedUsername);
      
      if (!raterUserId) {
        return res.status(404).json({ 
          success: false, 
          error: `Értékelő felhasználó nem található: "${raterUsername}"` 
        });
      }
      
      if (!ratedUserId) {
        return res.status(404).json({ 
          success: false, 
          error: `Értékelt felhasználó nem található: "${ratedUsername}"` 
        });
      }
      
      // Ellenőrizzük, hogy a felhasználó nem értékeli-e saját magát
      if (raterUserId === ratedUserId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Nem értékelheted saját magad' 
        });
      }
      
      // Ellenőrizzük, hogy létezik-e már értékelés a két felhasználó között
      try {
        const existingRating = await this.ratingModel.getUserRating(raterUserId, ratedUserId);
        
        if (existingRating) {
          return res.status(400).json({ 
            success: false, 
            error: `Már létezik értékelés a(z) "${raterUsername}" és "${ratedUsername}" felhasználók között` 
          });
        }
      } catch (error) {
        console.error('Error checking existing ratings:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Hiba az értékelések ellenőrzésekor: ' + error.message 
        });
      }
      
      // Hozzáadjuk az értékelést
      try {
        await this.ratingModel.createUserRating({ raterUserId, ratedUserId, rating, velemeny });
        res.json({ success: true });
      } catch (error) {
        console.error('Error creating user rating:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ 
            success: false, 
            error: `Már létezik értékelés a(z) "${raterUsername}" és "${ratedUsername}" felhasználók között` 
          });
        }
        
        return res.status(500).json({ 
          success: false, 
          error: 'Hiba az értékelés létrehozásakor: ' + error.message 
        });
      }
    } catch (error) {
      console.error('Database error in addUserRating:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Adatbázis hiba: ' + error.message 
      });
    }
  }
  
 
  
  async updateUserRating(req, res) {
    try {
      const ratingId = req.params.id;
      const { rating, velemeny } = req.body;
      
      await this.ratingModel.updateUserRating(ratingId, { rating, velemeny });
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, error: 'Adatbázis hiba' });
    }
  }
  
  async deleteUserRating(req, res) {
    try {
      const ratingId = req.params.id;
      await this.ratingModel.deleteUserRating(ratingId);
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, error: 'Adatbázis hiba' });
    }
  }

  async getAllUserRatings(req, res) {
    try {
      const userRatings = await this.ratingModel.getAllUserRatings();
      res.json(userRatings);
    } catch (error) {
      console.error('Database error in getAllUserRatings:', error);
      res.status(500).json({ error: 'Adatbázis hiba: ' + error.message });
    }
  }
  
  async orderFeedback(req, res) {
    try {
      const { email, username, rating, velemeny } = req.body;
      console.log('Received order feedback:', { email, username, rating, velemeny });
      
      // Először próbáljuk meg email alapján megtalálni a felhasználót
      let userId = null;
      if (email) {
        userId = await this.ratingModel.getUserIdByEmail(email);
      }
      
      // Ha email alapján nem találtuk meg, próbáljuk meg felhasználónév alapján
      if (!userId && username) {
        userId = await this.ratingModel.getUserIdByUsername(username);
      }
      
      if (!userId) {
        return res.status(404).json({ 
          success: false, 
          error: 'Felhasználó nem található' 
        });
      }
      
      // Mentjük az értékelést
      await this.ratingModel.createRating({ userId, rating, velemeny });
      
      res.json({ success: true, message: 'Értékelés sikeresen mentve' });
    } catch (error) {
      console.error('Error in orderFeedback:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Adatbázis hiba: ' + error.message 
      });
    }
  }
}

export default RatingController;