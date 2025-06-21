import { useState } from 'react';
import REPL from './REPL';
import './output-tabs.css'; 

interface OutputTabsProps {
  stdout?: string;
  stderr?: string;
}

export default function OutputTabs({ stdout, stderr }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState('output');

  return (
    <div  >
      {/* Tab buttons */}
      <div>
        <button onClick={() => setActiveTab('output')}>Output</button>
        <button onClick={() => setActiveTab('terminal')}>Terminal</button>
      </div>

      {/* Tab content */}
      {activeTab === 'output' && (
        <div style={{padding: '1rem', borderRadius: '4px'}}>
          {stdout && (
            <div>
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{stdout}</pre>
            </div>
          )}
          {stderr && (
            <div>
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0, color: '#dc3545' }}>{stderr}</pre>
            </div>
          )}
        </div>
      )}
      {activeTab === 'terminal' && <REPL />}
    </div>
  );
}