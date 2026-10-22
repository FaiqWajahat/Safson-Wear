'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Password field with a show/hide toggle. Accepts the same props as <input>; `icon` renders on the left.
export default function PasswordInput({ className = '', icon: Icon, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
      )}
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className={`${className} pr-11`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-neutral-500 hover:text-white transition-colors cursor-pointer"
        aria-label={visible ? 'Hide password' : 'Show password'}
        title={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
