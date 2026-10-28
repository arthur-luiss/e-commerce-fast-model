const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');

const SALT_ROUNDS = 12;

function createToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET não está configurado.');
  }

  return jwt.sign(
    { sub: String(user.id), email: user.email },
    secret,
    { expiresIn: '1d' },
  );
}

async function register(req, res) {
  const { name, email, password } = req.body || {};

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: 'Informe nome, e-mail e uma senha com pelo menos 8 caracteres.',
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), normalizedEmail, passwordHash],
    );
    const user = result.rows[0];
    const token = createToken(user);

    return res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }

    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({ message: 'Não foi possível cadastrar o usuário.' });
  }
}

async function login(req, res) {
  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({ message: 'Informe e-mail e senha.' });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, email, password_hash, created_at
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()],
    );
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    const { password_hash: passwordHash, ...safeUser } = user;
    const token = createToken(safeUser);

    return res.status(200).json({ user: safeUser, token });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return res.status(500).json({ message: 'Não foi possível realizar o login.' });
  }
}

module.exports = { register, login };
