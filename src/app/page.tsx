import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/features/Hero';
import MenuSection from '@/components/features/MenuSection';
import ReservationForm from '@/components/features/ReservationForm';
import CateringSection from '@/components/features/CateringSection';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="about" className="section-padding bg-secondary flex flex-col items-center text-center">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 italic text-primary">A Legacy of Flavors</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Heritage Kitchen was born from a passion for the rich culinary traditions of South East Asia. 
            Located in the heart of Brussels, we blend authentic techniques with local Belgian ingredients 
            to create a dining experience that is both familiar and transformative.
          </p>
        </div>
      </div>
      <MenuSection />
      <CateringSection />
      <ReservationForm />
      
      {/* Location Section */}
      <section id="location" className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4">Find Us</h2>
            <div className="divider mx-auto" />
            <p className="text-muted-foreground">Located in the heart of Brussels, near the Royal Park.</p>
          </div>
          
          <div className="h-[450px] bg-muted rounded-sm overflow-hidden shadow-2xl relative group">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.068134563853!2d4.3598!3d50.8447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4803afbd13b%3A0x6b4fb6c167f57cd0!2sRue%20des%20Colonies%206%2C%201000%20Bruxelles%2C%20Belgium!5e0!3m2!1sen!2sus!4v1711468200000!5m2!1sen!2sus"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-8 left-8 bg-secondary/95 backdrop-blur-sm p-8 shadow-2xl border border-white/10 hidden md:block group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-xl font-serif mb-2">Heritage Kitchen</h3>
                <p className="text-sm text-muted-foreground mb-4">Koloniënstraat 6<br />1000 Brussels, Belgium</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Koloniënstraat+6,+Brussels,+Belgium+1000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-6 py-2 text-xs font-bold uppercase tracking-widest inline-block"
                >
                  Get Directions
                </a>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
