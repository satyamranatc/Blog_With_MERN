import React from 'react'
import { 
  BookOpen, 
  PenTool, 
  Globe, 
  ArrowRight 
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">Blogo</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Discover, Learn, and Share. Your gateway to insightful stories, expert perspectives, and creative expressions.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex justify-center space-x-4 mb-16">
          <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Reading <ArrowRight className="ml-2" />
          </button>
          <button className="flex items-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Write a Post <PenTool className="ml-2" />
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <BookOpen className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Diverse Content</h3>
            <p className="text-gray-600">
              Explore a wide range of topics from technology to lifestyle, curated by passionate writers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <PenTool className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Write Freely</h3>
            <p className="text-gray-600">
              Share your unique perspective and connect with readers from around the globe.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Globe className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Global Community</h3>
            <p className="text-gray-600">
              Join a vibrant community of readers, writers, and thinkers passionate about sharing knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter and never miss a story
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-800"
            />
            <button className="bg-green-500 text-white px-6 py-3 rounded-r-lg hover:bg-green-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}