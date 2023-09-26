import * as C from './styles'
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  url: string
  name: string
  id: string
  handleDelete: (id: string) => void
}

export const PhotoItem = ({ url, name, id, handleDelete }: Props) => {
  return(
    <C.Container>
      <C.Delete>
        <C.Button type="button" onClick={() => handleDelete(id)}>
            <DeleteIcon fontSize='small'/>
        </C.Button>
      </C.Delete>
      <img src={url} alt={name} />
      {name}
    </C.Container>
  )
}