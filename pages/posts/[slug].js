import Layout from "../../components/layout";
import { getAllPostSlugs, getPostData } from "../../lib/posts";

// Add this import
import Head from "next/head";
//import Date from "../../components/date";
//import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{/* <Date dateString={postData.date} /> */}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.slug);

  return {
    props: {
      postData,
    },
  };
}
