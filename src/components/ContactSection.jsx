import { useState } from 'react'
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowRight, Send, User, AtSign, MessageSquare, Tag } from 'lucide-react'
import './ContactSection.css'

const SOCIALS = [
  { icon: Github,    label: 'GitHub',    sub: 'github.com/azka-adirraff',      href: 'https://github.com/azka-adirraff' },
  { icon: Linkedin,  label: 'LinkedIn',  sub: 'linkedin.com/in/azka-adirraff', href: '#' },
  { icon: Instagram, label: 'Instagram', sub: '@azka.aydirrafff',              href: '#' },
  { icon: Mail,      label: 'Email',     sub: 'azkaaydirraff@email.com',       href: 'mailto:azkaaydirraff@email.com' },
  { icon: MapPin,    label: 'Location',  sub: 'Cibinong, Indonesia',           href: '#' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className="contact">

      <div className="contact__left">
        <div className="contact__header">
          <span className="contact__icon">🐚</span>
          <h2 className="contact__title">CONTACT ME</h2>
        </div>
        <div className="contact__wave">〰〰〰</div>
        <p className="contact__desc">
          Let's build something amazing together.<br />
          Send me a message from the deep ocean!
        </p>

        <div className="contact__form">
          <div className="contact__row">
            <div className="contact__field">
              <label className="contact__label">
                <User size={13} strokeWidth={2.5} />
                Your name
              </label>
              <input
                className="contact__input"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="contact__field">
              <label className="contact__label">
                <AtSign size={13} strokeWidth={2.5} />
                Email address
              </label>
              <input
                className="contact__input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact__field">
            <label className="contact__label">
              <Tag size={13} strokeWidth={2.5} />
              Subject
            </label>
            <input
              className="contact__input"
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div className="contact__field">
            <label className="contact__label">
              <MessageSquare size={13} strokeWidth={2.5} />
              Your message
            </label>
            <textarea
              className="contact__input contact__textarea"
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="contact__form-footer">
            <button
              type="button"
              className={`contact__btn ${sent ? 'contact__btn--sent' : ''}`}
              onClick={handleSubmit}
            >
              <Send size={15} strokeWidth={2.5} />
              {sent ? 'Message sent!' : 'Send message'}
              {!sent && <ArrowRight size={15} strokeWidth={2.5} />}
            </button>
            <p className="contact__note">🐢 Usually replies within 24 hours.</p>
          </div>
        </div>
      </div>

      <div className="contact__right">
        <div className="contact__connect-header">
          <span className="contact__dot" />
          <span className="contact__connect-title">LET'S CONNECT</span>
          <span className="contact__dot" />
        </div>

        <div className="contact__socials">
          {SOCIALS.map(({ icon: Icon, label, sub, href }) => (
            <a key={label} href={href} className="contact__social-item" target="_blank" rel="noopener noreferrer">
              <div className="contact__social-icon">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div className="contact__social-text">
                <span className="contact__social-label">{label}</span>
                <span className="contact__social-sub">{sub}</span>
              </div>
              <ArrowRight size={16} strokeWidth={2} className="contact__social-arrow" />
            </a>
          ))}
        </div>
      </div>

      <div className="contact__footer">
        <span className="contact__icon-sm">🐚</span>
        <p className="contact__footer-text">
          Open to collaborate on exciting projects and turn ideas into real impact.
        </p>
        <span className="contact__wave-sm">〰〰〰</span>
      </div>

    </section>
  )
}