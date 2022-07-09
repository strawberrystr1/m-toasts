import { useLayoutEffect, useState } from "react";

export const usePortal = (rootElement?: string) => {
  const [portal, setPortal] = useState<HTMLElement>(document.body);

  useLayoutEffect(() => {
    if (rootElement) {
      const portal = document.getElementById(rootElement);
      if (!portal) {
        const root = document.createElement('div');
        root.id = rootElement;
        document
          .getElementById('root')
          ?.insertAdjacentElement('afterend', root);
        setPortal(root);
      } else {
        setPortal(portal);
      }
    }

    return () => document.getElementById(rootElement as string)?.remove();
  }, [rootElement]);

  return portal
}