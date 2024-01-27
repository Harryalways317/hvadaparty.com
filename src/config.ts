import type { SocialsObject } from "./types";

export const SITE = {
  website: "https://hvadaparty.com",
  author: "Harish Vadaparty",
  desc: "A personal website",
  title: "Harish Vadaparty",
  lightAndDarkMode: true,
  postPerPage: 5,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialsObject = [
  {
    name: "Github",
    href: "https://github.com/Harryalways317",
    active: true,
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com/in/harishvadaparty",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:harishvadapartygmail.com",
    active: true,
  },
  // {
  //   name: "Mastodon",
  //   href: "https://hachyderm.io/@jakegut",
  //   active: true,
  // },
];
