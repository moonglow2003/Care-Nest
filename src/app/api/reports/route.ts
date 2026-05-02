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

    const reports = await prisma.report.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, date, doctor, status } = await req.json();

    if (!title || !date) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newReport = await prisma.report.create({
      data: {
        userId: session.user.id,
        title,
        date,
        doctor,
        status: status || "New",
      }
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Error adding report:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
