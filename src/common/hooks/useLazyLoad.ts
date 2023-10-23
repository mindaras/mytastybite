import { useRef } from "react";

interface Props {
  ref: React.MutableRefObject<HTMLImageElement | undefined>;
  src: string;
  onLoad: VoidFunction;
}

const useLazyLoad = ({ ref, src, onLoad }: Props) => {
  const observerRef = useRef<IntersectionObserver>();

  if (!ref || !src || !onLoad) {
    return {
      observe: () => undefined,
      disconnect: () => undefined,
    };
  }

  const disconnect = () => observerRef.current?.disconnect();

  const observe = () => {
    let observer;

    if (observerRef.current) observer = observerRef.current;
    else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.src = src;
              img.onload = onLoad;
              disconnect();
            }
          });
        },
        { rootMargin: `${window.innerHeight}px` }
      );
      observerRef.current = observer;
    }

    observer.observe(ref.current as HTMLImageElement);
  };

  return { observe, disconnect };
};

export { useLazyLoad };
