'use server';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const project = await prisma.project.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ data: project });
  } catch (error) {
    console.error("Failed to fetch project", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { name, startDate, endDate, description, deploymentLink, githubLink } = body ?? {};
    if (!name || !startDate || !description) {
      return NextResponse.json({ error: "name, startDate, and description are required" }, { status: 400 });
    }
    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        name,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
        deploymentLink: deploymentLink ?? null,
        githubLink: githubLink ?? null,
      },
    });
    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Failed to update project", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
