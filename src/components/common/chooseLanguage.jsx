"use client";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";

const languages = [
  { code: "en", name: "English", flag: "/images/flags/gb.png" },
  { code: "es", name: "Español", flag: "/images/flags/es.png" },
  { code: "fr", name: "Français", flag: "/images/flags/fr.png" },
  { code: "ru", name: "Русский", flag: "/images/flags/ru.png" },
  { code: "ar", name: "العربية", flag: "/images/flags/sa.png" },
];

const ChooseLanguage = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Select Language
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((lang) => (
          <Dropdown.Item href={`/${lang.code}`} key={lang.code}>
            <Image src={lang.flag} alt={lang.name} width={20} height={15} />{" "}
            {lang.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChooseLanguage;
