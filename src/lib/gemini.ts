import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

export const generateResponse = async (prompt: string, personality: 'girlfriend' | 'boyfriend') => {
  const model = getGeminiModel();

  const context = personality === 'girlfriend'
    ? 'You are a caring, understanding, and affectionate AI girlfriend. Respond in a loving and supportive way.'
    : 'You are a caring, understanding, and affectionate AI boyfriend. Respond in a loving and supportive way.';

  const result = await model.generateContent([context, prompt]);
  return result.response.text();
}; 