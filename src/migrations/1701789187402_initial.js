/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(
    `CREATE TABLE users (
      user_id SERIAL PRIMAY KEY,
      name VARCHAR(20),
      last_name VARCHAR(20),
      username VARCHAR(20),
      password VARCHAR(80),
      mail VARCHAR(50),
      title VARCHAR(50),
      about TEXT,
      birthday DATE,
      creation_date DATE,
      update_date DATE
    );
    
    CREATE TABLE followers (
      user_id INT,
      follower_id INT,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
	        REFERENCES users(user_id),
      CONSTRAINT fk_user_follower
        FOREIGN KEY(follower_id) 
	        REFERENCES users(user_id),
    );`,
  );
};

exports.down = pgm => {
  pgm.sql(
    `
    DROP TABLE users;
    DROP TABLE followers;
    `,
  );
};
