import React, { useRef } from 'react';
import { ArrowUp, MoreVertical } from 'lucide-react';
import FileIcon from './FileIcon';
import MemberAvatars from './MemberAvatars';

export default function FileListView({ files, onOpenMenu }) {
  const buttonRefs = useRef(files.map(() => React.createRef()));

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-2">Nom <ArrowUp className="w-4 h-4 inline" /></th>
            <th className="text-left py-2 px-2">Dossiers <ArrowUp className="w-4 h-4 inline" /></th>
            <th className="text-left py-2 px-2">Modifications <ArrowUp className="w-4 h-4 inline" /></th>
            <th className="text-left py-2 px-2">Membres <ArrowUp className="w-4 h-4 inline" /></th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-2 flex items-center gap-2">
                <FileIcon type={file.type} />
                <span className="font-medium text-gray-900">{file.name}</span>
              </td>
              <td className="py-3 px-2">{file.folder}</td>
              <td className="py-3 px-2">{file.modified}</td>
              <td className="py-3 px-2">
                <MemberAvatars members={file.members} />
              </td>
              <td className="py-3 px-2">
                <button
                  ref={buttonRefs.current[index]}
                  onClick={() => onOpenMenu(file, buttonRefs.current[index])}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
