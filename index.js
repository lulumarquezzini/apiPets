const express = require('express');
const cors = require('cors')
const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRoutes = require('./src/routes/userRoute');
const productRoutes = require('./src/routes/productRoute');
const checkToken = require('./src/utils/checkToken');

app.use('/api/v1', userRoutes);
app.use('/api/v1', checkToken, productRoutes);

// Custom server error handler
app.use((err, req, res, next) => {
    if (err) {
        console.error(err.message)
        if (!err.statusCode) {err.statusCode = 500} // Set 500 server code error if statuscode not set
        return res.status(err.statusCode).send({
          status: err.statusCode,
          message: err.message
        })
    }
    next();
})

const port = 3000;

app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});

