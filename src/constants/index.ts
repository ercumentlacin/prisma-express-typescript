export const config = {
    port: process.env.PORT ? +process.env.PORT : 8080,
    isProduction: process.env.NODE_ENV === 'production',
};
