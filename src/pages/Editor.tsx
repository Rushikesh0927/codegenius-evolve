
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';

const Editor = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">Code Editor</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Write, test, and execute your code in our intelligent editor.
          </p>
          
          <CodeEditor height="600px" />
        </div>
      </div>
    </div>
  );
};

export default Editor;
