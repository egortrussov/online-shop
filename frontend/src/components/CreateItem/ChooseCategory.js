import React, { Component } from 'react'
import { AuthContext } from '../../contexts/AuthContext';

export default class ChooseCategory extends Component {

    state = {
        categories: [],
        isLoading: true
    }

    init() {
        var x, i, selElmnt, a, b, c;
        x = document.getElementsByClassName('custom-select');
        let values = [5 * 60, 10 * 60, 20 * 60, 30 * 60, 1 * 60 * 60, 1.5 * 60 * 60];
        const { categories } = this.state;

        const setst = (j) => {
        }

        const setSearchType = (typeId) => {
            console.log(categories, typeId)
            this.props.setCurrentCategory(categories[typeId - 1]);
        }

        const props = this.props;

        for (i = 0; i < x.length; i++) {
            selElmnt = x[i].getElementsByTagName('select')[0];
            /* For each element, create a new DIV that will act as the selected item: */
            a = document.createElement('DIV');
            a.setAttribute('class', 'select-selected');
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /* For each element, create a new DIV that will contain the option list: */
            b = document.createElement('DIV');
            b.setAttribute('class', 'select-items select-hide');
            for (let j = 1; j < selElmnt.length; j++) {
                /* For each option in the original select element,
            create a new DIV that will act as an option item: */
                c = document.createElement('DIV');
                c.innerHTML = selElmnt.options[j].innerHTML;
                
                c.addEventListener('click', function(e) {
                    /* When an item is clicked, update the original select box,
                and the selected item: */
                    
                    var y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName('select')[0];
                    h = this.parentNode.previousSibling;
                    // this.setState({
                    //     ...this.state,
                    //     timeLimit: timeValues[j - 1]
                    // })
                    
                    
                    for (i = 0; i < s.length; i++) {
                        console.log(s.options[i].innerHTML.toLowerCase())
                        if (s.options[i].innerHTML === this.innerHTML || s.options[i].innerHTML.toLowerCase() === props.currentSearchType) {
                            s.selectedIndex = i;

                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName(
                                'same-as-selected'
                            );
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute('class');
                            }
                            this.setAttribute('class', 'same-as-selected');
                            break;
                        }
                    }
                    h.click();

                    setst(j);
                    setSearchType(j)
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener('click', function(e) {
                /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle('select-hide');
                this.classList.toggle('select-arrow-active');
            });
        }

        function closeAllSelect(elmnt) {
            /* A function that will close all select boxes in the document,
        except the current select box: */
            var x,
                y,
                i,
                arrNo = [];
            x = document.getElementsByClassName('select-items');
            y = document.getElementsByClassName('select-selected');
            for (i = 0; i < y.length; i++) {
                if (elmnt === y[i]) {
                    arrNo.push(i);
                } else {
                    y[i].classList.remove('select-arrow-active');
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add('select-hide');
                }
            }
        }

        document.addEventListener('click', closeAllSelect);
    }

    static contextType = AuthContext;

    componentDidMount() {
        fetch(`${ this.context.proxy }/api/categories/allCategories`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    categories: res.categories
                })
                this.init()
            })
    }
    

    render() {
        const { isLoading, categories } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div className="search-type-block">
                <div className="custom-select" style={{ width: 300 + 'px' }}>
                    <select>
                        <option value="0">
                            Category...
                        </option>
                        {
                            categories.map((category, inx) => (
                                <option value={ inx + 1 }>
                                    { category.name }
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        )
    }
}
