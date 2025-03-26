
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Save, Download, Code2, Zap, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useScrollReveal } from '@/utils/animations';
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAICompletion } from '@/utils/aiService';

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
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFixingWithAI, setIsFixingWithAI] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const editorRef = useRef<any>(null);
  const { ref, isIntersecting } = useScrollReveal();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      setHasError(false);
      setAiSuggestion(null);
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
    setHasError(false);
    
    // Capture console output
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const logs: string[] = [];
    const errors: string[] = [];
    
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalConsoleLog(...args);
    };

    console.error = (...args) => {
      errors.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalConsoleError(...args);
    };
    
    try {
      setTimeout(() => {
        try {
          // For security in a real app, you'd want to use a sandbox
          // This is just for demo purposes
          // eslint-disable-next-line no-new-func
          const result = new Function(code)();
          
          if (errors.length > 0) {
            setOutput(`Error: ${errors.join('\n')}`);
            setHasError(true);
          } else if (logs.length > 0) {
            setOutput(logs.join('\n'));
          } else if (result !== undefined) {
            setOutput(`Result: ${result}`);
          } else {
            setOutput('Code executed successfully with no output.');
          }
        } catch (error) {
          setHasError(true);
          if (error instanceof Error) {
            setOutput(`Error: ${error.message}`);
          } else {
            setOutput('An unknown error occurred.');
          }
        } finally {
          console.log = originalConsoleLog;
          console.error = originalConsoleError;
          setIsRunning(false);
        }
      }, 500); // Simulate execution delay
    } catch (error) {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      setHasError(true);
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('An unknown error occurred.');
      }
      setIsRunning(false);
    }
  };

  const fixWithAI = async () => {
    setIsFixingWithAI(true);
    try {
      const prompt = `Fix the following ${selectedLanguage} code that has this error: "${output}"\n\nCode:\n${code}\n\nPlease provide the fixed code only, without explanations.`;
      
      const response = await getAICompletion({
        text: prompt,
        language: selectedLanguage
      });
      
      if (!response.isError) {
        // Extract code from the response
        let fixedCode = response.text;
        
        // If the response is in a code block, extract just the code
        const codeBlockRegex = /```(?:[\w]*)\n([\s\S]*?)```/;
        const match = fixedCode.match(codeBlockRegex);
        if (match && match[1]) {
          fixedCode = match[1];
        }
        
        setAiSuggestion(fixedCode);
      } else {
        toast.error("Failed to get AI suggestions");
      }
    } catch (error) {
      console.error("Error in AI fix:", error);
      toast.error("Failed to get AI suggestions");
    } finally {
      setIsFixingWithAI(false);
    }
  };

  const applyAISuggestion = () => {
    if (aiSuggestion) {
      setCode(aiSuggestion);
      setAiSuggestion(null);
      toast.success("Applied AI suggestion");
    }
  };

  const dismissAISuggestion = () => {
    setAiSuggestion(null);
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
    a.download = `code.${selectedLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Code downloaded successfully");
  };

  const languageOptions = [
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'rust', label: 'Rust' },
  ];

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
          <div className="w-40">
            <Select 
              value={selectedLanguage} 
              onValueChange={(value) => setSelectedLanguage(value)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
        language={selectedLanguage}
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
            <div className="flex items-center space-x-2">
              {hasError && !isFixingWithAI && !aiSuggestion && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fixWithAI}
                  disabled={isFixingWithAI}
                  className="text-xs"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {isFixingWithAI ? 'Fixing...' : 'Fix with AI'}
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOutputVisible(false)}
              >
                <span className="text-xs">Hide</span>
              </Button>
            </div>
          </div>
          <div className="bg-secondary rounded-lg p-3 font-mono text-sm overflow-auto max-h-[200px] whitespace-pre-wrap">
            {isRunning ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                <span>Running code...</span>
              </div>
            ) : (
              <div className={`${hasError ? 'text-red-500' : ''}`}>
                {output || 'No output'}
              </div>
            )}
          </div>
          
          {aiSuggestion && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">AI Suggestion</h3>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={applyAISuggestion}
                    className="text-xs text-green-500 border-green-500 hover:bg-green-500/10"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={dismissAISuggestion}
                    className="text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Dismiss
                  </Button>
                </div>
              </div>
              <div className="bg-green-500/10 rounded-lg p-3 font-mono text-sm overflow-auto max-h-[200px] whitespace-pre-wrap border border-green-500/20">
                {aiSuggestion}
              </div>
            </div>
          )}
          
          {isFixingWithAI && !aiSuggestion && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span>Getting AI suggestions...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
