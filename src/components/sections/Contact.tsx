import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Loader2, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'unconfigured'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const isConfigured = Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    serviceId !== 'your_service_id_here' &&
    templateId !== 'your_template_id_here' &&
    publicKey !== 'your_public_key_here'
  );

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

    // Strict validation: Do not pretend delivery if credentials are not configured
    if (!isConfigured) {
      setSubmitStatus('unconfigured');
      setErrorMessage(
        'Inquiry service is not yet configured. Please supply valid VITE_EMAILJS_* environment variables to enable direct transmission.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const result = await emailjs.sendForm(
        serviceId, 
        templateId, 
        formRef.current,
        publicKey
      );

      if (result.status === 200 || result.text === 'OK') {
        setSubmitStatus('success');
        formRef.current.reset();
        setTimeout(() => setSubmitStatus('idle'), 6000);
      } else {
        throw new Error(result.text || 'EmailJS rejected message transmission.');
      }
    } catch (error: unknown) {
      const err = error as { text?: string; message?: string };
      const desc = err?.text || err?.message || 'Transmission failed. Please check network connection and try again.';
      setSubmitStatus('error');
      setErrorMessage(desc);
    } finally {
      setIsSubmitting(false);
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
                    className="absolute inset-0 bg-black/95 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8"
                  >
                    <CheckCircle2 size={48} className="text-primary mb-6" />
                    <h3 className="text-2xl font-light text-white mb-2">Inquiry Confirmed</h3>
                    <p className="text-white/60 font-light text-sm md:text-base max-w-md">
                      Your transmission was received successfully. A client ambassador will contact you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Unconfigured Alert Banner */}
              {submitStatus === 'unconfigured' && (
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs md:text-sm">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Configuration Required</p>
                    <p className="text-amber-200/80">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Alert Banner */}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs md:text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Transmission Error</p>
                    <p className="text-red-200/80">{errorMessage}</p>
                  </div>
                </div>
              )}

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
