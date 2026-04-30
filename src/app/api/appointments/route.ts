import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { doctorName, date, time } = await req.json();

    if (!doctorName || !date || !time) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        doctorName,
        date,
        time,
      }
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("Error adding appointment:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
