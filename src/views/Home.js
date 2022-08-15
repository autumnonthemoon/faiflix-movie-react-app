import Row from "../components/Row";
import Banner from "../components/Banner";

export default function Home({movies, dramas, variety, horrors, handleFave, favorite, base_url }) {
  return (
    <main>
      <Banner />
      <Row title="Korean drama" isLargeRow={true} movies={dramas} handleFave={handleFave} favorite={favorite}   base_url={base_url} key={1}/>
      <Row title="Korean movies" isLargeRow={false} movies={movies} handleFave={handleFave} favorite={favorite}  base_url={base_url} />
      <Row title="Korean horror" isLargeRow={false} movies={horrors} handleFave={handleFave} favorite={favorite}  base_url={base_url} />
      <Row title="Korean Comedy" isLargeRow={false} movies={variety} handleFave={handleFave} favorite={favorite}   base_url={base_url} />
    </main>
    )
}


