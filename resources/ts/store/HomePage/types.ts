import { IResponse } from "../../mainTypes";

export const HOME_PAGE_CHANGE_FORM_MODE = "HOME_PAGE_CHANGE_FORM_MODE";
export const HOME_PAGE_DATA_LOADED = "HOME_PAGE_DATA_LOADED";
export const HOME_PAGE_ANIMALS_LOADED = "HOME_PAGE_ANIMALS_LOADED";

export interface IProduct {
    id: number;
    name: string;
    vendorName?: string;
    image: string;
}

export interface ICollection extends IProduct {
    products?: IProduct[];
}

export type HomePageForms = "login" | "signup";

export interface IAnimal {
    id: number;
    name: string;
    image: string;
}

export interface IHomePageState {
    form: HomePageForms;
    recommended: IProduct[];
    staffPicks: IProduct[];
    featuredCollections: ICollection[];
    trendingCollections: ICollection[];
    animals: IAnimal[];
}

export interface IHomeCategoriesResponse extends IResponse {
    recommended?: IProduct[];
    staff_picks?: IProduct[];
    featured_collections?: ICollection[];
    trending_collections?: ICollection[];
}

export interface IAnimalResponse extends IResponse {
    animals?: IAnimal[];
}

export interface IHomeCategoriesLoaded {
    type: typeof HOME_PAGE_DATA_LOADED;
    recommended: IProduct[];
    staffPicks: IProduct[];
    featuredCollections: ICollection[];
    trendingCollections: ICollection[];
}

export interface IChangeForm {
    type: typeof HOME_PAGE_CHANGE_FORM_MODE;
    form: HomePageForms;
}

export interface ILoadedAnimals {
    type: typeof HOME_PAGE_ANIMALS_LOADED;
    animals: IAnimal[];
}

export type HomePageActions = IChangeForm | IHomeCategoriesLoaded | ILoadedAnimals;
