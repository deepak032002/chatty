import { Router } from "express";
import User from "../../models/user/index.js";
import jwt from "jsonwebtoken";
import multer from 'multer'

const storage = {}

const upload = multer(storage)

const SECREAT_KEY = 'mynameisblablabla'

const router = Router()

router.post('/signup',upload.single('profilepic'), async (req, res) => {

    try {
        let user = null;
        const { name, email, password, img } = req.body

        if (!name && !email && !password) {
            return res.json({ success: false, msg: 'Missing Values' })
        }
        user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, msg: 'Already User with this email' })
        }

        user = await User({ name, email, password, img })
        if (user) {
            user.save()
        }

        return res.json({ success: true, msg: 'Registered!' })
    } catch (error) {
        console.error(error);
    }

})


router.get('/login', async (req, res) => {

    try {

        let user = null
        const { email, password } = req.headers

        if (!email && !password) {
            return res.json({ success: false, msg: 'Missing Values' })
        }

        user = await User.findOne({ email })

        if (!user || user.password !== password) {
            return res.json({ success: 'false', msg: 'Email or Password not matched' })
        }

        const token = await jwt.sign({ id: user._id }, SECREAT_KEY)
        return res.json({ success: true, msg: 'login Successfully', token})
    } catch (error) {
        console.error(error);
    }

})

router.get('/getuser', async(req, res) => {
    try {

        const {token} = req.headers

        const data = await jwt.verify(token, SECREAT_KEY)

        const user = await User.findById(data.id).select('-password -_id')
        
        res.json({success: true, user})

    } catch (error) {
        console.error(error)
    }
})


router.patch('/addcontacts/', async (req, res) => {
    try {
        const { femail } = req.body
        const userId = await jwt.verify(req.headers.token, SECREAT_KEY)
        const friend = await User.findOne({ email: femail })

        if (!friend) {
            return res.json({ success: false, msg: 'user does not exist' })
        }

        const isFriend = await User.findOne({ contact: { $elemMatch: { email: friend.email } } })

        if (isFriend) {
            return res.json({ success: false, msg: 'You already friend' })
        }

        const friendDetails = {
            name: friend.name,
            email: friend.email,
            img: friend.img
        }

        const updatedUser = await User.findByIdAndUpdate(userId.id, { $push: { contact: friendDetails } })

        if (!updatedUser) {
            return res.json({ success: false, msg: 'Some Error' })
        }
        updatedUser.save()

        res.json({ success: true, msg: 'You Added a new Friend' })
    } catch (error) {
        console.error(error);
    }

})

export default router