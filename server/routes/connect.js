var router = require('express').Router();

const {connexion} = require ('../controllers/usersController');

router.post('/', connexion, (req, res, next) => {
    
    const token = generateAccessToken({username: req.body.univID});
    res.json({univId: req.body.univID, auth: token}); 
});


module.exports = router;