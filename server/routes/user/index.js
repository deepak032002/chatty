const { Router } = require("express")
const User = require("../../models/user/index")
const Room = require("../../models/room/index")
const Message = require("../../models/message/message")
const jwt = require("jsonwebtoken")
const upload = require("../../middleware/uploadmiddleware")



const SECREAT_KEY = 'mynameisblablabla'

const router = Router()

router.post('/signup', upload.single('profilepic'), async (req, res) => {

    try {
        let user = null;
        const { name, email, password } = req.body
        const profilepic = `${req.protocol}://${req.hostname}:5000/${req.file.path}`

        if (!name && !email && !password) {
            return res.json({ success: false, msg: 'Missing Values' })
        }

        user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, msg: 'Already User with this email' })
        }

        user = await User({ name, email, password, profilepic })
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
            return res.json({ success: false, msg: 'Email or Password not matched' })
        }

        const token = await jwt.sign({ id: user._id }, SECREAT_KEY)
        return res.json({ success: true, msg: 'login Successfully', token })
    } catch (error) {
        console.error(error);
    }

})

router.get('/getuser', async (req, res) => {
    try {

        const { token } = req.headers

        if (!token) {
            return res.json({ msg: 'Token missing or expired!' })
        }
        const data = await jwt.verify(token, SECREAT_KEY)
        const user = await User.findById(data.id).select('-password -_id')

        res.json({ success: true, user })

    } catch (error) {
        console.error(error)
    }
})


router.patch('/addcontacts/', async (req, res) => {
    try {
        const { f_email } = req.body
        const userId = await jwt.verify(req.headers.token, SECREAT_KEY)
        const friend = await User.findOne({ email: f_email })

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
            profilepic: friend.profilepic
        }


        const updatedUser = await User.findByIdAndUpdate(userId.id, { $push: { contact: friendDetails } })

        if (!updatedUser) {
            return res.json({ success: false, msg: 'Some Error' })
        }

        const room_users = [
            {
                name: friend.name,
                email: friend.email,
                profilepic: friend.profilepic
            },
            {
                name: updatedUser.name,
                email: updatedUser.email,
                profilepic: updatedUser.profilepic
            }
        ]

        const room = await Room({ users: room_users })
        room.save()
        updatedUser.save()

        res.json({ success: true, msg: 'You Added a new Friend' })
    } catch (error) {
        console.error(error);
    }

})

router.get('/getallrooms', async (req, res) => {
    try {

        const { email } = req.headers

        const rooms = await Room.find({ users: { $elemMatch: { email: email } } })

        res.send(rooms)

    } catch (error) {

    }
})

router.post('/savemsg', async (req, res) => {
    const { roomId, msgObj } = req.body

    const msgRes = await Message({ roomId, message: msgObj });
    if (msgRes) {
        return msgRes.save()
    }

    return res.json({ success: true, msg: 'Send' })
})

router.get('/getmsg', async (req, res) => {
    const { roomid } = req.headers
    let messagesOfRoomId = await Message.find({ roomId: roomid })


    if (messagesOfRoomId.length > 0) {
        messagesOfRoomId = messagesOfRoomId.map((item) => item.message)
        return res.json({ success: true, msg: messagesOfRoomId })
    }

    return res.json({ success: false, msg: null })
})

module.exports = router