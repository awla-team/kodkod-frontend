export interface FormInitialValuesType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  school: number | string;
  subject: string;
}

export const subjects = [
  'Educación General Básica', 
  'Educación Técnica y Formación Profesional', 
  'Artes Visuales', 
  'Ciencias Naturales', 
  'Biología', 
  'Educación física y salud', 
  'Filosofía', 
  'Física', 
  'Historia, geografía y ciencias sociales', 
  'Inglés', 
  'Lengua indígena', 
  'Lenguaje y comunicación/ Lengua y literatura', 
  'Lengua y Cultura de los Pueblos Originarios Ancestrales', 
  'Matemática', 
  'Música', 
  'Orientación', 
  'Química', 
  'Religión', 
  'Tecnología'
];
