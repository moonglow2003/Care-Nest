import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const vitals = await prisma.vital.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(vitals);
  } catch (error) {
    console.error("Vitals GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const body = await req.json();
    const { bloodPressure, heartRate, weight } = body;

    const newVital = await prisma.vital.create({
      data: {
        userId: user.id,
        bloodPressure: bloodPressure || null,
        heartRate: heartRate ? Number(heartRate) : null,
        weight: weight ? Number(weight) : null,
      },
    });

    return NextResponse.json(newVital, { status: 201 });
  } catch (error) {
    console.error("Vitals POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}