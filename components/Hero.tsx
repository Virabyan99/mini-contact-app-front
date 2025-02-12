"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a reusable button component

const Hero = () => {
  return (
    <div >
      <div className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/your-image-url.jpg')" }}></div>
        <div className="relative container mx-auto py-16 px-6 md:px-12">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
              Simplify Your Contact Management
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white opacity-80">
              Organize, manage, and collaborate with your contacts effortlessly. 
              Try the best contact management tool for your business or personal use!
            </p>
            <Button
              variant="default"
              className="px-8 py-3 text-lg font-semibold rounded-md bg-orange-500 hover:bg-orange-600 transition"
              onClick={() => window.location.href = '/contacts'}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Our App?</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Easy to Use</h3>
            <p>Intuitive interface to help you manage your contacts effortlessly.</p>
          </div>
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Cloud-Based</h3>
            <p>Access your contacts from anywhere, anytime, with full synchronization.</p>
          </div>
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Safe & Secure</h3>
            <p>Your data is stored safely with encryption to ensure privacy and security.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50 text-center">
        <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add Contacts</h3>
            <p>Add contacts manually or import them from various sources.</p>
          </div>
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Organize Easily</h3>
            <p>Organize contacts by groups and categories for easy access.</p>
          </div>
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p>Use reminders and automated emails to stay connected with your contacts.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 bg-gray-800 text-white text-center">
        <p>&copy; 2025 Contact Management App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Hero;
