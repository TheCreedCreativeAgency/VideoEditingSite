// src/hooks/useIntersectionObserver.js
import { useState, useEffect } from 'react';

const useIntersectionObserver = (elementRef, {
  threshold = 0.5, // Trigger when 50% of the element is visible
  root = null,
  rootMargin = '0%'
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [elementRef, threshold, root, rootMargin]);

  return isIntersecting;
};

export default useIntersectionObserver;