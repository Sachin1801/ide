import styles from './ThemeSwitch.module.css';
import { useTheme } from '../ThemeContext';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={styles.uiSwitch} title="Toggle theme">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className={styles.slider}>
        <span className={styles.circle}></span>
      </span>
    </label>
  );
} 