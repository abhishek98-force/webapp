const express = require('express');
const {User} = require('../../models');

const router = express.Router();

router.put('/:token', async (req, res) => {
    console.log(req.params.username);
    const user = await User.findOne({ where: { id: req.params.token } });
    user.isVerified = true;
    await user.save();
    res.status(200).send();
});

module.exports = router;