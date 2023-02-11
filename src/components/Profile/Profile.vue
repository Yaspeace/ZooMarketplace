<template>
<div class="profile shadow">
    <img :src="image" class="acc-image" />
    <div class="acc-name">
        {{ account.name }} {{ account.family }}
    </div>
    <div>
        Основной телефон:
    </div>
    <div class="acc-phone">
        {{ account.phone }}
    </div>
    <div>
        <a href="#">
            Добавить способ связи...
        </a>
    </div>
    <div>
        Рейтинг: {{ account.rate }}
    </div>
</div>
</template>

<script>
export default {
    name: "Profile",
    props: ["account"],
    data() {
        return {
            image: require("../../assets/staticimages/image1.jpg"),
        }
    },
    created() {
        this.$http.get('/api/Images/' + this.account.image)
            .then((resp) => {
                this.image = 'https://' + resp.data.results[0].host + resp.data.results[0].route
            })
            .catch((err) => console.log(err));
    }
}
</script>

<style scoped>
.profile {
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 20px;
    background-color: #b2b6d2;
}

.acc-image {
    border: 7px solid #d2dbed;
    object-fit: cover;
    width: 100%;
    box-sizing: border-box;
}

.acc-name {
    font-weight: bold;
    font-size: 30px;
}

.acc-phone {
    font-weight: bold;
    font-size: 24px;
}
</style>