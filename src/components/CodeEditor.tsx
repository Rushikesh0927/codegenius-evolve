
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Save, Download, Code2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useScrollReveal } from '@/utils/animations';
import { toast } from "sonner";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  theme?: string;
  onCodeChange?: (code: string) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Write your code here...\n\nfunction helloWorld() {\n  console.log("Hello, world!");\n  return "Hello, world!";\n}\n\n// Call the function\nhelloWorld();',
  language = 'typescript',
  theme = 'vs-dark',
  onCodeChange,
  height = '500px'
}) => {
  const [code, setCode] = useState(initialCode);
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<any>(null);
  const { ref, isIntersecting } = useScrollReveal();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      if (onCodeChange) {
        onCodeChange(value);
      }
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setIsOutputVisible(true);
    
    // Clear previous output
    setOutput('');
    
    // Capture console output
    const originalConsoleLog = console.log;
    const logs: string[] = [];
    
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalConsoleLog(...args);
    };
    
    try {
      setTimeout(() => {
        try {
          // For security in a real app, you'd want to use a sandbox
          // This is just for demo purposes
          // eslint-disable-next-line no-new-func
          const result = new Function(code)();
          
          if (logs.length > 0) {
            setOutput(logs.join('\n'));
          } else if (result !== undefined) {
            setOutput(`Result: ${result}`);
          } else {
            setOutput('Code executed successfully with no output.');
          }
        } catch (error) {
          if (error instanceof Error) {
            setOutput(`Error: ${error.message}`);
          } else {
            setOutput('An unknown error occurred.');
          }
        } finally {
          console.log = originalConsoleLog;
          setIsRunning(false);
        }
      }, 500); // Simulate execution delay
    } catch (error) {
      console.log = originalConsoleLog;
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('An unknown error occurred.');
      }
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Code downloaded successfully");
  };

  return (
    <div 
      ref={ref}
      className={`border rounded-xl shadow-sm overflow-hidden transition-opacity duration-1000 ${
        isIntersecting ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-card border-b flex justify-between items-center p-2 px-4">
        <div className="flex items-center space-x-2">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Editor</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={copyCode}
          >
            <Copy className="h-4 w-4 mr-1" />
            <span className="text-xs">Copy</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={downloadCode}
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="text-xs">Download</span>
          </Button>
          <Button 
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            className="bg-primary hover:bg-primary/90"
          >
            <Play className="h-4 w-4 mr-1" />
            <span className="text-xs">{isRunning ? 'Running...' : 'Run'}</span>
          </Button>
        </div>
      </div>
      
      <Editor
        height={height}
        language={language}
        value={code}
        theme={theme}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          padding: { top: 10 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
      />
      
      {isOutputVisible && (
        <div className="border-t bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Output</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOutputVisible(false)}
            >
              <span className="text-xs">Hide</span>
            </Button>
          </div>
          <div className="bg-secondary rounded-lg p-3 font-mono text-sm overflow-auto max-h-[200px] whitespace-pre-wrap">
            {isRunning ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                <span>Running code...</span>
              </div>
            ) : (
              output || 'No output'
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
