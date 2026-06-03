import React from "react";
import { Phone, ChevronRight, CheckCircle2, Shield, Users, BookOpen, Clock, MapPin, ArrowRight } from "lucide-react";

export function RefinedNavy() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] font-sans antialiased overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        :root {
          --navy-900: #0a1930;
          --navy-800: #11284b;
          --gold-500: #c5a365;
          --gold-400: #d6b77c;
          --gold-100: #fcfaf5;
          --neutral-50: #f8f9fa;
          --neutral-100: #f1f3f5;
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }

        .bg-navy { background-color: var(--navy-900); }
        .bg-navy-light { background-color: var(--navy-800); }
        .text-navy { color: var(--navy-900); }
        
        .bg-gold { background-color: var(--gold-500); }
        .text-gold { color: var(--gold-500); }
        
        .border-gold { border-color: var(--gold-500); }
      `}</style>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-navy tracking-tight leading-none">Farnham</span>
            <span className="text-[11px] font-sans font-semibold tracking-widest text-gray-500 uppercase mt-1">Senior Health Advisors</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 font-sans text-[15px] font-medium text-gray-700">
            <a href="#" className="hover:text-gold transition-colors">Medicare Plans</a>
            <a href="#" className="hover:text-gold transition-colors">Medicare Basics</a>
            <a href="#" className="hover:text-gold transition-colors">Service Areas</a>
            <a href="#" className="hover:text-gold transition-colors">Medicare 101</a>
            <a href="#" className="hover:text-gold transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="tel:8453992719" className="hidden md:flex items-center gap-2 text-navy hover:text-gold transition-colors">
              <Phone size={18} className="text-gold" />
              <span className="font-semibold text-lg">(845) 399-2719</span>
            </a>
            <button className="bg-navy hover:bg-navy-light text-white px-6 py-3 rounded text-[15px] font-medium transition-colors shadow-sm">
              Schedule Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[var(--neutral-100)] -z-10 rounded-bl-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 pt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--gold-100)] text-[var(--gold-500)] font-semibold text-sm mb-8 border border-[var(--gold-500)]/20">
              <Shield size={16} />
              Licensed in NY & CT
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-navy leading-[1.1] mb-6">
              Clear, no-pressure <br />
              <span className="text-gold italic">Medicare guidance.</span>
            </h1>
            
            <p className="font-sans text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Navigate your Medicare options with confidence. We provide education-first advisory services for the Hudson Valley and Connecticut.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-navy hover:bg-navy-light text-white px-8 py-4 rounded text-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-navy/20">
                Schedule a Free Consultation <ChevronRight size={20} />
              </button>
              <a href="tel:8453992719" className="px-8 py-4 rounded border-2 border-navy text-navy font-semibold text-lg flex items-center justify-center gap-2 hover:bg-navy/5 transition-colors">
                <Phone size={20} /> (845) 399-2719
              </a>
            </div>
            
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="font-serif text-3xl font-bold text-navy">30+</p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <p className="font-serif text-3xl font-bold text-navy">13</p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Years in Medicare</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gold translate-x-4 translate-y-4 rounded" />
            <img 
              src="/__mockup/images/senior-outdoor.png" 
              alt="Active senior couple outdoors" 
              className="relative z-10 w-full h-auto object-cover rounded shadow-2xl grayscale-[20%]"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <Users className="text-gold" size={32} />
            <span className="font-serif text-lg font-medium">30+ Years Experience</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <MapPin className="text-gold" size={32} />
            <span className="font-serif text-lg font-medium">Licensed in NY & CT</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <CheckCircle2 className="text-gold" size={32} />
            <span className="font-serif text-lg font-medium">No-Cost Consultations</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <BookOpen className="text-gold" size={32} />
            <span className="font-serif text-lg font-medium">Education-First Approach</span>
          </div>
        </div>
      </section>

      {/* Two Audience Split */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-12 bg-[var(--neutral-50)] rounded border border-gray-100 group hover:border-gold/50 transition-colors relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform" />
              <h2 className="font-serif text-3xl font-bold text-navy mb-4">Turning 65?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Your first 6 months on Medicare Part B is your one-time guaranteed window to enroll in any Medigap plan with no health questions asked. Don't miss this crucial timeline.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-navy font-bold hover:text-gold transition-colors">
                Learn about Medicare basics <ArrowRight size={18} />
              </a>
            </div>

            <div className="p-12 bg-[var(--neutral-50)] rounded border border-gray-100 group hover:border-gold/50 transition-colors relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-navy transform -translate-x-full group-hover:translate-x-0 transition-transform" />
              <h2 className="font-serif text-3xl font-bold text-navy mb-4">Already on Medicare?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                In NY & CT, you can review and switch your Medigap plan at any time of year without answering health questions. Make sure you're not overpaying for your current coverage.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-navy font-bold hover:text-gold transition-colors">
                Review your current plan <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Explainer - HDG */}
      <section className="py-24 bg-[var(--neutral-50)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-4xl font-bold text-navy mb-6">
                The Smart Alternative: <br />
                <span className="text-gold italic">High-Deductible Plan G</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Many seniors overpay for traditional Medicare Supplements. High-Deductible Medigap offers identical coverage once a manageable annual deductible is met, often saving thousands in premiums.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Significantly lower monthly premiums",
                  "Max out-of-pocket known in advance ($2,950 in 2026)",
                  "Identical coverage to standard Plan G after deductible",
                  "See any doctor that accepts Medicare"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                    <CheckCircle2 className="text-gold mt-1 shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="bg-navy hover:bg-navy-light text-white px-8 py-4 rounded text-lg font-medium transition-colors">
                See how it works
              </button>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-8 rounded shadow-xl border border-gray-100">
                <h3 className="font-serif text-2xl font-bold text-navy text-center mb-8">Premium vs. Deductible</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-gray-500 uppercase tracking-wide">Traditional Plan G</span>
                      <span className="text-navy">High Premium, Low Deductible</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-navy w-3/4" title="Premium"></div>
                      <div className="h-full bg-gray-300 w-1/4" title="Deductible"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-gray-500 uppercase tracking-wide">High-Deductible Plan G</span>
                      <span className="text-gold">Low Premium, Higher Deductible</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-gold w-1/4" title="Premium"></div>
                      <div className="h-full bg-gray-300 w-3/4" title="Deductible"></div>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-8 italic">
                  Often, the premium savings alone cover the entire deductible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-navy mb-4">Comprehensive Coverage Solutions</h2>
            <p className="text-lg text-gray-600">We analyze your specific health needs and budget to find the precise combination of plans that protect your health and wealth.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "High-Deductible Medigap",
                desc: "Lower premiums with a known max out-of-pocket limit.",
                highlight: true
              },
              {
                title: "Medicare Supplement",
                desc: "Predictable costs and the freedom to choose any doctor.",
                highlight: false
              },
              {
                title: "Medicare Advantage",
                desc: "All-in-one alternative covering Part A, B, and often D.",
                highlight: false
              },
              {
                title: "Prescription Drug Plans",
                desc: "Part D coverage tailored to your specific medications.",
                highlight: false
              },
              {
                title: "Dental, Vision & Hearing",
                desc: "Supplemental plans for vital services Medicare doesn't cover.",
                highlight: false
              },
              {
                title: "Hospital Indemnity",
                desc: "Cash benefits to cover copays during hospital stays.",
                highlight: false
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className={`p-8 rounded border ${service.highlight ? 'border-gold bg-[var(--gold-100)]' : 'border-gray-200 bg-white'} hover:shadow-lg transition-shadow`}
              >
                <h3 className={`font-serif text-2xl font-bold mb-3 ${service.highlight ? 'text-navy' : 'text-navy'}`}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wide text-gold hover:text-navy transition-colors">
                  Learn more <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-navy text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-center mb-16">How We Work Together</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Free Conversation", desc: "No pressure, no obligation. We just listen to your needs." },
              { num: "02", title: "Compare Costs", desc: "We look at real total costs, not just monthly premiums." },
              { num: "03", title: "Enroll Confidently", desc: "We handle the paperwork and ensure a smooth transition." },
              { num: "04", title: "Ongoing Support", desc: "You get my personal cell phone number for any future questions." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <span className="font-serif text-6xl text-white/10 absolute -top-8 left-0 select-none">{step.num}</span>
                <h3 className="font-serif text-xl font-bold text-gold mb-3 relative z-10 pt-4">{step.title}</h3>
                <p className="text-gray-300 relative z-10">{step.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-8 right-[-2rem] w-8 border-t border-dashed border-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 h-64 md:h-auto bg-gray-200">
              <img 
                src="/__mockup/images/advisor-headshot.png" 
                alt="Jim Farnham" 
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
            <div className="w-full md:w-2/3 p-12 lg:p-16 flex flex-col justify-center">
              <span className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Meet Your Advisor</span>
              <h2 className="font-serif text-4xl font-bold text-navy mb-6">Jim Farnham, MS, MBA</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                "I believe in an education-first approach. Medicare is confusing, and making the wrong choice can be costly. I don't just quote premiums; I help you understand the total cost of healthcare. When you work with me, there's no pressure, no obligation, and you get my personal cell phone number."
              </p>
              <div className="flex items-center gap-4">
                <span className="text-navy font-serif font-bold italic text-2xl border-b border-gold pb-1 inline-block">Jim Farnham</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medicare 101 */}
      <section className="py-16 bg-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-navy">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-2">Free Medicare 101 Classes</h2>
            <p className="text-lg font-medium opacity-90">Join Jim for an educational seminar at local libraries and community groups.</p>
          </div>
          <button className="bg-navy text-white px-8 py-4 rounded font-medium hover:bg-navy-light transition-colors whitespace-nowrap">
            See upcoming classes
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-5xl font-bold text-navy mb-8">Ready for clear guidance?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Schedule a free, no-obligation consultation to review your Medicare options for New York and Connecticut.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-navy hover:bg-navy-light text-white px-8 py-4 rounded text-lg font-medium transition-colors shadow-lg">
              Schedule a Free Consultation
            </button>
            <a href="tel:8453992719" className="px-8 py-4 rounded border-2 border-navy text-navy font-semibold text-lg flex items-center justify-center gap-2 hover:bg-navy/5 transition-colors">
              <Phone size={20} /> (845) 399-2719
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-light text-white pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12 border-b border-white/10 pb-12">
            <div>
              <span className="font-serif text-3xl font-bold text-white tracking-tight leading-none block mb-2">Farnham</span>
              <span className="text-[12px] font-sans font-semibold tracking-widest text-gold uppercase">Senior Health Advisors</span>
              <p className="text-gray-400 mt-6 max-w-sm">
                Clear, no-pressure Medicare guidance for New York and Connecticut.
              </p>
            </div>
            
            <div className="flex flex-col md:items-end">
              <a href="tel:8453992719" className="text-3xl font-serif text-white hover:text-gold transition-colors mb-2">
                (845) 399-2719
              </a>
              <p className="text-gray-400">Serving Hudson Valley NY & CT</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 space-y-4">
            <p>
              We are not affiliated with or endorsed by the federal government or the Medicare program. This is a solicitation for insurance. 
            </p>
            <p className="flex justify-between items-center">
              <span>© {new Date().getFullYear()} Farnham Senior Health Advisors. All rights reserved.</span>
              <span className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
