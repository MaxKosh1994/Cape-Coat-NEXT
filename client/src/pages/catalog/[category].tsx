import BasePage from '@/components/ItemPage/BasePage';
import Custom404 from '../404';
import { Item } from '@/app/itemSlice';

interface IResult {
  items: Item[];
  catName: string;
}

interface CategoryProps {
  catName: string | null;
  categoryItems: Item[];
  error: string | null;
}

export default function Category({
  catName,
  categoryItems,
  error,
}: CategoryProps) {
  if (error) {
    return <Custom404 />;
  }

  return <BasePage pageName={catName} itemsArr={categoryItems} />;
}

export async function getServerSideProps(context: {
  query: {
    category: string;
  };
}): Promise<{
  props: CategoryProps;
}> {
  try {
    const { category: nameOneCategory } = context.query;
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `category/${nameOneCategory}`,
      {
        credentials: 'include',
      }
    );
    if (response.status === 200) {
      const result: IResult = await response.json();
      const items = result.items.map((item) => ({
        ...item,
        isFavorite: false,
        isCart: false,
      }));

      return {
        props: {
          catName: result.catName,
          categoryItems: items,
          error: null,
        },
      };
    } else if (response.status === 404) {
      const result = await response.json();
      return {
        props: {
          catName: null,
          categoryItems: [],
          error: result.message,
        },
      };
    } else {
      const result = await response.json();
      return {
        props: {
          catName: null,
          categoryItems: [],
          error: result.message,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        catName: null,
        categoryItems: [],
        error: 'Server Error',
      },
    };
  }
}
