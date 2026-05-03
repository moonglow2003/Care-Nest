import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const medicines = await prisma.medicine.findMany({
      where: { userId: session.user.id },
      orderBy: { time: 'asc' }
    });

    return NextResponse.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, dosage, time } = await req.json();

    if (!name || !dosage || !time) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newMedicine = await prisma.medicine.create({
      data: {
        userId: session.user.id,
        name,
        dosage,
        time,
        taken: false,
      }
    });

    return NextResponse.json(newMedicine, { status: 201 });
  } catch (error) {
    console.error("Error adding medicine:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, taken } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Missing medicine ID" }, { status: 400 });
    }

    const updatedMedicine = await prisma.medicine.updateMany({
      where: {
        id,
        userId: session.user.id, // ensure user owns the medicine
      },
      data: {
        taken,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating medicine:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
