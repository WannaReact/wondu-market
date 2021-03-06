import { CustomJWT } from '@pages/api/auth/[...nextauth].page';

const auth = (token: CustomJWT | null, admin = false) => {
  if (admin) {
    return !token || !token.user.isAdmin;
  }
  return !token;
};

export default auth;
