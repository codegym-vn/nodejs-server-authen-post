const PostModel = require('../model/post');

exports.postRegister = async (req, res, next) =>  {
  console.log(req.decode, 'req.body')
  
  const postData = {
    title: req.body.title,
    content: req.body.content,
  }
  const postRegister = await PostModel.create(postData);
  if(postRegister) {
    res.json({post: postRegister})
  } else {
    res.json({err: "Create post error"})
  }
}

exports.postList = async (req, res) => {
  try {
    const posts = await PostModel.find();
    console.log(posts, 'posts')
    res.render('listpost', { posts: posts });
  } catch (err) {
    console.log(err)
  }
}
