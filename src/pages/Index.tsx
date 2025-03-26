import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import { useTypewriter, useFadeIn, useScrollReveal } from '@/utils/animations';
import { 
  Bot, 
  Code, 
  Brain, 
  Zap, 
  Sparkles, 
  RefreshCcw, 
  Globe, 
  Server, 
  Shield, 
  Terminal,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const heroTitle = useTypewriter("The future of coding is intelligent.");
  const heroSubtitle = useTypewriter("An AI-powered platform that writes, debugs, and executes code.", 50, 2000);
  const heroButton = useFadeIn(3500);
  const section1Fade = useFadeIn(500);
  const { ref: featuresRef, isIntersecting: featuresVisible } = useScrollReveal();
  
  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    // Add dark class to body
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  const handleWatchDemo = () => {
    // For now, this could scroll to the demo section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const features = [
    {
      icon: <Brain className="h-10 w-10" />,
      title: "AI-Powered Coding",
      description: "Advanced AI algorithms help you write better code faster with intelligent suggestions and automatic completions."
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Real-time Execution",
      description: "Execute your code instantly in a secure environment with immediate feedback and results."
    },
    {
      icon: <Terminal className="h-10 w-10" />,
      title: "Smart Debugging",
      description: "AI-assisted debugging identifies issues and suggests fixes before they become problems."
    },
    {
      icon: <RefreshCcw className="h-10 w-10" />,
      title: "Continuous Learning",
      description: "Our AI models continuously learn from the web to stay updated with the latest programming practices."
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Internet-Connected",
      description: "Access real-time information from the web to solve complex coding challenges efficiently."
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Secure Execution",
      description: "Run your code in isolated, secure environments to protect your data and applications."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-1 text-sm font-medium inline-flex items-center mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Now powered by Google AI
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight animate-typewriter-container">
              <span className="animate-typewriter">{heroTitle.displayText}</span>
            </h1>
            
            <div className="text-xl md:text-2xl text-muted-foreground mb-10 animate-typewriter-container">
              <span className="animate-typewriter">{heroSubtitle.displayText}</span>
            </div>
            
            <div style={heroButton.style}>
              <Button 
                size="lg" 
                className="rounded-full text-lg px-8 mr-4"
                onClick={handleGetStarted}
              >
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-lg px-8"
                onClick={handleWatchDemo}
              >
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="mt-20 max-w-5xl mx-auto" style={section1Fade.style}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none h-20 bottom-0 top-auto"></div>
              <CodeEditor 
                height="400px"
                initialCode={`// Example: AI-powered code generation
import { fetchData } from './api';

/**
 * Processes user data to extract insights
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - User insights
 */
async function getUserInsights(userId) {
  try {
    // Fetch user data from the API
    const userData = await fetchData(\`/users/\${userId}\`);
    
    // Process and analyze the data
    const insights = {
      activityLevel: calculateActivityLevel(userData.activities),
      topInterests: extractTopInterests(userData.interactions),
      recommendedActions: generateRecommendations(userData)
    };
    
    console.log(\`Generated insights for user \${userId}\`);
    return insights;
  } catch (error) {
    console.error('Failed to generate user insights:', error);
    throw new Error('Insights generation failed');
  }
}

// Helper functions would be defined below...`}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Powered by Advanced AI</h2>
            <p className="text-xl text-muted-foreground">
              Our platform combines cutting-edge AI technology with developer-friendly tools to revolutionize the coding experience.
            </p>
          </div>
          
          <div 
            ref={featuresRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-1000 ${
              featuresVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden border shadow-sm bg-card p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-4">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-secondary rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">How do I implement a binary search algorithm in JavaScript?</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-secondary rounded-lg p-3 max-w-[80%] ml-auto">
                      <p className="text-sm">
                        Here's an efficient implementation of binary search in JavaScript:
                      </p>
                      <pre className="bg-card mt-2 p-2 rounded text-xs overflow-x-auto">
{`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Target not found
}`}
                      </pre>
                    </div>
                    <div className="bg-primary/10 rounded-full p-2 ml-4">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center text-sm font-medium text-primary mb-4">
                <Bot className="h-4 w-4 mr-2" />
                Intelligent Assistance
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Your AI coding partner
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Our AI assistant doesn't just answer questions—it understands your coding goals and helps you achieve them efficiently.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Explain complex algorithms in simple terms",
                  "Generate working code examples on demand",
                  "Debug existing code with intelligent analysis",
                  "Suggest improvements and optimizations",
                  "Answer programming questions in natural language"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                className="rounded-full"
                onClick={() => navigate('/get-started')}
              >
                Try it Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 max-w-2xl mx-auto">
            Ready to experience the future of coding?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who are writing better code faster with our AI-powered platform.
          </p>
          <div>
            <Button 
              size="lg" 
              variant="secondary" 
              className="rounded-full text-lg px-8 mr-4 text-primary"
              onClick={handleGetStarted}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/pricing')}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
