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
        Рейтинг: {{ account.rate }}
    </div>
</div>
</template>

<script>
export default {
    name: "Profile",
    props: ["account", "isSelf"],
    data() {
        return {
            image: require("../../assets/staticimages/image1.jpg"),
        }
    },
    created() {
        this.image = 'https://myshmarket.site' + this.account.avatar.route;
    }
}
</script>

<style scoped>
.profile {
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #b2b6d2;
    box-sizing: border-box;
}

.acc-image {
    border: 7px solid #d2dbed;
    object-fit: cover;
    width: 100%;
    max-width: 300px;
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