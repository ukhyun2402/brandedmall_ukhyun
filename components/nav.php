<div id="nav">
    <ul>
        <li v-for="(item,index) in navs" @click="toggleSubMenu(index)">
            <span class='menu'>{{item}}</span>
            <ul>
                <li v-for="(sub_item, sub_index) in subNavs[index]" :class="['sub_menu_'+index]" class="toggleOff sub-menu">
                    {{sub_item}}
                </li>
            </ul>
        </li>
    </ul>
</div>