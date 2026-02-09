
import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  Calculator, 
  ChevronRight, 
  ChevronLeft,
  Clock, 
  Mail, 
  MapPin, 
  Menu, 
  Phone, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  X,
  FileText,
  Briefcase,
  PieChart,
  CheckCircle2,
  ArrowRight,
  Target,
  Sun,
  Moon
} from 'lucide-react';

// --- Types ---
interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// --- Data ---
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Aspire UK Advisers completely transformed how we view our company finances. Their proactive advice saved us thousands in our first year.",
    author: "David Miller",
    role: "CEO",
    company: "Miller Tech Solutions"
  },
  {
    quote: "The level of detail and personal attention we receive is unmatched. They feel like an internal part of our team rather than an external firm.",
    author: "Sarah Jenkins",
    role: "Founder",
    company: "Green Horizon Ltd"
  },
  {
    quote: "Navigating HMRC compliance used to be a nightmare until we partnered with Aspire. Reliable, fast, and incredibly professional.",
    author: "James Thompson",
    role: "Director",
    company: "BuildRight Construction"
  }
];

// --- Components ---

const Header: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault();
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 dark:bg-[#1a1d23]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="bg-[#D21E2C] p-2 rounded-lg shadow-[#D21E2C]/20 shadow-lg">
            <Target className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-[#222B38] dark:text-white' : 'text-white'}`}>
            ASPIRE <span className="text-[#D21E2C]">UK</span> <span className="hidden sm:inline">ADVISERS</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-semibold transition-all hover:text-[#D21E2C] dark:hover:text-[#D21E2C] relative group ${isScrolled ? 'text-slate-600 dark:text-slate-400' : 'text-white/90'}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D21E2C] transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-white/10 text-white'} hover:bg-[#D21E2C] hover:text-white dark:hover:bg-[#D21E2C]`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a 
            href="#contact" 
            className="bg-[#D21E2C] hover:bg-[#b01925] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-[#D21E2C]/30 hover:-translate-y-0.5"
          >
            Book Consultation
          </a>
        </nav>

        {/* Mobile Menu Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-white/10 text-white'}`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-[#222B38] dark:text-white' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-[#222B38] dark:text-white' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#1a1d23] shadow-2xl py-8 px-6 md:hidden animate-fade-in-down border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[#222B38] dark:text-white text-xl font-bold flex justify-between items-center group"
                onClick={(e) => { setMobileMenuOpen(false); handleLinkClick(e, link.href); }}
              >
                {link.name}
                <ChevronRight className="text-slate-300 group-hover:text-[#D21E2C]" />
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-[#D21E2C] text-white text-center py-4 rounded-xl font-bold shadow-xl shadow-[#D21E2C]/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#222B38]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#D21E2C]/20 rounded-full blur-[120px]"></div>
        <img 
          src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Architecture" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222B38]/40 via-[#222B38]/90 to-[#222B38]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D21E2C]/10 border border-[#D21E2C]/30 text-[#D21E2C] text-xs md:text-sm font-bold mb-8 animate-fade-in tracking-wider uppercase backdrop-blur-sm">
            Professional UK Advisory Services
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white leading-tight md:leading-[1] mb-8 animate-fade-in-up tracking-tight">
            Financial Expertise <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">That Inspires </span>
            <span className="text-[#D21E2C] italic">Growth.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
            Based in the UK, we provide elite accounting and strategic advisory to help individuals and businesses thrive in a complex economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up delay-200">
            <a 
              href="#services" 
              className="px-10 py-5 bg-[#D21E2C] hover:bg-[#b01925] text-white rounded-2xl font-bold text-lg text-center transition-all shadow-2xl shadow-[#D21E2C]/30 flex items-center justify-center gap-3 group"
            >
              Our Solutions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg text-center transition-all backdrop-blur-md"
            >
              Consult an Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Accounting & Bookkeeping',
      description: 'Beyond standard recording; we provide detailed insights into your cash flow and financial stability.',
      icon: <Calculator />,
      tags: ['Corporate', 'Real-time'],
      color: 'bg-slate-50 dark:bg-slate-900/50'
    },
    {
      title: 'Tax & Compliance',
      description: 'Strategic tax positioning to ensure compliance while identifying opportunities for significant savings.',
      icon: <FileText />,
      tags: ['HMRC', 'Strategic'],
      color: 'bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none'
    },
    {
      title: 'Payroll & CIS',
      description: 'Comprehensive payroll management for your workforce, including end-to-end CIS reporting.',
      icon: <Users />,
      tags: ['Secure', 'Accurate'],
      color: 'bg-slate-50 dark:bg-slate-900/50'
    },
    {
      title: 'Strategic Advisory',
      description: 'Expert guidance on scaling operations, securing funding, and navigating market complexities.',
      icon: <TrendingUp />,
      tags: ['Expansion', 'Advisory'],
      color: 'bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none'
    },
    {
      title: 'VAT Services',
      description: 'We handle all aspects of VAT registration and returns, keeping your business fully compliant.',
      icon: <BarChart3 />,
      tags: ['VAT Returns', 'Audit'],
      color: 'bg-slate-50 dark:bg-slate-900/50'
    },
    {
      title: 'Company Secretarial',
      description: 'Managing statutory filings and administrative governance with precision and reliability.',
      icon: <PieChart />,
      tags: ['Filing', 'Governance'],
      color: 'bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white dark:bg-[#1a1d23] relative transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 md:mb-20 gap-8 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="text-[#D21E2C] font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-12 h-px bg-[#D21E2C]"></span>
              Professional Expertise
            </h2>
            <h3 className="text-3xl md:text-6xl font-bold text-[#222B38] dark:text-white mb-6 tracking-tight">Financial Mastery <br/> Simplified.</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
              Tailored solutions that provide clarity and fuel sustainable growth for your unique business needs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`group relative p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 flex flex-col h-full ${service.color}`}
            >
              <div className="mb-8 w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-slate-700 shadow-lg text-[#D21E2C] rounded-2xl flex items-center justify-center group-hover:bg-[#D21E2C] group-hover:text-white transition-all duration-500">
                {React.cloneElement(service.icon as React.ReactElement, { className: 'w-6 h-6 md:w-8 md:h-8' })}
              </div>

              <div className="flex gap-2 mb-4">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#D21E2C] px-2 py-1 bg-[#D21E2C]/5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <h4 className="text-xl md:text-2xl font-bold text-[#222B38] dark:text-white mb-4 group-hover:text-[#D21E2C] transition-colors">{service.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <a href="#contact" className="flex items-center gap-2 text-[#222B38] dark:text-white font-bold border-b-2 border-slate-100 dark:border-slate-800 group-hover:border-[#D21E2C] pb-1 w-fit transition-all">
                Learn More <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-slate-50 dark:bg-[#111827] overflow-hidden relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1521791136364-798a7bc0d262?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Professional Team" 
                className="w-full h-auto min-h-[400px] md:min-h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222B38]/60 to-transparent"></div>
            </div>
            
            {/* Responsively adjusted badges */}
            <div className="absolute top-4 right-4 md:-top-8 md:-right-8 bg-[#D21E2C] text-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-2xl z-20 flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 md:w-10 md:h-10 mb-1 md:mb-2" />
              <p className="text-xl md:text-3xl font-black">100%</p>
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Compliance</p>
            </div>

            <div className="absolute bottom-4 left-4 md:-bottom-8 md:left-8 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl z-20 flex items-center gap-3 md:gap-4 border border-slate-100 dark:border-slate-700 max-w-[85%] md:max-w-none">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm flex-shrink-0">
                 <img 
                   src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400" 
                   alt="Elite Partner Specialist" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div>
                <p className="text-[#222B38] dark:text-white font-black text-sm md:text-xl leading-tight">Elite Partner</p>
                <p className="text-slate-400 dark:text-slate-500 text-[8px] md:text-xs font-bold uppercase tracking-widest">HMRC Certified</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <h2 className="text-[#D21E2C] font-bold tracking-widest uppercase text-sm mb-4">Our Firm</h2>
            <h3 className="text-3xl md:text-6xl font-bold text-[#222B38] dark:text-white mb-8 leading-tight tracking-tight">
              Built on Integrity. <br className="hidden md:block" /> Focused on <span className="text-[#D21E2C]">Excellence.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
              At Aspire UK Advisers, we provide a proactive and personal approach to accounting. We treat your business with the same care as our own.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-[#D21E2C]/10 text-[#D21E2C] rounded-full p-2 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#222B38] dark:text-white text-lg mb-1">Tailored Strategic Insight</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Bespoke roadmaps built to solve the specific financial challenges of your industry.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-[#D21E2C]/10 text-[#D21E2C] rounded-full p-2 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#222B38] dark:text-white text-lg mb-1">Transparent Partnership</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">No hidden fees, no complex jargon. Just clear, honest advice that drives value.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 py-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-[#222B38] dark:text-white">15+</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-[#222B38] dark:text-white">500+</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Satisfied Clients</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-[#222B38] dark:text-white">£12M+</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tax Saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const reasons = [
    {
      title: 'Proactive Advisory',
      description: 'We help you anticipate shifts in tax law and market trends, keeping your business resilient.',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Strict Accuracy',
      description: 'We maintain the highest standards of precision across all accounts and filings.',
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: 'Expert Support',
      description: 'Access to high-level advisory and dedicated support whenever you need it.',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'On-Time Filings',
      description: 'Never miss a deadline. Our systems ensure your compliance requirements are met promptly.',
      icon: <Clock className="w-6 h-6" />
    }
  ];

  return (
    <section id="why-us" className="py-20 md:py-32 bg-[#222B38] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#D21E2C]/30 rotate-12"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
          <div className="w-full lg:w-2/5">
            <h2 className="text-[#D21E2C] font-bold tracking-widest uppercase text-sm mb-6">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">Trust Built Through <br className="hidden md:block" /> Results.</h3>
            
            {/* Testimonial Slider */}
            <div className="relative min-h-[350px] md:min-h-[300px]">
              {TESTIMONIALS.map((t, idx) => (
                <div 
                  key={idx} 
                  className={`transition-all duration-700 absolute inset-0 ${idx === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                >
                  <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-sm h-full flex flex-col justify-between">
                    <p className="text-xl md:text-2xl font-medium mb-10 italic leading-relaxed text-slate-200">
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-xl font-bold text-white">{t.author}</p>
                      <p className="text-[#D21E2C] font-bold text-sm tracking-widest uppercase">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-6 mt-12 justify-center lg:justify-start">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 transition-all duration-300 rounded-full ${i === activeIndex ? 'w-8 md:w-10 bg-[#D21E2C]' : 'w-2 bg-white/20'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
             <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {reasons.map((reason, index) => (
                <div 
                  key={index} 
                  className="group p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] transition-all duration-500 hover:bg-white/[0.08] hover:border-[#D21E2C]/50"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#D21E2C]/10 text-[#D21E2C] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#D21E2C] group-hover:text-white transition-all duration-500">
                    {reason.icon}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold mb-4 text-white">{reason.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white dark:bg-[#1a1d23] transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-[#222B38] rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-[#D21E2C]/10">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Info */}
            <div className="w-full lg:w-2/5 p-8 md:p-16 relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">Contact Our <br className="hidden md:block" /> Experts.</h2>
              <p className="text-slate-400 mb-12 text-lg">
                Ready to optimize your financial operations? Our team is standing by to assist you.
              </p>

              <div className="space-y-10 relative z-10">
                <div className="flex gap-6">
                  <div className="bg-[#D21E2C]/10 p-4 rounded-2xl text-[#D21E2C] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-lg md:text-xl font-bold text-white">+44 (0) 20 7000 0000</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="bg-[#D21E2C]/10 p-4 rounded-2xl text-[#D21E2C] flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg md:text-xl font-bold text-white underline decoration-[#D21E2C] break-all">info@aspireukadvisers.co.uk</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="bg-[#D21E2C]/10 p-4 rounded-2xl text-[#D21E2C] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">London Office</p>
                    <p className="text-lg md:text-xl font-bold text-white">City of London, EC1, UK</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-3/5 p-8 md:p-16 bg-white dark:bg-slate-900 transition-colors duration-300">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-[#D21E2C] focus:ring-4 focus:ring-[#D21E2C]/5 outline-none transition-all font-medium dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="john@company.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-[#D21E2C] focus:ring-4 focus:ring-[#D21E2C]/5 outline-none transition-all font-medium dark:text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Needed</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-[#D21E2C] focus:ring-4 focus:ring-[#D21E2C]/5 outline-none transition-all font-medium appearance-none dark:text-white">
                    <option>Strategic Advisory</option>
                    <option>Accounting & Bookkeeping</option>
                    <option>Tax Planning</option>
                    <option>Payroll Management</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message</label>
                  <textarea rows={4} placeholder="Tell us about your needs..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-[#D21E2C] focus:ring-4 focus:ring-[#D21E2C]/5 outline-none transition-all font-medium resize-none dark:text-white"></textarea>
                </div>

                <button type="submit" className="w-full py-5 bg-[#D21E2C] hover:bg-[#b01925] text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-[#D21E2C]/20 flex items-center justify-center gap-3">
                  Submit Enquiry <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#' || !href?.startsWith('#')) {
      e.preventDefault();
    }
  };

  return (
    <footer className="bg-[#1a1d23] text-slate-500 pt-20 md:pt-32 pb-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 md:mb-24">
          <div className="col-span-full sm:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-[#D21E2C] p-2 rounded-lg">
                <Target className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                ASPIRE <span className="text-[#D21E2C]">UK</span>
              </span>
            </div>
            <p className="leading-relaxed mb-8 text-sm md:text-base">
              A premier accounting and advisory firm based in London, serving clients nationwide with precision and strategic insight.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6 md:mb-8">Services</h4>
            <ul className="space-y-4 text-sm md:text-base">
              <li><a href="#services" className="hover:text-white transition-colors">Tax Advisory</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Strategic Growth</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cloud Accounting</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Payroll Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6 md:mb-8">Company</h4>
            <ul className="space-y-4 text-sm md:text-base">
              <li><a href="#about" className="hover:text-white transition-colors">About Aspire</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6 md:mb-8">Newsletter</h4>
            <p className="text-xs mb-4">Subscribe for the latest UK tax and finance insights.</p>
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
              <input type="email" placeholder="Email" className="bg-transparent px-4 py-3 outline-none w-full text-white text-sm" />
              <button onClick={(e) => e.preventDefault()} className="bg-[#D21E2C] hover:bg-[#b01925] text-white px-4 md:px-6 py-2 rounded-xl font-bold transition-all text-xs">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
          <p>© {new Date().getFullYear()} Aspire UK Advisers. Registered in England & Wales.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Terms</a>
            <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="bg-white dark:bg-[#1a1d23] selection:bg-[#D21E2C] selection:text-white scroll-smooth transition-colors duration-300 min-h-screen">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
