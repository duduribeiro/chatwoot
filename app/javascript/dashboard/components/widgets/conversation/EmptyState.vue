<template>
  <div class="columns full-height conv-empty-state">
    <woot-loading-state
      v-if="fetchingInboxes || loadingChatList"
      :message="loadingIndicatorMessage"
    />
    <!-- Show empty state images if not loading -->
    <div v-if="!fetchingInboxes && !loadingChatList" class="current-chat">
      <!-- No inboxes attached -->
      <div v-if="!inboxesList.length">
        <img src="~dashboard/assets/images/inboxes.svg" alt="No Inboxes" />
        <span v-if="isAdmin()">
          {{ $t('CONVERSATION.NO_INBOX_1') }}
          <br />
          <router-link :to="newInboxURL">
            {{ $t('CONVERSATION.CLICK_HERE') }}
          </router-link>
          {{ $t('CONVERSATION.NO_INBOX_2') }}
        </span>
        <span v-if="!isAdmin()">
          {{ $t('CONVERSATION.NO_INBOX_AGENT') }}
        </span>
      </div>
      <!-- No conversations available -->
      <div v-else-if="!allConversations.length">
        <img src="~dashboard/assets/images/chat.svg" alt="No Chat" />
        <span>
          {{ $t('CONVERSATION.NO_MESSAGE_1') }}
          <br />
        </span>
      </div>
      <!-- No conversation selected -->
      <div v-else-if="allConversations.length && currentChat.id === null">
        <img src="~dashboard/assets/images/chat.svg" alt="No Chat" />
        <span>{{ $t('CONVERSATION.404') }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import adminMixin from '../../../mixins/isAdmin';
import { frontendURL } from '../../../helper/URLHelper';

export default {
  mixins: [adminMixin],

  computed: {
    ...mapGetters({
      currentChat: 'getSelectedChat',
      allConversations: 'getAllConversations',
      inboxesList: 'getInboxesList',
      fetchingInboxes: 'getInboxLoadingStatus',
      loadingChatList: 'getChatListLoadingStatus',
    }),
    loadingIndicatorMessage() {
      if (this.fetchingInboxes) {
        return this.$t('CONVERSATION.LOADING_INBOXES');
      }
      return this.$t('CONVERSATION.LOADING_CONVERSATIONS');
    },
    newInboxURL() {
      return frontendURL('settings/inboxes/new');
    },
  },
};
</script>
