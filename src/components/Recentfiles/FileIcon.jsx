import React from 'react';
import { FileText, Image as ImageIcon } from 'lucide-react';

export default function FileIcon({ type }) {
  if (type === 'document') {
    return (
      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
        <FileText className="w-5 h-5 text-yellow-600" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <ImageIcon className="w-5 h-5 text-blue-600" />
    </div>
  );
}
