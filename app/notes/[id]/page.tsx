import PocketBase from "pocketbase";
import styles from "../Notes.module.css";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 10,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getNote(noteId: string) {
  // const res = await fetch(
  //   "http://127.0.0.1:8090/api/collections/notes/records/${noteId}",
  //   { next: { revalidate: 10 } }
  // );
  const db = new PocketBase("http://127.0.0.1:8090");
  // const data = await res.json();
  const data = await db.collection("notes").getOne(noteId);
  return data;
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id, title, content, created } = await getNote(params.id);

  return (
    <div>
      <h1>notes/{id}</h1>

      <div className={styles.note}>
        <h3>{title}</h3>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </div>
  );
}
