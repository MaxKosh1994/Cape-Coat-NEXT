import { Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import styles from './AboutComp.module.css';
import Image from 'next/image';
import { Icon36LogoVk } from '@vkontakte/icons';
import PinterestIcon from '@mui/icons-material/Pinterest';

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
                  <td className={styles.Photo}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_COLLAGE_URL}collage1.png`}
                      alt='collage1'
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
                    <p className={styles.Info}>
                      <strong>Сape&Coat</strong> — это архитектурный крой,
                      помноженный на дорогие и качественные материалы.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.ContainerPhotoTwo}>
            <table className={styles.Table}>
              <tbody>
                <tr>
                  <td className={styles.InfoContainer}>
                    <p className={styles.Info}>
                      <strong>Основатель бренда</strong> Екатерина Киреева
                      уделяет пристальное внимание деталям, крою и выбору
                      материалов. Лично прорабатывает дизайн, конструкцию и
                      технологию пошива каждой модели: от идеи до воплощения.
                    </p>
                    <p className={styles.Info}>
                      В результате получаются изделия, балансирующие на грани
                      классики и последних тенденций.
                    </p>
                  </td>
                  <td className={styles.Photo}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_COLLAGE_URL}collage2.png`}
                      alt='collage1'
                      width={300}
                      height={400}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.socialMediaContainer}>
            <h1 className={styles.Contact}>Наши контакты и соц.сети:</h1>
            <Typography className={styles.displayFlex} variant='subtitle1'>
              <a className={styles.link} href='mailto:Cape.n.coat@gmail.com'>
                <MailOutlineIcon className={styles.Icon} /> Email:
                Cape.n.coat@gmail.com
              </a>
            </Typography>
            <Typography className={styles.displayFlex} variant='subtitle1'>
              <a className={styles.link} href='https://t.me/@kkireva'>
                <TelegramIcon className={styles.Icon} /> Telegram: @kkireva
              </a>
            </Typography>
            <Typography className={styles.displayFlex} variant='subtitle1'>
              <a className={styles.link} href='https://pin.it/2lozIsT'>
                <PinterestIcon className={styles.Icon} /> Pinterest: @capencoat
              </a>
            </Typography>
            <Typography className={styles.displayFlex} variant='subtitle1'>
              <a className={styles.link} href='https://pin.it/AK7aIDV'>
                <PinterestIcon className={styles.Icon} /> Pinterest: @KKir_eva
              </a>
            </Typography>
            <Typography className={styles.displayFlex} variant='subtitle1'>
              <a className={styles.link} href='https://vk.com/cape.n.coat'>
                <Icon36LogoVk className={styles.Icon} /> Группа ВК
              </a>
            </Typography>
            <Typography className={styles.displayFlex} variant='subtitle1'>
              <a className={styles.link} href='https://vk.com/kkireva'>
                <Icon36LogoVk className={styles.Icon} /> Группа ВК (платья)
              </a>
            </Typography>
            <Typography className={styles.displayFlex} variant='subtitle1'>
              <a href='tel:+79201199919' className={styles.contactLink}>
                <PhoneIcon className={styles.Icon} /> +7(920)-119-99-19
              </a>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
