import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { postJson } from '../api';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  inquiryType: 'General Inquiries',
  message: '',
  website: '', // honeypot: hidden from people, bots fill it in
};

export default function ContactUs() {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sends the message to the backend; it shows up in the dashboard under "Messages"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await postJson('/contact', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.inquiryType,
        message: formData.message.trim(),
        website: formData.website,
      });
      setFormData(EMPTY_FORM);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#111111] text-white px-6 py-16 md:py-24 text-center">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Contact Us</span>
        </nav>
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          Client Care Services
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] uppercase">
          At Your Service
        </h1>
        <div className="w-10 h-px bg-[#D4AF37] mx-auto mt-4 mb-5" />
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-serif">
          Whether seeking bespoke creation guidance, private consultations, or assistance with your order, our dedicated client advisors are at your service.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact & Flagship Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#D4AF37] mb-2">
                Get In Touch
              </p>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-6">
                Direct Inquiries
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed font-serif mb-8">
                Our advisors respond to all inquiries within 24 business hours. For immediate assistance with ongoing orders, please reference your order number.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#111111] text-[#D4AF37] shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">
                      Client Support
                    </h3>
                    <p className="text-xs text-gray-600 font-serif">+92 (021) 111-935-672</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mon – Sat, 10:00 AM – 7:00 PM PKT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#111111] text-[#D4AF37] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">
                      Email Support
                    </h3>
                    <p className="text-xs text-gray-600 font-serif">support@zelora.com</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Bespoke & Private Appointments</p>
                  </div>
                </div>

                <div className="border-l-2 border-[#D4AF37] pl-6 py-2 my-6 bg-[#F9F8F6]">
              <p className="text-xs font-serif italic text-gray-700 leading-relaxed">
                "Precision in detail, discretion in service, and perfection in craft."
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mt-2">
                — Zelora House Standard
              </p>
            </div>
          </div>
                {/* <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#111111] text-[#D4AF37] shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">
                      Private Consultations
                    </h3>
                    <p className="text-xs text-gray-600 font-serif">By Appointment Only</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">VIP viewing suites available upon request</p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Quote Block */}
            

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-[#EAE6DF] shadow-sm">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-2">Send a Message</h2>
            <p className="text-xs text-gray-500 font-serif mb-8">
              Fill out the form below and an advisor will reach out to you shortly.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="mx-auto text-[#D4AF37]" />
                <h3 className="text-lg font-serif uppercase tracking-wider">Message Received</h3>
                <p className="text-xs text-gray-600 font-serif max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Zelora Support. A senior client advisor has been assigned to your request and will contact you via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-[#111111] text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full border border-[#EAE6DF] bg-[#FCFCFB] px-4 py-3 text-base md:text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="eleanor@example.com"
                      className="w-full border border-[#EAE6DF] bg-[#FCFCFB] px-4 py-3 text-base md:text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      className="w-full border border-[#EAE6DF] bg-[#FCFCFB] px-4 py-3 text-base md:text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-2">
                      Subject / Interest
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full border border-[#EAE6DF] bg-[#FCFCFB] px-4 py-3 text-base md:text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="General Inquiries">General Inquiries</option>
                      <option value="Bespoke Design">Bespoke Design & Customization</option>
                      <option value="Private Viewing">Private Appointment Booking</option>
                      <option value="Order Status">Order Status & Logistics</option>
                      <option value="Watch Servicing">Watch Servicing & Repair</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How may we assist you today?"
                    className="w-full border border-[#EAE6DF] bg-[#FCFCFB] px-4 py-3 text-base md:text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                {/* Honeypot: off-screen and skipped by keyboard/screen readers, so only bots fill it */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 font-serif">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-black py-4 text-[11px] uppercase font-bold tracking-[0.25em] transition-colors flex items-center justify-center gap-3 cursor-pointer group disabled:cursor-wait disabled:opacity-70"
                >
                  <Send size={14} className="text-[#D4AF37] group-hover:text-black transition-colors" />
                  <span>{sending ? 'Sending…' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}