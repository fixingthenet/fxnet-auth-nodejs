export default async function(env,req,res) {
    res.type('json');

    var params=req.body;
    if (params.login && params.password) {
    var user = await env.models.User.findOne({where: { login: params.login}});

        if (user && user.validPassword(params.password)) {
        res.send({ status: "ok",
                   result: {
                       id: user.id,
                       login: user.login }})
    } else {
        res.status(404).send({ status: "error",
                               errors: {
                                   base: "NOT_FOUND"
                               }})
    }
    } else {
        res.status(400).send({ status: "error",
                               errors: {
                                   login: "MISSING",
                                   passowrd: "MISSING"
                               }})
    }
}
