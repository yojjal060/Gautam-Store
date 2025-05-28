import { useEffect } from "react";
import { useRouter } from "next/router";

// This page is now deprecated as the site focuses on Men and Women collections.
export default function Kids() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/"); // Redirect to homepage or a relevant page
  }, [router]);
  return null;
}
