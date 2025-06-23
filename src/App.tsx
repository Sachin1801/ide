import { PythonProvider } from 'react-py'
import Codeblock from './components/Codeblock'
import OutputTabs from './components/OutputTabs'
import Buttons from './components/Buttons'
import FileSystem, { FILE_TYPES } from './components/FileSystem';
import { COLORS } from './colors';
import { useState, useEffect } from 'react';
import { usePython } from 'react-py';

const DEFAULT_CODE = `# sample code  

import numpy as np
from Bio.Seq import Seq

print("Hello, World!\\n")

print(np.random.rand(3,2), "\\n")

my_seq = Seq("AGTACACTGGT")
print(my_seq)`;


function App() {

  const [code, setCode] = useState(DEFAULT_CODE);
  const { runPython, stdout, stderr, isLoading, isRunning, interruptExecution, readFile, writeFile } = usePython();
  const [currentFile, setCurrentFile] = useState('/main.py');
  const [currentFileType, setCurrentFileType] = useState<typeof FILE_TYPES[number]>('py');

  // Load file content when selected
  const handleFileSelect = async (path: string, type: typeof FILE_TYPES[number]) => {
    setCurrentFile(path);
    setCurrentFileType(type);
    try {
      const content = await readFile(path);
      setCode(typeof content === 'string' ? content : '# Binary file content\n');
    } catch (error) {
      setCode('# Error loading file\n');
    }
  };

  const handleRun = () => {
    if (currentFileType === 'py') {
      writeFile(currentFile, code);
      runPython(code);
    } else {
      console.log('Only Python files can be executed');
    }
  };

  // Initialize with default files
  useEffect(() => {
    const initFiles = async () => {
      try {
        await writeFile('/main.py', DEFAULT_CODE);
      } catch (error) {
        console.error('Error initializing files:', error);
      }
    };
    initFiles();
  }, [writeFile]);

  return (
    <PythonProvider packages={{ official: ['numpy', 'pandas', 'matplotlib', 'biopython'] }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* File System Sidebar */}
        <div style={{ width: '220px', borderRight: '1px solid #ddd', padding: '1rem' }}>
          <FileSystem
            onSelectFile={handleFileSelect}
            currentFile={currentFile}
            pythonFS={{ readFile, writeFile }}
          />
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Action Buttons */}
          <div style={{ padding: '1rem' }}>
            <Buttons
              code={code}
              onCodeChange={setCode}
              onRun={handleRun}
              onInterrupt={interruptExecution}
              isRunning={isRunning}
              isLoading={isLoading}
            />
          </div>

          {/* Editor and Output */}
          <div style={{ display: 'flex', padding: '0.5rem', gap: '0.1rem', backgroundColor: COLORS['main-bg'], margin: '0 1rem' }}>
            <div style={{ width: '60%' }}>
              {/* TO-DO: accounting for file types... */}
              <Codeblock
                code={code}
                onCodeChange={setCode}
              />
            </div>
            <div style={{ width: '40%' }}>
              <OutputTabs stdout={stdout} stderr={stderr} />
            </div>
          </div>
        </div>
      </div>
    </PythonProvider>
  );
}

export default App;

/**return (
  <PythonProvider packages={{ official: ['numpy', 'pandas', 'matplotlib', 'biopython'] }}>
    <div style={{ padding: '1rem'}}>
      <Buttons
        code={code}
        onCodeChange={setCode}
        onRun={runPython}
        onInterrupt={interruptExecution}
        isRunning={isRunning}
        isLoading={isLoading}
      />
    </div>
    <div style={{ display: 'flex', padding: '0.5rem', gap:'0.1rem', backgroundColor: COLORS['main-bg'], margin: '0 1rem'}}>

      <div style={{ width: '50%'}}>
        <Codeblock
          code={code}
          onCodeChange={setCode}
        />
      </div>
      <div style={{ width: '50%' }}>
        <OutputTabs
          stdout={stdout}
          stderr={stderr}
        />
      </div>
    </div>
  </PythonProvider>
)
}

export default App;**/