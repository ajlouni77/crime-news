const Post = require('../models/Post');

const User = require('../models/user'); 
exports.createPost = async (req, res) => {
    try {
    
      const { title, description, details, imageSrc, imageAlt, date, tags } = req.body;
  
     
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
  
      
      const post = new Post({
        title,
        description,
        details,
        imageSrc,
        imageAlt,
        date,
        tags,
       
      });
  

      await post.save();
  
      
      res.status(201).json({
        message: "Post created successfully",
        post
      });
    } catch (error) {
      
      console.error("❌ Error creating post:", error);
      res.status(500).json({ error: error.message });
    }
  };
  



exports.getPosts = async (req, res) => {
    try {
      const currentDate = new Date();
  
     
      const usersWithActiveSubscriptions = await User.find({
        subscriptionExpiry: { $gte: currentDate }, 
      });
  
   
      const activeUserIds = usersWithActiveSubscriptions.map(user => user._id);
  
     
      const posts = await Post.find({
        isDeleted: false,
        userId: { $in: activeUserIds } 
      });
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getPostsAdmin = async (req, res) => {
    try {
      // جلب المنشورات التي لم يتم حذفها
      const posts = await Post.find({ isDeleted: false });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
    try {

      const post = await Post.findById(req.params.id);
  

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
     
      post.isDeleted = true;
      post.deletedAt = new Date();

      await post.save();
  
      res.json({ message: 'Post soft deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
