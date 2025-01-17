import { jwtDecode, JwtPayload } from "jwt-decode";

export function isTokenExpired(token) {
  try {
    // Decode the token
    const decodedToken = jwtDecode(token);

    // Get the expiration timestamp
    const expTimestamp = decodedToken.exp;

    // Get the current time in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Compare the expiration time with the current time
    return expTimestamp < currentTimestamp;
  } catch (error) {
    console.error("Invalid token", error);
    return true; // Assume expired if decoding fails
  }
}

export function getUserInfo(token: string) {
  const { given_name, family_name, email } = jwtDecode<CustomJwtPayload>(token);

  return { given_name, family_name, email };
}

interface CustomJwtPayload extends JwtPayload {
  given_name: string;
  family_name: string;
  email: string;
}
