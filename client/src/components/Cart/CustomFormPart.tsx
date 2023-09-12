import React from 'react';
import TrousersSizeForm from '@/components/Cart/trousersSizeForm';
import TrenchSizeForm from '@/components/Cart/trenchSizeForm';
import CoatSizeForm from '@/components/Cart/coatSizeForm';
import FurCoatSizeForm from '@/components/Cart/furCoatSizeForm';
import { useCartControl } from './useCartControl';

export default function CustomFormPart({
  catId,
  itemId,
  handleCustomFormChange,
}) {
  // const { handleCustomFormChange } = useCartControl();
  const renderComponent = () => {
    switch (catId) {
      case 4:
        return (
          <TrousersSizeForm onTrousersSizeChange={handleCustomFormChange} />
        );
      case 1:
        return (
          <TrenchSizeForm
            itemId={itemId}
            onTrenchSizeChange={handleCustomFormChange}
          />
        );
      case 2:
        return (
          <CoatSizeForm
            itemId={itemId}
            onCoatSizeChange={handleCustomFormChange}
          />
        );
      case 5:
        return (
          <FurCoatSizeForm
            itemId={itemId}
            onFurCoatSizeChange={handleCustomFormChange}
          />
        );
      default:
        return null;
    }
  };
  return <>{renderComponent()}</>;
}
