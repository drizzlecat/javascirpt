import { async } from 'regenerator-runtime';
import { API_URL, NUM_DIS , KEY} from './config.js';
import { AJAX} from './views/helper.js';

export const state = {
    recipe: {},

    search: {
        query: '',
        results: [],
        page:1,
        resultPerPage: NUM_DIS,
    },

    bookmarks:[],
}

const _creatRecipObject = function (data){
    let {recipe} = data.data;
     return{
        id: recipe.id,
        title:recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key}),
    };

}
export const loadRecipe = async function(id){
   //1. loading the recipe data
   try {
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    
        state.recipe = _creatRecipObject(data);

        if(state.bookmarks.some(recipe => recipe.id === id))
        state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
   } 
   catch (error) {
       throw error;
   }
    
}

export const loadSearchResult = async function(query){
    try {
        state.search.page = 1;

        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title:rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key}),
            }
        });

    } catch (error) {
        throw error;
    }
}

export const pageForDisplay = function(page = state.search.page){
    try {
      
       state.search.page = page;
       const start = (page-1)*state.search.resultPerPage;
       const end = page*state.search.resultPerPage;
       return state.search.results.slice(start,end);  
        
} catch (error) {
        throw error;
    }
}

export const updateServings = function(newServings){
    try {
        const scale = newServings/state.recipe.servings;
        state.recipe.ingredients.forEach(element => {
            element.quantity = element.quantity * scale;
        });
        state.recipe.servings = newServings;
    } catch (error) {
        throw error;
    }
}
const presistBookmarks = function(){
   localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe){
    //add bookmark
    state.bookmarks.push(recipe);

   //mark current recipe as bookmark
   if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

   presistBookmarks();
}

export const deleteBookmark = function(id){
    //delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index,1);

    //mark current recipe as not bookmark
   if(id === state.recipe.id) state.recipe.bookmarked = false;

   presistBookmarks();

}

const init = function(){
   const storage = localStorage.getItem('bookmarks');
   if(storage) state.bookmarks = JSON.parse(storage);
}

init();

const clearBookmarks = function(){
    localStorage.clear('bookmarks');
}

export const uploadRecipe = async function(newRecipe){
    try {
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
            const ingArr =  ing[1].split(',').map(ing => ing.trim());
            if(ingArr.length !==3) throw new Error('Wrong ingredient format! Please use the correct format!!!');
    
            const [quantity,unit,description] = ingArr
            return {quantity: quantity? +quantity: null,unit,description};
        })

        const recipe = {
            
            title:newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }

        console.log('recipe is here',recipe);
        const data = await AJAX(`${API_URL}/?key=${KEY}`,recipe);
        state.recipe = _creatRecipObject(data);
        addBookmark(state.recipe);

    } catch (error) {
        throw error;
    }
}

