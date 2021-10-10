export default {
    saveUser: `
     INSERT INTO user_info (
      id,
      name,
      email,
      password,
      salt,
      phone_number
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `,
    updateUserVerificationStatus: `
    UPDATE user_info
    SET is_verified = true,
    updated_at = NOW()
    WHERE id = $1
    RETURNING id;
  `,
  findUserByEmail: `
    SELECT id, name,email,
    password, salt, phone_number
    from user_info
    WHERE email = $1;
  `,
  fetchUserById: `SELECT id, first_name, last_name, email, username, reset_pin,
  password, salt, type, phone_number,is_verified FROM user_info WHERE id=$1;`,
  updatePassword: `UPDATE user_info SET password=$1, salt=$2, updated_at=NOW() WHERE id = $3
  RETURNING id, first_name, last_name, email, phone_number`,
  updateUserResetPin: `UPDATE user_info SET reset_pin=$1, updated_at=NOW() WHERE id = $2
  RETURNING id, reset_pin, last_name, email, phone_number`,
  updateUserProfileById: `UPDATE user_info SET first_name = $2, last_name = $3,
  phone_number = $4, updated_at = NOW() WHERE id = $1 RETURNING id`,
  fetchAllUserEmailAndName: 'SELECT email, first_name FROM user_info',
  fetchIfUserExists:
    'SELECT id FROM user_info WHERE email = $/email/ OR phone_number=$/phoneNumber/;'
  };
  