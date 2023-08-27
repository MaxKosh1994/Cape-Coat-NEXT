import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map, Placemark, ObjectManager } from '@pbe/react-yandex-maps';

const MapComp = () => {
  const mapRef = useRef(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const mapCreated = useRef(false);

  useEffect(() => {
    if (!window || !window.ymaps || !mapRef.current || mapCreated.current) {
      return;
    }

    mapCreated.current = true;

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [56.316843, 43.98731],
        zoom: 20,
      });

      const placemark = new window.ymaps.Placemark(
        [56.316843, 43.98731],
        {},
        {
          balloonContent:
            'Адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20',
        }
      );

      placemark.events.add('mouseenter', () => {
        if (!isTooltipVisible) {
          setTooltipVisible(true);
          map.balloon.open([56.316843, 43.98731], {
            contentBody:
              'Адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20',
          });
        }
      });

      placemark.events.add('mouseleave', () => {
        if (isTooltipVisible) {
          setTooltipVisible(false);
          map.balloon.close();
        }
      });

      map.geoObjects.add(placemark);
    });
  }, []);

  if (typeof window === 'undefined') {
    return null;
  }

  return <div style={{ height: 700, width: 600 }} ref={mapRef}></div>;
};

export default MapComp;
