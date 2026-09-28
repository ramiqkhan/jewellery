import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, Bell, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "September 2026";

  const sections = [
    {
      id: "information-collection",
      icon: <Eye className="w-5 h-5 text-[#D4AF37]" />,
      title: "1. Information We Collect",
      content: (
        <>
          <p className="mb-3">
            At Zelora, we collect personal information to provide a refined luxury shopping experience and to fulfill your requests. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Personal Identification:</strong> Your name, email address, telephone number, and shipping/billing address when placing an order or creating an account.</li>
            <li><strong>Transaction Details:</strong> Payment confirmation, order history, and custom sizing or engraving preferences.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, and site navigation patterns gathered via cookies to optimize site performance.</li>
          </ul>
        </>
      ),
    },
    {
      id: "information-use",
      icon: <FileText className="w-5 h-5 text-[#D4AF37]" />,
      title: "2. How We Use Your Information",
      content: (
        <>
          <p className="mb-3">Your information allows us to deliver exceptional service at every touchpoint. We use your data to:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Process and fulfill orders, including order tracking and white-glove delivery coordination.</li>
            <li>Provide personalized client care, bespoke jewelry consultations, and warranty servicing.</li>
            <li>Send curated collection announcements, exclusive event invitations, and newsletter updates (with your explicit consent).</li>
            <li>Ensure the integrity and security of our website and safeguard against fraudulent transactions.</li>
          </ul>
        </>
      ),
    },
    {
      id: "data-protection",
      icon: <Lock className="w-5 h-5 text-[#D4AF37]" />,
      title: "3. Data Security & Encryption",
      content: (
        <p className="leading-relaxed">
          We implement rigorous technical and organizational security protocols to maintain the safety of your personal data. All sensitive payment information is transmitted via Secure Socket Layer (SSL) encryption technology and processed in compliance with strict PCI-DSS standards. Zelora does not store full credit card credentials on our servers.
        </p>
      ),
    },
    {
      id: "sharing",
      icon: <Globe className="w-5 h-5 text-[#D4AF37]" />,
      title: "4. Third-Party Disclosures",
      content: (
        <p className="leading-relaxed">
          Zelora does not sell, rent, or trade your personal information to third parties. We share limited data strictly with trusted service providers who assist us in operating our e-commerce platform, processing payments, and shipping luxury timepieces and fine jewelry—all bound by strict confidentiality agreements.
        </p>
      ),
    },
    {
      id: "your-rights",
      icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
      title: "5. Your Privacy Rights",
      content: (
        <>
          <p className="mb-3">You retain full control over your personal information. You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Access, update, or request the deletion of your personal data held by Zelora.</li>
            <li>Opt out of marketing communications at any time via the unsubscribe link in our emails.</li>
            <li>Manage cookie preferences through your web browser settings.</li>
          </ul>
        </>
      ),
    },
    {
      id: "updates",
      icon: <Bell className="w-5 h-5 text-[#D4AF37]" />,
      title: "6. Policy Updates & Contact",
      content: (
        <p className="leading-relaxed">
          We may update this Privacy Policy periodically to reflect changes in legal requirements or our operational practices. For privacy-related inquiries or data requests, please contact our Concierge team at <a href="mailto:concierge@zelora.com" className="text-[#1A1A1A] underline hover:text-[#D4AF37] transition-colors">concierge@zelora.com</a> or via our <Link to="/contact-us" className="text-[#1A1A1A] underline hover:text-[#D4AF37] transition-colors">Contact Page</Link>.
        </p>
      ),
    },
  ];

  return (
    <main className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#111111] text-white px-6 py-16 md:py-24 text-center">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Privacy Policy</span>
        </nav>
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          Client Trust & Disclosures
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] uppercase">
          Privacy Policy
        </h1>
        <div className="w-10 h-px bg-[#D4AF37] mx-auto mt-4 mb-5" />
        <p className="text-xs text-gray-400 font-serif tracking-widest uppercase">
          Last Updated: {lastUpdated}
        </p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="bg-white p-8 md:p-14 border border-[#EAE6DF] shadow-xs">
          <p className="text-sm font-serif leading-relaxed text-gray-700 mb-12 border-b border-[#EAE6DF] pb-8">
            At <strong>Zelora</strong>, protecting your privacy and ensuring the utmost confidentiality of your personal information is fundamental to our maison. This Privacy Policy outlines how we gather, utilize, protect, and handle your information across our website and luxury concierge services.
          </p>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <article key={section.id} className="border-b border-[#F0ECE1] pb-10 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-lg md:text-xl font-serif font-light uppercase tracking-wider text-[#111111]">
                    {section.title}
                  </h2>
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed pl-8">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Reassurance Footer */}
        <div className="mt-12 text-center bg-[#F9F8F6] p-8 border border-[#EAE6DF]">
          <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-2 text-[#111111]">
            Have Questions Regarding Your Data?
          </h3>
          <p className="text-xs text-gray-500 mb-4 font-serif">
            Our Concierge Client Services team is available to assist you with any privacy requests.
          </p>
          <Link
            to="/contact-us"
            className="inline-block px-6 py-3 bg-[#111111] text-white text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </main>
  );
}