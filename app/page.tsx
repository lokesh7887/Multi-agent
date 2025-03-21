"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateBlogPost } from "@/lib/blog-generator"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

export default function BlogGenerator() {
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({
    research: "",
    outline: "",
    draft: "",
    seoOptimized: "",
    final: "",
  })

 
  // const handleGenerate = async () => {
  //   if (!topic.trim()) return

  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ topic }),
  //     });
      
  //     if (!response.ok) throw new Error("Generation failed");
  //     const blogData = await response.json();
  //     setResult(blogData);
  //   } catch (error) {
  //     console.error("Error generating blog post:", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleGenerate = async () => {
    if (!topic.trim()) return;
  
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
  
      // Log the response for debugging
      console.log("API Response Status:", response.status);
      const responseData = await response.json();
      console.log("API Response Data:", responseData);
  
      if (!response.ok) {
        throw new Error(responseData.error || "Generation failed");
      }
  
      setResult(responseData);
    } catch (error) {
      console.error("Error generating blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">HR Blog Generator</h1>

      <Card className="p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Enter an HR-related topic:</label>
          <Textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Remote work best practices, Employee wellness programs, etc."
            className="w-full h-24"
          />
        </div>
        <Button onClick={handleGenerate} disabled={loading || !topic.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Blog Post...
            </>
          ) : (
            "Generate Blog Post"
          )}
        </Button>
      </Card>

      {(result.research || loading) && (
        <Tabs defaultValue="research" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="seo">SEO Optimized</TabsTrigger>
            <TabsTrigger value="final">Final</TabsTrigger>
          </TabsList>

          <TabsContent value="research" className="mt-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Research Results</h2>
              <div className="prose max-w-none">
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ReactMarkdown>{result.research}</ReactMarkdown>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="outline" className="mt-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Content Outline</h2>
              <div className="prose max-w-none">
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ReactMarkdown>{result.outline}</ReactMarkdown>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="draft" className="mt-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Draft Content</h2>
              <div className="prose max-w-none">
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ReactMarkdown>{result.draft}</ReactMarkdown>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="mt-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">SEO Optimized Content</h2>
              <div className="prose max-w-none">
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ReactMarkdown>{result.seoOptimized}</ReactMarkdown>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="final" className="mt-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Final Blog Post</h2>
              <div className="prose max-w-none">
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ReactMarkdown>{result.final}</ReactMarkdown>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}


// 'use client';

// import { useState } from 'react';
// import { generateBlogPost } from '../lib/blog-generator';

// export default function Home() {
//   const [topic, setTopic] = useState('Employee Wellbeing Programs');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('final');

//   const handleGenerateBlogPost = async () => {
//     setIsGenerating(true);
//     setError('');
    
//     try {
//       const blogResult = await generateBlogPost(topic);
//       setResult(blogResult);
//     } catch (err) {
//       console.error('Error generating blog post:', err);
//       setError(err.message || 'Failed to generate blog post');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center p-8">
//       <h1 className="text-3xl font-bold mb-8">HR Blog Post Generator</h1>
      
//       <div className="w-full max-w-4xl">
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">
//             Blog Topic
//           </label>
//           <input
//             type="text"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             className="w-full p-3 border rounded"
//             placeholder="Enter an HR topic"
//           />
//         </div>
        
//         <button
//           onClick={handleGenerateBlogPost}
//           disabled={isGenerating || !topic.trim()}
//           className="px-6 py-3 bg-blue-600 text-white rounded font-medium disabled:bg-gray-400"
//         >
//           {isGenerating ? 'Generating...' : 'Generate Blog Post'}
//         </button>
        
//         {error && (
//           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
//             Error: {error}
//           </div>
//         )}
        
//         {result && (
//           <div className="mt-8">
//             <div className="flex border-b">
//               <button
//                 onClick={() => setActiveTab('research')}
//                 className={`px-4 py-2 ${activeTab === 'research' ? 'border-b-2 border-blue-500' : ''}`}
//               >
//                 Research
//               </button>
//               <button
//                 onClick={() => setActiveTab('outline')}
//                 className={`px-4 py-2 ${activeTab === 'outline' ? 'border-b-2 border-blue-500' : ''}`}
//               >
//                 Outline
//               </button>
//               <button
//                 onClick={() => setActiveTab('draft')}
//                 className={`px-4 py-2 ${activeTab === 'draft' ? 'border-b-2 border-blue-500' : ''}`}
//               >
//                 Draft
//               </button>
//               <button
//                 onClick={() => setActiveTab('seoOptimized')}
//                 className={`px-4 py-2 ${activeTab === 'seoOptimized' ? 'border-b-2 border-blue-500' : ''}`}
//               >
//                 SEO Optimized
//               </button>
//               <button
//                 onClick={() => setActiveTab('final')}
//                 className={`px-4 py-2 ${activeTab === 'final' ? 'border-b-2 border-blue-500' : ''}`}
//               >
//                 Final
//               </button>
//             </div>
            
//             <div className="mt-4 p-4 border rounded bg-white">
//               <div className="prose max-w-none">
//                 {result[activeTab] ? (
//                   <div dangerouslySetInnerHTML={{ __html: markdownToHtml(result[activeTab]) }} />
//                 ) : (
//                   <p>No content available for this tab.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// // Simple Markdown to HTML converter (you might want to use a more robust library)
// function markdownToHtml(markdown) {
//   if (!markdown) return '';
  
//   return markdown
//     // Headers
//     .replace(/^### (.*$)/gim, '<h3>$1</h3>')
//     .replace(/^## (.*$)/gim, '<h2>$1</h2>')
//     .replace(/^# (.*$)/gim, '<h1>$1</h1>')
//     // Bold
//     .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
//     // Italic
//     .replace(/\*(.*)\*/gim, '<em>$1</em>')
//     // Lists
//     .replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>')
//     .replace(/^[0-9]+\. (.*$)/gim, '<ol><li>$1</li></ol>')
//     // Links
//     .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
//     // Paragraphs
//     .replace(/^\s*$/gim, '</p><p>')
//     // Line breaks
//     .replace(/\n/gim, '<br>')
//     // Wrap in paragraph
//     .replace(/^(.*)$/gim, '<p>$1</p>');
// }