import Link from "next/link";

const url = "/api/auth/signin";

export default function LoginPage() {
  return (
    <div>
      <Link href={url}>
        Login with Discord
      </Link>
    </div>
  );
}
