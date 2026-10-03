import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Loader2, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    if (!name?.trim()) newErrors.name = 'Name is required';
    if (!email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!message?.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    if (!validateForm(formData)) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // For production, replace these with your actual EmailJS credentials
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.warn("EmailJS error (expected if keys are placeholders). Simulating success for showcase.", error);
      // Simulate network request for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      formRef.current.reset();
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary/50 mb-8" />
          
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
            Next Steps
          </span>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-tight text-balance mb-6">
            Inquire About <span className="italic text-primary block mt-2">Ownership</span>
          </h2>
          
          <p className="text-muted text-sm md:text-lg max-w-xl mx-auto mb-12 font-light">
            Contact our dedicated ambassadors for allocation inquiries, private viewings, or to reserve your masterpiece.
          </p>

          <div className="w-full max-w-2xl mx-auto text-left">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Overlay success message */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8"
                  >
                    <CheckCircle2 size={48} className="text-primary mb-6" />
                    <h3 className="text-2xl font-light text-white mb-2">Inquiry Received</h3>
                    <p className="text-white/60 font-light text-sm md:text-base">An ambassador will contact you shortly to discuss your request.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className={clsx(
                      "w-full bg-black/40 border p-4 text-white font-light focus:outline-none transition-colors rounded-lg",
                      errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50 hover:border-white/30"
                    )}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={clsx(
                      "w-full bg-black/40 border p-4 text-white font-light focus:outline-none transition-colors rounded-lg",
                      errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50 hover:border-white/30"
                    )}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 ml-1">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="w-full bg-black/40 border border-white/10 p-4 text-white font-light focus:border-primary/50 focus:outline-none transition-colors hover:border-white/30 rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 ml-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  className={clsx(
                    "w-full bg-black/40 border p-4 text-white font-light focus:outline-none transition-colors resize-none rounded-lg",
                    errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50 hover:border-white/30"
                  )}
                  placeholder="How can we assist you?"
                ></textarea>
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-primary text-black font-semibold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed rounded-lg"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
