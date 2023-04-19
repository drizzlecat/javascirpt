import icons from '../../img/icons.svg';
import preView from './preView';
import Views from './Views';


class bookmarksView extends Views{
    _parentElemnt = document.querySelector('.bookmarks__list');
    _errorMessage = 'We could not find the bookmarks, please try again';

    _generateMarkup(){
      return this._data.map(result => preView.render(result,false)).join('');
    }

    addHandlerRender(handler){
      window.addEventListener('load',handler);
    }

    reset(){
        this._clear();
        const markup = 
        `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>
          No bookmarks yet. Find a nice recipe and bookmark it :)
        </p>
      </div>
        `;
        this._parentElemnt.insertAdjacentHTML('beforeend',markup);    
    }
}

export default new bookmarksView();