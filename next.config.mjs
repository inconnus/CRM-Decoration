/** @type {import('next').NextConfig} */
const S3_ROOT_HOSTNAME = `https://dataslot-resources.s3.ap-southeast-1.amazonaws.com`
const nextConfig = {
    reactStrictMode: false,
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 's3.ap-southeast-1.amazonaws.com',
    //             port: '',
    //             pathname: '/dataslot-resources/**',
    //         },
    //     ],
    // },
    compiler: {
        emotion: true
    },
    async rewrites() {
        return [
            {
                source: '/s3/images/:path*',
                destination: `${S3_ROOT_HOSTNAME}/:path*`,
            },
            {
                source: '/dataslot/otp/:path*',
                destination: `https://8yxttq90lb.execute-api.ap-southeast-1.amazonaws.com/stable/otp/:path*`
            },
            {
                source: '/dataslot/:path*',
                destination: `${process.env.DATASLOT_API_HOSTNAME}/:path*`
            },
            {
                source: '/temp/:path*',
                destination: `https://crm.dataslot.app/:path*`
            }
        ]
    }
};

export default nextConfig;
