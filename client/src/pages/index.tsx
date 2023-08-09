import dynamic from 'next/dynamic';
import HomePage from './homePage';

const DynamicHome = dynamic(() => import('./homePage'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicHome />
    </>
  );
}
