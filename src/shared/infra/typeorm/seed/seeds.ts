import bcrypt from 'bcryptjs';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const password = await bcrypt.hash('admin', 8);

  await connection
    .query(
      `INSERT INTO users (name, email, hashed_password, is_admin)
      VALUES ('admin', 'admin', '${password}', true)
    `,
    )
    .then(() => console.log('Users created.'));

  await connection
    .query(
      `INSERT INTO bank_accounts (name, starting_balance, is_fixed)
      VALUES ('Carteira', 0.00, true)
    `,
    )
    .then(() => console.log('Bank accounts created.'));

  await connection.close();
}

create().then(() => {
  console.log('Seeds executed');
});
