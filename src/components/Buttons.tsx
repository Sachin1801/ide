import styles from './buttons.module.css';
import { useTheme } from '../ThemeContext';
import ThemeSwitch from './ThemeSwitch';

type ButtonProps = {
    code: string;
    onCodeChange: (value: string) => void;
    onRun: (code: string) => void;
    onInterrupt: () => void;
    isRunning: boolean;
    isLoading: boolean;
};


export default function Buttons({ code, onCodeChange, onRun, onInterrupt, isRunning, isLoading }: ButtonProps) {
    const handleCopy = () => navigator.clipboard.writeText(code);
    const handleClear = () => onCodeChange('');

    const { theme } = useTheme();

    const commonButtonStyle: React.CSSProperties = theme === 'dark'
        ? {
            border: '1px solid var(--panel-border)',
            color: 'var(--text-color)',
            boxShadow: '0 0 4px rgba(255,255,255,0.4)'
          }
        : {};

    const iconStyle = theme === 'dark'
        ? { fontSize: '1.25rem', color: 'var(--text-color)', filter: 'drop-shadow(0 0 2px #ffffff)' }
        : { fontSize: '1.25rem' };

    return (
        <div className={styles.btnGroup}>
            {/* Run Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onRun(code);
                }}
                disabled={isLoading || isRunning}
                style={{
                    backgroundColor: 'var(--button-run-bg)'
                }}
                className={styles.regButton}
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
                    backgroundColor: 'var(--button-stop-bg)',
                }}
                className={styles.regButton}
                title="Stop execution"
            >
                <i className="bi bi-stop-fill" style={{ color: 'white', fontSize: '1.25rem' }}></i>
            </button>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className={styles.regButton}
                title="Copy code"
                style={commonButtonStyle}
            >
                <i className="bi bi-clipboard" style={iconStyle}></i>
            </button>

            {/* Clear Button */}
            <button
                onClick={handleClear}
                className={styles.regButton}
                title="Clear editor"
                style={commonButtonStyle}
            >
                <i className="bi bi-trash" style={iconStyle}></i>
            </button>

            {/* Theme Toggle Switch */}
            <div style={{ marginLeft: '0.5rem' }}>
              <ThemeSwitch />
            </div>
        </div>
    )
}