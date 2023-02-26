import Link from "next/link";

const url = "/api/auth/callback/discord";

export default function LoginPage() {
  return (
    <div>
      <Link href={url}>
        Login with Discord
      </Link>
    </div>
  );
}
