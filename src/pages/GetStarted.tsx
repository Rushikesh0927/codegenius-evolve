
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTypewriter, useFadeIn } from '@/utils/animations';

const GetStarted = () => {
  const navigate = useNavigate();
  const title = useTypewriter("Let's get you coding with AI");
  const subtitle = useTypewriter("Set up your first project in minutes", 50, 1000);
  const content = useFadeIn(1500);

  const handleCreateProject = () => {
    // In a real application, this would create a new project
    // For now, we'll navigate to a hypothetical project creation page or back to home
    navigate('/');
    // You could also show a toast notification here
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Rocket className="h-8 w-8" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-typewriter-container">
            <span className="animate-typewriter">{title.displayText}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 animate-typewriter-container">
            <span className="animate-typewriter">{subtitle.displayText}</span>
          </p>
          
          <div style={content.style} className="bg-card border rounded-xl p-8 text-left">
            <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
            
            <ol className="space-y-6">
              <li className="flex">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center font-semibold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Create your first project</h3>
                  <p className="text-muted-foreground">Start with a blank template or choose from our pre-built examples to get started quickly.</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center font-semibold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Interact with the AI</h3>
                  <p className="text-muted-foreground">Use natural language to ask the AI to help you build features, debug code, or optimize performance.</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center font-semibold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Deploy your app</h3>
                  <p className="text-muted-foreground">With one click, deploy your application to our cloud hosting or export to your own infrastructure.</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-8 flex justify-center">
              <Button size="lg" className="rounded-full" onClick={handleCreateProject}>
                Create New Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
