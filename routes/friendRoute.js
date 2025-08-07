const express = require('express');
const User = require('../models/userModel');
const Notifications = require('../models/notificationModel');

// var router = express.Router();

const {
  createLecture,
  getLecture,
  getLectures,
  updateLecture,
  deleteLecture,
  // setLectureIdToBody,
  createFilterObj,
} = require('../services/lectureService');
const {
  createLectureValidator,
  getLectureValidator,
  updateLectureValidator,
  deleteLectureValidator,
} = require('../validators/lectureValidator');

const authService = require('../services/authService');

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });


router.use(authService.protect);


// send friend request
router.post('/friend-request', async (req, res) => {
  const { friendId } = req.body;
  if (req.user._id == friendId) {
    console.log("my account")
    res.status(403).json("you can't send friend request to yourself");

  } else {
    // friends or not
    if (req.user.friends.includes(friendId)) {
      res.status(403).json({
        message: "you are friends",
      });
    } else {

      // I sent to this user or not
      if (req.user.sentFriendRequests.some(fr => fr.user.toString() === friendId)) {

        res.status(403).json({
          message: "Friend Request already sent.",
        });
      } else {
        const friend = await User.findById(friendId);
        //  friend exist or not
        if (friend) {
          try {
            await User.findOneAndUpdate(
              { _id: req.user._id },
              { $push: { sentFriendRequests: { user: friendId, requestedAt: new Date() } } }
            );
            await User.findOneAndUpdate(
              { _id: friendId },
              { $push: { friendRequests: { user: req.user._id, requestedAt: new Date() } } }
            );

            const message = `<strong>${req.user.name}</strong> has sent you friend request`

            const newNotification = new Notifications({ user: friendId, avatar: req.user.profileImage, type: "friend request", from: req.user._id, message: message })
            const notification = await newNotification.save()

            if (req.onlineUsers[friendId]) {
              req.io.to(friendId.toString()).emit("newNotification", { message: notification.message, avatar: notification.avatar, _id: notification._id, type: notification.type, href: notification.href, time: notification.time, from: notification.from })
            }
            res.status(201).json({
              success: true,
              message: "Friend Request sent successfully",
            });

          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "auth error",
              success: false,
              error: error.message,
            });
          }
        } else {
          res.status(500).json({
            success: false,
          });
        }


      }
    }



  }
}

)
// delete friend request
router.delete('/friend-request', async (req, res) => {
  const { friendId } = req.body;
  if (req.user.sentFriendRequests.some(fr => fr.user.toString() === friendId)) {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { sentFriendRequests: { user: friendId } } }
    );
    await User.findOneAndUpdate(
      { _id: friendId },
      { $pull: { friendRequests: { user: req.user._id } } }
    );

    const not = await Notifications.findOneAndUpdate(
      { user: friendId, type: "friend request", from: req.user._id, active: true },
      { $set: { active: false } })

    res.status(200).json({ message: 'Friend request cancelled' });

  } else {
    res.status(400).json({ message: 'No request to cancel' });

  }

});

router.post("/friend-request-response", async (req, res, next) => {
  try {
    const { userId, status } = req.body;
    if (req.user.friendRequests.some(fr => fr.user.toString() === userId)) {
      if (status === "accepted") {
        await User.findOneAndUpdate(
          { _id: req.user._id },
          { $pull: { friendRequests: { user: userId } }, $push: { friends: userId } }
        );
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { sentFriendRequests: { user: req.user._id } }, $push: { friends: req.user._id } }
        );
        const not = await Notifications.findOneAndUpdate(
          { user: req.user._id, type: "friend request", from: userId, active: true },
          { $set: { active: false } }
        );
        // updateFriendStatus
        // if (req.onlineUsers[userId]) {
        //   req.io.to(userId.toString()).emit("updateFriendStatus", { status: "friended" })
        // }
        res.status(201).json({
          success: true,
          message: "Friend Request " + status,
        });
      } else if (status === "declined") {
        await User.findOneAndUpdate(
          { _id: req.user._id },
          { $pull: { friendRequests: { user: userId } } }
        );
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { sentFriendRequests: { user: req.user._id } } }
        );
        const not = await Notifications.findOneAndUpdate(
          { user: req.user._id, type: "friend request", from: userId, active: true },
          { $set: { active: false } }
        );
        console.log("mmm", not)
        res.status(201).json({
          success: true,
          message: "Friend Request " + status,
        });
      }

    } else {
      res.status(400).json({ message: 'No Friend Request Found.' });

    }



  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
}

);
// remove friend
router.delete('/friend', async (req, res) => {
  const { friendId } = req.body;

  if (req.user.friends.includes(friendId)) {
    await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { friends: friendId } })
    await User.findOneAndUpdate({ _id: friendId }, { $pull: { friends: req.user._id } })

    res.status(200).json({ message: 'Friend removed' });

  } else {
    res.status(400).json({ message: 'No friend to remove' });

  }

});





router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Query parameter q is required' });
    }
    const regex = new RegExp(q, 'i');
    const users = await User.find({
      $or: [{ name: regex }, { username: regex }],
      _id: { $ne: req.user._id }
    }).select('name username profileImage');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/requests', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friendRequests.user', 'name username profileImage')
      .populate('sentFriendRequests.user', 'name username profileImage');
    res.status(200).json({
      friendRequests: user.friendRequests,
      sentFriendRequests: user.sentFriendRequests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/friends', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friends', 'name username profileImage');
    res.status(200).json({
      friends: user.friends
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
