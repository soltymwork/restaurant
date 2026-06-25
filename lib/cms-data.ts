export const restaurantInfo = {
  name: "Luma",
  fullName: "Luma Restaurant",
  email: "info@lumarestaurant.com",
  phone: "+421 900 123 456",
  address: "Michalská 15\n811 01 Bratislava, Slovensko",
  hours: [
    { days: "Utorok-Štvrtok:", time: "12:00-21:00" },
    { days: "Piatok-Nedeľa:", time: "12:00-23:00" },
    { days: "Pondelok:", time: "Zatvorené" }
  ],
  socials: {
    instagram: "#",
    facebook: "#"
  }
};

export const navLinks = [
  { name: "O NÁS", href: "/about" },
  { name: "MENU", href: "/menu" },
  { name: "REZERVÁCIA", href: "/reservation" },
  { name: "NOVINKY", href: "/news" },
  { name: "HODINY & LOKÁCIA", href: "#footer" },
  { name: "NAPÍŠTE NÁM", href: "mailto:info@lumarestaurant.com" }
];

export const homeHero = {
  title1: "Vitajte v",
  title2: "Luma",
  title3: " Restaurant",
  images: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
  ]
};

export const aboutData = {
  heading: "O Luma Restaurant",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  discoverLink: "/about",
  chefHeading: "Šéfkuchár",
  chefDesc1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  chefDesc2: "Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.",
  chefName: "Rick Hall",
  images: {
    interior1: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    chefMain: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800",
    chefOverlay: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600"
  }
};

export const menuCategories = [
  { id: 'lunch', name: 'Obed', num: '/01' },
  { id: 'dinner', name: 'Večera', num: '/02' },
  { id: 'desserts', name: 'Dezerty', num: '/03' },
  { id: 'wine', name: 'Vínna Karta', num: '/04' }
];

export const menuItemsList = [
  { id: 1, category: 'lunch', name: 'Pikantná thajská polievka z maslovej tekvice', price: '34€', description: 'Detaily' },
  { id: 2, category: 'lunch', name: 'Quinoa Burger', price: '20€', description: 'Detaily' },
  { id: 3, category: 'lunch', name: 'Šalát s pečeným cícerom a avokádom', price: '18€', description: 'Detaily' },
  { id: 4, category: 'lunch', name: 'Grilované kozie rebrá s baklažánovou omáčkou', price: '10€', description: 'Detaily' },
  { id: 5, category: 'lunch', name: 'Makrela, paradajky a morský chren šalát', price: '24€', description: 'Detaily' },
  { id: 6, category: 'lunch', name: 'Avokádový toast s čerstvým humusom z repy', price: '24€', description: 'Detaily' },
  
  { id: 7, category: 'dinner', name: 'Hovädzí steak', price: '45€', description: 'Detaily' },
  { id: 8, category: 'dinner', name: 'Losos na grile', price: '32€', description: 'Detaily' },
  { id: 9, category: 'dinner', name: 'Rizoto s hríbami', price: '28€', description: 'Detaily' },
  
  { id: 10, category: 'desserts', name: 'Čokoládový fondán', price: '12€', description: 'Detaily' },
  { id: 11, category: 'desserts', name: 'Panna Cotta', price: '10€', description: 'Detaily' },
  { id: 12, category: 'desserts', name: 'Tiramisu', price: '11€', description: 'Detaily' },
  
  { id: 13, category: 'wine', name: 'Chardonnay', price: '30€', description: 'Fľaša' },
  { id: 14, category: 'wine', name: 'Cabernet Sauvignon', price: '35€', description: 'Fľaša' },
  { id: 15, category: 'wine', name: 'Prosecco', price: '25€', description: 'Fľaša' }
];

export const newsData = {
  heading1: "Najnovšie správy z",
  heading2: "Luma Restaurant",
  timeline: [
    {
      year: "2023",
      items: [
        {
          date: "Mar 29, 2023",
          title: "Sofistikované a netradičné koktejly",
          excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique...",
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
        },
        {
          date: "Feb 6, 2023",
          title: "2-Hviezdy Michelin nás robia inými",
          excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique...",
          image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800"
        }
      ]
    }
  ]
};
