import jwt from "jsonwebtoken";

export default function createToken(user: any) {
  const currentTimeinSeconds = Math.floor(Date.now() / 1000);

  const payload = {
    sub: String(user.id),
    iat: currentTimeinSeconds,
    exp: currentTimeinSeconds + 24 * 60 * 60,
  };

  return jwt.sign(payload, process.env.PRIVATE_KEY as string, {
    algorithm: "RS256",
  });
}
