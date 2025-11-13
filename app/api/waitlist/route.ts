import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    // Validate Supabase configuration
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error("Supabase configuration missing");
      return NextResponse.json(
        {
          error: "Failed to save data",
          details: "Server configuration error. Please contact administrator.",
        },
        { status: 500 }
      );
    }

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
    const normalizedEmail = email.trim().toLowerCase();

    const { data: existingUsers, error: checkError } = await supabase
      .from("datail_seed_users")
      .select("email, name")
      .eq("email", normalizedEmail)
      .limit(1);

    if (checkError) {
      console.error("Error checking existing email:", checkError);
      // If check fails, we'll let the insert attempt proceed
      // The database unique constraint will catch duplicates
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        {
          error: "Email already registered",
          details:
            "This email address has already been registered. Please use a different email or contact support if you believe this is an error.",
        },
        { status: 409 }
      );
    }

    // Insert data into datail_seed_users table
    // Note: role field maps to expertise field
    // Do not specify id field, let database auto-generate
    const insertData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      expertise: role, // role maps to expertise field
      company_size: company_size,
    };

    console.log("Attempting to insert data:", insertData);

    const { data, error } = await supabase
      .from("datail_seed_users")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      console.error(
        "Supabase URL:",
        process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Not set"
      );

      // Check for specific error types
      if (error.code === "PGRST116") {
        return NextResponse.json(
          {
            error: "Failed to save data",
            details:
              "No rows returned. Please check if the table exists and RLS policies allow inserts.",
          },
          { status: 500 }
        );
      }

      if (error.code === "42501") {
        return NextResponse.json(
          {
            error: "Failed to save data",
            details:
              "Permission denied. Please check RLS (Row Level Security) policies.",
          },
          { status: 500 }
        );
      }

      // If primary key conflict, provide more friendly error message
      if (
        error.message?.includes("duplicate key") ||
        error.message?.includes("unique constraint") ||
        error.code === "23505"
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
        {
          error: "Failed to save data",
          details:
            error.message ||
            "Unknown error occurred. Please check server logs.",
        },
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
