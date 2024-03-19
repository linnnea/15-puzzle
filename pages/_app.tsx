import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';

import '@/styles/globals.css';
import { PuzzleProvider } from '@/contexts/puzzle-context';

const open_sans = Open_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PuzzleProvider>
      <div className={open_sans.className}>
        <Component {...pageProps} />
      </div>
    </PuzzleProvider>
  );
}
