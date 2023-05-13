<template>
  <div class="chats-wnd">
    <div class="header">
        Чаты
    </div>
    <div class="chat-list">
        <chat-short-item v-for="(chat, index) in chats" :key="index" class="chat-item" :avatar="chat.avatar" :last-message="chat.lastMessage" :unread-count="chat.unreadCount" />
    </div>
  </div>
</template>

<script>
import ChatShortItem from './ChatShortList/ChatShortItem.vue';

export default {
    name: 'ChatShortList',
    components: {
        ChatShortItem,
    },
    data() {
        return {
            chats: [
                {
                    avatar: 'https://myshmarket.site/assets/images/default_account.png',
                    lastMessage: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    unreadCount: 2
                }
            ]
        }
    },
}
</script>

<style scoped>
.header {
    text-align: center;
    font-weight: bold;
    padding: 0px 0px 10px 0px;
    box-sizing: border-box;
}
.chats-wnd {
    border-radius: 14px;
    background: var(--color-info);
    padding: 10px;
}

.chat-list {
    max-height: 80%;
    overflow: scroll;
    overflow-x: hidden;
}

.chat-item {
    height: 50px;
}
</style>