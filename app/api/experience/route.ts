'use server';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { startDate: "desc" } });
    return NextResponse.json({ data: experiences });
  } catch (error) {
    console.error("Failed to fetch experiences", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, title, location, startDate, endDate, description } = body ?? {};
    if (!company || !title || !location || !startDate || !description) {
      return NextResponse.json(
        { error: "company, title, location, startDate, and description are required" },
        { status: 400 }
      );
    }
    const created = await prisma.experience.create({
      data: {
        company,
        title,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
      },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create experience", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

