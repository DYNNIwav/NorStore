'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ContactFormData, ContactFormErrors } from '@/types';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    subject: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};

    // Full name validation (min 3 chars)
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    }

    // Subject validation (min 3 chars)
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // Message validation (min 10 chars)
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#112038] tracking-tight">
          Contact
        </h1>
        <p className="text-xs text-[#6e7787]">
          Have an inquiry about an order or product? Fill in the details below.
        </p>
      </div>

      <div className="bg-white border border-[#dfe3ea] rounded-lg p-6 sm:p-7">
        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#14a37f] text-white flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#112038]">Message sent</h2>
              <p className="text-xs text-[#6e7787] max-w-sm mx-auto">
                Thank you, {formData.fullName}. We have received your inquiry and will follow up by email shortly.
              </p>
            </div>
            <button
              onClick={() => {
                setFormData({ fullName: '', subject: '', email: '', message: '' });
                setIsSubmitted(false);
              }}
              className="mt-3 text-xs font-semibold text-[#5e60ce] hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-medium text-[#1d2433] mb-1">
                Full Name <span className="text-[#dc2f3a]">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={`w-full px-3 py-2 rounded-md border text-xs outline-none transition-colors ${
                  errors.fullName
                    ? 'border-[#dc2f3a] bg-[#dc2f3a]/5'
                    : 'border-[#dfe3ea] focus:border-[#5e60ce]'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-[11px] text-[#dc2f3a] font-medium">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium text-[#1d2433] mb-1">
                Email <span className="text-[#dc2f3a]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={`w-full px-3 py-2 rounded-md border text-xs outline-none transition-colors ${
                  errors.email
                    ? 'border-[#dc2f3a] bg-[#dc2f3a]/5'
                    : 'border-[#dfe3ea] focus:border-[#5e60ce]'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-[#dc2f3a] font-medium">{errors.email}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block font-medium text-[#1d2433] mb-1">
                Subject <span className="text-[#dc2f3a]">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Order inquiry"
                className={`w-full px-3 py-2 rounded-md border text-xs outline-none transition-colors ${
                  errors.subject
                    ? 'border-[#dc2f3a] bg-[#dc2f3a]/5'
                    : 'border-[#dfe3ea] focus:border-[#5e60ce]'
                }`}
              />
              {errors.subject && (
                <p className="mt-1 text-[11px] text-[#dc2f3a] font-medium">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block font-medium text-[#1d2433] mb-1">
                Message <span className="text-[#dc2f3a]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className={`w-full px-3 py-2 rounded-md border text-xs outline-none transition-colors resize-y ${
                  errors.message
                    ? 'border-[#dc2f3a] bg-[#dc2f3a]/5'
                    : 'border-[#dfe3ea] focus:border-[#5e60ce]'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-[11px] text-[#dc2f3a] font-medium">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#112038] hover:bg-[#5e60ce] text-white font-semibold py-2.5 px-4 rounded-md transition-colors"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
