<template>
  <div class="chat-item">
    <img :src="avatar" class="avatar" />
    <div class="last-message">{{ lastMessage }}</div>
    <div class="unread">{{ unreadCount }}</div>
  </div>
</template>

<script>
export default {
    props: {
        avatar: String,
        lastMessage: String,
        unreadCount: Number
    }
}
</script>

<style scoped>
.chat-item {
    display: flex;
    align-items: center;
    padding: 5px 10px 5px 10px;
    gap: 15px;
}

.avatar {
    border-radius: 100%;
    object-fit: cover;
    height: 90%;
    aspect-ratio: 1/1;
}

.last-message {
    flex-grow: 1;
}

.unread {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-primary-dark);
    color: white;
    border-radius: 100%;
    padding: 2px;
    width: 1.5em;
    height: 1.5em;
    text-overflow: ellipsis;
}
</style>