import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/features/Hero';
import MenuSection from '@/components/features/MenuSection';
import ReservationForm from '@/components/features/ReservationForm';
import CateringSection from '@/components/features/CateringSection';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <main style={{ background: '#f5ede0' }}>
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about" className="section-padding" style={{ background: '#ffffff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif italic mb-3" style={{ color: '#4a5e32', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            A Legacy of Flavours
          </h2>
          <div className="divider" />
          <p className="mt-5 leading-relaxed" style={{ color: '#7a8060', fontSize: '1.05rem' }}>
            Heritage Kitchen was born from a passion for the rich culinary traditions of South East Asia.
            Located in the heart of Brussels, we blend authentic techniques with local Belgian ingredients
            to create a dining experience that is both familiar and transformative.
          </p>
        </div>
      </section>

      <MenuSection />
      <CateringSection />
      <ReservationForm />

      {/* Location Section */}
      <section id="location" className="section-padding" style={{ background: '#f5ede0' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl mb-3" style={{ color: '#4a5e32' }}>Find Us</h2>
            <div className="divider" />
            <p className="mt-4 text-sm" style={{ color: '#7a8060' }}>Located in the heart of Brussels, near the Royal Park.</p>
          </div>

          <div
            className="relative overflow-hidden group"
            style={{ borderRadius: '20px', boxShadow: '0 20px 60px rgba(74,94,50,0.15)', height: '480px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.068134563853!2d4.3598!3d50.8447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4803afbd13b%3A0x6b4fb6c167f57cd0!2sRue%20des%20Colonies%206%2C%201000%20Bruxelles%2C%20Belgium!5e0!3m2!1sen!2sus!4v1711468200000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(0.75) hue-rotate(20deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay card — matches legacy */}
            <div
              className="absolute top-0 left-0 bottom-0 hidden md:flex items-center justify-center"
              style={{
                width: '280px',
                background: 'linear-gradient(90deg, rgba(30,34,21,0.88) 0%, rgba(30,34,21,0) 100%)',
                padding: '32px',
                pointerEvents: 'none',
              }}
            >
              <div style={{ pointerEvents: 'all' }}>
                <p className="text-2xl mb-1" style={{ color: '#c8b99a' }}>📍</p>
                <h3 className="font-serif text-xl mb-2" style={{ color: '#e8d9b5' }}>Heritage Kitchen</h3>
                <p className="text-sm mb-5" style={{ color: 'rgba(232,217,181,0.7)', lineHeight: 1.7 }}>
                  Koloniënstraat 6<br />1000 Brussels, Belgium
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Koloniënstraat+6,+Brussels,+Belgium+1000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)', color: '#e8d9b5' }}
                >
                  Get Directions ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
