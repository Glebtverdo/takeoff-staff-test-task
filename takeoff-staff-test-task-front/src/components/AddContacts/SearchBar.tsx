import {TextField, Box} from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchBar(props:{ makeNewArr: (searchString: string) => void}) {
  const {makeNewArr} = props
  return (<>
    <Box style={{display: "flex", flexGrow:"1"}}>
      <TextField onChange={(e) => {makeNewArr(e.target.value)}} variant="standard" label={"search"} sx={{display:"flex", marginLeft:"8px"}} fullWidth={true} />
      <SearchOutlinedIcon sx={{ml: -5, my: 2 }} />
    </Box>
  </>
  )
}

export default SearchBar;