import bcrypt from 'bcryptjs';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const password = await bcrypt.hash('admin', 8);

  await connection.query(
    `INSERT INTO users (name, email, hashed_password, is_admin)
      VALUES ('admin', 'admin', '${password}', true)
    `,
  );

  await connection.close();
}

create().then(() => {
  console.log('User Created');
});
