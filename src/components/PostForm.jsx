import { useEffect, useState } from 'react'

const emptyForm = { title: '', author: '', content: '' }

function PostForm({ post, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  // Fill the form when editing, and empty it otherwise
  useEffect(() => {
    setForm(post || emptyForm)
    setError('')
  }, [post])

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // CREATE or UPDATE
  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch(post ? `/api/posts/${post._id}` : '/api/posts', {
      method: post ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        author: form.author,
        content: form.content,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      setError(data.error)
      return
    }

    setForm(emptyForm)
    onSaved()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{post ? 'Edit post' : 'Create a post'}</h2>

      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={form.title} onChange={handleChange} required />

      <label htmlFor="author">Author</label>
      <input id="author" name="author" value={form.author} onChange={handleChange} required />

      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" rows="8" value={form.content} onChange={handleChange} required />

      {error && <p className="error">{error}</p>}

      <button type="submit">{post ? 'Save changes' : 'Create post'}</button>
      {post && (
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default PostForm
