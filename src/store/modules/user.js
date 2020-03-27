export default {
  state: {
    users: [],
    authUser: null
  },
  getters: {
    user: state => ({ email }) =>
      state.users ? state.users.find(user => user.email === email) : null,
    authUser: state => state.authUser,
    nickname: state => (state.authUser ? state.authUser.displayName : null)
  },
  mutations: {
    setAuthUser(state, { user }) {
      state.authUser = user;
    },
    setUsers(state, { users }) {
      state.users = users;
    }
  },
  actions: {
    authorize(store, { user }) {
      store.commit("setAuthUser", {
        user
      });
    },
    async updateUserProfile(store, { user }) {
      await store.state.authUser
        .updateProfile({
          ...user
        })
        .then(() => {
          store.commit("setAuthUser", {
            user
          });
        });
    },
    onceUsersAreLoaded(store, { users }) {
      store.commit("setUsers", { users });
    }
  }
};
