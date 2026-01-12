'use server';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const experience = await prisma.experience.findUnique({ where: { id: params.id } });
    if (!experience) return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    return NextResponse.json({ data: experience });
  } catch (error) {
    console.error("Failed to fetch experience", error);
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { company, title, location, startDate, endDate, description } = body ?? {};
    if (!company || !title || !location || !startDate || !description) {
      return NextResponse.json(
        { error: "company, title, location, startDate, and description are required" },
        { status: 400 }
      );
    }
    const updated = await prisma.experience.update({
      where: { id: params.id },
      data: {
        company,
        title,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
      },
    });
    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Failed to update experience", error);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await prisma.experience.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete experience", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}

