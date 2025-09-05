import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";

export default function IamgePage({ params }) {
    const newsSlug = params.slug;
    const newsItem = DUMMY_NEWS.find(news => news.slug === newsSlug);

    if (!newsItem) {
        return notFound();
    }

    return (<div className="fullscreen-image">
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>);
}