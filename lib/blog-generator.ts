// import OpenAI from "openai";
// import dotenv from "dotenv";
// import "server-only";

// dotenv.config();

// // Configure the OpenAI client with Azure endpoint
// const client = new OpenAI({
//   baseURL: "https://models.inference.ai.azure.com",
//   apiKey: process.env.GITHUB_TOKEN,
//   dangerouslyAllowBrowser: false // Keep this false for security
// });

// // Research Agent: Finds trending HR topics and relevant information
// async function researchAgent(topic: string) {
//   const response = await client.chat.completions.create({
//     messages: [
//       { 
//         role: "system", 
//         content: `You are a research specialist in HR topics.`
//       },
//       {
//         role: "user",
//         content: `Research the following HR topic: "${topic}".
        
//         Provide comprehensive research including:
//         1. Current trends related to this topic
//         2. Key statistics and data points
//         3. Best practices in the industry
//         4. Common challenges and solutions
//         5. Expert opinions and insights
        
//         Format your response in markdown with clear sections and bullet points where appropriate.
//         Aim for detailed, factual information that would be valuable for writing a blog post.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Content Planning Agent: Creates a structured outline
// async function contentPlanningAgent(topic: string, research: string) {
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a content strategist specializing in HR content.`
//       },
//       {
//         role: "user",
//         content: `Based on the following research about "${topic}":
        
//         ${research}
        
//         Create a detailed outline for a 2000-word blog post that includes:
        
//         1. An engaging title with SEO keywords
//         2. Introduction (with hook and thesis)
//         3. Main sections with subheadings (at least 4-5 main sections)
//         4. Points to cover under each section
//         5. Conclusion section
//         6. Call to action
        
//         Format your response in markdown with clear hierarchical structure.
//         Focus on creating a logical flow that covers the topic comprehensively.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Content Generation Agent: Writes the blog based on research and outline
// async function contentGenerationAgent(topic: string, research: string, outline: string) {
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a professional content writer specializing in HR topics.`
//       },
//       {
//         role: "user",
//         content: `Write a comprehensive 2000-word blog post about "${topic}" based on the following research and outline:
        
//         RESEARCH:
//         ${research}
        
//         OUTLINE:
//         ${outline}
        
//         Guidelines:
//         - Follow the outline structure exactly
//         - Include all sections and subsections from the outline
//         - Write in a professional but conversational tone
//         - Include relevant examples and case studies where appropriate
//         - Format the content in markdown with proper headings, subheadings, and formatting
//         - Aim for approximately 2000 words total
        
//         Write the complete blog post now.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // SEO Optimization Agent: Ensures content follows SEO best practices
// async function seoOptimizationAgent(topic: string, draft: string) {
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are an SEO specialist focusing on HR content.`
//       },
//       {
//         role: "user",
//         content: `Optimize the following blog draft about "${topic}" for search engines:
        
//         ${draft}
        
//         Perform the following SEO optimizations:
        
//         1. Ensure the title contains relevant keywords and is compelling
//         2. Add meta description (150-160 characters)
//         3. Optimize heading structure (H1, H2, H3) with keywords
//         4. Improve keyword density throughout the content (without keyword stuffing)
//         5. Add internal linking suggestions (use placeholder URLs)
//         6. Optimize readability with shorter paragraphs and bullet points where appropriate
//         7. Add alt text suggestions for potential images
//         8. Ensure proper formatting for featured snippet potential
        
//         Return the fully optimized content in markdown format.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Review Agent: Proofreads and improves content quality
// async function reviewAgent(seoOptimizedContent: string) {
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a professional editor and proofreader specializing in HR content.`
//       },
//       {
//         role: "user",
//         content: `Review and improve the following blog post:
        
//         ${seoOptimizedContent}
        
//         Perform the following tasks:
        
//         1. Fix any grammar, spelling, or punctuation errors
//         2. Improve sentence structure and flow
//         3. Ensure consistency in tone and style
//         4. Check for factual accuracy and clarity
//         5. Enhance transitions between paragraphs and sections
//         6. Verify that the content is engaging and valuable to the reader
//         7. Ensure the conclusion effectively summarizes key points
//         8. Strengthen the call to action
        
//         Return the final, polished blog post in markdown format.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Orchestrator function that coordinates all agents
// export async function generateBlogPost(topic: string) {
//   // Step 1: Research
//   console.log("Starting research phase...");
//   const research = await researchAgent(topic);

