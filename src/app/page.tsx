import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { Metadata } from "next";

// Initial frame
const frameMetadata = getFrameMetadata({
  accepts: { xmtp: "2024-02-09" },
  isOpenFrame: true,
  buttons: [
    {
      label: "Subscribe to receive messages from this user!",
      action: "tx",
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction`,
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction-success`,
    },
  ],
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?subscribed=false`,
});

export const metadata: Metadata = {
  title: "Subscribe Frame",
  description: "A frame to demonstrate subscribing from a frame",
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <>
      <h1>Open Frames Subscribe Frame</h1>
    </>
  );
}
