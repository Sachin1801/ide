import { PythonProvider } from 'react-py'
import Codeblock from './components/Codeblock'
import OutputTabs from './components/OutputTabs'
import { useState } from 'react';
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
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <PythonProvider packages={{ official: ['numpy', 'pandas', 'matplotlib', 'biopython'] }}>
      <div style={{ display: 'flex', gap: '2rem', padding: '1rem', }}>
        <div style={{ width: '50%', background: '#f8f9fa'}}>
          <Codeblock
            code={code}
            onCodeChange={setCode}
            onRun={() => runPython(code)}
            isRunning={isRunning}
            isLoading={isLoading}
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

export default App;