//   // Step 2: Content Planning
//   console.log("Creating content outline...");
//   const outline = await contentPlanningAgent(topic, research);

//   // Step 3: Content Generation
//   console.log("Generating initial draft...");
//   const draft = await contentGenerationAgent(topic, research, outline);

//   // Step 4: SEO Optimization
//   console.log("Optimizing for SEO...");
//   const seoOptimized = await seoOptimizationAgent(topic, draft);

//   // Step 5: Review and Polish
//   console.log("Final review and polishing...");
//   const final = await reviewAgent(seoOptimized);

//   return {
//     research,
//     outline,
//     draft,
//     seoOptimized,
//     final,
//   };
// }

// // Example usage
// export async function main() {
//   try {
//     const topic = "Employee Wellbeing Programs";
//     console.log(`Generating blog post on: "${topic}"`);
    
//     const result = await generateBlogPost(topic);
    
//     console.log("Blog post generation complete!");
//     console.log("Final blog post:");
//     console.log(result.final);
    
//     return result;
//   } catch (err) {
//     console.error("The blog post generation encountered an error:", err);
//   }
// }













import OpenAI from "openai";
import dotenv from "dotenv";
import "server-only";

dotenv.config();

// Validate environment variables
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// Configure the OpenAI client with Azure endpoint
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com", // Your Azure endpoint
  apiKey: getEnvVar('GITHUB_TOKEN'), // Using GITHUB_TOKEN as per your original code
  dangerouslyAllowBrowser: false, // Keep this false for security
});

// Research Agent: Finds trending HR topics and relevant information
async function researchAgent(topic: string): Promise<string> {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a research specialist in HR topics.`,
      },
      {
        role: "user",
        content: `Research the following HR topic: "${topic}".

        Provide comprehensive research including:
        1. Current trends related to this topic
        2. Key statistics and data points
        3. Best practices in the industry
        4. Common challenges and solutions
        5. Expert opinions and insights

        Format your response in markdown with clear sections and bullet points where appropriate.
        Aim for detailed, factual information that would be valuable for writing a blog post.`,
      },
    ],
    model: "gpt-4", // Use your Azure deployment name if different
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
  });

  return response.choices[0].message.content || "";
}

// Content Planning Agent: Creates a structured outline
async function contentPlanningAgent(topic: string, research: string): Promise<string> {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a content strategist specializing in HR content.`,
      },
      {
        role: "user",
        content: `Based on the following research about "${topic}":
        
        ${research}
        
        Create a detailed outline for a 2000-word blog post that includes:
        
        1. An engaging title with SEO keywords
        2. Introduction (with hook and thesis)
        3. Main sections with subheadings (at least 4-5 main sections)
        4. Points to cover under each section
        5. Conclusion section
        6. Call to action
        
        Format your response in markdown with clear hierarchical structure.
        Focus on creating a logical flow that covers the topic comprehensively.`,
      },
    ],
    model: "gpt-4", // Use your Azure deployment name if different
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
  });

  return response.choices[0].message.content || "";
}

// Content Generation Agent: Writes the blog based on research and outline
async function contentGenerationAgent(topic: string, research: string, outline: string): Promise<string> {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a professional content writer specializing in HR topics.`,
      },
      {
        role: "user",
        content: `Write a comprehensive 2000-word blog post about "${topic}" based on the following research and outline:
        
        RESEARCH:
        ${research}
        
        OUTLINE:
        ${outline}
        
        Guidelines:
        - Follow the outline structure exactly
        - Include all sections and subsections from the outline
        - Write in a professional but conversational tone
        - Include relevant examples and case studies where appropriate
        - Format the content in markdown with proper headings, subheadings, and formatting
        - Aim for approximately 2000 words total
        
        Write the complete blog post now.`,
      },
    ],
    model: "gpt-4", // Use your Azure deployment name if different
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
  });

  return response.choices[0].message.content || "";
}

// SEO Optimization Agent: Ensures content follows SEO best practices
async function seoOptimizationAgent(topic: string, draft: string): Promise<string> {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an SEO specialist focusing on HR content.`,
      },
      {
        role: "user",
        content: `Optimize the following blog draft about "${topic}" for search engines:
        
        ${draft}
        
        Perform the following SEO optimizations:
        
        1. Ensure the title contains relevant keywords and is compelling
        2. Add meta description (150-160 characters)
        3. Optimize heading structure (H1, H2, H3) with keywords
        4. Improve keyword density throughout the content (without keyword stuffing)
        5. Add internal linking suggestions (use placeholder URLs)
        6. Optimize readability with shorter paragraphs and bullet points where appropriate
        7. Add alt text suggestions for potential images
        8. Ensure proper formatting for featured snippet potential
        
        Return the fully optimized content in markdown format.`,
      },
    ],
    model: "gpt-4", // Use your Azure deployment name if different
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
  });

  return response.choices[0].message.content || "";
}

