import { useState, useEffect } from 'react';
import BasePage from '@/components/ItemPage/BasePage';

export default function SalePage() {
  const [saleItems, setSaleItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/sale'
        );
        if (response.status === 200) {
          const items = await response.json();
          setSaleItems(items);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <BasePage pageName="Sale" itemsArr={saleItems} />;
}
