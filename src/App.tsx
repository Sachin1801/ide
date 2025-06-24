import { PythonProvider } from 'react-py'
import Codeblock from './components/Codeblock'
import OutputTabs from './components/OutputTabs'
import Buttons from './components/Buttons'
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
  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
    isAwaitingInput,
    prompt,
    sendInput
  } = usePython();

  const run = async () => {
    console.log('Running code...');
    await runPython(code); 
  };

  useEffect(() => {
    // Wait until pyodide is loaded (react-py exposes it on `window.pyodide`)
    const waitForPyodide = async () => {
      while (typeof (window as any).pyodide === 'undefined') {
        await new Promise((res) => setTimeout(res, 100));
      }

      try {
        console.log('Loading pyodide-http...');
        await (window as any).pyodide.loadPackage('pyodide-http');
        console.log('pyodide-http loaded ✅');
      } catch (err) {
        console.error('Failed to load pyodide-http', err);
      }
    };

    waitForPyodide();
  }, []);



  return (
    <PythonProvider packages={{ official: ['numpy', 'pandas', 'matplotlib', 'biopython'] }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Action Buttons */}
          <div style={{ padding: '1rem' }}>
            <Buttons
              code={code}
              onCodeChange={setCode}
              onRun={run}
              onInterrupt={interruptExecution}
              isRunning={isRunning}
              isLoading={isLoading}
            />
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