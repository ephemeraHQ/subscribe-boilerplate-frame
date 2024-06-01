import { client } from "@/app/utils/client";
import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { createConsentProofPayload } from "@xmtp/consent-proof-signature";
import { invitation } from "@xmtp/proto";
import Long from "long";
import { NextRequest, NextResponse } from "next/server";

const confirmationFrameHtmlWithXmtp = getFrameHtmlResponse({
  accepts: {
    xmtp: "2024-02-09",
  },
  isOpenFrame: true,
  buttons: [
    {
      action: "post_redirect",
      label: "Subscribed! Read more about Subscribe Frames",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`,
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?subscribed=true&hasXmtp=true`,
});

const confirmationFrameHtmlNoXmtp = getFrameHtmlResponse({
  accepts: {
    xmtp: "2024-02-09",
  },
  isOpenFrame: true,
  buttons: [
    {
      action: "post_redirect",
      label: "Activate on XMTP to Receive Messages",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/endWithoutXmtp`,
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?subscribed=true&hasXmtp=false`,
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  const { isValid } = await getXmtpFrameMessage(body);
  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }
  const xmtpClient = client;

  const signature = body.untrustedData.transactionId;
  const timestamp = JSON.parse(process.env.TIMESTAMP || "");

  // To-do: Convert this in @xmtp/frames-validator for re-use
  const payloadBytes = createConsentProofPayload(signature, timestamp);
  const consentProofBase64 = Buffer.from(payloadBytes).toString("base64");
  const base64ToBytes = (base64: string) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };
  const consentProofUint8Array = base64ToBytes(consentProofBase64);

  const consentProof = invitation.ConsentProofPayload.decode(
    consentProofUint8Array
  );

  const payloadWithTimestamp = {
    ...consentProof,
    timestamp: new Long(
      consentProof?.timestamp?.low,
      consentProof?.timestamp?.high,
      consentProof?.timestamp?.unsigned
    ),
  };
  // End frames validator

  // In this frame, we're immediately starting a new conversation
  // In practice the user could just store the necessary info where needed and initialize this conversation whenever they wanted
  const newConvo = await xmtpClient?.conversations.newConversation(
    body.untrustedData.address,
    undefined,
    payloadWithTimestamp
  );
  await newConvo?.send(
    "Hello, this is the demo frame! Thank you for being a subscriber!"
  );

  // Determine if user is on XMTP or not and return the corresponding frame
  const hasXmtp = await xmtpClient?.canMessage(body.untrustedData.address);

  return new NextResponse(
    hasXmtp ? confirmationFrameHtmlWithXmtp : confirmationFrameHtmlNoXmtp
  );
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
