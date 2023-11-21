export interface Links {
  title: string;
  link?: string;
  name:string;
}

export const clientLinks: Links[] = [
  {
    title: "Mes contrats",
    link: "contrats",
    name:'contrats'
  },
  {
    title: "Mes cotations",
    link: "cotations",
    name:'cotations'
  },
];
