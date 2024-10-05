import { useSearchContext } from "../contexts/SearchContext"


const Search = () => {
    const search = useSearchContext()
    console.log(search);
  return (
    <div>Searc Page</div>
  )
}

export default Search