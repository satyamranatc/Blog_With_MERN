import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Clock, User, BookOpen } from 'lucide-react'

export default function Feed() {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5500/blogs')
      .then(response => {
        // Safely extract blogs, provide default empty array
        const blogs = response.data.blogs || [];
        setBlogData(blogs);
        console.log(blogs);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setIsLoading(false);
        setBlogData([]); // Ensure empty array on error
      });
  }, []);

  // Safe truncate text function with fallback
  const truncateText = (text = '', maxLength = 150) => {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Our Blog
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover inspiring stories, insights, and knowledge
          </p>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div role="status">
              <svg 
                aria-hidden="true" 
                className="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" 
                viewBox="0 0 100 101" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.3484C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27530C39.2613 1.69771 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7479 32.2913 88.1032 35.8758C89.658 40.5524 91.9282 44.9844 89.5746 50.4969C87.4214 55.4302 83.3658 58.9033 78.5175 60.9507C73.8479 62.9484 68.7267 63.6321 63.6111 62.9225C60.1572 62.4495 56.7177 61.3554 53.6878 59.6943C51.5023 58.5612 48.9167 58.6809 46.8394 59.9545C44.7621 61.2281 43.8581 63.6986 44.6143 65.9944C45.4385 68.4891 47.8712 70.0542 50.4469 71.0413C55.5911 73.0454 61.1231 73.6585 66.5897 72.8801C72.0563 72.1017 77.3293 69.9542 81.7733 66.5545C86.529 62.9153 90.2045 58.0615 92.4807 52.5513C94.1471 48.4203 94.6736 43.9586 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              {/* Blog Post Image */}
              <img 
                src={blog.poster} 
                alt={blog.title} 
                className="w-full h-48 object-cover object-center"
              />

              {/* Blog Post Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {blog.title}
                </h2>

                {/* Blog Post Metadata */}
                <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{blog.author || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{blog.date || 'Recent'}</span>
                  </div>
                </div>

                {/* Blog Post Excerpt */}
                <p className="text-gray-600 mb-4">
                  {truncateText(blog.body)}
                </p>

                {/* Read More Button */}
                <button 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Posts State */}
        {!isLoading && blogData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}