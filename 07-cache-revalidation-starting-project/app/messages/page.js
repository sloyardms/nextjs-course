import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';
import { unstable_noStore } from 'next/cache';

//export const revalidate = 5; // Revalidate this page every 5 seconds
//export const dynamic = "force-dynamic"; // Ensure the page is always refetched

export default async function MessagesPage() {
  //unstable_noStore();  // Opt out of caching for this fetch
  /* const response = await fetch('http://localhost:8080/messages', {
    headers: {
      'X-ID': 'page',
    },
  });
  const messages = await response.json(); */

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
