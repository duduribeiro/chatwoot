import * as MutationHelpers from 'shared/helpers/vuex/mutationHelpers';
import * as types from '../mutation-types';
import InboxesAPI from '../../api/inboxes';
import WebChannel from '../../api/channel/webChannel';
import FBChannel from '../../api/channel/fbChannel';

export const state = {
  records: [],
  uiFlags: {
    isFetching: false,
    isFetchingItem: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },
};

export const getters = {
  getInboxes($state) {
    return $state.records;
  },
  getInbox: $state => inboxId => {
    const [inbox] = $state.records.filter(
      record => record.id === Number(inboxId)
    );
    return inbox || {};
  },
  getUIFlags($state) {
    return $state.uiFlags;
  },
};

export const actions = {
  get: async ({ commit }) => {
    commit(types.default.SET_INBOXES_UI_FLAG, { isFetching: true });
    try {
      const response = await InboxesAPI.get();
      commit(types.default.SET_INBOXES_UI_FLAG, { isFetching: false });
      commit(types.default.SET_INBOXES, response.data.payload);
    } catch (error) {
      commit(types.default.SET_INBOXES_UI_FLAG, { isFetching: false });
    }
  },
  createWebsiteChannel: async ({ commit }, params) => {
    try {
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: true });
      const response = await WebChannel.create(params);
      commit(types.default.ADD_INBOXES, response.data);
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: false });
      return response.data;
    } catch (error) {
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: false });
      return {};
    }
  },
  createFBChannel: async ({ commit }, params) => {
    try {
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: true });
      const response = await FBChannel.create(params);
      commit(types.default.ADD_INBOXES, response.data);
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: false });
    } catch (error) {
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: false });
    }
  },
  updateWebsiteChannel: async ({ commit }, { id, ...inboxParams }) => {
    commit(types.default.SET_INBOXES_UI_FLAG, { isUpdating: true });
    try {
      const response = await WebChannel.update(id, inboxParams);
      commit(types.default.EDIT_INBOXES, response.data);
      commit(types.default.SET_INBOXES_UI_FLAG, { isUpdating: false });
    } catch (error) {
      commit(types.default.SET_INBOXES_UI_FLAG, { isUpdating: false });
      throw new Error(error);
    }
  },
  delete: async ({ commit }, inboxId) => {
    commit(types.default.SET_INBOXES_UI_FLAG, { isDeleting: true });
    try {
      await InboxesAPI.delete(inboxId);
      commit(types.default.DELETE_INBOXES, inboxId);
      commit(types.default.SET_INBOXES_UI_FLAG, { isDeleting: false });
    } catch (error) {
      commit(types.default.SET_INBOXES_UI_FLAG, { isDeleting: false });
      throw new Error(error);
    }
  },
};

export const mutations = {
  [types.default.SET_INBOXES_UI_FLAG]($state, uiFlag) {
    $state.uiFlags = { ...$state.uiFlags, ...uiFlag };
  },
  [types.default.SET_INBOXES]: MutationHelpers.set,
  [types.default.SET_INBOXES_ITEM]: MutationHelpers.setSingleRecord,
  [types.default.ADD_INBOXES]: MutationHelpers.create,
  [types.default.EDIT_INBOXES]: MutationHelpers.update,
  [types.default.DELETE_INBOXES]: MutationHelpers.destroy,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
