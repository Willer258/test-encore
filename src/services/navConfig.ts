export interface Links {
  title: string;
  link?: string;
  name:string;
}

export const clientLinks: Links[] = [

  // {
  //   title: "Accueil",
  //   link: "/dashboard/",
  //   name:'dashboard'
  // },
  {
    title: "Mes Contrats",
    link: "/dashboard",
    name:'dashboard'
  },
  {
    title: "Mes Cotations",
    link: "/dashboard/cotations",
    name:'cotations'
  },
  {
    title: "Mes Échéances",
    link: "/dashboard/deadline",
    name:'deadline'
  },
  {
    title: "Mes Parrainages",
    link: "/dashboard/parrainage",
    name:'parrainage'
  },
];
