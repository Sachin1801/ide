import { PythonProvider } from 'react-py'
import Codeblock from './components/Codeblock'
import OutputTabs from './components/OutputTabs'
import Buttons from './components/Buttons'
import ThemeSwitch from './components/ThemeSwitch'
import FileSystem from './components/FileSystem'
import { COLORS } from './colors';
import { useState } from 'react';
import { usePython } from 'react-py';

const DEFAULT_CODE = `# sample code  

import numpy as np
from Bio.Seq import Seq

print("Hello, World!\\n")

print(np.random.rand(3,2), "\\n")

my_seq = Seq("AGTACACTGGT")
print(my_seq)`;

const DEFAULT_FILES = [
  {
    name: 'main.py',
    code: DEFAULT_CODE
  }
];


function App() {
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState('main.py');
  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
    isAwaitingInput,
    prompt,
    sendInput,
    writeFile,
  } = usePython();

const run = async () => {
  console.log('Running code...');
  
  // Write all files to the virtual filesystem
  files.forEach(file => {
    writeFile(file.name, file.code);
  });

  const currentFile = files.find(f => f.name === activeFile);
  console.log('Current file:', currentFile?.name);
  if (currentFile) {
    await runPython(currentFile.code);
  }
};

  const handleCodeChange = (newCode: string) => {
    setFiles(files.map(file =>
      file.name === activeFile ? { ...file, code: newCode } : file
    ));

  }
  
  const activeFileCode = files.find(file => file.name === activeFile)?.code || '';

  const addFile = () => {
    const newFileName = `file_${files.length + 1}.py`;
    setFiles([...files, { name: newFileName, code: '# New file' }]);
    setActiveFile(newFileName);
  };

  const removeFile = (name: string) => {
    if (files.length <= 1) return; // Don't remove the last file
    if (name === 'main.py') return; // Don't remove main.py

    const newFiles = files.filter(file => file.name !== name);
    setFiles(newFiles);

    // If we removed the active file, switch to main.py
    if (activeFile === name) {
      setActiveFile('main.py');
    }
  };


  return (
    <PythonProvider packages={{ official: ['numpy', 'pandas', 'matplotlib', 'biopython'] }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Toolbar */}
          <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Buttons
              code={activeFileCode}
              onCodeChange={handleCodeChange}
              onRun={run}
              onInterrupt={interruptExecution}
              isRunning={isRunning}
              isLoading={isLoading}
            />
            <div style={{ marginRight: '1rem' }}>
              <ThemeSwitch />
            </div>
          </div>

          {/* Editor and Output */}
          <div style={{ display: 'flex', padding: '0.5rem', gap: '0.1rem', backgroundColor: COLORS['main-bg'], margin: '0 1rem' }}>
            {isAwaitingInput && (
              <div style={{ marginTop: '1rem' }}>
                <input
                  placeholder={prompt}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      console.log('Sending input:', e.currentTarget.value);
                      sendInput(`${e.currentTarget.value}\n`);
                    }
                  }}
                  autoFocus
                />
              </div>
            )}
            <div style={{ width: '60%' }}>
              {/* TO-DO: accounting for file types... */}
              <FileSystem
                files={files}
                activeFile={activeFile}
                onFileSelect={setActiveFile}
                onAddFile={addFile}
                onRemoveFile={removeFile}
              />
              <Codeblock
                code={activeFileCode}
                onCodeChange={handleCodeChange}
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