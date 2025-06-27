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
  files,
  activeFile,
  onFileSelect,
  onAddFile,
  onRemoveFile,
}: FileSystemProps) {
  return (
    <div className="flex flex-col">
      <Tab.Group>
        <Tab.List className="flex items-center gap-1 border-b border-neutral-200 bg-white px-2">
          {files.map((file) => (
            <Tab
              key={file.name}
              className={({ selected }) =>
                clsx(
                  'group flex items-center gap-2 rounded-t-lg px-3 py-2 text-sm font-medium transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  selected
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
                )
              }
              onClick={() => onFileSelect(file.name)}
            >
              <i className="bi bi-filetype-py text-base"></i>
              <span className="truncate max-w-[120px]">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(file.name);
                }}
                className="ml-1 opacity-0 transition-opacity group-hover:opacity-70 hover:opacity-100"
              >
                <i className="bi bi-x text-sm"></i>
              </button>
            </Tab>
          ))}
          <button
            onClick={onAddFile}
            className="ml-1 flex items-center justify-center rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-blue-600"
          >
            <i className="bi bi-plus-lg text-sm"></i>
          </button>
        </Tab.List>
      </Tab.Group>
    </div>
  );
}