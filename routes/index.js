const mainRoutes = require('./mainRoutes');


const constructorMethod = app => {
    app.use("/", mainRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error:'Not found'});
      });
};

module.exports = constructorMethod;