import { PythonProvider } from 'react-py'
import Codeblock from './components/Codeblock'
import REPL from './components/REPL'


function App() {
  return (
    <PythonProvider packages={{ official: ['numpy', 'pandas', 'matplotlib', 'biopython'] }}>
      <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
        <div style={{ width: '50%' }}>
          <Codeblock />
        </div>
        <div style={{ width: '50%' }}>
          <REPL />
        </div>
      </div>
    </PythonProvider>
  )
}

export default App;