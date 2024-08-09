// next.config.mjs

export default {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'infinitychassis.com',
          port: '',
          pathname: '/wp-content/uploads/**',
        },
      ],
    },
    // Diğer konfigürasyonlar burada yer alabilir
  }
  