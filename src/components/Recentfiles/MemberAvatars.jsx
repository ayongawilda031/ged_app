import React from 'react';

export default function MemberAvatars({ members, showCount = true }) {
  return (
    <div className="flex items-center -space-x-2">
      {members.slice(0, 3).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Member ${index + 1}`}
          className="w-7 h-7 rounded-full border-2 border-white object-cover"
        />
      ))}
      {showCount && members.length > 3 && (
        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">+{members.length - 3}</span>
        </div>
      )}
    </div>
  );
}
