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
            console.log('hello1');
            let sections = document.getElementsByTagName('section');
            let length = sections.length;

            for (let i = 0; i < length; i++) {
                let sectionOffset = sections[i].offsetTop;
                this.offsets.push(sectionOffset);
            }
        },
        scrollToSection(id, force = false) {
            console.log('hello2');
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
            console.log('hello4');
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
    }
})