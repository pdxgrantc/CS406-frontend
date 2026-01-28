import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { setUser } from "../../stores/userStore";

type GoogleIdTokenPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  exp: number;
  aud: string;
  iss: string;
};

type Props = {
  onSignedIn?: (user: GoogleIdTokenPayload) => void;
};

export default function Login({ onSignedIn }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSuccess(credential: string) {
    setLoading(true);
    setError(null);

    try {
      // Decode Google ID token (UI ONLY)
      const decoded = jwtDecode<GoogleIdTokenPayload>(credential);

      console.log("Signed in as:", decoded.email);
      console.log("Google user payload:", decoded);

      // ======================================================
      // 🚫 BACKEND AUTH DISABLED (API not implemented yet)
      // ======================================================
      //
      // const resp = await fetch(
      //   `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ id_token: credential }),
      //   }
      // );
      //
      // if (!resp.ok) {
      //   throw new Error("Backend authentication failed");
      // }
      //
      // const data = await resp.json();
      // const appToken = data.access_token as string;
      //
      // localStorage.setItem("access_token", appToken);
      //
      // onSignedIn?.(appToken);
      //
      // ======================================================

      // For now, just notify parent that user signed in

      const loginUrl = import.meta.env.DEV
        ? 'http://localhost:8080/login'
        : `${import.meta.env.VITE_API_BASE_URL}/login`;

      const resp = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: credential, data: decoded }),
      });

      if (!resp.ok) {
        throw new Error("Backend authentication failed");
      }
      
      const data = await resp.json();
      const appToken = data.access_token as string;

      localStorage.setItem("access_token", appToken);

      // Map Google ID token payload to our app UserDoc shape and store it
      const nameParts = (decoded.name ?? "").split(" ");
      const user = {
        uid: decoded.sub,
        given_name: nameParts[0] ?? "",
        family_name: nameParts.slice(1).join(" ") ?? "",
        picture: decoded.picture ?? "",
        email: decoded.email ?? "",
        displayName: decoded.name,
      };

      setUser(user);

      onSignedIn?.(decoded);
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <GoogleLogin
        onSuccess={(res) => {
          if (res.credential) handleSuccess(res.credential);
          else setError("No credential returned from Google");
        }}
        onError={() => setError("Google sign-in failed")}
        useOneTap
      />

      {loading && <span>Signing in…</span>}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}
