export default async function(env,req,res) {
    res.type('json');
    //console.log(req);
    var userRepo=env.db.getRepository("users");
    var user = await userRepo.findOne(req.params.id);
    //console.log(user);
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
