import React, { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    published: false
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const fetchPosts = async () => {
    const res = await axios.get(`http://localhost:5000/posts?search=${search}`);
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`http://localhost:5000/posts/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/posts", form);
    }

    setForm({ title: "", content: "", category: "", tags: "", published: false });
    fetchPosts();
  };

  const handleEdit = (post) => {
    setForm(post);
    setEditingId(post.post_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchPosts();
    }
  };

  return (
    <div>
      <h2>Posts Dashboard</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <label>
          Published
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
        </label>

        <button type="submit">
          {editingId ? "Update" : "Save"}
        </button>
      </form>

      {/* Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Published</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.post_id}>
              <td>{post.post_id}</td>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>{post.tags}</td>
              <td>{post.published ? "Yes" : "No"}</td>
              <td>{new Date(post.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.post_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Posts;