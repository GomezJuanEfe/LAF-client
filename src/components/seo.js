import Head from "next/head";
import delve from 'dlv';
import { getStrapiMedia } from "@/utils";

const Seo = ({ seo }) => {
  const metaTitle = delve(seo, 'metaTitle');
  const metaDescription = delve(seo, 'metaDescription');

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} key="description" />
    </Head>
  );
};

export default Seo;