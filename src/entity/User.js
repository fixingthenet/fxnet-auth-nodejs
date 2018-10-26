module.exports = {
    name: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: "varchar"
        },
     }
};
