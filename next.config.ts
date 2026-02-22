import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.0.100:3000'],
};

export default withPWA(nextConfig);
