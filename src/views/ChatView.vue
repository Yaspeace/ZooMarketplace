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
                :room-info-enabled="false"
                :text-messages="JSON.stringify({LAST_SEEN: 'последний раз был(а) в сети '})"
                show-emojis="false"
                show-audio="false"
                show-reaction-emojis="false"
                show-search="false"
                show-add-room="false"
                :menu-actions="JSON.stringify([
                    {name: 'openAd', title: 'Перейти к объявлению'},
                    {name: 'denotify', title: 'Убрать уведомления'},
                    {name: 'complain', title: 'Пожаловаться на собеседника'}])"
                @send-message="msgSend($event.detail[0])"
                @delete-message="msgDel($event.detail[0].message)"
                @fetch-messages="fetchMessages($event.detail[0])"
                @fetch-more-rooms="getChats"
                @menu-action-handler="menuActionHandler($event.detail[0])"
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
                :room-id="chatId"
            />
        </div>
    </div>
</template>

<script>
import DefaultHat from '@/components/DefaultHat.vue';
import {register} from 'vue-advanced-chat';
import {append, appendFront} from '@/js/arrays.js';
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
            rooms: [],
            messages: [],
            chats: [],
            maxMsgId: 0,
            messagesPerPage: 20,
            curPage: 0,
            curRoom: 0,
        }
    },
    created() {
        this.getChats();
    },
    methods: {
        msgSend(payload) {
            this.$http.post(`/api/Chat/Messages/${payload.roomId}?content=${payload.content}`)
            .then((resp) => {
                const msg = resp.data.object;
                if(msg.id > this.maxMsgId) this.maxMsgId = msg.id;
                let mappedMsg = this.mapMessage(payload.roomId, msg);
                this.messages = append(this.messages, mappedMsg);

                this.setLastMessage(payload.roomId, mappedMsg);
            })
            .catch((err) => console.log(err));
        },
        msgDel(message) {
            this.$http.delete('/api/Chat/Messages/' + message._id)
            .then(() => this.messages = this.messages.filter((x) => x._id != message._id))
            .catch((err) => console.log(err));
        },
        getChats() {
            this.roomsLoaded = false;
            this.$http.get('/api/Chats')
            .then((resp) => {
                this.chats = resp.data.results;
                this.rooms = append(this.rooms, resp.data.results.map(this.mapChat));
            })
            .catch((err) => console.log(err))
            .finally(() => this.roomsLoaded = true);
        },
        async fetchMessages({room, options = {}}) {
            this.curRoom = room.roomId;
            if(!room.roomId || room.roomId <= 0) {
                return;
            }

            this.msgLoaded = false;

            if(options.reset) {
                this.messages = [];
            }

            const take = this.messagesPerPage;
            const skip = this.curPage * this.messagesPerPage;
            let messages = (await this.$http.get(
                '/api/Chat/Messages', { params: { chat: room.roomId, limit: take, start: skip } })).data.results
                .map((x) => this.mapMessage(room.roomId, x));

            if(messages && messages.length) {
                messages.forEach((x) => {
                    if(this.maxMsgId < x._id) this.maxMsgId = x._id;
                });
                this.messages = appendFront(this.messages, messages);
                this.seeMessages(messages);
                this.curPage++;
            }

            if(!messages || messages.length < take) {
                this.msgLoaded = true;
            }

            if (!this.isGotMessages) setTimeout(() => this.checkMessages(room.roomId), 10000);
            this.isGotMessages = true;
        },
        async checkMessages(roomId) {
            if(!this.curRoom || this.curRoom != roomId) return;

            try {
                let messages = (await this.$http.get(
                    '/api/Chat/Messages', { params: { chat: roomId, limit: 10, start: 0 } })).data.results
                    .map((x) => this.mapMessage(roomId, x));
                
                let msgToAdd = messages.filter((x) => x._id > this.maxMsgId);
                if(msgToAdd.length > 0) {
                    this.messages = append(this.messages, msgToAdd);
                    this.seeMessages(msgToAdd);
                    msgToAdd.forEach((x) => {
                        if(this.maxMsgId < x._id) {
                            this.maxMsgId = x._id;
                            this.setLastMessage(roomId, x);
                        }
                    });
                };

                setTimeout(() => this.checkMessages(roomId), 10000);
            }
            catch (err) {
                console.log(err);
            }
        },
        mapChat(chat) {
            const acc = chat.accounts.find((x) => x.id != this.$store.state.aid);
            return {
                roomId: chat.id.toString(),
                roomName: this.getUsername(acc, chat),
                avatar: 'https://myshmarket.site' + chat.card.mainImage.imageObj.route, //acc?.avatar?.route,
                users: chat.accounts.map(this.mapUser),
                lastMessage: this.mapMessage(chat.id, chat.lastMessage)
            }
        },
        mapUser(account) {
            return {
                _id: account.id.toString(),
                username: account.family + ' ' + account.name,
                avatar: 'https://myshmarket.site' + account.avatar.route,
                status: null,
            }
        },
        mapMessage(chatId, msg) {
            if(!msg) return null;

            const msgDate = new Date(msg.date);
            const chat = this.chats.find((x) => x.id == chatId);
            const u = chat.accounts.find((x) => x.id == msg.sender);
            return {
                _id: msg.id.toString(),
                content: msg.content,
                senderId: msg.sender.toString(),
                date: msgDate.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                timestamp: `${msgDate.getHours()}:${msgDate.getMinutes()}`,
                username: '',
                avatar: 'https://myshmarket.site' + u.avatar.route,
                distributed: true,
                seen: msg.seen == '1',
            }
        },
        getUsername(user, chat) {
            if(!user) {
                return '?';
            } else {
                return user.family + ' ' + user.name + ', ' + chat.card.title;
            }
        },
        seeMessages(messages) {
            messages = messages.filter((x) => Number(x.senderId) != this.$store.state.aid && !x.seen);
            messages.forEach((msg) => {
                this.$http.put('/api/Chat/Messages/' + msg._id, {seen: true})
                .catch((err) => console.log(err));
            })
        },
        setLastMessage(roomId, lastMessage) {
            let room = this.rooms.find((x) => x.roomId == roomId);
            if(!room) return;

            room.lastMessage = lastMessage;
            this.rooms = appendFront(this.rooms.filter((x) => x.roomId != room.roomId), room);
        },
        menuActionHandler({roomId, action}) {
            switch(action.name) {
                case 'denotify':
                    console.log('Убрать уведомления! ' + roomId);
                    break;
                case 'complain':
                    console.log('Жалоба! ' + roomId);
                    break;
                case 'openAd':
                    const adId = this.chats.find((x) => x.id == roomId).ad;
                    this.$router.push('/ad-view/' + adId);
                    break;
            }
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