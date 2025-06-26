import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { COLORS} from '../colors';
import { useTheme } from '../ThemeContext';



type CodeblockProps = {
  code: string;
  onCodeChange: (value: string) => void;
};


export default function Codeblock({ code, onCodeChange}: CodeblockProps) {

  const { theme } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      <div style={{ border: '1px solid ' + COLORS['main-bg'], borderRadius: '4px' }}>
        <AceEditor
          mode="python"
          theme={theme === 'light' ? 'github' : 'monokai'}
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