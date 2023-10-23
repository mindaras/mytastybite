"use client";

import styles from "./Navigation.module.scss";
import { Search } from "../search/Search";
import { Image } from "../image/Image";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Translations } from "@i18n/loadTranslations";
import { LanguagePicker } from "../languagePicker/LanguagePicker";
import mediaStyles from "@common/styles/media.module.scss";
import { usePathname } from "next/navigation";
import { Optional } from "../Optional";

export interface NavigationLink {
  to: string;
  label: string;
  searchable?: boolean;
  searchFallback?: boolean;
}

export type NavigationLinks = NavigationLink[];

const getSearchPathname = (pathname: string, links: NavigationLinks) => {
  const searchableLinks = links.filter((link) => link.searchable);

  if (!searchableLinks.length) return null;

  const searchablePath = searchableLinks
    ?.map((link) => link.to)
    .sort((a, b) => b.split("/").length - a.split("/").length)
    .find((path) => pathname.includes(path));

  return (
    searchablePath || searchableLinks.find((link) => link.searchFallback)?.to
  );
};

interface Props {
  lang: string;
  translations: Translations;
  logoSrc: string;
  mobileLogoSrc: string;
  links: NavigationLinks;
}

const Navigation: React.FC<Props> = ({
  lang,
  translations,
  logoSrc,
  mobileLogoSrc,
  links,
}) => {
  const pathname = usePathname();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const searchPathname = getSearchPathname(pathname, links);

  const openMobileMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  const onOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#navigation")) closeMobileMenu();
  };

  useEffect(() => {
    if (mobileMenuVisible) window.addEventListener("click", onOutsideClick);
    return () => window.removeEventListener("click", onOutsideClick);
  }, [mobileMenuVisible]);

  return (
    <nav id="navigation" className={styles.navigation}>
      <Link href={`/${lang}`} className={styles.logoContainer}>
        <Image className={styles.logo} src={logoSrc} alt="Logo" />
        <Image
          className={classNames(styles.logo, styles.logo__mobile)}
          src={mobileLogoSrc}
          alt={translations.navigation.logo}
        />
      </Link>
      <div className={styles.items}>
        <Optional data={searchPathname}>
          <Search
            className={styles.search}
            pathname={searchPathname!}
            placeholder={translations.navigation.search}
          />
        </Optional>
        <FontAwesomeIcon
          icon={faBars}
          className={styles.hamburger}
          onClick={openMobileMenu}
        />
        <div
          className={classNames(styles.links, {
            [styles.links__visible]: mobileMenuVisible,
          })}
        >
          <FontAwesomeIcon
            icon={faClose}
            className={styles.close}
            onClick={closeMobileMenu}
          />
          <div className={styles.header}>
            <h3 className={styles.title}>{translations.navigation.menu}</h3>
            <LanguagePicker
              className={mediaStyles.mediumAndBelow}
              lang={lang}
            />
          </div>
          <div className={styles.separator}></div>
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={classNames(styles.link, {
                [styles.link__active]: link.to === pathname,
              })}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <LanguagePicker className={mediaStyles.large} lang={lang} />
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
