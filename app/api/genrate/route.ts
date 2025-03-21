import { generateBlogPost } from "@/lib/blog-generator";
import { NextResponse } from "next/server";

// Optional: Set runtime environment (Edge or Node.js)
export const runtime = 'edge'; // Use 'nodejs' if you prefer Node.js runtime
// export const dynamic = 'force-dynamic'; // Uncomment if using Node.js runtime

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { topic } = await request.json();

    // Validate the input
    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    // Generate the blog post using your custom function
    const result = await generateBlogPost(topic);

    // Return the successful response
    return NextResponse.json(result);
  } catch (error: any) {
    // Log the error for debugging
    console.error("API Error:", error);

    // Return a user-friendly error message
    return NextResponse.json(
      { error: error.message || "Failed to generate blog post" },
      { status: 500 }
    );
  }
}

// Optional: Add a GET handler for testing the API endpoint
export async function GET() {
  return NextResponse.json({
    message: "Blog Generator API is working! Use POST with a 'topic' to generate content.",
  });
}