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

    const medicines = await prisma.medicine.findMany({
      where: { userId: user.id },
      orderBy: { time: "asc" },
    });

    return NextResponse.json(medicines);
  } catch (error) {
    console.error("Medicines GET error:", error);
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

    const { name, dosage, time } = await req.json();

    const newMedicine = await prisma.medicine.create({
      data: { userId: user.id, name, dosage, time, taken: false },
    });

    return NextResponse.json(newMedicine, { status: 201 });
  } catch (error) {
    console.error("Medicines POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { id, taken } = await req.json();

    await prisma.medicine.updateMany({
      where: { id, userId: user.id },
      data: { taken },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Medicines PUT error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}