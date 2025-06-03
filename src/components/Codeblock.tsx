import { useState } from 'react';
import { usePython } from 'react-py';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

const DEFAULT_CODE = `# sample code  

import numpy as np
from Bio.Seq import Seq

print("Hello, World!\\n")

print(np.random.rand(3,2), "\\n")

my_seq = Seq("AGTACACTGGT")
print(my_seq)`;

export default function Codeblock() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
        <AceEditor
          mode="python"
          theme="github"
          value={code}
          onChange={setCode}
          name="python-editor"
          fontSize={14}
          width="100%"
          height="300px"
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          runPython(code);
        }}
        disabled={isLoading || isRunning}
        style={{
          padding: '0.5rem 1rem',
          background: isLoading || isRunning ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          alignSelf: 'flex-start'
        }}
      >
        {isLoading ? 'Initializing...' : isRunning ? 'Running...' : 'Run Code'}
      </button>

      {stdout && (
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
          <h4>Output:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{stdout}</pre>
        </div>
      )}

      {stderr && (
        <div style={{ background: '#f8d7da', padding: '1rem', borderRadius: '4px' }}>
          <h4>Error:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0, color: '#dc3545' }}>{stderr}</pre>
        </div>
      )}
    </div>
  );
}