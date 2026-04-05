In detail breakthrough of authentication in backend using passport-jwt:

1. We need three packages: passport, passport-jwt and jsonwebtoken
2. passport is the packakge for default authentication
3. passport-jwt is for telling passport which strategy to use (here JWT)
4. jsonwebtoken is for signing tokens


Workflow:

# 1. The configuration: congig/passport.ts

```ts
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import queries from "../db/queries";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUBLIC_KEY as string,
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
```

- Here, we are doing tow things:
1. using jwtstrategy (passport.use(new JWTStratetgy(...)))
2. Letting passport know that when verifying, the token will be stored inside auth header as bearer token
    (jwtFromRequetst: ExtractJWT.fromAuthHeaderAsBearerToken())

- Then inside the callback function, we are defining how to use that extracted jwt token to verify if the user actually exists or not



# 2. the issuing of tokens

- pasport can authenticate once it receives a token, but to issue a jwt token, we need another package: jsonwebtoken
- creating a token: auth/createToken.ts

```ts
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
```

Here we are taking a user obj and then creating a token with sub = user.id

then using the jsonwebtoken module to sign the token and return it

- Inside login and register controllers, we are then calling the above function to create the token and send it to the frontend

```ts
const token = createToken(user);

  res.status(200).json({
    message: `User logged in succesfully`,
    token: token,
  });
```


# 3. Finally, we are importing the config inside app.ts and initializing the strategy:

app.ts (main file):

```ts
import "./config/passport";
```

- The above line is to import the config and let our express app know how to configure the passport scheme

```ts
app.use(passport.initialize());
```

- The above line is to finally initialize the passport scheme and get it working


# 4. Locking the protected routes:

The protected routes are locked using passport.authenticate():

```ts
router.get(
  "/dashboard",
  passport.authenticate("jwt", {
    session: false,
  }),
  controller.getDashboard,
);s
```


# 5. TLDR;

1. Create a config file which tells passport what strategy to use (here JWT), and how to deal with an incoming token to authenticate
2. Use jsonwebtoken package to create a token in the login and register controllers
3. import the config file and do passport.initialize() in the main file (app.ts)
4. Lock the protected routes using passport.authenticate()