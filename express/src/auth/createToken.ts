import jwt from "jsonwebtoken";

export default function createToken(user: any) {
  const currentTimeinSeconds = Math.floor(Date.now() / 1000);

  const payload = {
    sub: String(user.id),
    iat: currentTimeinSeconds,
    exp: currentTimeinSeconds + 24 * 60 * 60,
  };

  const privateKey = Buffer.from(
    process.env.PRIVATE_KEY as string,
    "base64url",
  ).toString();

  console.log(privateKey);

  return jwt.sign(
    payload,
    { key: privateKey, passphrase: "top secret" },
    {
      algorithm: "RS256",
    },
  );
}
