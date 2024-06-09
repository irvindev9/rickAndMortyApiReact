const SearchBtn = ({onChangeHandler}) => {
  return (
    <input 
      placeholder="Search"
      type="search" 
      onChange={(event) => onChangeHandler(event.target.value)}
    />
  )
}

export default SearchBtn;