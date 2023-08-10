import { Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import styles from './AboutComp.module.css';
import Image from 'next/image';

export default function AboutComp() {
  return (
    <div className={styles.HeaderDiv}>
      <div className={styles.Container}>
        <h1 className={styles.HeaderName}>
          <strong> О бренде</strong>
        </h1>
        <div className={styles.ContainerText}>
          <div className={styles.ContainerPhotoOne}>
            <table className={styles.Table}>
              <tbody>
                <tr>
                  <td className={styles.PhotoOne}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_COLLAGE_URL}collage1.png`}
                      alt="collage1"
                      width={300}
                      height={400}
                    />
                  </td>
                  <td className={styles.InfoConteiner}>
                    <p className={styles.Info}>
                      <strong>Сape&Coat</strong> — бренд верхней одежды и
                      костюмов лаконичного кроя был основан в 2017 году в Нижнем
                      Новгороде.
                    </p>
                    <p className={styles.Info}>
                      Бренд предоставляет флагманскую услугу — индивидуальный
                      пошив изделий из сезонных коллекций бренда по персональным
                      меркам с возможностью выбора ткани и фурнитуры.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.Info}>
            <strong>Основатель бренда</strong> Екатерина Киреева уделяет
            пристальное внимание деталям, крою и выбору материалов. Лично
            прорабатывает дизайн, конструкцию и технологию пошива каждой модели:
            от идеи до воплощения.
          </p>
          <p className={styles.Info}>
            <strong>Сape&Coat</strong> — это архитектурный крой, помноженный на
            дорогие и качественные материалы.
          </p>
          <p className={styles.Info}>
            В результате получаются изделия, балансирующие на грани классики и
            последних тенденций.
          </p>
          <Typography variant="h2" component="h2">
            Наши контакты:
          </Typography>
          <p className={styles.Info}>
            <a style={{ color: 'black' }} href="mailto:Cape.n.coat@gmail.com">
              <MailOutlineIcon /> Email: Cape.n.coat@gmail.com
            </a>
          </p>
          <p className={styles.Info}>
            <a style={{ color: 'black' }} href="https://t.me/@kkireva">
              <TelegramIcon /> Telegram: @kkireva
            </a>
          </p>
          <p className={styles.Info}>
            <PhoneIcon /> Phone number: +7(920)-119-99-19
          </p>
        </div>
      </div>
    </div>
  );
}
