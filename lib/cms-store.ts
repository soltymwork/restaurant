import { restaurantInfo, homeHero, aboutData, menuItemsList, newsData } from './cms-data';

export interface CmsDataSchema {
  restaurantInfo: typeof restaurantInfo;
  homeHero: typeof homeHero;
  aboutData: typeof aboutData;
  menuItemsList: typeof menuItemsList;
  newsData: typeof newsData;
}

export const initialCmsData: CmsDataSchema = {
  restaurantInfo,
  homeHero,
  aboutData,
  menuItemsList,
  newsData
};
