import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email format
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const normalizedEmail = email.trim().toLowerCase();

    // Validate Supabase configuration
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error("Supabase configuration missing");
      return NextResponse.json(
        {
          error: "Failed to check email",
          details: "Server configuration error. Please contact administrator.",
        },
        { status: 500 }
      );
    }

    let existingUsers;
    let checkError;

    try {
      const result = await supabase
        .from("datail_seed_users")
        .select("email")
        .eq("email", normalizedEmail)
        .limit(1);

      existingUsers = result.data;
      checkError = result.error;
    } catch (err) {
      console.error("Supabase query exception:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return NextResponse.json(
        {
          error: "Failed to check email",
          details: `Database connection error: ${errorMessage}`,
        },
        { status: 500 }
      );
    }

    if (checkError) {
      console.error("Error checking email:", checkError);
      console.error("Error code:", checkError.code);
      console.error("Error message:", checkError.message);
      return NextResponse.json(
        {
          error: "Failed to check email",
          details: checkError.message || "Database query failed",
        },
        { status: 500 }
      );
    }

    const isDuplicate = existingUsers && existingUsers.length > 0;

    return NextResponse.json({
      available: !isDuplicate,
      message: isDuplicate
        ? "This email is already registered"
        : "Email is available",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
