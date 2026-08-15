import { mockRooms, mockAesthetics, mockSetups } from "./mockData";
import { Room, Aesthetic, Setup } from "@/types";

export async function getRooms(): Promise<Room[]> {
  return mockRooms;
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const room = mockRooms.find((r) => r.slug === slug);
  return room || null;
}

export async function getAesthetics(): Promise<Aesthetic[]> {
  return mockAesthetics;
}

export async function getAestheticBySlug(slug: string): Promise<Aesthetic | null> {
  const aesthetic = mockAesthetics.find((a) => a.slug === slug);
  return aesthetic || null;
}

export async function getSetups(): Promise<Setup[]> {
  return mockSetups;
}

export async function getSetupBySlug(slug: string): Promise<Setup | null> {
  const setup = mockSetups.find((s) => s.slug === slug);
  return setup || null;
}
