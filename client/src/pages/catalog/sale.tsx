import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';
import { Item } from '@/app/itemSlice';

interface SalePageProps {
  saleItems: Item[];
}

export default function SalePage({ saleItems }: SalePageProps) {
  return (
    <>
      {saleItems.length ? (
        <BasePage pageName="Sale" itemsArr={saleItems} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: SalePageProps;
}> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_URL + 'catalog/sale');
    if (response.status === 200) {
      const result: Item[] = await response.json();
      const items = result.map((item) => ({
        ...item,
        isFavorite: false,
        isCart: false,
      }));

      return {
        props: {
          saleItems: items,
        },
      };
    } else {
      return {
        props: {
          saleItems: [],
        },
      };
    }
  } catch (err) {
    console.error(err);

    return {
      props: {
        saleItems: [],
      },
    };
  }
}
