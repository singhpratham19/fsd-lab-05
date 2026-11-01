import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

function Home() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [error, setError] = useState('')

  // READ: get all posts
  async function loadPosts() {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Request failed')
      setPosts(await response.json())
      setError('')
    } catch {
      setError('Could not load posts. Is the server running?')
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  // DELETE
  async function deletePost(id) {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (editingPost && editingPost._id === id) setEditingPost(null)
    loadPosts()
  }

  // Show the post in the form, which is at the top of the page
  function startEdit(post) {
    setEditingPost(post)
    window.scrollTo(0, 0)
  }

  function handleSaved() {
    setEditingPost(null)
    loadPosts()
  }

  return (
    <main className="layout">
      <section>
        <PostForm
          post={editingPost}
          onSaved={handleSaved}
          onCancel={() => setEditingPost(null)}
        />
      </section>

      <section>
        <h2>All posts</h2>
        {error && <p className="error">{error}</p>}
        {!error && posts.length === 0 && (
          <p>No posts yet. Create your first post.</p>
        )}
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onEdit={startEdit}
            onDelete={deletePost}
          />
        ))}
      </section>
    </main>
  )
}

export default Home
