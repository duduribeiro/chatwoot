/* global axios */
import endPoints from './endPoints';

export default {
  getLabels() {
    const urlData = endPoints('fetchLabels');
    return axios.get(urlData.url);
  },

  listInboxAgents(id) {
    const urlData = endPoints('inbox').agents.get(id);
    return axios.get(urlData.url);
  },

  updateInboxAgents(inboxId, agentList) {
    const urlData = endPoints('inbox').agents.post();
    return axios.post(urlData.url, {
      user_ids: agentList,
      inbox_id: inboxId,
    });
  },
};
