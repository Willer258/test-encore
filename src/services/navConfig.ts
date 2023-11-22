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
    title: "Mes contrats",
    link: "/dashboard",
    name:'dashboard'
  },
  {
    title: "Mes cotations",
    link: "/dashboard/cotations",
    name:'cotations'
  },
  {
    title: "Mes échéances",
    link: "/dashboard/deadline",
    name:'deadline'
  },
  {
    title: "Parrainage",
    link: "/dashboard/parrainage",
    name:'parrainage'
  },
];
