import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

// International format, digits only (+92 325 2984520)
const WHATSAPP_NUMBER = '923252984520';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}
