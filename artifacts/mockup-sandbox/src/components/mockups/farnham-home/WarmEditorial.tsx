import React from 'react';
import { Phone, ArrowRight, BookOpen, Shield, Heart, Users, GraduationCap, CheckCircle2 } from 'lucide-react';

export function WarmEditorial() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#1A5F6A] selection:text-white">
      {/* Injecting Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }
      `}} />

      {/* Top Bar */}
      <div className="bg-[#1A5F6A] text-[#FDFBF7] text-sm py-2 px-6 flex justify-between items-center hidden md:flex font-sans tracking-wide">
        <span>Licensed in New York & Connecticut</span>
        <a href="tel:8453992719" className="flex items-center gap-2 hover:text-[#E8A38B] transition-colors">
          <Phone className="w-4 h-4" /> (845) 399-2719
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EAE5D9] px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="font-serif text-2xl font-semibold tracking-tight text-[#1A1A1A]">
            Farnham <span className="text-[#1A5F6A] italic">Advisors</span>
          </a>
          
          <nav className="hidden lg:flex items-center gap-8 text-[17px] font-medium text-[#4A4A4A]">
            <a href="#" className="hover:text-[#1A5F6A] transition-colors">Medicare Plans</a>
            <a href="#" className="hover:text-[#1A5F6A] transition-colors">Medicare Basics</a>
            <a href="#" className="hover:text-[#1A5F6A] transition-colors">Service Areas</a>
            <a href="#" className="hover:text-[#1A5F6A] transition-colors">Medicare 101</a>
            <a href="#" className="hover:text-[#1A5F6A] transition-colors">About Jim</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="tel:8453992719" className="hidden md:flex font-semibold text-[#1A5F6A] items-center gap-2 text-lg">
              <Phone className="w-5 h-5" /> (845) 399-2719
            </a>
            <button className="bg-[#1A5F6A] text-white px-6 py-3 rounded text-[17px] font-medium hover:bg-[#134952] transition-colors shadow-sm">
              Schedule Consult
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 pb-24 md:pt-24 md:pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 border border-[#EAE5D9] bg-white px-4 py-2 rounded-full text-sm font-medium text-[#4A4A4A]">
            <span className="w-2 h-2 rounded-full bg-[#1A5F6A]"></span>
            Clear, no-pressure guidance
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.1] text-[#1A1A1A]">
            Medicare made <span className="italic text-[#1A5F6A]">human.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed max-w-xl font-sans">
            Independent advisory serving the Hudson Valley & Connecticut. Education-first approach, zero sales pressure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-[#1A5F6A] text-white px-8 py-4 rounded text-lg font-medium hover:bg-[#134952] transition-colors flex items-center justify-center gap-3">
              Book a Free Consultation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl relative z-10">
            <img src="/__mockup/images/senior-couple.png" alt="Retired couple" className="w-full h-full object-cover" />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#E8A38B] rounded-full mix-blend-multiply opacity-20 blur-2xl z-0"></div>
          <div className="absolute -top-8 -right-8 w-64 h-64 bg-[#1A5F6A] rounded-full mix-blend-multiply opacity-10 blur-3xl z-0"></div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-[#EAE5D9] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center md:text-left divide-x-0 md:divide-x divide-[#EAE5D9]">
            <div className="md:px-8 space-y-1">
              <p className="font-serif text-2xl font-semibold text-[#1A5F6A]">30+ Years</p>
              <p className="text-[#4A4A4A] text-sm uppercase tracking-wider font-semibold">Experience</p>
            </div>
            <div className="md:px-8 space-y-1">
              <p className="font-serif text-2xl font-semibold text-[#1A5F6A]">NY & CT</p>
              <p className="text-[#4A4A4A] text-sm uppercase tracking-wider font-semibold">Licensed Agent</p>
            </div>
            <div className="md:px-8 space-y-1">
              <p className="font-serif text-2xl font-semibold text-[#1A5F6A]">Zero Cost</p>
              <p className="text-[#4A4A4A] text-sm uppercase tracking-wider font-semibold">Consultations</p>
            </div>
            <div className="md:px-8 space-y-1">
              <p className="font-serif text-2xl font-semibold text-[#1A5F6A]">Education First</p>
              <p className="text-[#4A4A4A] text-sm uppercase tracking-wider font-semibold">Approach</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-audience split */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Where are you in your journey?</h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="bg-white p-10 lg:p-14 border border-[#EAE5D9] rounded flex flex-col items-start hover:shadow-lg transition-shadow">
            <div className="bg-[#FDFBF7] p-4 rounded-full mb-8">
              <BookOpen className="w-8 h-8 text-[#1A5F6A]" />
            </div>
            <h3 className="font-serif text-3xl mb-4 text-[#1A1A1A]">Turning 65?</h3>
            <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed flex-grow">
              Your first 6 months on Medicare is your one-time guaranteed window. Enroll without health questions or underwriting. Let's get it right the first time.
            </p>
            <a href="#" className="font-semibold text-[#1A5F6A] text-lg flex items-center gap-2 hover:gap-3 transition-all">
              Start your timeline <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          
          <div className="bg-[#1A5F6A] text-white p-10 lg:p-14 rounded flex flex-col items-start hover:shadow-lg transition-shadow">
            <div className="bg-[#134952] p-4 rounded-full mb-8">
              <Shield className="w-8 h-8 text-[#FDFBF7]" />
            </div>
            <h3 className="font-serif text-3xl mb-4">Already on Medicare?</h3>
            <p className="text-lg text-[#EAE5D9] mb-8 leading-relaxed flex-grow">
              In NY & CT, you can review and switch your Medigap plan any time of year—no health questions asked. Are you overpaying for your current plan?
            </p>
            <a href="#" className="font-semibold text-white text-lg flex items-center gap-2 hover:gap-3 transition-all border-b border-white/30 pb-1 hover:border-white">
              Review your current plan <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Flagship explainer */}
      <section className="bg-[#EAE5D9]/30 py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img src="/__mockup/images/senior-outdoor.png" alt="Active seniors" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <p className="text-sm uppercase tracking-widest font-semibold text-[#1A5F6A]">Flagship Strategy</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              High-Deductible Medigap (Plan G)
            </h2>
            <p className="text-xl text-[#4A4A4A] leading-relaxed">
              Lower your monthly premiums while maintaining comprehensive coverage. Once you meet the annual deductible ($2,950 in 2026), your coverage is identical to standard Plan G.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#1A5F6A] shrink-0 mt-1" />
                <span className="text-lg text-[#4A4A4A]">Significant monthly premium savings</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#1A5F6A] shrink-0 mt-1" />
                <span className="text-lg text-[#4A4A4A]">Predictable maximum out-of-pocket costs</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#1A5F6A] shrink-0 mt-1" />
                <span className="text-lg text-[#4A4A4A]">See any doctor nationwide who accepts Medicare</span>
              </li>
            </ul>
            <div className="pt-4">
              <button className="bg-white border-2 border-[#1A5F6A] text-[#1A5F6A] px-8 py-4 rounded text-lg font-medium hover:bg-[#1A5F6A] hover:text-white transition-colors flex items-center justify-center gap-3">
                See how it works <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Comprehensive Coverage Options</h2>
          <p className="text-xl text-[#4A4A4A]">We help you navigate the complete Medicare landscape to build a plan that fits your health needs and financial goals.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1A5F6A] text-white p-8 rounded shadow-sm border border-transparent">
            <h3 className="font-serif text-2xl mb-3">High-Deductible Medigap</h3>
            <p className="text-[#EAE5D9] text-lg">Our flagship recommendation for predictable costs and premium savings.</p>
          </div>
          <div className="bg-white p-8 rounded shadow-sm border border-[#EAE5D9]">
            <h3 className="font-serif text-2xl mb-3 text-[#1A1A1A]">Medicare Supplement (Medigap)</h3>
            <p className="text-[#4A4A4A] text-lg">Standard plans to cover the 20% that Original Medicare leaves behind.</p>
          </div>
          <div className="bg-white p-8 rounded shadow-sm border border-[#EAE5D9]">
            <h3 className="font-serif text-2xl mb-3 text-[#1A1A1A]">Medicare Advantage (Part C)</h3>
            <p className="text-[#4A4A4A] text-lg">All-in-one bundled plans, often with $0 premiums and network restrictions.</p>
          </div>
          <div className="bg-white p-8 rounded shadow-sm border border-[#EAE5D9]">
            <h3 className="font-serif text-2xl mb-3 text-[#1A1A1A]">Prescription Drug (Part D)</h3>
            <p className="text-[#4A4A4A] text-lg">Standalone coverage for your specific medications and preferred pharmacies.</p>
          </div>
          <div className="bg-white p-8 rounded shadow-sm border border-[#EAE5D9]">
            <h3 className="font-serif text-2xl mb-3 text-[#1A1A1A]">Dental, Vision & Hearing</h3>
            <p className="text-[#4A4A4A] text-lg">Supplemental policies for vital services not covered by Original Medicare.</p>
          </div>
          <div className="bg-white p-8 rounded shadow-sm border border-[#EAE5D9]">
            <h3 className="font-serif text-2xl mb-3 text-[#1A1A1A]">Hospital Indemnity</h3>
            <p className="text-[#4A4A4A] text-lg">Cash benefits to help cover copays and deductibles if you are hospitalized.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24 border-t border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-20">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-[1px] bg-[#EAE5D9] z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FDFBF7] border-2 border-[#1A5F6A] rounded-full flex items-center justify-center text-[#1A5F6A] font-serif text-2xl mb-6 font-bold">1</div>
              <h3 className="text-xl font-bold mb-3">Free Conversation</h3>
              <p className="text-[#4A4A4A] text-lg">A brief, no-pressure chat to understand your unique timeline and needs.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FDFBF7] border-2 border-[#1A5F6A] rounded-full flex items-center justify-center text-[#1A5F6A] font-serif text-2xl mb-6 font-bold">2</div>
              <h3 className="text-xl font-bold mb-3">Compare Costs</h3>
              <p className="text-[#4A4A4A] text-lg">We analyze total real costs—including deductibles and copays—not just premiums.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FDFBF7] border-2 border-[#1A5F6A] rounded-full flex items-center justify-center text-[#1A5F6A] font-serif text-2xl mb-6 font-bold">3</div>
              <h3 className="text-xl font-bold mb-3">Enroll with Confidence</h3>
              <p className="text-[#4A4A4A] text-lg">We handle the paperwork and ensure a seamless transition into your new plan.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FDFBF7] border-2 border-[#1A5F6A] rounded-full flex items-center justify-center text-[#1A5F6A] font-serif text-2xl mb-6 font-bold">4</div>
              <h3 className="text-xl font-bold mb-3">Ongoing Support</h3>
              <p className="text-[#4A4A4A] text-lg">You get my direct cell phone number for any questions that arise later.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Jim */}
      <section className="py-24 bg-[#EAE5D9]/30">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <div className="aspect-[3/4] rounded shadow-xl overflow-hidden relative">
              <img src="/__mockup/images/advisor-headshot.png" alt="Jim Farnham" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-7 space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              An advocate in your corner.
            </h2>
            <p className="text-2xl text-[#1A1A1A] font-serif italic">
              "I believe in an education-first approach. When you understand how Medicare works, making the right choice becomes obvious."
            </p>
            <div className="space-y-4 text-lg text-[#4A4A4A]">
              <p>
                Hi, I'm Jim Farnham. With over 30 years in the insurance industry and 13 years dedicated exclusively to Medicare, I've seen how confusing the transition can be.
              </p>
              <p>
                My practice is built on clarity. I don't use sales tactics or pressure. I look at your total healthcare picture—real costs, doctors, and medications—to find the strategy that protects your health and your wealth.
              </p>
              <p className="font-semibold text-[#1A1A1A]">
                And when you work with me, you don't call an 800 number. You get my personal cell phone.
              </p>
            </div>
            <div className="pt-6">
              <button className="text-[#1A5F6A] font-semibold text-lg flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-[#1A5F6A] pb-1">
                Read my full bio <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Medicare 101 Banner */}
      <section className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex bg-white/10 p-4 rounded-full">
              <GraduationCap className="w-10 h-10 text-[#E8A38B]" />
            </div>
            <div>
              <h3 className="font-serif text-3xl mb-2">Free Medicare 101 Classes</h3>
              <p className="text-lg text-white/80">Join Jim for an educational workshop at local libraries and community centers.</p>
            </div>
          </div>
          <button className="bg-[#E8A38B] text-[#1A1A1A] px-8 py-4 rounded text-lg font-bold hover:bg-white transition-colors whitespace-nowrap">
            See Upcoming Classes
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
          Ready to find your plan?
        </h2>
        <p className="text-2xl text-[#4A4A4A] mb-12">
          Schedule a no-cost, no-obligation consultation today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="bg-[#1A5F6A] text-white px-10 py-5 rounded text-xl font-medium hover:bg-[#134952] transition-colors shadow-lg">
            Schedule a Free Consultation
          </button>
          <span className="text-[#4A4A4A] font-medium text-lg">or call</span>
          <a href="tel:8453992719" className="text-[#1A5F6A] text-2xl font-bold hover:underline flex items-center gap-2">
            <Phone className="w-6 h-6" /> (845) 399-2719
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAE5D9] py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <a href="#" className="font-serif text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-6 block">
              Farnham <span className="text-[#1A5F6A] italic">Advisors</span>
            </a>
            <p className="text-[#4A4A4A] text-lg max-w-sm mb-6">
              Clear, no-pressure Medicare guidance for New York and Connecticut.
            </p>
            <a href="tel:8453992719" className="text-[#1A1A1A] font-bold text-xl flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#1A5F6A]" /> (845) 399-2719
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 text-lg">
            <div>
              <h4 className="font-bold text-[#1A1A1A] mb-4">Quick Links</h4>
              <ul className="space-y-3 text-[#4A4A4A]">
                <li><a href="#" className="hover:text-[#1A5F6A]">Medicare Plans</a></li>
                <li><a href="#" className="hover:text-[#1A5F6A]">Medicare Basics</a></li>
                <li><a href="#" className="hover:text-[#1A5F6A]">Service Areas</a></li>
                <li><a href="#" className="hover:text-[#1A5F6A]">About Jim</a></li>
                <li><a href="#" className="hover:text-[#1A5F6A]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1A1A1A] mb-4">Services</h4>
              <ul className="space-y-3 text-[#4A4A4A]">
                <li><a href="#" className="hover:text-[#1A5F6A]">High-Deductible Plan G</a></li>
                <li><a href="#" className="hover:text-[#1A5F6A]">Medigap</a></li>
                <li><a href="#" className="hover:text-[#1A5F6A]">Medicare Advantage</a></li>
                <li><a href="#" className="hover:text-[#1A5F6A]">Part D Plans</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-[#EAE5D9] text-[#6B6B6B] text-sm leading-relaxed space-y-4">
          <p>
            "We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options."
          </p>
          <p>
            We are not affiliated with or endorsed by the federal government or the Medicare program. This is a solicitation for insurance. By contacting us, you may be connected with a licensed insurance agent.
          </p>
          <p>
            © {new Date().getFullYear()} Farnham Senior Health Advisors. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
