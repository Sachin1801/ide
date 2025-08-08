import { useState } from 'react';

interface FileTab {
  name: string;
  code: string;
}

interface FileSystemProps {
  files: FileTab[];
  activeFile: string;
  onFileSelect: (name: string) => void;
  onAddFile: () => void;
  onRemoveFile: (name: string) => void;
}

export default function FileSystem({
    files,
    activeFile,
    onFileSelect,
    onAddFile,
    onRemoveFile
}: FileSystemProps) {
    const [showNewFileInput, setShowNewFileInput] = useState(false);
    const [newFileName, setNewFileName] = useState('');

    const handleAddFile = () => {
        if (newFileName.trim()) {
            onAddFile();
            setNewFileName('');
            setShowNewFileInput(false);
        }
    };


    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
            }}>
                <div style={{ fontWeight: 'bold' }}>Files</div>
                <button
                    onClick={() => setShowNewFileInput(true)}
                    title="New Python file"
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                    }}
                >
                    +
                </button>
            </div>

            {showNewFileInput && (
                <div style={{ marginBottom: '0.5rem' }}>
                    <input
                        autoFocus
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddFile();
                            }
                            if (e.key === 'Escape') {
                                setShowNewFileInput(false);
                                setNewFileName('');
                            }
                        }}
                        placeholder="new_script.py"
                        style={{ width: '100%' }}
                    />
                    <small style={{ color: 'var(--muted-text)' }}>Only .py files can be created</small>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {files.map((file: FileTab, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.25rem 0',
                            cursor: 'pointer',
                            backgroundColor: activeFile === file.name ? '#e0e0e0' : 'transparent'
                        }}
                        onClick={() => onFileSelect(file.name)}
                    >
                        <span style={{ marginRight: '0.5rem' }}>📄</span>
                        <span style={{ flex: 1 }}>{file.name}</span>
                        {file.name !== 'main.py' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFile(file.name);
                                }}
                                title="Delete file"
                                style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer' 
                                }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
