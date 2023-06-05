<template>
    <div class="notif-wrapper">
        <notification-item v-for="notification in notifications" :key="notification.id" :notification="notification" class="notif-item" />
    </div>
</template>

<script>
import NotificationItem from './NotificationItem.vue'

export default {
    name: 'Notifications',
    components: {
        NotificationItem
    },
    data() {
        return {
            notifications: [
                {
                    id: 1,
                    title: 'Тест уведомления',
                    text: 'Какое-то описание!',
                    seen: true
                },
                {
                    id: 2,
                    title: 'Ещё одно уведомление!',
                    text: 'Заберите свои призы!',
                    seen: false
                }
            ]
        }
    }
}
</script>

<style>
.notif-wrapper {
    background: #d2dbed;
    border-radius: 14px;
    border-top-left-radius: 0;
}

.notif-item {
    border-bottom: 1px solid grey;
    cursor: pointer;
    transition: .3s;
    width: 100%;
}

.notif-item:hover {
    background: #979ead;
}

.notif-item:first-child {
    border-top-right-radius: 14px;
}

.notif-item:last-child {
    border-bottom: none;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
}
</style>