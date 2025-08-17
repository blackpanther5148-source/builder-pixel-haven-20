import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Brain, 
  MessageSquare, 
  Target, 
  CheckCircle, 
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Moon,
  Sun,
  Upload,
  Download,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  Play,
  Quote,
  Building,
  MapPin,
  Calendar,
  Briefcase,
  BarChart3,
  Smartphone,
  Palette,
  Code,
  Database,
  Layers,
  Cpu,
  Workflow,
  PenTool,
  FileImage,
  Search,
  Filter,
  Archive,
  Share2,
  Eye,
  Edit3
} from "lucide-react";

export default function Index() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Resume Builder",
      description: "Create stunning, ATS-optimized resumes with AI-powered suggestions and real-time optimization.",
      gradient: "from-blue-500 to-cyan-500",
      details: ["ATS-friendly templates", "Real-time optimization", "Industry-specific content", "Multiple formats"]
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Cover Letter",
      description: "Generate personalized cover letters that perfectly match job descriptions in seconds.",
      gradient: "from-purple-500 to-pink-500",
      details: ["Job-specific customization", "Professional templates", "Tone adjustment", "Quick generation"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Interview Prep",
      description: "Practice with AI-powered mock interviews and get instant feedback on your performance.",
      gradient: "from-pink-500 to-rose-500",
      details: ["Mock interviews", "Real-time feedback", "Industry questions", "Performance analytics"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Tracker",
      description: "Track your job applications, manage contacts, and monitor your career progress.",
      gradient: "from-green-500 to-emerald-500",
      details: ["Application tracking", "Progress analytics", "Contact management", "Goal setting"]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Portfolio Builder",
      description: "Showcase your best work with beautiful portfolio layouts and project galleries.",
      gradient: "from-indigo-500 to-blue-500",
      details: ["Project galleries", "Custom layouts", "Social integration", "Analytics tracking"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Get insights into your job search performance and career readiness score.",
      gradient: "from-yellow-500 to-orange-500",
      details: ["Performance metrics", "Success tracking", "Improvement suggestions", "Goal monitoring"]
    }
  ];

  const steps = [
    { 
      title: "Upload Your Info", 
      description: "Share your experience and skills",
      icon: <Upload className="w-6 h-6" />,
      details: "Upload your existing resume or fill out our smart form"
    },
    { 
      title: "AI Analysis", 
      description: "Our AI optimizes your content",
      icon: <Brain className="w-6 h-6" />,
      details: "Advanced AI analyzes and enhances your content for maximum impact"
    },
    { 
      title: "Choose Template", 
      description: "Select from premium designs",
      icon: <Palette className="w-6 h-6" />,
      details: "Pick from dozens of professionally designed, ATS-friendly templates"
    },
    { 
      title: "Download & Apply", 
      description: "Get your perfect resume",
      icon: <Download className="w-6 h-6" />,
      details: "Export in multiple formats and start applying with confidence"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["1 Resume", "Basic Templates", "PDF Download", "Email Support"],
      popular: false,
      cta: "Get Started Free",
      description: "Perfect for getting started"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      features: ["Unlimited Resumes", "Premium Templates", "AI Cover Letters", "Interview Prep", "Priority Support", "ATS Optimization"],
      popular: true,
      cta: "Start Pro Trial",
      description: "Most popular choice"
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "month", 
      features: ["Everything in Pro", "Team Collaboration", "Custom Branding", "Analytics Dashboard", "Dedicated Support", "API Access"],
      popular: false,
      cta: "Contact Sales",
      description: "For teams and organizations"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      avatar: "/placeholder.svg",
      quote: "Profyle helped me land my dream job at Google! The AI suggestions were spot-on and the templates looked incredibly professional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Microsoft",
      avatar: "/placeholder.svg", 
      quote: "The interview prep feature is amazing. I felt so much more confident going into my interviews after practicing with the AI.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Adobe",
      avatar: "/placeholder.svg",
      quote: "I love how easy it is to create multiple versions of my resume for different roles. The customization options are endless!",
      rating: 5
    },
    {
      name: "David Park",
      role: "Data Scientist", 
      company: "Netflix",
      avatar: "/placeholder.svg",
      quote: "The career tracker helped me stay organized during my job search. I could see my progress and knew exactly what to focus on.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How does the AI resume optimization work?",
      answer: "Our AI analyzes your resume content against thousands of successful resumes and job descriptions. It provides specific suggestions for keywords, formatting, and content structure to maximize your chances of passing ATS systems and catching recruiters' attention."
    },
    {
      question: "Can I create multiple resumes for different jobs?",
      answer: "Absolutely! With our Pro plan, you can create unlimited resumes and easily customize them for different roles, industries, or companies. Each resume can have different templates, content focus, and styling."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties, and you maintain full control over your information."
    },
    {
      question: "What file formats can I export to?",
      answer: "You can export your resumes and cover letters in multiple formats including PDF, DOCX, and plain text. Our PDF exports are ATS-friendly and maintain perfect formatting across all devices."
    },
    {
      question: "How accurate is the interview preparation?",
      answer: "Our interview prep feature uses real interview questions from top companies and industries. The AI provides feedback on your responses, tone, confidence level, and suggests improvements based on best practices."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term commitments, and you'll continue to have access to your paid features until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with Profyle, contact our support team within 30 days of your purchase for a full refund."
    },
    {
      question: "Is there a limit to how many times I can use the AI features?",
      answer: "Free users get limited AI generations per month. Pro and Enterprise users have unlimited access to all AI features including resume optimization, cover letter generation, and interview preparation."
    }
  ];

  const industries = [
    { name: "Technology", icon: <Code className="w-6 h-6" />, jobs: "12,500+" },
    { name: "Healthcare", icon: <Target className="w-6 h-6" />, jobs: "8,300+" },
    { name: "Finance", icon: <TrendingUp className="w-6 h-6" />, jobs: "6,700+" },
    { name: "Marketing", icon: <Sparkles className="w-6 h-6" />, jobs: "5,400+" },
    { name: "Design", icon: <Palette className="w-6 h-6" />, jobs: "4,200+" },
    { name: "Engineering", icon: <Cpu className="w-6 h-6" />, jobs: "7,800+" }
  ];

  const companyLogos = [
    "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix", "Tesla", "Adobe", "Spotify", "Airbnb", "Uber", "LinkedIn"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gradient-wave" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gradient-wave animation-delay-2000" />
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gradient-wave animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 glass">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Profyle</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#process" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg glass glow-hover"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10">
              Sign In
            </Button>
            <Button className="gradient-bg glow-effect text-white border-0">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Advanced AI
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Your Resume.{" "}
            <span className="gradient-text">Reinvented</span>{" "}
            with AI.
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create stunning, ATS-optimized resumes in minutes. Our AI analyzes job descriptions and optimizes your content for maximum impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/resume-builder">
              <Button size="lg" className="gradient-bg glow-effect text-white border-0 text-lg px-8 py-4 glow-hover">
                <Upload className="w-5 h-5 mr-2" />
                Upload & Build Resume
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="glass border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 glow-hover">
                <Play className="w-5 h-5 mr-2" />
                Try Free Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">50K+</div>
              <div className="text-gray-400">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">4.9★</div>
              <div className="text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="relative z-10 py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-400 mb-8">Trusted by professionals at leading companies</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {companyLogos.map((company, index) => (
                <div key={index} className="text-gray-500 font-semibold text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powerful Features for Your Career</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to land your dream job, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass border-white/20 glow-hover animate-float bg-transparent group"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 glow-effect group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Tailored for Every Industry</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Specialized templates and AI optimization for your specific field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="glass border-white/20 bg-transparent glow-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{industry.name}</h3>
                  <p className="text-gray-400">{industry.jobs} open positions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section id="process" className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From upload to interview-ready in just 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-500 ${
                    currentStep === index 
                      ? 'gradient-bg glow-effect scale-110' 
                      : 'bg-gray-700 border border-gray-600'
                  }`}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                <p className="text-gray-500 text-xs">{step.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of professionals who've accelerated their careers with Profyle.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass border-white/20 bg-transparent">
              <CardContent className="p-8">
                <div className="text-center">
                  <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                  <blockquote className="text-xl text-gray-300 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-400">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === index ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start free, upgrade when you need more. All plans include our core AI features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`glass border-white/20 glow-hover relative bg-transparent ${
                  plan.popular ? 'border-purple-500/50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'gradient-bg glow-effect text-white border-0' 
                        : 'glass border-white/20 text-white hover:bg-white/10'
                    } glow-hover`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Profyle and our AI-powered features.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass border-white/20 bg-transparent">
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've already accelerated their careers with Profyle's AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resume-builder">
              <Button size="lg" className="gradient-bg glow-effect text-white border-0 text-lg px-8 py-4">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="glass border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
                <Eye className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Profyle</span>
              </div>
              <p className="text-gray-400 mb-4">
                Reinventing resumes with AI technology. Build, optimize, and track your career journey.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                  <Globe className="w-4 h-4 text-gray-300" />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                  <MessageSquare className="w-4 h-4 text-gray-300" />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                  <Users className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/resume-builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
                <li><Link to="/cover-letter" className="hover:text-white transition-colors">Cover Letter Generator</Link></li>
                <li><Link to="/interview-prep" className="hover:text-white transition-colors">Interview Prep</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio Builder</Link></li>
                <li><Link to="/career-tracker" className="hover:text-white transition-colors">Career Tracker</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Resume Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interview Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Industry Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">Account Settings</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
                <p>&copy; 2024 Profyle. All rights reserved.</p>
              </div>
              <div className="text-gray-400 text-center md:text-right">
                <p>Made with ❤️ for job seekers everywhere</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
