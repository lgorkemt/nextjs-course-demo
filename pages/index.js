// our-domain.com

import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head';
import { Fragment } from 'react';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React M</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
/*
export async function getServerSideProps(context){
    const req = context.req;
    const res = context.res;

    // fetch data from back-end
    return {
        props:{
            meetups:DUMMY_MEETUPS
        }
    };
}*/

export async function getStaticProps() {
  // fetch data from back-end
  const client = await MongoClient.connect(
    "mongodb+srv://scott:tiger@cluster0.u3ddh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  console.log("Step 2");
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: result.map((result) => ({
        title: result.title,
        address: result.address,
        image: result.image,
        id: result._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
