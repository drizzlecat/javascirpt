import icons from '../../img/icons.svg';

export default class Views{
    _data;
    /**
     * Render the recive object to the DOM
     * @param {Object | Object[]} data The data to be rendered
     * @param {boolean} [render=true] if false,create markup string instead of rendering to the DOM  
     * @returns {undefined | string} A markup string is returned if render =false
     */

    render(data,render = true){
        if(!data || (Array.isArray(data) && data.length === 0)) return;

        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;
        
        this._clear();
        this._parentElemnt.insertAdjacentHTML('beforeend',markup);     
      }

    update(data){
      if(!data || (Array.isArray(data) && data.length === 0)) return;

      this._data = data;
      const newMarkup = this._generateMarkup();
      
      const newDom = document.createRange().createContextualFragment(newMarkup);
      // console.log('newDom',newDom);
      const newElement = Array.from(newDom.querySelectorAll('*'));
      const curElement = Array.from(this._parentElemnt.querySelectorAll('*'));
      // console.log('curElement',curElement);

      curElement.forEach((curEl,i)=>{
        const newEl = newElement[i];

      
        // if(!curEl.isEqualNode(newEl)){
        //   console.log('curEl',curEl);
        //   console.log('newEl',newEl);
        //   console.log('firstchild cur',curEl.firstChild);
        //   console.log('firstchild new',newEl.firstChild);
        //   console.log('nodeValue',curEl.firstChild?.nodeValue.trim());
        //   console.log('nodeValue, new ', newEl.firstChild?.nodeValue.trim());
        // }
        

         //update the text
        if(!curEl.isEqualNode(newEl) && curEl.firstChild?.nodeValue.trim() !== '' ){
         // console.log('update the textcontent');
          curEl.textContent = newEl.textContent;
        }
        

        //upadate the attribute
        if(!curEl.isEqualNode(newEl)){
          // console.log('update the attribute');
          Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name,attr.value));
        }
  

      })

    }
    
      renderSpinner(){
            const markup = 
            `    
              <div class="spinner">
                <svg>
                  <use href="${icons}_icon-loader"></use>
                </svg>
              </div> 
            `;
            this._clear();
            this._parentElemnt.insertAdjacentHTML('afterbegin',markup);
      }
      
      renderMessage(message = this._message){
        const markup = 
        `
        <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElemnt.insertAdjacentHTML('afterbegin',markup);
    }
    
      renderError(message = this._errorMessage){
          const markup = 
          `
          <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
          `;
          this._clear();
          this._parentElemnt.insertAdjacentHTML('afterbegin',markup);
      }
      
      _clear(){
        this._parentElemnt.innerHTML = '';
      }
}