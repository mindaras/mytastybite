"use client";

import { Translations } from "@i18n/loadTranslations";
import styles from "./SideNavigation.module.scss";
import { NavigationLinks } from "./Navigation";
import Link from "next/link";
import { Image } from "../image/Image";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { LanguagePicker } from "../languagePicker/LanguagePicker";
import { usePathname } from "next/navigation";

interface Props {
  lang: string;
  translations: Translations;
  logoSrc: string;
  mobileLogoSrc: string;
  links: NavigationLinks;
}

const SideNavigation: React.FC<Props> = ({
  lang,
  translations,
  logoSrc,
  mobileLogoSrc,
  links,
}) => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const toggle = () => (isOpen ? close() : open());

  const onOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#side-navigation")) close();
  };

  useEffect(() => {
    if (isOpen) window.addEventListener("click", onOutsideClick);
    return () => window.removeEventListener("click", onOutsideClick);
  }, [isOpen]);

  return (
    <nav
      id="side-navigation"
      className={classNames(styles.sideNavigation, {
        [styles.sideNavigation__visible]: isOpen,
      })}
    >
      <div className={styles.content}>
        <button className={styles.toggle} onClick={toggle}>
          <FontAwesomeIcon icon={isOpen ? faArrowLeft : faArrowRight} />
        </button>
        <div className={styles.header}>
          <LanguagePicker className={styles.language} lang={lang} />
          <Link href={`/${lang}/cms`} className={styles.logoContainer}>
            <Image className={styles.logo} src={logoSrc} alt="Logo" />
            <Image
              className={classNames(styles.logo, styles.logo__mobile)}
              src={mobileLogoSrc}
              alt={translations.navigation.logo}
            />
          </Link>
        </div>
        <div className={classNames(styles.links)}>
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={classNames(styles.link, {
                [styles.link__active]: link.to === pathname,
              })}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export { SideNavigation };
