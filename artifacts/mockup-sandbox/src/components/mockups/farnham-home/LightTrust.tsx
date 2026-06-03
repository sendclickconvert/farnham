import React from "react";
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, HeartHandshake, PhoneCall, ChevronRight, Check, BookOpen, Clock, Calendar } from "lucide-react";

const FontInjection = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    .font-heading { font-family: 'Outfit', sans-serif; }
    .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
    
    .text-body-lg {
      font-size: 1.125rem; /* 18px */
      line-height: 1.75rem;
    }
    
    .text-body-xl {
      font-size: 1.25rem; /* 20px */
      line-height: 1.875rem;
    }
    
    .bg-sky-light { background-color: #F0F7FB; }
    .text-sky-dark { color: #0C4A6E; }
    .bg-sky-dark { background-color: #0C4A6E; }
    .bg-coral-accent { background-color: #F27A5E; }
    .text-coral-accent { color: #F27A5E; }
    .border-sky-soft { border-color: #E0F2FE; }
  `
  }} />
);

export function LightTrust() {
  return (
    <div className="font-body text-slate-800 bg-white min-h-screen selection:bg-sky-200 selection:text-sky-900">
      <FontInjection />
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-sky-soft/60 shadow-sm backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-sky-dark" strokeWidth={2.5} />
            <div className="font-heading font-semibold text-2xl tracking-tight text-slate-900 leading-none">
              Farnham <span className="font-light text-slate-600 block sm:inline text-lg sm:text-2xl mt-1 sm:mt-0">Senior Health Advisors</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 font-medium text-[17px] text-slate-600">
            <a href="#plans" className="hover:text-sky-dark transition-colors">Medicare Plans</a>
            <a href="#basics" className="hover:text-sky-dark transition-colors">Medicare Basics</a>
            <a href="#areas" className="hover:text-sky-dark transition-colors">Service Areas</a>
            <a href="#101" className="hover:text-sky-dark transition-colors">Medicare 101</a>
            <a href="#about" className="hover:text-sky-dark transition-colors">About Jim</a>
          </nav>
          
          <div className="flex items-center gap-6">
            <a href="tel:8453992719" className="hidden md:flex items-center gap-2 text-sky-dark font-semibold text-xl hover:opacity-80 transition-opacity">
              <Phone className="w-5 h-5" />
              (845) 399-2719
            </a>
            <button className="bg-coral-accent hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-coral-accent/20 transition-all active:scale-95 text-[17px] hidden sm:block">
              Free Consultation
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-sky-light">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sky-dark font-semibold text-[16px] mb-8 shadow-sm border border-sky-100">
                <HeartHandshake className="w-5 h-5" />
                Licensed in NY & CT
              </div>
              <h1 className="font-heading font-semibold text-5xl lg:text-7xl text-slate-900 leading-[1.1] mb-6">
                Clear, no-pressure <br/>
                <span className="text-sky-dark">Medicare guidance.</span>
              </h1>
              <p className="text-body-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Navigating Medicare doesn't have to be overwhelming. Get local, independent advice focused on your real total costs, not just monthly premiums.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button className="bg-coral-accent hover:bg-orange-500 text-white font-semibold py-4 px-8 rounded-full shadow-xl shadow-coral-accent/20 transition-all active:scale-95 text-body-lg flex items-center justify-center gap-2">
                  Schedule a Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a href="tel:8453992719" className="bg-white hover:bg-slate-50 text-sky-dark font-semibold py-4 px-8 rounded-full shadow-md border border-slate-200 transition-all active:scale-95 text-body-lg flex items-center justify-center gap-2">
                  <PhoneCall className="w-5 h-5" />
                  (845) 399-2719
                </a>
              </div>
            </div>
            
            <div className="relative lg:ml-auto">
              <div className="absolute inset-0 bg-sky-200 rounded-[3rem] rotate-3 scale-105 opacity-50"></div>
              <img 
                src="/__mockup/images/senior-couple.png" 
                alt="Happy retired couple" 
                className="relative z-10 rounded-[3rem] shadow-2xl object-cover aspect-4/3 w-full max-w-lg mx-auto border-8 border-white"
              />
              
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 border border-sky-50 flex items-center gap-4">
                <div className="bg-sky-100 text-sky-dark p-3 rounded-2xl">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-heading font-bold text-2xl text-slate-900">30+ Years</div>
                  <div className="text-[16px] text-slate-500 font-medium">Insurance Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center lg:justify-between gap-6 lg:gap-4 text-center">
            {[
              "30+ Years Experience",
              "Licensed in NY & CT",
              "No-Cost Consultations",
              "Education-First Approach"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-body-lg font-medium text-slate-700">
                <CheckCircle2 className="w-6 h-6 text-sky-dark opacity-80" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO AUDIENCE SPLIT */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl lg:text-5xl text-slate-900 mb-6">Where are you on your journey?</h2>
            <p className="text-body-lg text-slate-600">The rules for Medicare depend on your current situation. We can help you navigate either path.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Box 1 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:border-sky-300 transition-colors group">
              <div className="w-16 h-16 bg-sky-100 text-sky-dark rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sky-dark group-hover:text-white transition-colors">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-3xl text-slate-900 mb-4">Turning 65?</h3>
              <p className="text-body-lg text-slate-600 mb-8 h-24">
                The first 6 months of Part B is your one-time guaranteed window to enroll in any Medigap plan with no health questions asked. Don't miss this crucial period.
              </p>
              <button className="text-sky-dark font-semibold text-body-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn about starting Medicare <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Box 2 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:border-coral-accent/30 transition-colors group">
              <div className="w-16 h-16 bg-orange-50 text-coral-accent rounded-2xl flex items-center justify-center mb-8 group-hover:bg-coral-accent group-hover:text-white transition-colors">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-3xl text-slate-900 mb-4">Already on Medicare?</h3>
              <p className="text-body-lg text-slate-600 mb-8 h-24">
                Good news for NY & CT residents: you can review or switch your Medigap coverage at any time of year, with no health questions or underwriting required.
              </p>
              <button className="text-coral-accent font-semibold text-body-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                Review your current coverage <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLAGSHIP EXPLAINER - HDG */}
      <section className="py-24 bg-sky-dark text-white relative overflow-hidden" id="plans">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-400 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-sky-500/30 text-sky-100 font-semibold text-[16px] mb-6 border border-sky-400/30">
                Featured Strategy
              </div>
              <h2 className="font-heading font-semibold text-4xl lg:text-5xl mb-6 leading-tight">
                The smarter way to protect your savings: <span className="text-sky-200">High-Deductible Plan G</span>
              </h2>
              <p className="text-body-lg text-sky-50 mb-8 opacity-90">
                Many seniors overpay for traditional Medigap plans. High-Deductible Plan G offers identical coverage once a manageable deductible is met, often saving thousands in fixed premium costs over time.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Significantly lower monthly premiums",
                  "Annual deductible of $2,950 (in 2026)",
                  "100% identical coverage after deductible is met",
                  "Protects against catastrophic health costs"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-body-lg text-sky-100">
                    <Check className="w-6 h-6 text-coral-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="bg-white text-sky-dark hover:bg-sky-50 font-semibold py-4 px-8 rounded-full shadow-lg transition-all active:scale-95 text-body-lg flex items-center justify-center gap-2">
                See how it works
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20 backdrop-blur-md">
              <h3 className="font-heading font-semibold text-2xl mb-8 text-center">Comparing Your Costs</h3>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-xl">Traditional Plan G</div>
                  </div>
                  <p className="text-sky-200 text-[16px] mb-4">High premiums, low out-of-pocket costs</p>
                  <div className="flex justify-between text-body-lg border-t border-white/10 pt-4">
                    <span className="opacity-80">You pay upfront:</span>
                    <span className="font-semibold text-coral-accent">$$$</span>
                  </div>
                </div>
                
                <div className="bg-white text-sky-dark rounded-2xl p-6 shadow-xl relative scale-105">
                  <div className="absolute -top-4 -right-4 bg-coral-accent text-white text-sm font-bold px-4 py-1 rounded-full shadow-md transform rotate-3">
                    Recommended
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-xl">High-Deductible Plan G</div>
                  </div>
                  <p className="text-slate-500 text-[16px] mb-4">Low premiums, manageable risk</p>
                  <div className="flex justify-between text-body-lg border-t border-slate-200 pt-4">
                    <span className="text-slate-600">You pay upfront:</span>
                    <span className="font-semibold text-green-600">$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-white" id="services">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl lg:text-5xl text-slate-900 mb-6">Comprehensive Coverage Options</h2>
            <p className="text-body-lg text-slate-600">We help you build a complete safety net, tailored to your health needs and budget.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "High-Deductible Medigap", desc: "Lower premiums with the same comprehensive coverage after deductible.", highlight: true },
              { title: "Medicare Supplement (Medigap)", desc: "Traditional plans that cover the gaps in Original Medicare with predictable costs." },
              { title: "Medicare Advantage (Part C)", desc: "All-in-one alternative to Original Medicare, often including Part D." },
              { title: "Prescription Drug Plans (Part D)", desc: "Standalone coverage for your necessary medications at the pharmacy." },
              { title: "Dental, Vision & Hearing", desc: "Supplemental coverage for routine care not covered by Medicare." },
              { title: "Hospital Indemnity", desc: "Cash benefits paid directly to you for hospital stays to cover out-of-pocket costs." }
            ].map((service, i) => (
              <div key={i} className={`p-8 rounded-3xl border-2 transition-all cursor-pointer group ${service.highlight ? 'border-sky-300 bg-sky-50 shadow-md' : 'border-slate-100 bg-white hover:border-sky-200 hover:shadow-md'}`}>
                <h3 className="font-heading font-semibold text-2xl text-slate-900 mb-4 group-hover:text-sky-dark transition-colors">{service.title}</h3>
                <p className="text-body-lg text-slate-600 mb-6">{service.desc}</p>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${service.highlight ? 'bg-sky-dark text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-sky-100 group-hover:text-sky-dark'}`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-sky-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-semibold text-4xl lg:text-5xl text-slate-900 mb-6">A simple, transparent process</h2>
            <p className="text-body-lg text-slate-600">No pushy sales tactics. Just clear education and ongoing support from a local expert.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Free Conversation", desc: "We discuss your current situation, health needs, and doctors." },
              { num: "02", title: "Compare Real Costs", desc: "We analyze total out-of-pocket exposure, not just monthly premiums." },
              { num: "03", title: "Enroll Confidently", desc: "We handle the paperwork and ensure a smooth transition." },
              { num: "04", title: "Ongoing Support", desc: "Questions later? You don't call a 1-800 number. You call my cell." }
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-sky-200 border-t-2 border-dashed border-sky-300 z-0"></div>}
                <div className="relative z-10 bg-white w-16 h-16 rounded-2xl shadow-sm border border-sky-100 flex items-center justify-center font-heading font-bold text-2xl text-sky-dark mb-6">
                  {step.num}
                </div>
                <h3 className="font-heading font-semibold text-2xl text-slate-900 mb-3">{step.title}</h3>
                <p className="text-[17px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT JIM */}
      <section className="py-24 bg-white" id="about">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-slate-50 rounded-[3rem] p-8 lg:p-16 border border-slate-100">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <img 
                  src="/__mockup/images/advisor-headshot.png" 
                  alt="Jim Farnham" 
                  className="rounded-3xl shadow-xl w-full max-w-md mx-auto aspect-[3/4] object-cover"
                />
              </div>
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="font-heading font-semibold text-4xl lg:text-5xl text-slate-900 mb-4">Meet Jim Farnham</h2>
                  <p className="text-xl text-sky-dark font-medium">MS, MBA — Independent Medicare Specialist</p>
                </div>
                
                <div className="space-y-6 text-body-lg text-slate-600">
                  <p>
                    For over 30 years, I've worked in the insurance industry, with the last 13 years dedicated strictly to Medicare planning for residents of New York and Connecticut.
                  </p>
                  <p>
                    My approach is entirely education-first. I believe that when you understand how Medicare actually works—and look at real total costs rather than just monthly premiums—the right choice becomes obvious.
                  </p>
                  <p>
                    I don't work for an insurance company; I work for you. There is absolutely no pressure, no obligation, and no cost for my consultations. And when you become a client, you get my direct cell phone number. No call centers, ever.
                  </p>
                </div>
                
                <div className="pt-6">
                  <img src="/__mockup/images/farnham-logo.svg" alt="Signature" className="h-16 opacity-50 mb-2 grayscale" onError={(e) => e.currentTarget.style.display = 'none'} />
                  <div className="font-heading text-xl font-medium text-slate-800">James W. Farnham</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEDICARE 101 */}
      <section className="py-8 bg-white" id="101">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-coral-accent rounded-3xl p-8 lg:p-12 shadow-lg text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-orange-200" />
                <span className="font-semibold text-orange-100 tracking-wide uppercase text-sm">Community Education</span>
              </div>
              <h2 className="font-heading font-semibold text-3xl lg:text-4xl mb-4">Free "Medicare 101" Classes</h2>
              <p className="text-body-lg text-orange-50 max-w-2xl">
                Jim regularly teaches purely educational, no-sales-pitch classes at local libraries and community groups across the Hudson Valley.
              </p>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <button className="w-full md:w-auto bg-white text-coral-accent hover:bg-orange-50 font-semibold py-4 px-8 rounded-full shadow-md transition-all active:scale-95 text-body-lg whitespace-nowrap">
                See Upcoming Classes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-32 bg-sky-light text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-heading font-semibold text-4xl lg:text-6xl text-slate-900 mb-8 leading-tight">
            Ready for clear, <br className="hidden sm:block"/> no-pressure guidance?
          </h2>
          <p className="text-body-xl text-slate-600 mb-12">
            Schedule a free consultation to review your options. No cost, no obligation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-coral-accent hover:bg-orange-500 text-white font-semibold py-4 px-10 rounded-full shadow-xl shadow-coral-accent/20 transition-all active:scale-95 text-body-lg">
              Schedule Consultation
            </button>
            <a href="tel:8453992719" className="bg-white hover:bg-slate-50 text-sky-dark font-semibold py-4 px-10 rounded-full shadow-md border border-slate-200 transition-all active:scale-95 text-body-lg flex items-center justify-center gap-2">
              <PhoneCall className="w-5 h-5" />
              (845) 399-2719
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 font-body">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6 text-white">
                <ShieldCheck className="w-8 h-8 text-sky-400" strokeWidth={2.5} />
                <div className="font-heading font-semibold text-2xl tracking-tight leading-none">
                  Farnham <span className="font-light block sm:inline text-lg sm:text-2xl mt-1 sm:mt-0 opacity-80">Senior Health Advisors</span>
                </div>
              </div>
              <p className="text-[16px] max-w-md mb-6 leading-relaxed">
                Clear, no-pressure Medicare guidance for residents of New York and Connecticut. Focused on education and finding your lowest real total costs.
              </p>
              <div className="text-white font-semibold text-xl flex items-center gap-2">
                <Phone className="w-5 h-5 text-sky-400" />
                (845) 399-2719
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Service Areas</h4>
                <ul className="space-y-3 text-[16px]">
                  <li>Ulster County, NY</li>
                  <li>Dutchess County, NY</li>
                  <li>Orange County, NY</li>
                  <li>Westchester County, NY</li>
                  <li>State of Connecticut</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
                <ul className="space-y-3 text-[16px]">
                  <li><a href="#plans" className="hover:text-white transition-colors">Medicare Plans</a></li>
                  <li><a href="#101" className="hover:text-white transition-colors">Medicare 101 Classes</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About Jim</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-sm leading-relaxed">
            <p className="mb-4">
              We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.
            </p>
            <p className="mb-4">
              We are not affiliated with or endorsed by the federal government or the Medicare program. This is a solicitation for insurance.
            </p>
            <p className="opacity-60">
              © {new Date().getFullYear()} Farnham Senior Health Advisors. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
