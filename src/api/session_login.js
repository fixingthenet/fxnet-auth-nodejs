import jwt from 'jsonwebtoken'
import fs from 'fs'

// https://github.com/auth0/node-jsonwebtoken
const cert= fs.readFileSync('config/secrets/key.pem');
const exp='7d';
const issuer='https://dev-auth2.fixingthe.net/';

export default async function(_root, ctx, login, password) {

    if (login && password) {
        var user = await ctx.models.User.findOne({where: { login: login}});
        if (user && user.validPassword(password)) {
            var token = jwt.sign(
                { user: { id: user.id
                        }
                },
                cert,
                { algorithm: 'RS256',
                  expiresIn: exp,
                  issuer: issuer
                }
            )
            return { token: token }
        } else {
            return {
                errors: {
                    base: "NOT_FOUND"
                }}
        }
    } else {
        return { errors: {
            fields: [
                {name: "login", errors: ["MISSING"]},
                {name: "password", errors: ["MISSING"]}
            ]
        }}
    }
}
