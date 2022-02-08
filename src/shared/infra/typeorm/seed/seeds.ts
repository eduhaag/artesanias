/* eslint-disable eqeqeq */
import bcrypt from 'bcryptjs';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const password = await bcrypt.hash('admin', 8);

  // Users
  await connection.query('SELECT COUNT(id) FROM users').then(async elements => {
    if (elements[0].count == 0) {
      await connection
        .query(
          `INSERT INTO users (name, email, hashed_password, is_admin)
        VALUES ('admin', 'admin', '${password}', true)
      `,
        )
        .then(() => console.log('Users created.'));
    }
  });

  // BankAccount
  await connection
    .query('SELECT COUNT(id) FROM bank_accounts')
    .then(async elements => {
      if (elements[0].count == 0) {
        await connection
          .query(
            `INSERT INTO bank_accounts (name, starting_balance, is_fixed)
          VALUES ('Carteira', 0.00, true)
        `,
          )
          .then(() => console.log('Bank accounts created.'));
      }
    });

  // Sale Status
  await connection
    .query('SELECT COUNT(id) FROM sale_status')
    .then(async elements => {
      if (elements[0].count == 0) {
        await connection
          .query(
            `INSERT INTO sale_status (name, description, color, is_fixed)
          VALUES ('Novo', 'Pedido novo', '808080' , true), ('Finalizado', 'Pedido finalizado', '3CB371', true), ('Cancelado', 'Pedido Cancelado', 'B22222', true )
        `,
          )
          .then(() => console.log('Sale status created.'))
          .catch(e => console.log(e));
      }
    });

  await connection.close();
}

create().then(() => {
  console.log('Seeds executed');
});
