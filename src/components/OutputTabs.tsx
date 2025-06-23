import { useState } from 'react';
import REPL from './REPL';
import { COLORS } from '../colors';
import styles from './output-tabs.module.css';

interface OutputTabsProps {
  stdout?: string;
  stderr?: string;
}
// TO-DO: add loading in console output tab
export default function OutputTabs({ stdout, stderr }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState('output');

  return (
    <div style={{ height: '100%', border: '1px solid' + COLORS['main-bg'], backgroundColor: 'white' }}>
      {/* Tab buttons */}
      <div style={{
        marginTop: '0.2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
      }}>
        <button className={styles.regButton} onClick={() => setActiveTab('output')}>Output</button>
        <button className={styles.regButton} onClick={() => setActiveTab('terminal')}>Terminal</button>
      </div>

      {/* Tab content */}
      {activeTab === 'output' && (
        <div style={{ padding: '1rem', borderRadius: '4px' }}>
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