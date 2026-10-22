'use client';

import { Toaster } from 'sonner';

// Admin-wide toast host. Usage anywhere in /admin: import { toast } from 'sonner'; toast.success('Saved')
export default function AdminToaster({ theme = 'dark' }) {
  return (
    <Toaster
      theme={theme}
      position="top-right"
      richColors
      closeButton
      duration={3500}
      toastOptions={{
        className: 'font-sans',
        style: { borderRadius: '14px', fontSize: '13px' },
      }}
    />
  );
}
