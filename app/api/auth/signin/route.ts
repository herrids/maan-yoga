import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Successfully signed in" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
