export interface MenuItem {
  title: string;
  url: string;
  subItems?: { title: string; url: string }[];
}

export const MAIN_MENU: MenuItem[] = [
  {
    title: 'الالواح الشمسيه',
    url: '/category/solar-panels',
  },
  {
    title: 'البطاريات',
    url: '/category/batteries',
  },
  {
    title: 'الانفرترات',
    url: '/category/off-grid-inverters',
  },
  {
    title: 'الاجهزة المنزلية',
    url: '/category/home-appliances',
  },
  {
    title: 'المكيفات',
    url: '/category/air-conditioners',
  },
  {
    title: 'اجهزة الطباخه',
    url: '/category/cookers',
  },
  {
    title: 'الباقات',
    url: '/category/bundles',
  },
  {
    title: 'المدونة ودليل المشتري',
    url: '/blog',
  }
];

export const FOOTER_LINKS = {
  about: [
    { title: 'المدونة', url: '/blog' },
    { title: 'طلبات التوظيف', url: '/jobs' },
    { title: 'توثيق متجرنا', url: '/verify' },
  ],
  support: [
    { title: 'الشكاوى و الاقتراحات', url: '/feedback' },
    { title: 'سياسة الاستبدال أو الاسترجاع', url: '/refund-policy' },
    { title: 'سياسه الاستخدام و الخصوصيه', url: '/privacy' },
  ]
};
