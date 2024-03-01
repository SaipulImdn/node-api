const connection = require('../../db');
const bcrypt = require('bcryptjs');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        },
      );
    });
  }

  async save() {
    try {
      // Hash password before saving to database
      const hashedPassword = await bcrypt.hash(this.password, 10);

      // Save user to database
      const result = await connection.query('INSERT INTO users SET ?', {
        username: this.username,
        password: hashedPassword,
      });

      return result;
    } catch (error) {
      throw new Error('Error saving user to database');
    }
  }
}

module.exports = User;
