import { Tab } from '@headlessui/react';
import clsx from 'clsx';

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
    onSelectFile,
    currentFile,
    pythonFS
}: {
    onSelectFile: (path: string, type: typeof FILE_TYPES[number]) => void;
    currentFile: string;
    pythonFS: {
        readFile: (name: string) => Promise<void> | undefined;
        writeFile: (name: string, data: string | Uint8Array) => Promise<void> | undefined;
    };
}) {
    const [files, setFiles] = useState<FileItem[]>([
        { id: '1', name: 'main.py', path: '/main.py', type: 'py' },
    ]);

    const [newFileName, setNewFileName] = useState('');
    const [showNewFileInput, setShowNewFileInput] = useState(false);

    // Initialize with main.py selected
    useEffect(() => {
        onSelectFile('/main.py', 'py');
    }, [onSelectFile]);

    const createFile = async () => {
        const fileName = newFileName.endsWith('.py') ? newFileName : `${newFileName}.py`;
        const filePath = `/${fileName}`;

        await pythonFS.writeFile(filePath, '# New Python file\n');
        setFiles([...files, {
            id: Date.now().toString(),
            name: fileName,
            path: filePath,
            type: 'py'
        }]);
        setNewFileName('');
        setShowNewFileInput(false);
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'py': return <i className="bi bi-filetype-py"></i>;
            case 'txt': return <i className="bi bi-filetype-txt"></i>;
            case 'csv': return <i className="bi bi-filetype-csv"></i>;
            case 'png': return <i className="bi bi-filetype-png"></i>;
            case 'jpg': return <i className="bi bi-filetype-jpg"></i>;
            default: return <i className="bi bi-file-earmark"></i>;
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
                >
                    <i className="bi bi-file-plus"></i>
                </button>
            </div>

            {showNewFileInput && (
                <div style={{ marginBottom: '0.5rem' }}>
                    <input
                        autoFocus
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') createFile();
                            if (e.key === 'Escape') setShowNewFileInput(false);
                        }}
                        placeholder="new_script.py"
                        style={{ width: '100%' }}
                    />
                    <small style={{ color: 'var(--muted-text)' }}>Only .py files can be created</small>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {files.map((file) => (
                    <div
                        key={file.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.25rem 0',
                            cursor: 'pointer',
                            backgroundColor: currentFile === file.path ? 'var(--highlight-bg)' : 'transparent'
                        }}
                        onClick={() => onSelectFile(file.path, file.type)}
                    >
                        <span style={{ marginRight: '0.5rem' }}>
                            {getFileIcon(file.type)}
                        </span>
                        <span style={{ flex: 1 }}>{file.name}</span>
                        {file.type === 'py' && file.path !== '/main.py' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    pythonFS.writeFile(file.path, '');
                                    setFiles(files.filter(f => f.id !== file.id));
                                    if (currentFile === file.path) {
                                        onSelectFile('/main.py', 'py');
                                    }
                                }}
                                title="Delete file"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
