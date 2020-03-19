export default {
  state: {
    authUser: null
  },
  getters: {
    authUser: state => state.authUser,
    nickname: state => (state.authUser ? state.authUser.displayName : null)
  },
  mutations: {
    setAuthUser(state, { user }) {
      state.authUser = user;
    }
  },
  actions: {
    authorize(store, { user }) {
      store.commit("setAuthUser", {
        user
      });
    },
    updateUserProfile(store, { user }) {
      store.state.authUser
        .updateProfile({
          ...user
        })
        .then(() => {
          store.commit("setAuthUser", {
            user
          });
        });
    }
  }
};
