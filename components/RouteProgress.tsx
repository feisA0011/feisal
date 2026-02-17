'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setVisible(true);
    setValue(20);

    const tick = window.setInterval(() => {
      setValue((current) => (current < 85 ? current + 15 : current));
    }, 120);

    const finish = window.setTimeout(() => {
      setValue(100);
      window.setTimeout(() => {
        setVisible(false);
        setValue(0);
      }, 160);
    }, 320);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(finish);
    };
  }, [pathname, search]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent"
    >
      <div
        className="h-full bg-emerald-500 transition-all duration-150"
        style={{ width: visible ? `${value}%` : '0%' }}
      />
    </div>
  );
}
