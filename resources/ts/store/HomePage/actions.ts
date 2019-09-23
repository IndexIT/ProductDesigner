import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import agent from "../../agent";
import { errorSnack } from "../SnackController/actions";
import {
    HOME_PAGE_ANIMALS_LOADED,
    HOME_PAGE_CHANGE_FORM_MODE,
    HOME_PAGE_DATA_LOADED,
    HomePageForms,
    IAnimal,
    IChangeForm,
    ICollection,
    IHomeCategoriesLoaded,
    IProduct,
} from "./types";

export const loadedCategories = (
    featuredCollections: ICollection[],
    recommended: IProduct[],
    staffPicks: IProduct[],
    trendingCollections: ICollection[]
): IHomeCategoriesLoaded => ({
    featuredCollections,
    recommended,
    staffPicks,
    trendingCollections,
    type: HOME_PAGE_DATA_LOADED
});

export const changeForm = (form: HomePageForms): IChangeForm => ({
    form,
    type: HOME_PAGE_CHANGE_FORM_MODE
});

export const fetchCategories = (): ThunkAction<
    Promise<void>,
    {},
    {},
    AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    agent.homePage
        .categories()
        .then(
            ({
                recommended,
                featured_collections,
                trending_collections,
                staff_picks,
                success,
                message
            }) => {
                if (
                    success &&
                    recommended &&
                    featured_collections &&
                    trending_collections &&
                    staff_picks
                ) {
                    dispatch(
                        loadedCategories(
                            featured_collections,
                            recommended,
                            staff_picks,
                            trending_collections
                        )
                    );
                } else if (message) {
                    console.error(message);
                }
            }
        );
};


export const loadedAnimals =(animals:IAnimal[]) =>({
    animals,
    type: HOME_PAGE_ANIMALS_LOADED,
});

export const fetchAnimals = (keyword:string): ThunkAction<
Promise<void>,
{},
{},
AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    agent.homePage.animals(keyword).then(({success,message,animals})=>{
        if(success&&animals){
            dispatch(loadedAnimals(animals));
        }  else if(message){
            dispatch(errorSnack(message));
        }
    });
};

export const hideAnimals = (): ThunkAction<
Promise<void>,
{},
{},
AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loadedAnimals([]));
};