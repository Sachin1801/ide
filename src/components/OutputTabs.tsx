import { useState } from 'react';
import { useTheme } from '../ThemeContext';
import REPL from './REPL';
import styles from './output-tabs.module.css';

interface OutputTabsProps {
  stdout?: string;
  stderr?: string;
}
// TO-DO: add loading in console output tab
export default function OutputTabs({ stdout, stderr }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState('output');
  const { theme } = useTheme();

  const tabButtonStyle: React.CSSProperties = theme === 'dark'
    ? {
        color: 'var(--text-color)',
        border: '1px solid var(--panel-border)',
        boxShadow: '0 0 4px rgba(255,255,255,0.4)'
      }
    : { color: 'var(--text-color)' };

  return (
    <div style={{ height: '100%', border: '1px solid var(--panel-border)', backgroundColor: 'var(--panel-bg)' }}>
      {/* Tab buttons */}
      <div style={{
        marginTop: '0.2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
      }}>
        <button className={styles.regButton} onClick={() => setActiveTab('output')} style={tabButtonStyle}>Output</button>
        <button className={styles.regButton} onClick={() => setActiveTab('terminal')} style={tabButtonStyle}>Terminal</button>
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
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0, color: 'var(--error-text)' }}>{stderr}</pre>
            </div>
          )}
        </div>
      )}
      {activeTab === 'terminal' && <REPL />}
    </div>
  );
}