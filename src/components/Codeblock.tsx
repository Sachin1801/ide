import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';



type CodeblockProps = {
  code: string;
  onCodeChange: (value: string) => void;
  onRun: (code: string) => void;
  isRunning: boolean;
  isLoading: boolean;
};

export default function Codeblock({ code, onCodeChange, onRun, isRunning, isLoading }: CodeblockProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      <button
        onClick={(e) => {
          e.preventDefault();
          onRun(code);
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

      <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
        <AceEditor
          mode="python"
          theme="github"
          value={code}
          onChange={onCodeChange}
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


    </div>
  );
}