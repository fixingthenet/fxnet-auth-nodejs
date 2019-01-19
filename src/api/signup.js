import tokenHandler from '../lib/tokenHandler'
import config from '../lib/config'

export default async function(_root, ctx, login, password) {
    if (config.signupsForbidden) {
        return {
            success: false,
            errors: {
                base: 'SIGNUPS_FORBIDDEN'
            }
        }
    }
    if (login && password) {
        var [user,created] = await ctx.models.User.findOrCreate(
            {
                where: { login: login},
                defaults: { password: password}
            }
        );
        console.log("signup user.id, created: ", user.id, created)

        if (created) {
            return {
                success: true
            }
        } else {
            return {
                success: false,
                errors: {
                    base: 'USER_EXISTS'
                }
            }
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
