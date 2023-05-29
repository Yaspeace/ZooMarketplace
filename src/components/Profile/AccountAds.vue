<template>
  <!--<div>
    <div class="acc-ads-header">
        {{ header }}
    </div>
    <div class="tabs">
        <div :class="'tab' + (currentTab == 0 ? ' tab-current' : '')" @click="changeTab(0)">Активные</div>
        <div :class="'tab' + (currentTab == 1 ? ' tab-current' : '')" @click="changeTab(1)" v-if="isSelf">Архив</div>
        <div :class="'tab' + (currentTab == 2 ? ' tab-current' : '')" @click="changeTab(2)" v-if="isSelf">Продано</div>
    </div>
    <AdCardCarousel :ads="ads" :toShow="toShow" class="acc-ads-carousel" v-if="ads.length > 0" />
    <div v-else class="acc-no-ads">
        У {{isSelf ? 'вас' : 'пользователя'}} пока нет {{ currentTab == 0 ? 'активных' : currentTab == 1 ? 'архивных' : 'закрытых' }} объявлений! 
    </div>
  </div>-->
  <div>
    <card-tabs v-if="tabs.length > 0" :header="header" :tabs="tabs" />
  </div>
</template>

<script>
import { append } from '@/js/arrays';
import CardTabs from '../AdCards/CardTabs.vue';

export default {
    name: 'AccountAds',
    components: {
        CardTabs,
    },
    props: ['isSelf', 'accId'],
    data() {
        return {
            tabs: [],
        }
    },
    computed: {
        header: function() {
            return this.isSelf ? 'Мои объявления' : 'Объявления пользователя';
        }
    },
    created() {
        this.initAds();
    },
    methods: {
        async initAds() {
            this.tabs = [];
            try {
                const activeAds = await this.$http.get(`/api/Cards?account=${this.accId}&state=2`);
                this.tabs = append(this.tabs, {
                    name: 'Активные',
                    emptyStr: 'Нет активных объявлений!',
                    ads: activeAds.data.results
                });

                if(this.isSelf) {
                    const archiveAds1 = (await this.$http.get(`/api/Cards?account=${this.accId}&state=0`)).data.results;
                    const archiveAds2 = (await this.$http.get(`/api/Cards?account=${this.accId}&state=1`)).data.results;
                    const archiveAds3 = (await this.$http.get(`/api/Cards?account=${this.accId}&state=3`)).data.results;

                    this.tabs = append(this.tabs, {
                        name: 'Архив',
                        emptyStr: 'Нет архивных объявлений!',
                        ads: [...archiveAds1, ...archiveAds2, ...archiveAds3]
                    });

                    this.tabs = append(this.tabs, {
                        name: 'Продано',
                        emptyStr: 'Нет проданных объявлений!',
                        ads: (await this.$http.get(`/api/Cards?account=${this.accId}&state=4`)).data.results
                    })
                }

            } catch(err) {
                console.log(err);
            }
        }
    },
    watch: {
        accId: function() {
            this.initAds();
        }
    }
}
</script>