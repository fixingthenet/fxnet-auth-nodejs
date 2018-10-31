export default async function(env,req,res) {
    res.type('json');

    var user = await env.models.User.findById(req.params.id);
    if (user) {
        res.send({ status: "ok",
                   result: {
                       login: user.login }})
    } else {
        res.status(404).send({ status: "error",
                               errors: {
                                   base: "NOT_FOUND"
                               }})
    }
}
