import {
    HOME_PAGE_ANIMALS_LOADED,
    HOME_PAGE_CHANGE_FORM_MODE,
    HOME_PAGE_DATA_LOADED,
    HomePageActions,
    IHomePageState,
} from "./types";

const initialState:IHomePageState = {
    animals:[],
    featuredCollections: [],
    form: "login",
    recommended: [],
    staffPicks: [],
    trendingCollections: [],
};

export default (state=initialState,action:HomePageActions):IHomePageState=>{
    switch (action.type) {
        case HOME_PAGE_CHANGE_FORM_MODE:
            return {
                ...state,
                form: action.form
            };
        case HOME_PAGE_DATA_LOADED:
            return {
                ...state,
                featuredCollections: action.featuredCollections,
                recommended: action.recommended,
                staffPicks: action.staffPicks,
                trendingCollections: action.trendingCollections
            };
        case HOME_PAGE_ANIMALS_LOADED:
            return {
                ...state,
                animals: action.animals
            };
        default:
            return state;
    }
};