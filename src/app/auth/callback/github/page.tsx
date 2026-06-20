"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { IamController } from "@/services/iam/controller";
import useAuth from "@/hooks/use-auth";
import { paths } from "@/lib/paths";
import type { ErrorResponse } from "@/services/iam/types";

function GitHubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuth((s) => s.setAuth);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setError("No authorization code received from GitHub.");
      return;
    }

    async function exchange() {
      try {
        const tokenRes = await fetch("/api/auth/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!tokenRes.ok) {
          const err = await tokenRes.json();
          setError(err.error ?? "Failed to exchange GitHub code.");
          return;
        }

        const { accessToken: providerToken } = await tokenRes.json();

        const auth = await IamController.oauthSignIn("github", {
          providerToken,
        });

        setAuth(auth);
        router.push(paths.dashboard.root);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError((err.response.data as ErrorResponse).message);
        } else {
          setError("GitHub sign-in failed. Please try again.");
        }
      }
    }

    exchange();
  }, [searchParams, setAuth, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-white">
      {error ? (
        <>
          <p className="text-red-400 text-sm">{error}</p>
          <a
            href={paths.auth.login}
            className="text-indigo-400 hover:text-indigo-300 text-sm underline"
          >
            Back to login
          </a>
        </>
      ) : (
        <p className="text-zinc-400 text-sm animate-pulse">
          Completing GitHub sign-in…
        </p>
      )}
    </div>
  );
}

export default function GitHubCallbackPage() {
  return (
    <Suspense fallback={null}>
      <GitHubCallbackContent />
    </Suspense>
  );
}
