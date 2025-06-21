// TODO: scrolling, multiline input, clipboard, responsive sizing, indentation

import { useEffect, useState, useRef } from 'react'
import { usePythonConsole } from 'react-py'
import { ConsoleState } from 'react-py/dist/types/Console'

export default function REPL() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{type: 'input' | 'output', content: string}[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    banner,
    consoleState
  } = usePythonConsole()

  // Detect if input is an expression (returns value) vs statement
  const isExpression = (code: string) => {
    const trimmed = code.trim()
    return (
      !trimmed.startsWith('print(') &&
      !trimmed.startsWith('import ') &&
      !trimmed.startsWith('from ') &&
      !trimmed.startsWith('def ') &&
      !trimmed.startsWith('class ') &&
      !trimmed.includes('=') &&
      trimmed.length > 0
    )
  }


  useEffect(() => {
    if (banner) {
      setHistory([{ type: 'output', content: banner }])
    }
  }, [banner])

  useEffect(() => {
    if (stdout) {
      setHistory(prev => [...prev, { type: 'output', content: stdout }])
    }
  }, [stdout])

  useEffect(() => {
    if (stderr) {
      setHistory(prev => [...prev, { type: 'output', content: stderr }])
    }
  }, [stderr])

  useEffect(() => {
    // Scroll to bottom whenever history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  function getPrompt() {
    return consoleState === ConsoleState.incomplete ? '... ' : '>>> '
  }

  function run() {
    if (!input.trim()) return

    const codeToRun = isExpression(input) 
      ? `print(${input})`  // Wrap expressions in print()
      : input             // Leave statements as-is
    
    // Add input to history
    setHistory(prev => [...prev, 
      { type: 'input', content: getPrompt() + input },
      { type: 'output', content: '' } // Placeholder for output
    ])

    console.log(`Running code: ${codeToRun}`)
    
    runPython(codeToRun)
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && !isRunning) {
        run()
      }
    }
  }

  return (
    <div className="terminal-container">
      {isLoading ? <p>Loading Python...</p> : null}
      
      <div 
        ref={terminalRef}
        className="terminal"
        style={{
          fontFamily: 'monospace',
          backgroundColor: '#1e1e1e',
          color: '#f0f0f0',
          padding: '1rem',
          height: '500px',
          overflowY: 'auto',
          borderRadius: '4px'
        }}
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            style={{
              whiteSpace: 'pre-wrap',
              color: item.type === 'input' ? '#f0f0f0' : 
                     item.content.includes('Error') ? '#ff5555' : '#cccccc'
            }}
          >
            {item.content}
          </div>
        ))}
        
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ color: '#4caf50' }}>{getPrompt()}</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={''}
            disabled={isLoading || isRunning}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              color: '#f0f0f0',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontFamily: 'monospace',
              overflow: 'hidden',
              minHeight: '1.5em',
              height: 'auto'
            }}
            rows={1}
          />
        </div>
      </div>
    </div>
  )
}