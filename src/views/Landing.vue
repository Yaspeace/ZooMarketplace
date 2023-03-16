<template>
    <div class="main-main-wrapper">
        <landing-modal v-if="subType != null" :subType="subType" class="modal-wnd" />
        <div v-if="subType != null" class="cover" @click="hideMore"></div>
        <Hat />

        <div class="content">
            <div class="landingdesign">
                <div class="landingdesign-smoke">
                    <h1>"Мышь-маркет" бизнес-аккаунты: расширенные возможности для продвижения объявлений; создание и публикация афиш</h1>
                    <h3>Если Вы являетесь зарегистрированным владельцем приюта, питомника или фермерского подворья и ищете новых владельцев своим животным, занимаетесь продажей и разведением домашних, с/х или экзотических животных, то бизнес-аккаунт позволит экономить время и деньги на услугах продвижения, предоставит доступ к удобным инструментам публикации, а также к созданию афиш тематических мероприятий и управлению ими (с возможностью рассылки пуш-уведомлений о событиях).</h3>
                    <div class="landing-qa">
                        <div class="landing-qa-text">
                            <h2>Как завести бизнес-аккаунт?</h2>
                            <ol>
                                <li>Выберите подходящую подписку (для первичного создания) и кликните "оформить".</li>
                                <li>Заполните необходимые данные для бизнес-аккаунта.</li>
                                <li>Пройдите верификацию по ИНН и оплатите подписку.</li>
                                <li>Готово! Теперь "Мышь маркет" будет заботиться о вашем бизнесе.</li>
                                <li>Если у Вас уже есть бизнес-аккаунт, но закончилась подписка или Вы хотите сменить подписку: зайдите в личный кабинет, перейдите в бизнес-аккаунт,&nbsp; кликните "оформить подписку", выберите нужную подписку и оплатите ее.</li>
                                <li>Чтобы отказаться от подписки, зайдите в личный кабинет, перейдите в бизнес-аккаунт и кликните &laquo;прекратить действие подписки&raquo;, &nbsp;чтобы отказаться от бизнес-аккаунта совсем, кликните &laquo;прекратить действие бизнес-аккаунта&raquo;, если подписка на тариф &laquo;полгода&raquo; или &laquo;год&raquo;, остаток средств вернется на Вашу карту.</li>
                            </ol>
                        </div>
                        <img src="@/assets/staticimages/landing1.jpg" class="landing-qa-img" />
                    </div>
                    
                    
                    <p class="landing-warn"><span class="text-warn">Внимание:</span> доступ к бизнес-аккаунту действует строго в сроки, указанные в условиях выбранной Вами подписки. По истечении срока действия Вам будут доступны только два действия над бизнес-аккаунтом: "оформить подписку" и "прекратить действие бизнес-аккаунта".</p>
                    
                    <div class="landing-qa">
                        <img src="@/assets/staticimages/landing2.jpg" class="landing-qa-img" />
                        <div class="landing-qa-text">
                            <h2>Как выбрать подходящую подписку?</h2>
                            <p style="font-weight: normal">Наши предложения ориентируются на потребности Вашего бизнеса в зависимости от направленности Вашей деятельности. Мы предлагаем Вам:</p>
                            <ol>
                                <li>Бесплатное сотрудничество. <a href="#row0">Подробнее здесь.</a></li>
                                <li>Предложения для владельцев фермерских подворий. <a href="#row1">Подробнее здесь.</a></li>
                                <li>Предложения для владельцев питомников. <a href="#row2">Подробнее здесь.</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="landing-warn">
                Не нашли ничего для себя? Напишите нам свои предложения (<a href="#">mishmarket@mail.ru</a>) и команда &laquo;Мышь-маркет&raquo; сделает шаг навстречу комфорту Вашего бизнеса.
            </div>

            <div v-for="(row, index) in rows" :key="index" class="landing-row" :id="'row' + index">
                <LandingCard v-for="sub in row" :key="sub.id" :subType="sub" :style="'width: ' + (100 / (row.length + 1))" @moreClick="more(sub)" />
            </div>
        </div>

        <CustomFooter />
        <div class="footer-img-wrapper">
            <img class="footer-img" src="@/assets/staticimages/footerimg.jpg"/>
        </div>
    </div>
</template>

<script>
import Hat from '@/components/Hat.vue';
import CustomFooter from '@/components/CustomFooter.vue';
import LandingCard from '@/components/LandingCard.vue';
import LandingModal from './LandingModal.vue';

export default {
    name: "Landing",
    components: {
        Hat,
        CustomFooter,
        LandingCard,
        LandingModal,
    },
    data() {
        return {
            rows: [],
            subType: null,
        }
    },
    created() {
        this.$http.get('/api/Subtypes')
            .then((resp) => {
                let rows = [];
                resp.data.results.forEach((item) => {
                    if(rows[item.line_num - 1] == null) rows[item.line_num - 1] = [];
                    rows[item.line_num - 1].push(item);
                });
                this.rows = rows;
            })
            .catch((err) => console.log(err));
    },
    methods: {
        more(sub) {
            console.log('more');
            this.subType = sub;
        },
        hideMore() {
            this.subType = null;
        }
    }
}
</script>

<style scoped>
.content {
    min-height: 110vh;
    padding-top: 215px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: var(--color-info);
}

.landing-qa {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10% 0px 10%;
    font-weight: bold;
}

.landing-qa-img {
    width: 25%;
    aspect-ratio: 1/1;
    border-radius: 100%;
    object-fit: cover;
}

@media screen and (max-width: 1050px) {
    .landing-qa {
        flex-direction: column-reverse;
        justify-content: flex-start;
        gap: 20px;
    }
    .landing-qa-img {
        width: 50%;
    }
}

.landing-qa-text {
    width: 55%;
    font-weight: bold;
    border-radius: 15px;
    background-color: var(--color-info-light);
    padding-left: 50px;
    padding-right: 50px;
    box-shadow: #80808047 6px 6px 20px 5px;
}

.landing-qa-text h2 {
    text-align: center;
}

@media screen and (max-width: 700px) {
    .landing-qa {
        padding: 0px;
    }
    .landing-qa-text {
        width: 100%;
    }
}

ol {
    margin: 0px;
    padding: 0px;
}

li {
    margin-bottom: 20px;
}

.landingdesign-smoke {
    padding: 0px 10% 0px 10%;
}

a {
    color: rgb(255, 82, 111);
}

.modal-wnd {
    position: fixed;
    width: 50%;
    height: 50%;
    z-index: 102;
    top: 25%;
    left: 25%;
}

.cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
    background-color: rgba(0, 0, 0, 0.555);
}

.text-warn {
    color: rgb(255, 82, 111);
}

.landing-warn {
    text-align: center;
    font-weight: bold;
    padding: 50px 0px 50px 0px;
}

.landing-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 30px;
    gap: 5%;
}

@media screen and (max-width: 600px) {
    .landing-row {
        flex-wrap: wrap;
    }
}

.footer-img-wrapper {
    width: 100%;
    height: 300px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: -1;
    text-align: center;
    background: black;
}

.footer-img {
    width: 50%;
    max-width: 600px;
    height: 100%;
}

@media screen and (max-width: 700px) {
  .footer-img {
    width: 100%;
  }
}
</style>