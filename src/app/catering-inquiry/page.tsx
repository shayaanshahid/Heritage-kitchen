"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Users, MessageSquare } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { cn } from '@/lib/utils';

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

export default function CateringInquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    console.log('Submitting Catering Inquiry:', values);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/catering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          guests: parseInt(values.guests, 10)
        }),
      });
      if (res.ok) {
        console.log('Catering Inquiry success');
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        console.error('Catering Inquiry error response:', errorData);
      }
    } catch (error) {
      console.error('Catering Inquiry fetch error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (errors: any) => {
    console.log('Form Validation Errors:', errors);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-serif mb-4 text-white">Inquiry Received</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            Thank you for considering Heritage Kitchen for your event. Our catering manager will contact you within 24 hours.
          </p>
          <a href="/" className="bg-primary text-white px-8 py-3 font-bold uppercase tracking-widest rounded-sm">Return Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-white italic">Plan Your Event</h1>
            <p className="text-muted-foreground text-lg">Tell us about your occasion, and we'll craft the perfect experience.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="bg-[#121212] p-10 shadow-2xl border border-white/5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input {...register('name')} className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:border-primary focus:outline-none transition-colors" placeholder="John Doe" />
                {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                <input {...register('email')} className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:border-primary focus:outline-none transition-colors" placeholder="john@example.com" />
                {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Event Type</label>
                <select {...register('eventType')} className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:border-primary focus:outline-none transition-colors">
                  <option value="">Select Event</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Private Dinner">Private Dinner</option>
                  <option value="Birthday">Birthday</option>
                </select>
                {errors.eventType && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.eventType.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Approx. Guests</label>
                <input type="number" {...register('guests')} className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:border-primary focus:outline-none transition-colors" placeholder="20" />
                {errors.guests && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.guests.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</label>
                <input type="date" {...register('date')} className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:border-primary focus:outline-none transition-colors" />
                {errors.date && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.date.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Additional Notes</label>
              <textarea {...register('notes')} rows={4} className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:border-primary focus:outline-none transition-colors" placeholder="Dietary restrictions, theme, special requests..." />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-5 font-bold tracking-widest uppercase hover:bg-primary/90 transition-all rounded-sm shadow-xl flex items-center justify-center gap-3"
            >
              {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
  return (
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
      className={cn("border-2 border-white border-t-transparent rounded-full", className)}
    />
  );
}
