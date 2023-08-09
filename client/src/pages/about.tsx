import AboutComp from '@/components/About/AboutComp';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/About/Map'), {
  ssr: false,
});

export default function About() {
  return (
    <div>
      <AboutComp />
      <DynamicMap />
    </div>
  );
}
