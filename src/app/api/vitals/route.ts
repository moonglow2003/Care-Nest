import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const vitals = await prisma.vital.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(vitals);
  } catch (error) {
    console.error("Error fetching vitals:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { bloodPressure, heartRate, weight } = await req.json();

    const newVital = await prisma.vital.create({
      data: {
        userId: session.user.id,
        bloodPressure,
        heartRate: heartRate ? parseInt(heartRate) : null,
        weight: weight ? parseFloat(weight) : null,
      }
    });

    return NextResponse.json(newVital, { status: 201 });
  } catch (error) {
    console.error("Error adding vitals:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
