"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Phone, Clock, Calendar, Users, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      guests: "2",
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          guests: parseInt(values.guests, 10)
        }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Reservation request submitted! We will contact you soon.' });
        reset();
      } else {
        const errorData = await res.json();
        setMessage({ type: 'error', text: errorData.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedGuests = watch('guests');

  return (
    <section id="reservations" className="section-padding bg-[#121212]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Info Column */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Book Your Table</h2>
            <div className="divider" />
            <p className="text-muted-foreground text-lg max-w-md">
              Join us for an unforgettable dining experience. Reserve your table online or give us a call.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Call Us</h4>
                  <a href="tel:+3221234567" className="text-muted-foreground hover:text-primary transition-colors">+32 2 123 45 67</a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Opening Hours</h4>
                  <p className="text-muted-foreground">
                    Brunch & Lunch: 11:00 - 15:00<br />
                    Dinner: 18:00 - 23:00<br />
                    <span className="italic">Closed on Mondays</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-secondary p-8 md:p-10 shadow-2xl border border-white/5"
        >
          {Number(selectedGuests) > 10 && (
            <div className="mb-8 p-4 bg-primary/20 border border-primary/30 rounded-sm flex items-start space-x-3 text-sm">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p>
                <span className="font-bold text-primary">Large Group Reservation:</span> For more than 10 people, please confirm your booking via phone at <a href="tel:+3221234567" className="underline font-bold">+32 2 123 45 67</a> after submitting this form.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Name</label>
                <input 
                  {...register('name')}
                  placeholder="John Doe"
                  className={cn("w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors", errors.name && "border-red-500")}
                />
                {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone Number</label>
                <input 
                  {...register('phone')}
                  placeholder="+32 ..."
                  className={cn("w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors", errors.phone && "border-red-500")}
                />
                {errors.phone && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email Address</label>
              <input 
                {...register('email')}
                placeholder="john@example.com"
                className={cn("w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors", errors.email && "border-red-500")}
              />
              {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Date</label>
                <input 
                  type="date"
                  {...register('date')}
                  className={cn("w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors", errors.date && "border-red-500")}
                />
                {errors.date && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Time</label>
                <select 
                  {...register('time')}
                  className={cn("w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors", errors.time && "border-red-500")}
                >
                  <option value="">Select Time</option>
                  <optgroup label="Brunch & Lunch">
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                  </optgroup>
                  <optgroup label="Dinner">
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                  </optgroup>
                </select>
                {errors.time && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.time.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Guests</label>
                <select 
                  {...register('guests')}
                  className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors"
                >
                  {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(n => (
                    <option key={n} value={String(n)}>{n} {n === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Special Requests</label>
              <textarea 
                {...register('notes')}
                rows={3}
                placeholder="Dietary requirements, celebrations..."
                className="w-full bg-muted border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={cn(
                "w-full bg-primary text-white py-4 font-bold tracking-widest uppercase hover:bg-primary/90 transition-all rounded-sm shadow-xl",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Processing..." : "Confirm Reservation"}
            </button>

            {message && (
              <div className={cn(
                "p-4 text-center text-sm font-medium",
                message.type === 'success' ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
              )}>
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
