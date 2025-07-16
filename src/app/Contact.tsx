"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
      value: "parth@example.com",
      link: "mailto:parth@example.com"
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
      link: "https://linkedin.com"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="contact" className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Custom cursor for this section */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <motion.div
          className="absolute w-8 h-8 bg-green-500 rounded-full opacity-80 shadow-lg"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
          }}
          transition={{ type: "spring", stiffness: 800, damping: 35 }}
        />
        
        <motion.div
          className="absolute w-12 h-12 border-2 border-green-400 rounded-full opacity-60"
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        
        <motion.div
          className="absolute w-16 h-16 bg-green-500 rounded-full opacity-20 blur-md"
          animate={{
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-aqua-500 opacity-5 morphing-shape float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-aqua-400 opacity-8 rounded-full float-reverse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aqua-300 opacity-3 morphing-shape" />
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
            Let's Connect
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-aqua-500 to-aqua-300 mx-auto mb-8"
          />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can bring your ideas to life. 
            I'm always excited to collaborate on innovative solutions.
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-aqua-500 opacity-10 rounded-full transform translate-x-16 -translate-y-16" />
            
            <h2 className="text-3xl font-bold mb-8 text-white">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative"
              >
                <label className="block text-aqua-400 text-sm font-semibold mb-2">
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
                  className="w-full px-4 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-aqua-500 focus:outline-none transition-all duration-300"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-aqua-500"
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
                <label className="block text-aqua-400 text-sm font-semibold mb-2">
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
                  className="w-full px-4 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-aqua-500 focus:outline-none transition-all duration-300"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-aqua-500"
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
                <label className="block text-aqua-400 text-sm font-semibold mb-2">
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
                  className="w-full px-4 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-aqua-500 focus:outline-none transition-all duration-300 resize-none"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-aqua-500"
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
                className="w-full py-4 bg-aqua-500 text-white rounded-xl font-semibold text-lg hover:bg-aqua-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
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
                <div className="absolute inset-0 bg-aqua-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
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
              <h2 className="text-3xl font-bold mb-8 text-white">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : "_self"}
                    rel={info.link.startsWith("http") ? "noopener noreferrer" : ""}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center p-4 glass rounded-xl hover:bg-aqua-500 hover:bg-opacity-10 transition-all duration-300 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </span>
                    <div>
                      <p className="text-aqua-400 font-semibold">{info.label}</p>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
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
              <h3 className="text-2xl font-bold mb-6 text-white">Follow Me</h3>
              <div className="flex space-x-4">
                {[
                  { name: "GitHub", icon: "🔗", color: "#333" },
                  { name: "LinkedIn", icon: "💼", color: "#0077B5" },
                  { name: "Twitter", icon: "🐦", color: "#1DA1F2" },
                  { name: "Instagram", icon: "📷", color: "#E4405F" },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-aqua-500 hover:text-white transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
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
              <p className="text-gray-300">
                Currently accepting new freelance projects and collaboration opportunities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}