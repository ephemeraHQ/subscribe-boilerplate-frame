import { NextRequest, NextResponse } from "next/server";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { createConsentMessage } from "@xmtp/consent-proof-signature";
import { client } from "@/app/utils/client";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body = await req.json();
  const { isValid } = await getXmtpFrameMessage(body);
  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const walletAddress = client?.address || "";
  const timestamp = Date.now();
  process.env.TIMESTAMP = JSON.stringify(timestamp);
  const message = createConsentMessage(walletAddress, timestamp);

  const txData: FrameTransactionResponse = {
    // Sepolia
    chainId: "eip155:11155111",
    method: "eth_personalSign",
    params: {
      abi: [],
      to: walletAddress as `0x${string}`,
      value: message,
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
