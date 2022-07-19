const express = require('express')

const router = express.Router();

router.get('/:uid', (req, res, next) => {
    const userId = req.params.uid //{uid: u1}

    res.json({message: 'It Worked'})
})



module.exports =  router