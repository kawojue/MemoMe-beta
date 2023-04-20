import Head from "next/head"

interface IMeta {
    title: string,
    description?: string,
    keywords?: string,

}

const Meta = ({ keywords, title, description }: IMeta) => {
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    )
}

Meta.defaultProps = {
    title: 'MemoMe',
    keywords: 'anonymous, send, share, secure',
    description: 'Send and Recieve Anonymous Messages.'
}

export default Meta