// import search from 'core-js/library/fn/symbol/search';
import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from "./config.js"


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function(){
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    //0.update results view to mark selected result
    resultsView.update(model.pageForDisplay());
    bookmarksView.update(model.state.bookmarks);

    //1. loading the recipe data
    await model.loadRecipe(id);

    //2.render the recipe 
    recipeView.render(model.state.recipe);

    //test
    
    
  } catch (error) {
    recipeView.renderError(error);
  }
}

const controlSearchResults = async function(){ 
try {
  resultsView.renderSpinner();
  //1.get the query
  const query = searchView.getQuery();

  if(!query) return;
  //2.load the result
  await model.loadSearchResult(query);

  //3.render the result
  resultsView.render(model.pageForDisplay());

  paginationView.render(model.state.search);
 

  } catch (error) {
    resultsView.renderError(error);
  }

}

const controlPagination = function(goToPage){
  try {
   //render the new result
   resultsView.render(model.pageForDisplay(goToPage));

   paginationView.render(model.state.search);

  } catch (error) {
   paginationView.renderError(error);
  }
}

const controlServings = function(newServings){
  //update the recipe servings(in state)
  model.updateServings(newServings);
  //update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  //1.add or remove a bookmark
  if(!model.state.recipe.bookmarked) 
    model.addBookmark(model.state.recipe);
  else 
    model.deleteBookmark(model.state.recipe.id);
   
  
  //2.update recipe view
  recipeView.update(model.state.recipe);

  //3.render the bookmark
  bookmarksView.render(model.state.bookmarks);

  //reset bookmark
  if(model.state.bookmarks.length === 0)
  bookmarksView.reset();
}

const controlBookmark = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try {

    //show loading spinner
    addRecipeView.renderSpinner();
    //upload the recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render the recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //render the bookmarks
    bookmarksView.render(model.state.bookmarks);

    //changeId in the url
    window.history.pushState(null,'',`#${model.state.recipe.id}`);
    

    //close form window
    setTimeout(function(){
      // addRecipeView._toggleWindow();
    },MODAL_CLOSE_SEC*1000)
   

  } catch (error) {
    addRecipeView.renderError(error);
  }
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmark);
  searchView.addHandlerRender(controlSearchResults);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandleUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerRender(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();








