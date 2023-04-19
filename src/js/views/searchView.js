import icons from '../../img/icons.svg';
import Views from './Views';

class searchView extends Views{
    _parentElemnt = document.querySelector('.search');

    getQuery(){
        const query = document.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    addHandlerRender(handler){
        this._parentElemnt.addEventListener('submit',function(e){
            e.preventDefault();
            handler();
        });
    }  

    #clearInput(){
        this._parentElemnt.querySelector('.search__field').value = '';
    }
}

export default new searchView();

