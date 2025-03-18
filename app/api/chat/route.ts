import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// إعداد Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// المعلومات الشخصية التي ستستخدم لتدريب المساعد
const PERSONAL_INFO = `
  - My name is Jamal Mohafil, a web developer and content creator from Syria, currently residing in Istanbul.
  - I am 16 years old and started my programming journey 5 years ago. Over this time, I have gained extensive experience in web and mobile app development.
  - My skills include working with the latest technologies like React, Next.js, Node.js, TypeScript, Tailwind CSS, Nest.js, React Native, MySQL, MongoDB, and GraphQL. Additionally, I have experience with Docker and Kubernetes.
  - I specialize in full-stack development, focusing on both front-end (UI/UX) and back-end development with databases and servers.
  - I have worked on various projects, including e-learning platforms, content management systems, e-commerce applications, and mobile apps. I am currently developing a SaaS project for project management software.
  - Currently, I am learning Machine Learning and Artificial Intelligence programming using Python to further develop my skills in this area.
  - You can contact me via email at jamalmohafil1@gmail.com , about my number +905055781300 or through my social media platforms:
    - LinkedIn: https://www.linkedin.com/in/jamal-mohafil/
    - Instagram: https://www.instagram.com/jamal_mohafil/
    - YouTube: https://www.youtube.com/@jamal_mohafil
    - X (formerly Twitter): https://x.com/Jamal_Mohafil

  - I currently have over 10,000 followers on Instagram where I share my programming knowledge and build a community of learners and developers.
  - I have collaborated with many companies in various fields such as fashion, furniture, and technology. I also provided technical consulting for startups in the tech sector.
  - I am passionate about delivering valuable content that reflects my programming journey and the projects I have worked on.
  - My goal is to become a leader in the software development industry and be part of teams working on innovative technologies.
`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // إنشاء نموذج المحادثة
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // إنشاء رسالة تعليمات مفصلة للمساعد
    const systemPrompt = {
      role: "user",
      parts: [
        {
          text: `You are a personal assistant specialized in answering questions about Jamal Mohafil. Use the following information in your answers:
          
          ${PERSONAL_INFO}
          
          Important guidelines:
          1. Provide detailed and helpful answers to questions.
          2. Speak in a friendly and helpful tone as if you were representing Jamal himself.
          3. Use the provided information and your knowledge to give complete answers.
          4. If the question is not related to the available information, suggest that the user ask about topics related to the available information.
          5. If the question is about projects or technologies, provide specific examples from the available information.
          6. Avoid very short answers and elaborate appropriately.
          8. Make sure that you are always do not put point (.) after link but add any word
          7. IMPORTANT: You must respond in the SAME LANGUAGE as the user's message. If they write in English, respond in English. If they write in Arabic, respond in Arabic. If they write in Turkish, respond in Turkish. Automatically detect the language and respond accordingly.`,
        },
      ],
    };

    const systemResponse = {
      role: "model",
      parts: [
        {
          text: "I'll answer questions about Jamal Mohafil based on the provided information and respond in the same language as the user's message.",
        },
      ],
    };

    // إنشاء سياق المحادثة مع المعلومات الشخصية
    const chat = model.startChat({
      history: [systemPrompt, systemResponse],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // إرسال سؤال المستخدم والحصول على الإجابة
    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
