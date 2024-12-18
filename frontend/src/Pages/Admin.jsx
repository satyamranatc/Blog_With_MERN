import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Upload, PenTool, Edit, Trash2, Save, X } from 'lucide-react';

export default function Admin() {
  const [BlogData, setBlogData] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    async function GetData() { 
      try {
        let Res = await axios.get("http://localhost:5500/blogs");
        console.log(Res.data.blogs);
        setBlogData(Res.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    GetData();
  }, []);

  const SendData = async (e) => {
    e.preventDefault();
    let Data = {
      title: e.target[0].value,
      poster: e.target[1].value,
      content: e.target[2].value,
    }
    console.log(Data);

    try {
      let Res = await axios.post("http://localhost:5500/blogs", Data);
      console.log(Res.data);
      
      // Add the new blog to the current list
      setBlogData(prevBlogs => [...prevBlogs, Res.data]);
      
      // Reset the form
      e.target.reset();
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  }

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
  };

  const handleUpdateBlog = async (e,blog_id) => {
    e.preventDefault();
      const updatedBlog = {
        id: blog_id,
        title: e.target[0].value,
        poster: e.target[1].value,
        content: e.target[2].value
      }

      let Res = axios.put("http://localhost:5500/blogs",updatedBlog);
      console.log(Res);

     
  };

  const handleDeleteBlog = async (blogId) => {
    axios.delete(`http://localhost:5500/blogs/${blogId}`);
   
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-10">
          <div className="flex items-center mb-6">
            <Edit className="h-10 w-10 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Admin Page</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            This is the admin page where you can manage your blog posts, users, and settings.
          </p>
        </div>

        {/* Form Section */}
        <form 
          onSubmit={SendData} 
          className="bg-white shadow-md rounded-lg p-8 space-y-6 mb-10"
        >
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blog Title
            </label>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter blog title" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label 
              htmlFor="poster" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Poster URL
            </label>
            <input 
              type="text" 
              name="poster" 
              placeholder="Enter poster image URL" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blog Content
            </label>
            <textarea 
              name="content" 
              placeholder="Write your blog content here" 
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="mr-2 h-5 w-5" />
            Submit Blog Post
          </button>
        </form>

        {/* Blog Edit Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Blog Posts</h2>
          <div className="space-y-4">
            {BlogData.map(blog => (
              <div 
                key={blog._id} 
                className="bg-white shadow-md rounded-lg p-6 relative"
              >
                {editingBlog && editingBlog._id === blog._id ? (
                  <form onSubmit={(e)=>{handleUpdateBlog(e,blog._id)}} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={blog.title}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Poster URL
                      </label>
                      <input
                        type="text"
                        name="poster"
                        defaultValue={blog.poster}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        name="content"
                        defaultValue={blog.content}
                        rows="6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        <Save className="mr-2 h-5 w-5" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex items-center text-gray-600 hover:text-gray-800"
                      >
                        <X className="mr-2 h-5 w-5" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button 
                        onClick={() => handleEditBlog(blog)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit Blog"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Blog"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {blog.content.substring(0, 200)}...
                    </p>
                    {blog.poster && (
                      <img 
                        src={blog.poster} 
                        alt={blog.title} 
                        className="mt-4 rounded-md max-h-48 w-full object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}