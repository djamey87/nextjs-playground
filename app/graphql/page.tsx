export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const QUERY_URL = "https://swapi-graphql.netlify.app/.netlify/functions/index";
const QUERY = {
  query: `{
      allFilms {
        films {
          title
          releaseDate
          director
          id
        }
      }
    }`,
};

interface Film {
  title: string;
  releaseDate: string;
  director: string;
  id: string;
}

async function getFilms(): Promise<Film[]> {
  try {
    const res = await (
      await fetch(QUERY_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(QUERY),
        cache: "no-store",
      })
    ).json();
    return res.data.allFilms.films;
  } catch (err) {
    console.log("err", err);
    return [];
  }
}

export default async function GraphQLPage() {
  const films = await getFilms();
  return (
    <div>
      <h1>GraphQL Examples</h1>
      {films?.map((film) => (
        <FilmMeta key={film.id} film={film} />
      ))}
    </div>
  );
}

function FilmMeta({ film }: { film: Film }) {
  const { title, releaseDate, director } = film;

  return (
    <div>
      <h2>{title}</h2>
      <h5>
        {releaseDate} | {director}
      </h5>
    </div>
  );
}
