<template>
    <div class="content">
        <default-hat />

        <div class="chat-wrapper">
            <vue-advanced-chat v-if="isLoaded"
                class="chat-test"
                :current-user-id="$store.state.aid.toString()"
                :messages="JSON.stringify(messages)"
                :messages-loaded="msgLoaded"
                :rooms="JSON.stringify(rooms)"
                :rooms-loaded="roomsLoaded"
                :room-info-enabled="true"
                :text-messages="JSON.stringify({LAST_SEEN: 'последний раз был(а) в сети '})"
                show-emojis="false"
                show-audio="false"
                show-reaction-emojis="false"
                show-search="false"
                show-add-room="false"
                :menu-actions="JSON.stringify([
                    {name: 'f1', title: 'Убрать уведомления'},
                    {name: 'f2', title: 'Пожаловаться на собеседника'}])"
                @send-message="msgSend($event.detail[0])"
                @delete-message="msgDel($event.detail[0].message)"
                @fetch-messages="fetch()"
                :styles="JSON.stringify({
                    header: {
                        background: 'var(--color-info)'
                    },
                    content: {
                        background: 'var(--secondary-grad)'
                    },
                    footer: {
                        background: 'var(--color-info-semilight)'
                    }
                })"
                room-id="2"
            />
        </div>
    </div>
</template>

<script>
import DefaultHat from '@/components/DefaultHat.vue';
import {register} from 'vue-advanced-chat';
register();

export default {
    name: 'ChatView',
    props: {
        chatId: {
            type: Number | String,
            default: 0
        }
    },
    components: {
        DefaultHat,
    },
    data() {
        return {
            id: this.chatId instanceof String ? Number(this.chatId) : this.chatId,
            isLoaded: true,
            msgLoaded: false,
            roomsLoaded: false,
            rooms: [
                {
                    roomId: '1',
                    roomName: 'Терентьев Михаил',
                    avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png',
                    users: [],
                    lastMessage: {
                        content: 'Котика ещё продаёте?',
                        senderId: 1234,
                        username: 'John Doe',
                        timestamp: '13:53',
                        saved: true,
                        distributed: false,
                        seen: false,
                        new: true
                    },
                    unreadCount: 1,
                },
                {
                    roomId: '2',
                    roomName: 'Измаилова Людмила',
                    avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png',
                    users: [],
                    lastMessage: {
                        content: 'Добрый день!',
                        senderId: 1234,
                        username: 'John Doe',
                        timestamp: '11:24',
                        saved: true,
                        distributed: false,
                        seen: true,
                        new: false
                    },
                },
                {
                    roomId: '3',
                    roomName: 'Петров Анатолий',
                    avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png',
                    users: [],
                    lastMessage: {
                        content: 'А он у вас не кусается???',
                        senderId: 1234,
                        username: 'John Doe',
                        timestamp: '10:20',
                        saved: true,
                        distributed: false,
                        seen: false,
                        new: true
                    },
                }
            ],
            messages: []
        }
    },
    created() {
        setTimeout(() => this.roomsLoaded = true, 1000);
    },
    methods: {
        msgSend(msg) {
            console.log('sended ' + msg.content);
        },
        msgDel() {
            console.log('deleted');
        },
        fetch() {
            setTimeout(() => {
                this.messages = [
                    {
                        _id: '5612',
                        content: 'Добрый день!',
                        senderId: '2',
                        timestamp: '11:24',
                        date: (new Date()).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                        username: '',
                        avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png'
                    }
                ];
                this.msgLoaded = true;
            });
        }
    }
}
</script>

<style scoped>
.content {
    background: var(--color-secondary);
    min-height: 100vh;
}
.chat-wrapper {
    padding: 250px 5% 0 5%;
}
</style>