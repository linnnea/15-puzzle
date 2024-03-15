import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { PuzzleProvider } from '@/contexts/puzzle-context';

import '@/styles/globals.css';

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
