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
  Sun
} from "lucide-react";

export default function Index() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

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

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Resume Builder",
      description: "Create stunning, ATS-optimized resumes with AI-powered suggestions and real-time optimization.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Cover Letter",
      description: "Generate personalized cover letters that perfectly match job descriptions in seconds.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Interview Prep",
      description: "Practice with AI-powered mock interviews and get instant feedback on your performance.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const steps = [
    { title: "Upload Your Info", description: "Share your experience and skills" },
    { title: "AI Analysis", description: "Our AI optimizes your content" },
    { title: "Choose Template", description: "Select from premium designs" },
    { title: "Download & Apply", description: "Get your perfect resume" }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["1 Resume", "Basic Templates", "PDF Download", "Email Support"],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      features: ["Unlimited Resumes", "Premium Templates", "AI Cover Letters", "Interview Prep", "Priority Support", "ATS Optimization"],
      popular: true,
      cta: "Start Pro Trial"
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "month",
      features: ["Everything in Pro", "Team Collaboration", "Custom Branding", "Analytics Dashboard", "Dedicated Support", "API Access"],
      popular: false,
      cta: "Contact Sales"
    }
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
            <Button size="lg" className="gradient-bg glow-effect text-white border-0 text-lg px-8 py-4 glow-hover">
              <Sparkles className="w-5 h-5 mr-2" />
              Build My Resume
            </Button>
            <Button size="lg" variant="outline" className="glass border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 glow-hover">
              <Globe className="w-5 h-5 mr-2" />
              Try Free Demo
            </Button>
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

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powerful Features for Your Career</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to land your dream job, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass border-white/20 glow-hover animate-float bg-transparent"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 glow-effect`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base">
                    {feature.description}
                  </CardDescription>
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

          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                    currentStep === index 
                      ? 'gradient-bg glow-effect scale-110' 
                      : 'bg-gray-700 border border-gray-600'
                  }`}
                >
                  <span className="text-xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-32">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-600 mt-4 hidden md:block absolute translate-x-24" />
                )}
              </div>
            ))}
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

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Profyle</span>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 Profyle. All rights reserved.</p>
              <p className="mt-2">Reinventing resumes with AI technology.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
