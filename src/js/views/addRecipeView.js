import Views from './Views';
import icons from '../../img/icons.svg';

class addRecipeView extends Views{
    _parentElemnt = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _btnUpload = document.querySelector('.upload__btn');
    _message = 'Recipe was successfully added';


    constructor(){
       super();
       this._addHandlerShowWindow();
       this._addHandlerCloseWindow();
    }
    _generateMarkup(){
    
    }

    _toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow(){
      this._btnOpen.addEventListener('click',this._toggleWindow.bind(this));
    }  

    _addHandlerCloseWindow(){
      this._btnClose.addEventListener('click',this._toggleWindow.bind(this));
      this._overlay.addEventListener('click',this._toggleWindow.bind(this));

    }

    addHandlerUpload(handler){
      this._parentElemnt.addEventListener('submit',function(e){
        e.preventDefault();
        const dataArr = [...new FormData(this)];
        const data = Object.fromEntries(dataArr);
        console.log('data is here',data);

        handler(data);

      })
    }
}

export default new addRecipeView();