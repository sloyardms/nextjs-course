import Link from "next/link";
import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";

export default function NewsPage(){
    return <>
         <h1>The News Page</h1>
         <ul className="news-list">
            {DUMMY_NEWS.map(news => (
                <li key={news.id}>
                    <Link href={`/news/${news.slug}`}>
                        <img src={`/images/news/${news.image}`} alt={news.title} />
                    </Link>
                </li>
            ))}
         </ul>
    </>
}