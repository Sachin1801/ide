import styles from './buttons.module.css';
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
                    backgroundColor: '#75D97A'
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
                    backgroundColor: '#FF7F3F',
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
            >
                <i className="bi bi-clipboard" style={{ fontSize: '1.25rem' }}></i>
            </button>

            {/* Clear Button */}
            <button
                onClick={handleClear}
                className={styles.regButton}
                title="Clear editor"
            >
                <i className="bi bi-trash" style={{ fontSize: '1.25rem' }}></i>
            </button>
        </div>
    )
}