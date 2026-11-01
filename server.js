import path from 'node:path'
import express from 'express'
import mongoose from 'mongoose'
import Post from './models/Post.js'

const app = express()
const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog_db'

app.use(express.json())
app.use(express.static('dist'))

// CREATE a new post
app.post('/api/posts', async (req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
})

// READ all posts
app.get('/api/posts', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    next(error)
  }
})

// READ a single post by ID
app.get('/api/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    res.json(post)
  } catch (error) {
    next(error)
  }
})

// UPDATE a post
app.put('/api/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    res.json(post)
  } catch (error) {
    next(error)
  }
})

// DELETE a post
app.delete('/api/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    res.json({ message: 'Post deleted.' })
  } catch (error) {
    next(error)
  }
})

// Send the React app for every other page
app.use((req, res) => {
  res.sendFile(path.resolve('dist/index.html'))
})

// Runs when a route fails
app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: 'Title, author and content are required.' })
  }
  if (error.name === 'CastError') {
    return res.status(404).json({ error: 'Post not found.' })
  }
  console.error(error.message)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

// Connect to MongoDB, then start the server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB:', error.message)
    process.exit(1)
  })
