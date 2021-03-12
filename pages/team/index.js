import Head from 'next/head';
import Link from 'next/link';
import { getSortedPeopleData } from '@/lib/team';
import Team from '@/components/Team';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import Layout from 'layout/Layout';

export const getStaticProps = async ({ locale }) => {
  const allPeopleData = getSortedPeopleData(locale);
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      allPeopleData,
      navbarData,
      footerData
    }
  };
};

const TeamPage = ({ allPeopleData, navbarData, footerData }) => {
  return (
    <>
      <Head>
        <title>Meet the team</title>
      </Head>
      <Layout navbarData={navbarData} footerData={footerData}>
        <Team data={allPeopleData} />
      </Layout>
    </>
  );
};
export default TeamPage;
