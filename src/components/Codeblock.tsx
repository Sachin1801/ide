import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';



type CodeblockProps = {
  code: string;
  onCodeChange: (value: string) => void;
  onRun: (code: string) => void;
  onInterrupt: () => void;
  isRunning: boolean;
  isLoading: boolean;
};

export default function Codeblock({ code, onCodeChange, onRun, onInterrupt, isRunning, isLoading }: CodeblockProps) {
  const handleCopy = () => navigator.clipboard.writeText(code);
  const handleClear = () => onCodeChange('');


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      <div className="btn-group" role="group">
        {/* Run Button */}

        <button
          onClick={(e) => {
            e.preventDefault();
            onRun(code);
          }}
          disabled={isLoading || isRunning}
          style={{
            backgroundColor: '#75D97A'
          }}
          className="btn"
          title="Run code"
        >
          <i className="bi bi-play-fill" style={{ color: 'white', fontSize: '1.25rem' }}></i>
        </button>

        {/* Stop Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log('Interrupt signal sent');
            onInterrupt();
          }}
          disabled={!isRunning}
          style={{
            backgroundColor: '#FF7F3F',
          }}
          className="btn"
          title="Stop execution"
        >
          <i className="bi bi-stop-fill" style={{ color: 'white', fontSize: '1.25rem' }}></i>
        </button>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="btn btn-outline-secondary"
          title="Copy code"
        >
          <i className="bi bi-clipboard" style={{ fontSize: '1.25rem' }}></i>
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="btn btn-outline-danger"
          title="Clear editor"
        >
          <i className="bi bi-trash" style={{ fontSize: '1.25rem' }}></i>
        </button>
      </div>


      <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
        <AceEditor
          mode="python"
          theme="github"
          value={code}
          onChange={onCodeChange}
          name="python-editor"
          fontSize={14}
          width="100%"
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


    </div>
  );
}