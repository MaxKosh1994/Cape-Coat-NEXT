import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map, Placemark, ObjectManager } from '@pbe/react-yandex-maps';

export default function MapComp() {
  const mapRef = useRef(null);
  const [mapCreated, setMapCreated] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    if (!window || !window.ymaps || !mapRef.current || mapCreated) return;

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
              'Address: Russia, Nizhny Novgorod, Malaya Pokrovskaya st., 20',
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
      setMapCreated(true);
    });
  }, [isTooltipVisible, mapCreated]);

  if (typeof window === 'undefined') {
    return null;
  }
  return <div style={{ width: 500, height: 300 }} ref={mapRef}></div>;
}
