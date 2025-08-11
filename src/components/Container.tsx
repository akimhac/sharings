import type { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-4xl mx-auto px-4">{children}</div>;
}
