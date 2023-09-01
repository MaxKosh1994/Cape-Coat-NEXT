import Head from 'next/head';
import styles from '../styles/Home.module.css';
import HorizontalBlock from '@/components/main/HorizontalBlock';
import VerticalBlock from '@/components/main/VerticalBlock';
import BottomBlock from '@/components/main/BottomBlock';
import {
  horizontalBlockData,
  verticalBlockData,
} from '@/components/main/consts';

const Home = () => {
  return (
    <>
      <Head>
        <title>Cape&Coat</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {Object.keys(horizontalBlockData).map((object) => (
          <HorizontalBlock
            key={horizontalBlockData[object].blockName}
            blockName={horizontalBlockData[object].blockName}
            imgName={horizontalBlockData[object].imgName}
          />
        ))}
        <div className={styles.blocksContainer}>
          {Object.keys(verticalBlockData).map((object) => (
            <VerticalBlock
              key={verticalBlockData[object].blockName}
              blockName={verticalBlockData[object].blockName}
              imgUrl={verticalBlockData[object].imgUrl}
              url={verticalBlockData[object].url}
            />
          ))}
        </div>
        <BottomBlock />
      </main>
    </>
  );
};

export default Home;
