import { NextResponse } from "next/server";
import { DISCORD_INVITE } from "@/site";

/** /discord: a short link to the community server. */
export function GET() {
  return NextResponse.redirect(DISCORD_INVITE, 302);
}
