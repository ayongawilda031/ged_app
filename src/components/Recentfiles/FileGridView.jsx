import React, { useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import MemberAvatars from './MemberAvatars';

export default function FileGridView({ files, onOpenMenu }) {
  const buttonRefs = useRef(files.map(() => React.createRef()));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {files.map((file, index) => (
        <div key={file.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
          {/* Header */}
          <div className="p-3 bg-white flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">{file.name}</h3>
            <button
              ref={buttonRefs.current[index]}
              onClick={() => onOpenMenu(file, buttonRefs.current[index])}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Subtitle */}
          <div className="px-3 pb-2 bg-white">
            <p className="text-xs text-gray-600">{file.subtitle}</p>
          </div>

          {/* Thumbnail */}
          <div className="relative bg-gray-100 h-40">
            <img
              src={file.thumbnail}
              alt={file.name}
              className="w-full h-full object-cover"
            />
            {file.badge && (
              <div className={`absolute top-2 right-2 ${file.badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                {file.badge}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">{file.created}</span>
            <MemberAvatars members={file.members} showCount={true} />
          </div>
        </div>
      ))}
    </div>
  );
}
