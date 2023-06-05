<template>
    <div class="notif-item-wrapper">
        <div style="flex-grow: 1">
            <div style="font-weight: bold;">{{ notification.title }}</div>
            <div>{{ notification.text }}</div>
        </div>
        <div v-if="!notification.seen" class="dot-wrapper">
            <div class="dot"></div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'NotificationItem',
    props: ['notification']
}
</script>

<style scoped>
.notif-item-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
}

.dot-wrapper {
    width: 10%;
    text-align: center;
    display: flex;
    justify-content: center;
}

.dot {
    background: var(--color-primary);
    border-radius: 100%;
    width: 10px;
    height: 10px;
}
</style>