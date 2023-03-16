<template>
<div class="footer">
        <div class="footer-center">
            Спасибо, что выбрали Мышь-маркет!
        </div>
        <div class="footer-upper">
            <div class="footer-left">
                <a :href="$http.defaults.baseURL + '/assets/publication_rules.pdf'" target="_blank"> Правила публикации и использования нашего сервиса. </a>
            </div>
            <div class="footer-right">
                <span class="text-lined">Возникли трудности? <br> Свяжитесь с нами:</span><br>
                <span class="text-yellow">mishmarket@mail.ru</span>
            </div>
        </div>
        <div class="footer-lower">
            Версия: 0.0.1 &#9400; LyaTiKrisaCompany
            2022-2023г
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomFooter"
}
</script>

<style scoped>
.footer {
    width: 100%;
    height: 300px;
    background:rgba(9, 0, 131, 0.548);
    z-index: 5;
    color: white;
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
}

.footer-center{
    padding: 15px;
    text-align: center;
    font-weight: bold;
    font-size: 22px;   
    color:white;
}

.footer-upper {
    display: flex;
    justify-content: space-between;
}

.footer-left {
    flex-grow: 1;
    max-width: 25%;
    font-weight: bold;
    font-size: 18px;
    text-decoration-line: underline;
    color:whitesmoke;
}

.footer-right {
    flex-grow: 1;
    max-width: 25%;
    text-align: right;
    font-weight: bold;
    font-size: 18px;
    color:whitesmoke;
}

.footer-lower {
    position: absolute;
    left: 10px;
    bottom: 20px;
    font-size: 12px;
    font-weight: bold;
    color: #f8b706;
}

.text-yellow{
    color: #f8b706;
}

.text-lined {
    text-decoration: underline;
}

a {
    text-decoration: none;
    color: inherit;
}

@media screen and (max-width: 700px) {
    .footer-left, .footer-right {
        max-width: 100%;
    }
}
@media screen and (max-width: 425px) {
    .footer-left, .footer-right {
        font-size: 14px;
    }
}
</style>