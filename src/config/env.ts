function required(name: string, value?: string) {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  APP_NAME: required('API_NAME', import.meta.env.VITE_APP_NAME),
  API_URL: required('API_URL', import.meta.env.VITE_API_URL),
  APP_ENV: required('APP_ENV', import.meta.env.VITE_APP_ENV),
};
