"use client"; 
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/header.module.scss';
import { Nav } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import ChooseLanguage from './common/chooseLanguage';


const Header = ({ lang }) => {`
  `
  const Language = {
    es: "Español",
    en: "English",
    fr: "Français",
    ar: "العربية",
    ru: "Русский",
  };

  const Home = {
    es: "Inicio",
    en: "Home",
    fr: "Accueil",
    ar: "الرئيسية",
    ru: "Главная",
  };

  const Configurator = {
    es: "Configurador",
    en: "Configurator",
    fr: "Configurateur",
    ar: "الضبط",
    ru: "Конфигуратор",
  };

  const Contact = {
    es: "Contacto",
    en: "Contact",
    fr: "Contact",
    ar: "اتصال",
    ru: "Контакт",
  };

  const router=useRouter();
  const pathname = usePathname();
  const [isLang, setIsLang] = useState(false);
  const pushRouter = () => {
    router.push("/");
  }

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 2];
   
     if (lastSegment === 'es'|| lastSegment === 'en'|| lastSegment === 'fr'|| lastSegment === 'ar'|| lastSegment === 'ru') {
      setIsLang(true);
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image style={{ cursor: "pointer" }} onClick={pushRouter} src="/images/ıcu.png" alt="logo" width={120} height={40} />
      </div>
     
      <Nav className={styles.nav}>
        <ul className={styles.nav_link}>
          <li>
            <Link href={isLang? "/":`${lang}`}>{Home[lang]}</Link>
          </li>
          <li>
            <Link href={isLang?"configuration": `${lang}/configuration`}>{Configurator[lang]}</Link>
          </li>
          <li>
            <Link href={isLang?"contact": `${lang}/contact`}>{Contact[lang]}</Link>
          </li>
        </ul>
      </Nav>
      <div className={styles.languageSelector}>
        <ChooseLanguage />
      </div>
    </header>
  );
};

export default Header;

