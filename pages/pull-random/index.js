import { useRouter } from "next/router";
import Head from 'next/head';
import { Fragment } from "react";
import MeetupItem from '../../components/meetups/MeetupItem'

//domain/pull-random

function randomPost({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <pre>{post.content}</pre>
            <address>{post.author}</address>
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch('http://localhost:3000/api/pull-random');
    const post = await res.json();

    return {
        props: {
            post,
        },
        }
    }


export default randomPost;