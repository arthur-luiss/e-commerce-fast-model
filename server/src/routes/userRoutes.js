const express = require('express');
const pool = require('../database/db');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
  if (!/^[1-9]\d*$/.test(req.user.sub)) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }

  const userId = Number(req.user.sub);
  if (!Number.isSafeInteger(userId) || userId < 1 || userId > 2147483647) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, email, created_at
       FROM users
       WHERE id = $1`,
      [userId],
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return res.status(500).json({
      message: 'Não foi possível carregar o perfil do usuário.',
    });
  }
});

module.exports = router;
