import jwt from 'jsonwebtoken'

export default async function(_root, ctx,
                              login,
                              currentPassword,
                              newPassword,
                              newPasswordConfirmation) {
//    console.log("ctx:", ctx)
    var user = await ctx.models.User.findOne({where: {login: login}})
    if (user.login != ctx.secCtx.user.login) {
        return {
            success: false,
            errors: {
                base: "AUTHORIZATION_ERROR",
                fields: [ ]
            }
        }
    }
    if (currentPassword && newPassword && newPasswordConfirmation) {
        if (user.validPassword(currentPassword)) {
            if (newPassword == newPasswordConfirmation) {
                // TODO: password rules
                user.password=newPassword
                await user.save()
                return { success: true }
            } else {
                return {
                    success: false,
                    errors: {
                    fields: [
                        {name: "currentPasswordConfirmation",
                         errors: ["DIFFERS_FROM_PASSWORD_CONFIRMATION"]}]
                    }}
            }
        } else {
            return {
                success: false,
                errors: {
                    fields: [
                        {name: "currentPassword",
                         errors: ["WRONG_PASSWORD"]}
                    ]
                }}
        }

    } else {
        return {
            success: false,
            errors: {
            fields: [
                {name: "currentPassword", errors: ["MISSING"]},
                {name: "newPassword", errors: ["MISSING"]},
                {name: "newPasswordConfirmation", errors: ["MISSING"]}
            ]
        }}
    }
}
