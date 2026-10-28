const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authorization = req.get('Authorization');

  if (!authorization) {
    return res.status(401).json({ message: 'Acesso negado. Token não informado.' });
  }

  const [scheme, token, ...extraParts] = authorization.trim().split(/\s+/);
  if (scheme !== 'Bearer' || !token || extraParts.length > 0) {
    return res.status(401).json({
      message: 'Acesso negado. Envie o token no formato Bearer.',
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET não está configurado.');
    return res.status(500).json({
      message: 'Não foi possível validar a autenticação.',
    });
  }

  try {
    const user = jwt.verify(token, secret);
    if (
      typeof user !== 'object' ||
      user === null ||
      typeof user.sub !== 'string' ||
      !user.sub
    ) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    return next(error);
  }
}

module.exports = { verifyToken };
