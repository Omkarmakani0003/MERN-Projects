const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authentication.controller')
const userController = require('../controllers/user.controller')
const postController = require('../controllers/post.controller')
const storiesController = require('../controllers/stories.controller')
const {auth} = require('../middlewares/auth')
const profile = require('../utils/profile_picture')
const post = require('../utils/uploadPost/post')

router.post('/auth/signup',authenticationController.signup)
router.post('/auth/login',authenticationController.login)

router.use(auth)
router.get('/user/profile',userController.getProfile)
router.get('/user/suggested',userController.getSuggestedUsers)
router.post('/user/follow',userController.follow)
router.post('/user/profile_update',profile.fields([{name:'profile_picture',maxCount:1},{name:'cover_image',maxCount:1}]),userController.updateProfile)
router.get('/user/get-posts',userController.getSpecificUsersPost)

/* only authanticated user show its saved posts not other user */
router.get('/user/get-save',userController.getUserSave)

router.get('/user/get-followers',userController.getfollowers)
router.get('/user/get-following',userController.getfollowings)

router.post('/user/post_upload',post.single('post'),postController.uploadPost)
router.get('/user/postlist',postController.postList)
router.post('/user/like',postController.like)
router.post('/user/comment',postController.comment)
router.delete('/user/delete-comment',postController.removeComment)
router.post('/user/save',postController.save)
router.delete('/user/delete-post',postController.deletePost)

router.post('/user/story_upload',post.single('story'),storiesController.uploadStory)
router.get('/user/storylist',storiesController.storyList)
router.delete('/user/delete-story',storiesController.deleteStory)

router.post('/auth/logout',authenticationController.logout)

module.exports = router