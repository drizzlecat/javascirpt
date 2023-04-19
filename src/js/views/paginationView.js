import Views from './Views';
import icons from '../../img/icons.svg';

class paginationView extends Views{
    _parentElemnt = document.querySelector('.pagination');
   

    _generateMarkup(){
      const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);
      const curPag = this._data.page;
      console.log(`curpage ${curPag}`);
     
      //1.the first page, no other page 
      if(curPag === 1 && numPages === 1)
      return;
      //2.the first page with other page
      if(curPag === 1 && numPages > 1)
      return `
      <button data-goto = "${curPag+1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPag+1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
      `;
      //3.the last page
      if(curPag === numPages)
      return`
      <button data-goto = "${curPag-1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPag-1}</span>
      </button>
      `;
      //4.other page
      if(1< curPag < numPages )
      return`
      <button data-goto = "${curPag-1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPag-1}</span>
      </button>
      <button data-goto = "${curPag+1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPag+1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    addHandlerRender(handler){
        this._parentElemnt.addEventListener('click',function(e){
            e.preventDefault();
            const btn = e.target.closest('.btn--inline');
           
            const goTo =  +btn.dataset.goto;
            console.log(`goto ${goTo}`);

            handler(goTo);
        });
    }  
}

export default new paginationView();
