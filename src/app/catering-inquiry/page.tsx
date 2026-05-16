"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  eventType: z.string().min(1, "Event type is required"),
  guests: z.string().min(1, "Number of guests is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  'w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all font-sans ' +
  'bg-white text-[#1e2215] placeholder:text-[#7a8060] ' +
  'border-[rgba(107,124,74,0.25)] focus:border-[#6b7c4a] ' +
  'focus:shadow-[0_0_0_3px_rgba(107,124,74,0.12)]';

const labelCls = 'text-xs font-medium uppercase tracking-widest text-[#4a5e32]';

export default function CateringInquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/catering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, guests: parseInt(values.guests, 10) }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: '#f5ede0' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)' }}
          >
            <CheckCircle2 size={36} color="#e8d9b5" />
          </div>
          <h1 className="font-serif text-4xl mb-4" style={{ color: '#4a5e32' }}>Inquiry Received</h1>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: '#7a8060' }}>
            Thank you for considering Heritage Kitchen for your event. Our catering manager will contact you within 24 hours.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)', color: '#e8d9b5', boxShadow: '0 2px 16px rgba(74,94,50,0.25)' }}
          >
            Return Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f5ede0', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif italic mb-3" style={{ color: '#4a5e32', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
              Plan Your Event
            </h1>
            <div className="divider" />
            <p className="mt-4 text-sm" style={{ color: '#7a8060', fontSize: '1.05rem' }}>
              Tell us about your occasion and we'll craft the perfect Heritage Kitchen experience.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(107,124,74,0.15)',
              boxShadow: '0 8px 40px rgba(74,94,50,0.10)',
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Full Name</label>
                  <input {...register('name')} placeholder="John Doe" className={inputCls} />
                  {errors.name && <span className="text-xs" style={{ color: '#c05050' }}>{errors.name.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Email</label>
                  <input {...register('email')} type="email" placeholder="john@example.com" className={inputCls} />
                  {errors.email && <span className="text-xs" style={{ color: '#c05050' }}>{errors.email.message}</span>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Event Type</label>
                  <select {...register('eventType')} className={inputCls} style={{ appearance: 'none' }}>
                    <option value="">Select event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Private Dinner">Private Dinner</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.eventType && <span className="text-xs" style={{ color: '#c05050' }}>{errors.eventType.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Approx. Guests</label>
                  <input type="number" {...register('guests')} placeholder="25" className={inputCls} />
                  {errors.guests && <span className="text-xs" style={{ color: '#c05050' }}>{errors.guests.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Preferred Date</label>
                  <input type="date" {...register('date')} className={inputCls} />
                  {errors.date && <span className="text-xs" style={{ color: '#c05050' }}>{errors.date.message}</span>}
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Phone Number</label>
                <input {...register('phone')} placeholder="+32 ..." className={inputCls} />
                {errors.phone && <span className="text-xs" style={{ color: '#c05050' }}>{errors.phone.message}</span>}
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Additional Notes</label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  placeholder="Dietary restrictions, theme, venue, special requests..."
                  className={inputCls}
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5 disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)',
                  color: '#e8d9b5',
                  boxShadow: '0 2px 16px rgba(74,94,50,0.25)',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
