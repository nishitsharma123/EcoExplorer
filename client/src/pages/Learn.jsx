import React from "react";
import { Leaf, BookOpen, Globe, Recycle } from "lucide-react";

const Learn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">
          Learn & Explore Nature 🌿
        </h1>
        <p className="text-gray-700 text-lg">
          EcoExplorer helps you understand the importance of environmental
          conservation, sustainable living, and climate awareness.
        </p>
      </div>

      {/* Educational Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
        
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition duration-300">
          <Leaf className="text-green-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Biodiversity</h3>
          <p className="text-gray-600 text-sm">
            Learn how ecosystems function and why protecting wildlife is crucial
            for balance in nature.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition duration-300">
          <Globe className="text-emerald-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Climate Change</h3>
          <p className="text-gray-600 text-sm">
            Understand global warming, greenhouse gases, and how human
            activities impact the planet.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition duration-300">
          <Recycle className="text-green-700 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Sustainable Living</h3>
          <p className="text-gray-600 text-sm">
            Discover simple daily habits that reduce waste and promote a
            greener lifestyle.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition duration-300">
          <BookOpen className="text-emerald-700 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Environmental Laws</h3>
          <p className="text-gray-600 text-sm">
            Explore government policies and global agreements aimed at
            protecting nature.
          </p>
        </div>
      </div>

      {/* Sustainable Practices Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 text-center">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6">
          Small Actions, Big Impact 🌱
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Reduce Plastic</h4>
            <p className="text-sm">
              Use reusable bottles and bags to reduce environmental pollution.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Save Energy</h4>
            <p className="text-sm">
              Turn off unused lights and switch to renewable energy sources.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Plant Trees</h4>
            <p className="text-sm">
              Trees absorb carbon dioxide and improve air quality.
            </p>
          </div>
        </div>

        <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full transition duration-300">
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default Learn;