// Review Agent: Proofreads and improves content quality
async function reviewAgent(seoOptimizedContent: string): Promise<string> {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a professional editor and proofreader specializing in HR content.`,
      },
      {
        role: "user",
        content: `Review and improve the following blog post:
        
        ${seoOptimizedContent}
        
        Perform the following tasks:
        
        1. Fix any grammar, spelling, or punctuation errors
        2. Improve sentence structure and flow
        3. Ensure consistency in tone and style
        4. Check for factual accuracy and clarity
        5. Enhance transitions between paragraphs and sections
        6. Verify that the content is engaging and valuable to the reader
        7. Ensure the conclusion effectively summarizes key points
        8. Strengthen the call to action
        
        Return the final, polished blog post in markdown format.`,
      },
    ],
    model: "gpt-4", // Use your Azure deployment name if different
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
  });

  return response.choices[0].message.content || "";
}

// Orchestrator function that coordinates all agents
export async function generateBlogPost(topic: string) {
  try {
    // Step 1: Research
    console.log("Starting research phase...");
    const research = await researchAgent(topic);

    // Step 2: Content Planning
    console.log("Creating content outline...");
    const outline = await contentPlanningAgent(topic, research);

    // Step 3: Content Generation
    console.log("Generating initial draft...");
    const draft = await contentGenerationAgent(topic, research, outline);

    // Step 4: SEO Optimization
    console.log("Optimizing for SEO...");
    const seoOptimized = await seoOptimizationAgent(topic, draft);

    // Step 5: Review and Polish
    console.log("Final review and polishing...");
    const final = await reviewAgent(seoOptimized);

    return {
      research,
      outline,
      draft,
      seoOptimized,
      final,
    };
  } catch (err) {
    console.error("Blog post generation error:", err);
    throw new Error("Failed to generate blog post");
  }
}

// Example usage
export async function main() {
  try {
    const topic = "Employee Wellbeing Programs";
    console.log(`Generating blog post on: "${topic}"`);

    const result = await generateBlogPost(topic);

    console.log("Blog post generation complete!");
    console.log("Final blog post:");
    console.log(result.final);

    return result;
  } catch (err) {
    console.error("The blog post generation encountered an error:", err);
  }
}























// import OpenAI from "openai";

// // In Next.js, we need to use the environment variables with NEXT_PUBLIC_ prefix
// // for client-side or use server-side rendering

// // Configure the OpenAI client with Azure endpoint
// const getOpenAIClient = () => {
//   // Check for the token in various environment variable names
//   const apiKey = process.env.GITHUB_TOKEN || 
//                 process.env.NEXT_PUBLIC_GITHUB_TOKEN ||
//                 process.env.OPENAI_API_KEY || 
//                 process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
//   if (!apiKey) {
//     throw new Error("API key not found. Please set GITHUB_TOKEN, NEXT_PUBLIC_GITHUB_TOKEN, OPENAI_API_KEY, or NEXT_PUBLIC_OPENAI_API_KEY in your environment variables or .env file.");
//   }
  
//   return new OpenAI({
//     baseURL: "https://models.inference.ai.azure.com",
//     apiKey: apiKey
//   });
// };

// // Research Agent: Finds trending HR topics and relevant information
// async function researchAgent(topic: string) {
//   const client = getOpenAIClient();
//   const response = await client.chat.completions.create({
//     messages: [
//       { 
//         role: "system", 
//         content: `You are a research specialist in HR topics.`
//       },
//       {
//         role: "user",
//         content: `Research the following HR topic: "${topic}".
        
//         Provide comprehensive research including:
//         1. Current trends related to this topic
//         2. Key statistics and data points
//         3. Best practices in the industry
//         4. Common challenges and solutions
//         5. Expert opinions and insights
        
//         Format your response in markdown with clear sections and bullet points where appropriate.
//         Aim for detailed, factual information that would be valuable for writing a blog post.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Content Planning Agent: Creates a structured outline
// async function contentPlanningAgent(topic: string, research: string) {
//   const client = getOpenAIClient();
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a content strategist specializing in HR content.`
//       },
//       {
//         role: "user",
//         content: `Based on the following research about "${topic}":
        
//         ${research}
        
//         Create a detailed outline for a 2000-word blog post that includes:
        
//         1. An engaging title with SEO keywords
//         2. Introduction (with hook and thesis)
//         3. Main sections with subheadings (at least 4-5 main sections)
//         4. Points to cover under each section
//         5. Conclusion section
//         6. Call to action
        
//         Format your response in markdown with clear hierarchical structure.
//         Focus on creating a logical flow that covers the topic comprehensively.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Content Generation Agent: Writes the blog based on research and outline
// async function contentGenerationAgent(topic: string, research: string, outline: string) {
//   const client = getOpenAIClient();
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a professional content writer specializing in HR topics.`
//       },
//       {
//         role: "user",
//         content: `Write a comprehensive 2000-word blog post about "${topic}" based on the following research and outline:
        
//         RESEARCH:
//         ${research}
        
//         OUTLINE:
//         ${outline}
        
//         Guidelines:
//         - Follow the outline structure exactly
//         - Include all sections and subsections from the outline
//         - Write in a professional but conversational tone
//         - Include relevant examples and case studies where appropriate
//         - Format the content in markdown with proper headings, subheadings, and formatting
//         - Aim for approximately 2000 words total
        
//         Write the complete blog post now.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // SEO Optimization Agent: Ensures content follows SEO best practices
// async function seoOptimizationAgent(topic: string, draft: string) {
//   const client = getOpenAIClient();
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are an SEO specialist focusing on HR content.`
//       },
//       {
//         role: "user",
//         content: `Optimize the following blog draft about "${topic}" for search engines:
        
//         ${draft}
        
//         Perform the following SEO optimizations:
        
//         1. Ensure the title contains relevant keywords and is compelling
//         2. Add meta description (150-160 characters)
//         3. Optimize heading structure (H1, H2, H3) with keywords
//         4. Improve keyword density throughout the content (without keyword stuffing)
//         5. Add internal linking suggestions (use placeholder URLs)
//         6. Optimize readability with shorter paragraphs and bullet points where appropriate
//         7. Add alt text suggestions for potential images
//         8. Ensure proper formatting for featured snippet potential
        
//         Return the fully optimized content in markdown format.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Review Agent: Proofreads and improves content quality
// async function reviewAgent(seoOptimizedContent: string) {
//   const client = getOpenAIClient();
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a professional editor and proofreader specializing in HR content.`
//       },
//       {
//         role: "user",
//         content: `Review and improve the following blog post:
        
//         ${seoOptimizedContent}
        
//         Perform the following tasks:
        
//         1. Fix any grammar, spelling, or punctuation errors
//         2. Improve sentence structure and flow
//         3. Ensure consistency in tone and style
//         4. Check for factual accuracy and clarity
//         5. Enhance transitions between paragraphs and sections
//         6. Verify that the content is engaging and valuable to the reader
//         7. Ensure the conclusion effectively summarizes key points
//         8. Strengthen the call to action
        
//         Return the final, polished blog post in markdown format.`
//       }
//     ],
//     model: "gpt-4o",
//     temperature: 0.7,
//     max_tokens: 4096,
//     top_p: 1
//   });

//   return response.choices[0].message.content;
// }

// // Orchestrator function that coordinates all agents
// export async function generateBlogPost(topic: string) {
//   try {
//     // Step 1: Research
//     console.log("Starting research phase...");
//     const research = await researchAgent(topic);

//     // Step 2: Content Planning
//     console.log("Creating content outline...");
//     const outline = await contentPlanningAgent(topic, research);

//     // Step 3: Content Generation
//     console.log("Generating initial draft...");
//     const draft = await contentGenerationAgent(topic, research, outline);

//     // Step 4: SEO Optimization
//     console.log("Optimizing for SEO...");
//     const seoOptimized = await seoOptimizationAgent(topic, draft);

//     // Step 5: Review and Polish
//     console.log("Final review and polishing...");
//     const final = await reviewAgent(seoOptimized);

//     return {
//       research,
//       outline,
//       draft,
//       seoOptimized,
//       final,
//     };
//   } catch (err) {
//     console.error("The blog post generation encountered an error:", err);
//     throw err; // Re-throw to allow handling at higher level
//   }
// }

// // This is important for Next.js server components
// export const runtime = 'nodejs';