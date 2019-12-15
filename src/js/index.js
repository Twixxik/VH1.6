import "./import/modules";
import "./import/components";

const startTime = new Date().getTime();

const vh = {
    nav: {
        el: document.getElementsByClassName("vh-nav")[0],

        /**
         * Инициализация меню
         */
        init: function () {
            this.menu = this.el.getElementsByClassName("vh-nav__menu")[0];
            this.logo = this.el.getElementsByClassName("vh-nav__logo")[0];
            this.search = this.el.getElementsByClassName("vh-nav__search")[0];
            this.quick = this.el.getElementsByClassName("vh-nav__quick")[0];
            this.currentList = null;

            this.menu.addEventListener("click", (e) => this.toggle(e));
        },

        /**
         *
         */
        refresh: function() {
            this.new = this.el.cloneNode(true);
            this.el.parentNode.replaceChild(this.new, this.el);
            this.el = this.new;
            this.init()
        },

        /**
         * Тригер Меню - показать/скрыть меню
         * @param e Event
         */
        toggle: function (e) {
            if (e.target === this.menu) {
                if (this.el.classList.contains('active') && this.currentList !== this.menu.children[0]) {
                    setTimeout(()=>this.resetLists(), 160);
                } else {
                    this.currentList = this.menu.children[0];
                    this.currentList.scrollTop = 0;
                }
                this.el.classList.toggle("active");
                document.body.classList.toggle("no-scroll");
            } else if (e.target.className === 'vh-menu__next') {
                this.next(e);
            } else if (e.target.className === 'vh-menu__prev') {
                this.prev(e);
            }
        },

        /**
         * Возврат к предыдущему списку
         * @param e Event
         */
        prev: function (e) {
            this.currentList.classList.add('next');
            let prev = this.menu.getElementsByClassName('prev');
            if (prev.length > 1) {
                this.currentList = prev[1];
                this.currentList.classList.remove('prev');
            } else {
                this.currentList = prev[0];
                this.currentList.classList.remove('prev');
            }
        },

        /**
         * Переход к списку выбранного элемента
         * @param e Event
         */

        next: function (e) {
            this.currentList.classList.add('prev');
            this.currentList = e.target.nextElementSibling;
            this.currentList.classList.remove('next');
        },

        /**
         * Сброс меню до главного списка
         */
        resetLists: function () {
            this.menu.children[0].classList.remove('prev');
            for ( let list of this.menu.getElementsByClassName('vh-menu__sub')) {
                if (list.className !== 'vh-menu__sub next')
                list.className = 'vh-menu__sub next';
            }
        }
    }
};

// Инициализация меню
vh.nav.init();

// Итоговая нагрузка в мс
const initTime = new Date().getTime() - startTime;
document.getElementsByClassName('vh-main')[0].innerHTML = 'js init: ' + initTime + "ms";