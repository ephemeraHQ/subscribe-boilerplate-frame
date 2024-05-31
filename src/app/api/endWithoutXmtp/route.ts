import { NextRequest, NextResponse } from "next/server";

// Where we redirect the data in the last button for post_redirect
export async function POST(_: NextRequest): Promise<Response> {
  const headers = new Headers();
  headers.set("Location", `${process.env.NEXT_PUBLIC_BASE_URL}/`);
  const response = NextResponse.redirect(
    "https://xmtp.org/docs/concepts/account-signatures",
    {
      headers,
      status: 302,
    }
  );
  return response;
}
