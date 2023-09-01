import CookieConsent from 'react-cookie-consent';

export default function MyCookieConsent() {
  return (
    <CookieConsent
      location="bottom"
      cookieName="myAwesomeCookie"
      expires={999}
      overlay
      buttonText="Понятно"
      buttonStyle={{ color: '#4e503b', fontSize: '18px', borderRadius: '10px' }}
    >
      <span style={{ fontSize: '17px' }}>
        Этот веб-сайт использует файлы cookie для улучшения взаимодействия с
        пользователем
      </span>
    </CookieConsent>
  );
}
