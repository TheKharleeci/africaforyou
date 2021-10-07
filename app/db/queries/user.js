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
  };
  