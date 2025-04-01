import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, Mail, Phone } from 'lucide-react';
import logo from "../assets/images/profile-vector.png";

function Footer() {
  return (
    <footer className="relative left-[15%] w-[85%] bg-[#28595a] text-white">
      <div className="container mx-auto px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Learn Leap Logo" className="w-10 h-10 mr-3" />
              <h2 className="text-xl font-bold">Learn Leap</h2>
            </div>
            <p className="text-[#dbf0dd] mb-6 opacity-90">
              Transform your learning journey with our AI-powered platform. Interactive courses, personalized learning paths, and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#ff8400] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#ff8400] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#ff8400] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#ff8400] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#dbf0dd]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-[#ff8400] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-[#ff8400] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="text-white hover:text-[#ff8400] transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/pdf-to-quiz" className="text-white hover:text-[#ff8400] transition-colors">AI Quiz Generator</Link>
              </li>
              <li>
                <Link to="/feed" className="text-white hover:text-[#ff8400] transition-colors">Community Feed</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#dbf0dd]">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-[#ff8400] transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#ff8400] transition-colors">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#ff8400] transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#ff8400] transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#ff8400] transition-colors">Support</a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#dbf0dd]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MessageCircle size={18} className="mr-3 mt-1 text-[#ff8400]" />
                <span>1234 Education Lane, Learning City, ED 56789</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-[#ff8400]" />
                <a href="mailto:info@learnleap.com" className="hover:text-[#ff8400] transition-colors">info@learnleap.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-[#ff8400]" />
                <a href="tel:+1234567890" className="hover:text-[#ff8400] transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-[#1e4445] py-8">
        <div className="container mx-auto px-8">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-[#dbf0dd] opacity-90">Stay updated with our latest courses and learning resources</p>
            </div>
            <div className="md:w-1/2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-700"
                />
                <button className="bg-[#ff8400] hover:bg-[#e67700] px-4 py-2 rounded-r-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#1a3b3c] py-4">
        <div className="container mx-auto px-8 text-center md:flex justify-between items-center">
          <p className="text-sm opacity-80 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Learn Leap. All rights reserved.
          </p>
          <div className="flex space-x-4 justify-center md:justify-end">
            <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;