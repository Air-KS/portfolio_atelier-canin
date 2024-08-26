/*
  ./frontend/src/store/index.js
*/

import { createStore } from 'vuex';
import axios from 'axios';

function getUserFromLocalStorage() {
  try {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data from localStorage', error);
    return null;
  }
}

const store = createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: getUserFromLocalStorage(),
  },
  mutations: {
    setLoginState(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.user = payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  actions: {
    async login({ commit }, { user, token, role }) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      commit('setLoginState', { isLoggedIn: true, user: { ...user, token, role } });
      try {
        const response = await axios.get(`http://localhost:3000/api/user/profile/${user.id}`);
        const userInfo = response.data;
        commit('setLoginState', { isLoggedIn: true, user: { ...user, ...userInfo, token, role } });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    logout({ commit }) {
      commit('logout');
    },
    async checkLoginState({ commit }) {
      const token = localStorage.getItem('token');
      const user = getUserFromLocalStorage();
      const role = localStorage.getItem('role');
      if (token && user) {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/profile/${user.id}`);
          const userInfo = response.data;
          commit('setLoginState', { isLoggedIn: true, user: { ...user, ...userInfo, token, role } });
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      } else {
        commit('logout');
      }
    },
  },
});

export default store;
