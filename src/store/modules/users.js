export default {
  state: {
    users: [],
    authUser: null
  },
  getters: {
    userByProperty: state => ({ property }) =>
      state.users.find(user => user[property.name] === property.value),
    authUser: state => state.authUser,
    nickname: state => (state.authUser ? state.authUser.displayName : null)
  },
  mutations: {
    setAuthUser(state, { user }) {
      state.authUser = user;
    },
    appendToUsers(state, { user }) {
      state.users.push(user);
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
    appendUser(store, { user }) {
      store.commit("appendToUsers", { user });
    }
  }
};
