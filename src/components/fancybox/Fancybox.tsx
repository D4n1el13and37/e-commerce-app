import React, { useRef, useEffect, PropsWithChildren } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import { OptionsType } from '@fancyapps/ui/types/Fancybox/options';

interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
}

const Fancybox: React.FC<PropsWithChildren<Props>> = ({
  children,
  options = {},
  delegate = '[data-fancybox]',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      NativeFancybox.bind(container, delegate, options);
    }

    return () => {
      if (container) {
        NativeFancybox.unbind(container);
        NativeFancybox.close();
      }
    };
  }, [delegate, options]);

  return <div ref={containerRef}>{children}</div>;
};

export default Fancybox;
