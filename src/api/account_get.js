export default async function(env,req,res) {
    res.type('json');
    var userRepo=env.db.getRepository("users");
    var user = await userRepo.findOne(req.params.id);
    if (user) {
        res.send({ status: "ok",
                   result: {
                       login: user.email }})
    } else {
        res.status(404).send({ status: "error",
                               errors: {
                                   base: "NOT_FOUND"
                               }})
    }
}
