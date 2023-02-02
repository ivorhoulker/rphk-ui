import { useEffect, useState } from 'react';

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return { width: 0, height: 0 };
}

// export default function useWindowDimensions() {
//   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions(getWindowDimensions());
//     }

//     if (typeof window !== 'undefined') window.addEventListener('resize', handleResize);
//     return () => {
//       if (typeof window !== 'undefined') window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//   const isPortrait = windowDimensions.height > windowDimensions.width;
//   const isLandscape = !isPortrait;
//   return { ...windowDimensions, isPortrait, isLandscape };
// }
