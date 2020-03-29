import { firebaseAuthentication } from "../firebaseTools";

const redirectOrPass = async (to, next) => {
  const shouldUserBeRedirected = await checkIfAuthorizedUserShouldBeRedirected({
    route: to
  });
  shouldUserBeRedirected ? redirectToHome(next) : passToNext(next);
};

const checkIfAuthorizedUserShouldBeRedirected = async ({ route }) => {
  const currentUser = await firebaseAuthentication.getCurrentUser();
  return checkIfRouteRequiresToBeUnauthorized({ route }) && currentUser;
};

const redirectToHome = next => {
  next({ name: "Home" });
};

const passToNext = next => {
  next();
};

const checkIfRouteRequiresToBeUnauthorized = ({ route }) =>
  route.matched.some(record => record.meta.requiresToBeUnauthorized);

export { redirectOrPass };
