import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import queries from "../db/queries";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Buffer.from(
    process.env.PUBLIC_KEY as string,
    "base64url",
  ).toString(),
  algorithms: ["RS256" as const],
};

passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    if (!jwtPayload.sub || isNaN(jwtPayload.sub))
      return done(null, false, "Incomplete token");

    const userId = +jwtPayload.sub;

    const user = await queries.getUserByID(userId);
    if (!user) return done(null, false, "User not found");

    return done(null, user);
  }),
);
