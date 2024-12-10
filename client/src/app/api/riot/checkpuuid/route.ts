import conf from "@/conf/main";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const gameName = url.searchParams.get("gameName");
  const tagLine = url.searchParams.get("tagLine");

  try {
    const response = await fetch(`${conf.apigetpuuid}${gameName}/${tagLine}?`, {
      headers: {
        "X-Riot-Token": process.env.NEXT_PUBLIC_RIOTKEY || "",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: response.statusText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
