import icons from '../../img/icons.svg';
import preView from './preView';
import Views from './Views';

class resultsView extends Views{
    _parentElemnt = document.querySelector('.results');
    _errorMessage = 'We could not find the result, please try again';

    _generateMarkup(){
        return this._data.map(result => preView.render(result,false)).join('');
      }
    // _generateMarkup(){
    //     return this._data.map(result => {
    //     return `
    //     <li class="preview">
    //         <a class="preview__link ${window.location.hash.slice(1) === result.id ? 'preview__link--active' : ''}" href="#${result.id}">
    //         <figure class="preview__fig">
    //             <img src="${result.image}" alt="Test" />
    //         </figure>
    //         <div class="preview__data">
    //             <h4 class="preview__title">${result.title}</h4>
    //             <p class="preview__publisher">${result.publisher}</p>
                
    //         </div>
    //         </a>
    //     </li>
    //     `;
    //     }).join('');
    // }
}

export default new resultsView();