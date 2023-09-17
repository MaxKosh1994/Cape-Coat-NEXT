import React from 'react';
import TrousersSizeForm from '@/components/Cart/trousersSizeForm';
import TrenchSizeForm from '@/components/Cart/trenchSizeForm';
import CoatSizeForm from '@/components/Cart/coatSizeForm';
import FurCoatSizeForm from '@/components/Cart/furCoatSizeForm';

export default function CustomFormPart({
  catId,
  itemId,
}: {
  catId: number;
  itemId: number;
}) {
  const renderComponent = () => {
    switch (catId) {
      case 4:
        return <TrousersSizeForm />;
      case 1:
        return (
          <TrenchSizeForm
            itemId={itemId}
          />
        );
      case 2:
        return (
          <CoatSizeForm
            itemId={itemId}
          />
        );
      case 5:
        return (
          <FurCoatSizeForm
            itemId={itemId}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
}
