export interface Links {
  title: string;
  link?: string;
  name:string;
}

export const clientLinks: Links[] = [

  {
    title: "Accueil",
    link: "/dashboard/",
    name:'dashboard'
  },
  {
    title: "Mes contrats",
    link: "/dashboard/contrats",
    name:'contrats'
  },
  {
    title: "Mes cotations",
    link: "/dashboard/cotations",
    name:'cotations'
  },
  {
    title: "Parrainage",
    link: "/dashboard/parrainage",
    name:'parrainage'
  },
];
