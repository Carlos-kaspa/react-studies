import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
       /*  Providers.Google({
            clientId: '',
            clientSecret: ''
        }),
        Providers.Facebook({
            clientId: '',
            clientSecret: ''
        }) */

    ]
}

export default (req, res) => NextAuth(req,res,options)