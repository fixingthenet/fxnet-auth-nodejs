export default async function(_root, ctx, login, password) {

    if (login && password) {
        var user = await ctx.models.User.findOne({where: { login: login}});
        if (user && user.validPassword(password)) {
            return { token: 'okokok2'}
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
