<div id="app">
    <div class="sections-menu">
        <span class="menu-point" v-bind:class="{active: activeSection == index}" v-on:click="scrollToSection(index)" v-for="(offset,index) in offsets" v-bind:key="index">
        </span>
    </div>
    <section class="fullpage" v-for='i in 3' :style="{backgroundImage: 'url('+'/public/img/main_0'+i+'.jpg)'}">
    </section>
    <section class="fullpage footer">
        <?php
        include __DIR__ . '/footer.php';
        ?>
    </section>

</div>

<script src="/public/js/index.js"></script>