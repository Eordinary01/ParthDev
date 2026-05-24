"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "./context/ThemeContext";

export default function Contact() {
  const { isDarkMode } = useTheme();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        setSuccessMessage("Message sent successfully! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "parthmanocha66@gmail.com",
      link: "mailto:parthmanocha66@gmail.com"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91 12345 67890",
      link: "tel:+911234567890"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Jaipur, Rajasthan",
      link: "#"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "Connect with me",
      link: "https://linkedin.com/in/parthmanocha01"
    }
  ];

  return (
    <section id="contact" className="min-h-screen bg-inherit relative overflow-hidden">
      {/* Background elements - Theme aware */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-64 h-64 opacity-5 morphing-shape float"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full float-reverse"
          style={{ backgroundColor: 'var(--accent)', opacity: 0.08 }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 morphing-shape"
          style={{ backgroundColor: 'var(--accent)', opacity: 0.03 }}
        />
      </div>

      <motion.div
        ref={containerRef}
        className="container mx-auto px-4 py-20 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-8 gradient-text">
            Let&apos;s Connect
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 mx-auto mb-8"
          />
          <p 
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your ideas to life. 
            I&apos;m always excited to collaborate on innovative solutions.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-dark rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full transform translate-x-16 -translate-y-16"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
            />
            
            <h2 
              className="text-3xl font-bold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative"
              >
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--accent)' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-4 border-2 rounded-xl placeholder-gray-400 focus:outline-none transition-all duration-300"
                  style={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
                    borderColor: focusedField === "name" ? 'var(--accent)' : (isDarkMode ? '#374151' : '#e5e7eb'),
                    color: 'var(--text-primary)'
                  }}
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: 'var(--accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === "name" ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative"
              >
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--accent)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-4 border-2 rounded-xl placeholder-gray-400 focus:outline-none transition-all duration-300"
                  style={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
                    borderColor: focusedField === "email" ? 'var(--accent)' : (isDarkMode ? '#374151' : '#e5e7eb'),
                    color: 'var(--text-primary)'
                  }}
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: 'var(--accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === "email" ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="relative"
              >
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--accent)' }}
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project or just say hello!"
                  rows={6}
                  className="w-full px-4 py-4 border-2 rounded-xl placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
                    borderColor: focusedField === "message" ? 'var(--accent)' : (isDarkMode ? '#374151' : '#e5e7eb'),
                    color: 'var(--text-primary)'
                  }}
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: 'var(--accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === "message" ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 text-white rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{ backgroundColor: 'var(--accent)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="spinner mr-3" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>
                <div 
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  style={{ backgroundColor: 'var(--accent-light)', opacity: 0.8 }}
                />
              </motion.button>

              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="glass border border-green-500 rounded-xl p-4 text-green-400 text-center font-semibold"
                >
                  ✅ {successMessage}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-dark rounded-3xl p-8">
              <h2 
                className="text-3xl font-bold mb-8"
                style={{ color: 'var(--text-primary)' }}
              >
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : "_self"}
                    rel={info.link.startsWith("http") ? "noopener noreferrer" : ""}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center p-4 glass rounded-xl transition-all duration-300 group"
                    style={{ backgroundColor: 'var(--glass-bg)' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </span>
                    <div>
                      <p style={{ color: 'var(--accent)' }} className="font-semibold">
                        {info.label}
                      </p>
                      <p 
                        className="transition-colors group-hover:gradient-text"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass-dark rounded-3xl p-8"
            >
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {[
                  { name: "GitHub", icon: "🔗", link: "https://github.com/Eordinary01" },
                  { name: "LinkedIn", icon: "💼", link: "https://linkedin.com/in/parthmanocha01" },
                  { name: "Email", icon: "📧", link: "mailto:parthmanocha66@gmail.com" },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group"
                    style={{ 
                      backgroundColor: 'var(--glass-bg)',
                      border: `1px solid var(--border-color)`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="glass-dark rounded-3xl p-8 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3" />
                <span className="text-green-400 font-semibold">Available for Projects</span>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Currently accepting new freelance projects and collaboration opportunities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}