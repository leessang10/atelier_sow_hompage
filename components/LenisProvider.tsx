'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      className="lenis"
      options={{
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
