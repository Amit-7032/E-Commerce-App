import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }

  try {
    const extractAuthUserInfo = jwt.verify(
      token,
      process.env.JWT_KEY || "default_secret_key"
    );
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (error) {
    console.log(error);
  }
};

export default AuthUser;
