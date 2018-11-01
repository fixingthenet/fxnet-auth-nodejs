export default async function(env,req,res) {
    res.type('json');

    var user = await env.models.User.findByPk(req.params.id);
    if (user) {
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
}
