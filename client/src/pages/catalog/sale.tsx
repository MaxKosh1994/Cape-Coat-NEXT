import BasePage from '@/components/ItemPage/BasePage';
import { IBasePageItem } from '@/TypeScript/basePageTypes';

interface SalePageProps {
  saleItems: IBasePageItem[];
}

export default function SalePage({ saleItems }: SalePageProps) {
  return <BasePage pageName="Sale" itemsArr={saleItems} />;
}

export async function getServerSideProps(): Promise<{
  props: SalePageProps;
}> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_URL + 'catalog/sale');
    if (response.status === 200) {
      const result: IBasePageItem[] = await response.json();
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
