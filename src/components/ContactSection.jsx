import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowRight, Send, User, AtSign, MessageSquare, Tag } from 'lucide-react'
import './ContactSection.css'

const SERVICE_ID  = 'service_e4kluv8'   
const TEMPLATE_ID = 'template_ijru59m'  
const PUBLIC_KEY  = 'h7EXc-LDiZHKN_F2C'   

const SOCIALS = [
  { icon: Github,    label: 'GitHub',    sub: 'AzkaNonchallant',      href: 'https://github.com/AzkaNonchallant' },
  { icon: Linkedin,  label: 'LinkedIn',  sub: 'azka aydirrafif', href: 'https://www.linkedin.com/in/azka-aydirrafif-590005373/' },
  { icon: Instagram, label: 'Instagram', sub: 'azkarafif42',              href: 'https://www.instagram.com/azkarafif42/?__pwa=1' },
  { icon: Mail,      label: 'Email',     sub: 'azkaaydirrafsyah@gmail.com',       href: 'mailto:azkaaydirrafsyah@gmail.com' },
  { icon: MapPin,    label: 'Location',  sub: 'Cibinong, Indonesia',           href: '#' },
]

export default function ContactSection() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
        },
        PUBLIC_KEY
      )
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      console.error('Gagal kirim:', err)
      setError('Gagal kirim pesan, coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact">

      <div className="contact__left">
        <div className="contact__header">
          <span className="contact__icon">🐚</span>
          <h2 className="contact__title">CONTACT ME</h2>
        </div>
        <div className="contact__wave">__________________________</div>
        <p className="contact__desc">
         Lets Colaborate<br />
          
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
                disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="contact__form-footer">
            <button
              type="button"
              className={`contact__btn ${sent ? 'contact__btn--sent' : ''} ${loading ? 'contact__btn--loading' : ''}`}
              onClick={handleSubmit}
              disabled={loading || sent}
            >
              <Send size={15} strokeWidth={2.5} />
              {loading ? 'Sending...' : sent ? 'Message sent! ✓' : 'Send message'}
              {!loading && !sent && <ArrowRight size={15} strokeWidth={2.5} />}
            </button>
            {error && <p className="contact__error">{error}</p>}
            {!error && <p className="contact__note">🐢 Usually replies within 24 hours.</p>}
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
          Open to collaborate
        </p>
        <span className="contact__wave-sm">_____________</span>
      </div>

    </section>
  )
}