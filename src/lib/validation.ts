import { z } from 'zod';

// Authentication validation
export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .max(128, { message: "Le mot de passe ne peut pas dépasser 128 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" })
    .max(50, { message: "Le nom d'utilisateur ne peut pas dépasser 50 caractères" })
    .optional(),
});

// URL validation (must be https)
const httpsUrlSchema = z
  .string()
  .trim()
  .url({ message: "URL invalide" })
  .startsWith('https://', { message: "L'URL doit commencer par https://" })
  .or(z.literal(''));

// YouTube URL validation
export const youtubeUrlSchema = z
  .string()
  .trim()
  .max(500, { message: "L'URL ne peut pas dépasser 500 caractères" })
  .url({ message: "URL YouTube invalide" })
  .refine(url => url.startsWith('https://'), { message: "L'URL doit utiliser HTTPS" })
  .refine(url => /^https:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(url), { 
    message: "L'URL doit provenir de YouTube (youtube.com ou youtu.be)" 
  });

// Event validation
export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Le titre est requis" })
    .max(200, { message: "Le titre ne peut pas dépasser 200 caractères" }),
  description: z
    .string()
    .trim()
    .max(2000, { message: "La description ne peut pas dépasser 2000 caractères" })
    .optional(),
  event_date: z
    .string()
    .min(1, { message: "La date est requise" })
    .refine((val) => {
      // Accept both datetime-local format (YYYY-MM-DDTHH:mm) and ISO format
      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
      return dateRegex.test(val);
    }, { message: "Format de date invalide" })
    .transform((val) => {
      // Convert datetime-local format to ISO string with timezone
      if (!val.includes('Z') && !val.includes('+') && !val.includes('-', 11)) {
        return new Date(val).toISOString();
      }
      return val;
    }),
});

// Tafsir validation
export const tafsirSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Le titre est requis" })
    .max(200, { message: "Le titre ne peut pas dépasser 200 caractères" }),
  description: z
    .string()
    .trim()
    .max(2000, { message: "La description ne peut pas dépasser 2000 caractères" })
    .optional(),
  surah_name: z
    .string()
    .trim()
    .min(1, { message: "Le nom de la sourate est requis" })
    .max(100, { message: "Le nom de la sourate ne peut pas dépasser 100 caractères" }),
  surah_number: z
    .number()
    .int({ message: "Le numéro doit être un entier" })
    .min(1, { message: "Le numéro de sourate doit être entre 1 et 114" })
    .max(114, { message: "Le numéro de sourate doit être entre 1 et 114" }),
  content: z
    .string()
    .trim()
    .max(10000, { message: "Le contenu ne peut pas dépasser 10000 caractères" })
    .optional(),
  video_url: httpsUrlSchema.optional(),
});

// Sira validation
export const siraSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Le titre est requis" })
    .max(200, { message: "Le titre ne peut pas dépasser 200 caractères" }),
  description: z
    .string()
    .trim()
    .max(2000, { message: "La description ne peut pas dépasser 2000 caractères" })
    .optional(),
  video_url: httpsUrlSchema,
  duration: z
    .string()
    .trim()
    .max(50, { message: "La durée ne peut pas dépasser 50 caractères" })
    .optional(),
});

// Fatwa validation
export const fatwaSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, { message: "La question est requise" })
    .max(1000, { message: "La question ne peut pas dépasser 1000 caractères" }),
  category: z
    .string()
    .trim()
    .max(100, { message: "La catégorie ne peut pas dépasser 100 caractères" })
    .optional(),
  scholar_name: z
    .string()
    .trim()
    .max(200, { message: "Le nom du savant ne peut pas dépasser 200 caractères" })
    .optional(),
  questioner_name: z
    .string()
    .trim()
    .max(200, { message: "Le nom du questionneur ne peut pas dépasser 200 caractères" })
    .optional(),
});

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "Le téléphone ne peut pas dépasser 20 caractères" })
    .optional(),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Le sujet est requis" })
    .max(200, { message: "Le sujet ne peut pas dépasser 200 caractères" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(2000, { message: "Le message ne peut pas dépasser 2000 caractères" }),
});

// File validation
export const imageFileSchema = z.object({
  size: z.number().max(10 * 1024 * 1024, { message: "L'image ne peut pas dépasser 10 MB" }),
  type: z.enum(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], {
    message: "Format d'image non supporté. Utilisez JPG, PNG ou WEBP",
  }),
});

export const audioFileSchema = z.object({
  size: z.number().max(50 * 1024 * 1024, { message: "L'audio ne peut pas dépasser 50 MB" }),
  type: z.enum(['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a'], {
    message: "Format audio non supporté. Utilisez MP3, WAV ou M4A",
  }),
});

export const videoFileSchema = z.object({
  size: z.number().max(100 * 1024 * 1024, { message: "La vidéo ne peut pas dépasser 100 MB" }),
  type: z.enum(['video/mp4', 'video/webm', 'video/quicktime'], {
    message: "Format vidéo non supporté. Utilisez MP4, WEBM ou MOV",
  }),
});

// Helper function to validate files
export const validateFile = (file: File, schema: z.ZodObject<any>) => {
  return schema.safeParse({ size: file.size, type: file.type });
};

// MIME type to safe file extension mapping
export const MIME_TO_EXTENSION: Record<string, string> = {
  // Images
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  // Videos
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
  // Audio
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
  'audio/wav': 'wav',
  'audio/m4a': 'm4a',
};

// Get safe file extension from MIME type
export const getSafeFileExtension = (file: File): string => {
  const ext = MIME_TO_EXTENSION[file.type];
  if (!ext) {
    throw new Error(`Type de fichier non autorisé: ${file.type}`);
  }
  return ext;
};
