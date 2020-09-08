var app = new Vue({
    el: '#app',
    data: {
        inMove: false,
        activeSection: 0,
        offsets: [],
    },
    mounted() {
        this.calculateSectionOffsets();
    },
    methods: {
        calculateSectionOffsets() {
            let sections = document.getElementsByTagName('section');
            let length = sections.length;

            for (let i = 0; i < length; i++) {
                let sectionOffset = sections[i].offsetTop;
                this.offsets.push(sectionOffset);
            }
        },
        scrollToSection(id, force = false) {
            if (this.inMove && !force) return false;

            this.activeSection = id;
            this.inMove = true;

            document.getElementsByTagName('section')[id].scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                this.inMove = false;
            }, 600);
        },

        handleMouseWheel: function (e) {
            console.log('hello3');
            if (e.wheelDelta < 100 && !this.isMove) {
                this.moveUp();
            } else if (e.wheelDelta > 100 && !this.isMove) {
                this.moveDown();
            }
            e.preventDefault();
            return false;
        },

        moveDown() {
            this.inMove = true;
            this.activeSection--;

            if (this.activeSection < 0) this.activeSection = this.offsets.length - 1;
            this.scrollToSection(this.activeSection, true);
        },
        moveUp() {
            console.log('hello5');
            this.inMove = true;
            this.activeSection++;

            if (this.activeSection > this.offsets.length - 1) this.activeSection = 0;
            this.scrollToSection(this.activeSection, true);
        }

    },
    created() {
        window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM);
        window.addEventListener('mousewheel', this.handleMouseWheel, {
            passive: false
        });

        // // For mobile
        // window.addEventListener('touchstart', this.touchStart, {
        //     passive: false
        // });
        // window.addEventListener('touchmove', this.touchMove, {
        //     passive: false
        // });
    },
    destroyed() {
        window.removeEventListener('DOMMouseScroll', this.handleMouseWheelDOM, {
            passive: false
        });
        window.removeEventListener('mousewheel', this.handleMouseWheel);

        // // For mobile
        // window.removeEventListener('touchstart', this.touchStart);
        // window.removeEventListener('touchmove', this.touchMove);
    },
});

var nav = new Vue({
    el: "#nav",
    data: {
        navs: ['ONLINE STORE', 'OUR STORY', 'LOOKBOOK', 'COMMUNITY'],
        subNavs: [
            ['ALL', 'CROP SLIM', 'CROP STRAIGHT', 'REGULAR STRAIGHT', 'BOOTS CUT', 'LOOSE TAPERED', 'WIDE STRAIGHT', 'NEW STRAIGHT', 'JAPANESE DENIM', 'OUTER/INNER', 'ACC/OTHER'],
            ['SUB_MENU1'],
            ['SUB_MENU1', 'SUB_MENU2'],
            ['NEWS/EVENT', 'FAQ', 'REVIEW', 'Q&A'],
        ],
    },
    methods: {
        toggleSubMenu: function (index) {
            target_sub_menu = document.getElementsByClassName('sub_menu_' + index);
            // All SubMenu
            sub_menu = document.getElementsByClassName('sub-menu');
            for (let i = 0; i < sub_menu.length; i++) {
                if (sub_menu[i].classList.contains('sub_menu_' + index)) {
                    continue;
                }
                if (!sub_menu[i].classList.contains('toggleOff')) {
                    sub_menu[i].classList.add('toggleOff');
                }
            }
            // target SubMenu
            for (let i = 0; i < target_sub_menu.length; i++) {
                target_sub_menu[i].classList.toggle('toggleOff');
            }
        }
    },
})