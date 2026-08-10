"use client";
import React, { useState } from "react";
import Terminal from "./components/Terminal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCmdHistory((prev) => [...prev, `> ./send.sh --name "${form.name}" --email "${form.email}"`]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setCmdHistory((prev) => [...prev, "Message sent successfully!"]);
        setSuccessMessage("Message sent successfully! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSuccessMessage("");
          setCmdHistory([]);
        }, 5000);
      } else {
        throw new Error("Failed");
      }
    } catch {
      setCmdHistory((prev) => [...prev, "Failed to send message. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { label: "EMAIL", value: "parthmanocha66@gmail.com", link: "mailto:parthmanocha66@gmail.com", icon: "✉" },
    { label: "GITHUB", value: "Eordinary01", link: "https://github.com/Eordinary01", icon: "⌨" },
    { label: "LINKEDIN", value: "parthmanocha01", link: "https://linkedin.com/in/parthmanocha01", icon: "⊞" },
    { label: "LOCATION", value: "Jaipur, Rajasthan", link: "#", icon: "◎" },
  ];

  return (
    <section id="contact" className="section-spacing bg-canvas">
      <div className="container-main">
        <div className="flex items-center gap-3 mb-8 hero-slide-up">
          <span className="text-gh-green font-mono text-sm">$</span>
          <h2 className="text-3xl font-bold text-gh-text font-mono">./contact.sh</h2>
        </div>
        <div className="h-px bg-border mb-12 hero-slide-up" style={{ animationDelay: "0.1s" }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="hero-slide-up" style={{ animationDelay: "0.2s" }}>
            <Terminal title="parth@dev:~/contact" className="h-full">
              <div className="space-y-4">
                {cmdHistory.map((cmd, i) => (
                  <div key={i} className="text-sm">
                    <span className={cmd.startsWith("Message sent") ? "text-gh-green" : cmd.startsWith("Failed") ? "text-gh-red" : "text-gh-secondary"}>
                      {cmd}
                    </span>
                  </div>
                ))}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gh-green mb-1 font-mono">
                      $ echo &quot;Your Name&quot;
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="input-terminal"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gh-green mb-1 font-mono">
                      $ echo &quot;Your Email&quot;
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input-terminal"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gh-green mb-1 font-mono">
                      $ cat &gt; message.txt
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      className="input-terminal resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "$ sending..." : "$ ./send.sh"}
                  </button>
                </form>

                {successMessage && (
                  <div className="text-sm text-gh-green border border-gh-green/30 bg-gh-green/10 rounded-md p-3 font-mono">
                    {successMessage}
                  </div>
                )}
              </div>
            </Terminal>
          </div>

          <div className="space-y-4">
            <div className="bg-default border border-border rounded-md p-6 hero-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-bold text-gh-text font-mono mb-4">
                Contact Information
              </h3>
              <p className="text-gh-secondary text-sm mb-6">
                Feel free to reach out through any of these channels.
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : "_self"}
                    rel={info.link.startsWith("http") ? "noopener noreferrer" : ""}
                    className="flex items-center gap-4 p-3 border border-border rounded-md hover:border-gh-muted hover:bg-subtle transition-all duration-200 group"
                  >
                    <span className="w-10 h-10 flex items-center justify-center bg-subtle border border-border rounded-md text-gh-secondary group-hover:text-gh-text group-hover:border-gh-muted transition-colors font-mono">
                      {info.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-gh-muted font-mono uppercase tracking-wider">
                        {info.label}
                      </p>
                      <p className="text-sm text-gh-text group-hover:text-gh-blue transition-colors truncate">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-default border border-border rounded-md p-6 hero-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gh-green animate-pulse" />
                <span className="text-sm text-gh-green font-mono font-bold">
                  Available for Projects
                </span>
              </div>
              <p className="text-sm text-gh-secondary">
                Currently accepting new freelance projects and collaboration opportunities.
              </p>
            </div>

            <div className="bg-default border border-border rounded-md p-6 hero-slide-up" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-sm text-gh-secondary font-mono uppercase tracking-wider mb-4">
                Quick Connect
              </h3>
              <div className="flex gap-3">
                <a href="https://github.com/Eordinary01" target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 text-center text-sm">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/parthmanocha01" target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 text-center text-sm">
                  LinkedIn
                </a>
                <a href="mailto:parthmanocha66@gmail.com" className="btn-outline flex-1 text-center text-sm">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
