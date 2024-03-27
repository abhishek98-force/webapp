const express = require('express');
const {User} = require('../../models');

const router = express.Router();

router.put('/:username', async (req, res) => {
    console.log(req.params.username);
    const user = await User.findOne({ where: { username: req.params.username } });
    user.isVerified = true;
    await user.save();
    res.status(200).send();
});

module.exports = router;