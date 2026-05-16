"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Phone, Clock } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  guests: z.string().min(1, "Number of guests is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  'w-full px-4 py-3 rounded-lg text-sm transition-all outline-none font-sans'
  + ' bg-white/8 border text-[#e8d9b5] placeholder:text-[#e8d9b5]/40'
  + ' border-[rgba(232,217,181,0.25)] focus:border-[#c8b99a]'
  + ' focus:shadow-[0_0_0_3px_rgba(200,185,154,0.15)]';

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guests: '2' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, guests: parseInt(values.guests, 10) }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Reservation submitted! We will confirm shortly.' });
        reset();
      } else {
        const err = await res.json();
        setMessage({ type: 'error', text: err.error || 'Something went wrong.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedGuests = watch('guests');

  return (
    <section
      id="reservations"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4a5e32 0%, #3a4e28 50%, #4a5e32 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(138,156,106,0.2) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(138,156,106,0.15) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">

        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif mb-5" style={{ color: '#e8d9b5', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
            Book Your Table
          </h2>
          <div className="divider left" />
          <p className="mt-5 mb-10 text-base" style={{ color: 'rgba(232,217,181,0.75)' }}>
            Join us for an unforgettable dining experience. Reserve your table online or give us a call.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { icon: Phone, title: 'Call Us', body: '+32 2 123 45 67', href: 'tel:+3221234567' },
              { icon: Clock, title: 'Opening Hours', body: 'Brunch & Lunch: 11:00–15:00\nDinner: 18:00–23:00\nClosed on Mondays' },
            ].map(({ icon: Icon, title, body, href }) => (
              <div key={title} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(232,217,181,0.12)', border: '1px solid rgba(232,217,181,0.25)', color: '#e8d9b5' }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: '#e8d9b5', letterSpacing: '0.5px' }}>{title}</h4>
                  {href ? (
                    <a href={href} className="text-sm hover:text-[#e8d9b5] transition-colors whitespace-pre-line" style={{ color: 'rgba(232,217,181,0.7)' }}>{body}</a>
                  ) : (
                    <p className="text-sm whitespace-pre-line" style={{ color: 'rgba(232,217,181,0.7)' }}>{body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-10"
          style={{
            background: 'rgba(245,237,224,0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(232,217,181,0.15)',
          }}
        >
          {Number(selectedGuests) > 10 && (
            <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: 'rgba(232,217,181,0.12)', border: '1px solid rgba(232,217,181,0.25)', color: '#e8d9b5' }}>
              <strong>Large Group Notice:</strong> For more than 10 guests, please call us at +32 2 123 45 67 to confirm.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#e8d9b5' }}>Full Name</label>
                <input {...register('name')} placeholder="John Doe" className={inputCls} />
                {errors.name && <span className="text-[10px]" style={{ color: '#f0b8b8' }}>{errors.name.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#e8d9b5' }}>Phone</label>
                <input {...register('phone')} placeholder="+32 ..." className={inputCls} />
                {errors.phone && <span className="text-[10px]" style={{ color: '#f0b8b8' }}>{errors.phone.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#e8d9b5' }}>Email</label>
              <input {...register('email')} type="email" placeholder="john@example.com" className={inputCls} />
              {errors.email && <span className="text-[10px]" style={{ color: '#f0b8b8' }}>{errors.email.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#e8d9b5' }}>Date</label>
                <input {...register('date')} type="date" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#e8d9b5' }}>Time</label>
                <select {...register('time')} className={inputCls} style={{ appearance: 'none' }}>
                  <option value="" style={{ background: '#4a5e32' }}>Select</option>
                  <optgroup label="Brunch & Lunch" style={{ background: '#4a5e32' }}>
                    {['11:00','12:00','13:00','14:00'].map(t => <option key={t} value={t} style={{ background: '#4a5e32' }}>{t}</option>)}
                  </optgroup>
                  <optgroup label="Dinner" style={{ background: '#4a5e32' }}>
                    {['18:00','19:00','20:00','21:00','22:00'].map(t => <option key={t} value={t} style={{ background: '#4a5e32' }}>{t}</option>)}
                  </optgroup>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#e8d9b5' }}>Guests</label>
                <select {...register('guests')} className={inputCls} style={{ appearance: 'none' }}>
                  {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(n => (
                    <option key={n} value={String(n)} style={{ background: '#4a5e32' }}>{n} {n === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#e8d9b5' }}>Special Requests</label>
              <textarea {...register('notes')} rows={3} placeholder="Dietary requirements, celebrations..." className={inputCls} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)',
                color: '#e8d9b5',
                boxShadow: '0 2px 16px rgba(74,94,50,0.3)',
              }}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
            </button>

            {message && (
              <div
                className="p-3 rounded-lg text-center text-sm"
                style={
                  message.type === 'success'
                    ? { background: 'rgba(107,124,74,0.25)', color: '#e8d9b5', border: '1px solid rgba(107,124,74,0.4)' }
                    : { background: 'rgba(180,70,70,0.2)', color: '#f0b8b8', border: '1px solid rgba(180,70,70,0.3)' }
                }
              >
                {message.text}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationForm;
