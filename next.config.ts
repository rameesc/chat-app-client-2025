import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com"
      },
      {
        protocol:"https",
        
        hostname:"56u6u6.s3.us-east-1.amazonaws.com"
      }
    ]
  }
};

export default nextConfig;
