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

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Appointments GET error:", error);
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

    const { doctorName, date, time } = await req.json();

    const newAppointment = await prisma.appointment.create({
      data: { userId: user.id, doctorName, date, time },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("Appointments POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}