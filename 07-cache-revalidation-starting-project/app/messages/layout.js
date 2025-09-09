import { getMessages } from "@/lib/messages";

export const revalidate = 5;

export default async function MessagesLayout({ children }) {
  /* const response = await fetch('http://localhost:8080/messages', {
    headers: {
      'X-ID': 'layout',
    },
    //next: { tags: ['msg'] }, // Tag this fetch with 'msg' so we can revalidate it later
  });
  const messages = await response.json(); */
  const messages = await getMessages();
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}
