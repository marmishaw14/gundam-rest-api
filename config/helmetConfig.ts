import helmet from "helmet";

export const apiHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig = {
        contentSecurityPolicy: false, // Disable for JSON APIs
        crossOriginEmbedderPolicy: false, // Disable as no content is being rendered in-browser aka no frontend
        hidePoweredBy: true, // Always hide server info (in this case, doesn't show we're using Express)
        noSniff: true, // Always prevent MIME sniffing
    };

    if (isDevelopment) {
        return helmet({
            ...baseConfig,
            hsts: false, // No HTTPS enforcement in development
        });
    }

    // Production gets full security
    return helmet({
        ...baseConfig,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    });
};