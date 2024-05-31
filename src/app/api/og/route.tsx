import { ImageResponse } from "next/og";

// The dynamically generated frame image
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscribed = searchParams.get("subscribed") === "true" ? true : false;
    const hasXmtp = searchParams.get("hasXmtp") === "true" ? true : false;

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>
                  {!subscribed
                    ? "Subscribe to this super exciting channel!"
                    : "You have successfully subscribed!"}
                </span>
                <span tw="text-indigo-600">
                  {subscribed
                    ? hasXmtp
                      ? "Refresh your screen and messages from this channel should now appear in your main inbox."
                      : "Looks like you're not on XMTP yet. Activate XMTP to start receiving messages from this channel."
                    : "Click to subscribe to this channel and receive messages in your main inbox."}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
