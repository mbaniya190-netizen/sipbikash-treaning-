import { NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PHONE_PATTERN = /^[0-9+()\-\s]{7,25}$/;

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
}

function normalizeName(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  // Nepal phone number: 10 digit local number
  if (digits.length === 10 && digits.startsWith("9")) {
    return `977${digits}`;
  }

  // Already has Nepal country code
  if (digits.startsWith("977")) {
    return digits;
  }

  return digits;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const name =
      typeof body === "object" &&
      body !== null &&
      "name" in body &&
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const phone =
      typeof body === "object" &&
      body !== null &&
      "phone" in body &&
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    if (!name || name.length > 120) {
      return NextResponse.json(
        { error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    if (!PHONE_PATTERN.test(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    // Save lead to Google Sheets
    await appendLead({ name, phone });

    const metaAccessToken = process.env.META_ACCESS_TOKEN;
    const datasetId = process.env.META_DATASET_ID;

    console.log(
      "Meta CAPI config:",
      !!metaAccessToken,
      !!datasetId
    );

    const eventId = crypto.randomUUID();

    console.log("Event ID:", eventId);

    if (metaAccessToken && datasetId) {
      const normalizedName = normalizeName(name);
      const normalizedPhone = normalizePhone(phone);

      const nameParts = normalizedName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName =
        nameParts.length > 1
          ? nameParts.slice(1).join(" ")
          : "";

      const userData: Record<string, string> = {
        ph: sha256(normalizedPhone),
        fn: sha256(firstName),
      };

      if (lastName) {
        userData.ln = sha256(lastName);
      }

      const response = await fetch(
        `https://graph.facebook.com/v23.0/${datasetId}/events?access_token=${metaAccessToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                event_name: "Lead",
                event_time: Math.floor(Date.now() / 1000),
                event_id: eventId,
                action_source: "website",
                user_data: userData,
              },
            ],
          }),
        }
      );

      const result = await response.text();

      console.log("Meta CAPI Response:", result);
    }

    return NextResponse.json(
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission failed", error);

    return NextResponse.json(
      {
        error:
          "We could not save your request. Please try again.",
      },
      { status: 500 }
    );
  }
}