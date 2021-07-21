const authSubject = 'API_AUTHORIZATION_TOKEN';

export const requiredAuth = async (req) =>
  req.jwtVerify({ subject: authSubject });

export const optionalAuth = async (req) => {
  try {
    await req.jwtVerify({ subject: authSubject });
  } catch (error) {
    // do nothing
  }
};

export function createToken({ user, jwt }) {
  return jwt.sign(
    { userId: user.id, iat: Date.now() },
    { subject: authSubject },
  );
}
