import { Item } from '@/app/itemSlice';

export const fetchNavigationMenuCategoryData = async () => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}catalog/categories`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const response = await responseFetch.json();

    const { status } = await responseFetch;

    if (status === 403 || status === 402 || status === 203 || status === 500) {
      return { info: response.message, categories: [] };
    }

    if (status === 200 && Array.isArray(response)) {
      return { info: '', categories: response };
    }

    return { info: 'Unknown status', categories: [] };
  } catch (error) {
    console.log(error);
    return { info: 'Error occurred', categories: [] };
  }
};
export const fetchNavigationMenuCollectionData = async () => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}catalog/collection/all`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const response = await responseFetch.json();

    const { status } = await responseFetch;

    if (status === 403 || status === 402 || status === 203 || status === 500) {
      return { info: response.message, collections: [] };
    }

    if (status === 200 && Array.isArray(response)) {
      return { info: '', collections: response };
    }

    return { info: 'Unknown status', collections: [] };
  } catch (error) {
    console.log(error);
    return { info: 'Error occurred', collections: [] };
  }
};

export const getItems = async (
  // setSimilarItems: React.Dispatch<React.SetStateAction<Item[]>>,
  isMobile: boolean,
  itemData: Item
): Promise<void> => {
  try {
    const allItems = await fetch(
      `${process.env.NEXT_PUBLIC_URL}item/allItems`,
      {
        credentials: 'include',
      }
    );
    const response: Item[] = await allItems.json();

    if (allItems.status === 200) {
      const filteredItems = response.filter(
        (item) =>
          item.category_id === itemData.category_id &&
          item.material_id !== itemData.material_id
      );

      const cutFilteredItems = isMobile
        ? filteredItems.slice(0, 2)
        : filteredItems.slice(0, 4);
      // setSimilarItems(cutFilteredItems);
      return cutFilteredItems;
    }
  } catch (error) {
    console.log(error);
  }
};
