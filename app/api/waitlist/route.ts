import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, company_size } = body;

    // Validate required fields
    if (!name || !email || !role || !company_size) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("datail_seed_users")
      .select("email")
      .eq("email", email.trim().toLowerCase())
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Insert data into datail_seed_users table
    // Note: role field maps to expertise field
    // Do not specify id field, let database auto-generate
    const { data, error } = await supabase
      .from("datail_seed_users")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          expertise: role, // role maps to expertise field
          company_size: company_size,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));

      // If primary key conflict, provide more friendly error message
      if (
        error.message?.includes("duplicate key") ||
        error.message?.includes("unique constraint")
      ) {
        return NextResponse.json(
          {
            error: "Failed to save data",
            details:
              "Database sequence error, please contact administrator to fix the sequence. Error: " +
              error.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Failed to save data", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get datail_seed_users list (optional, for admin panel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const { data, error, count } = await supabase
      .from("datail_seed_users")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch data", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      count,
      limit,
      offset,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
