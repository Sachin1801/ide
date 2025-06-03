import { PythonProvider } from 'react-py'
import Codeblock from './components/Codeblock'
import REPL from './components/REPL'


function App() {
  return (
    // Add the provider to your app
    <PythonProvider>
      <Codeblock />
      <REPL />
    </PythonProvider>
  )
}

export default App;