import * as C from './App.styles'
import * as Photos from './services/photos'
import { useState, useEffect, FormEvent } from 'react'

import { Photo } from './types/photo'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import { PhotoItem } from './components/PhotoItem';

const App = () => {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [id, setId] = useState('')

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)
      setPhotos(await Photos.getAll())
      setLoading(false)
    }

    getPhotos()
  },[deleteLoading])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File
    
    if(file && file.size > 0) {
      setUploading(true)
      
      let result = await Photos.insert(file)

      setUploading(false)


      if(result instanceof Error) {
        alert(`${result.name} - ${result.message}`)
      } else {
        let newPhotoList = [...photos]
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
    }
  }

  const handleDeletePhoto = async (id: string) => {
    setDeleteLoading(true)

    const deletar = await Photos.deletePhoto(id)

    setDeleteLoading(false)

    if(deletar instanceof Error) {
      alert(`${deletar.name} - ${deletar.message}`)
    }
  }

  return(
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>

        {/* área de upload */}
        <C.UploadForm method='POST' onSubmit={handleFormSubmit}>
          <input type='file' name='image' placeholder='image' />
          <input type='submit' value='Enviar' />
          {uploading && 'Enviando...'}
        </C.UploadForm>

        {/* lista de fotos */}
        {loading &&
          <C.ScreenWarning>
            <div className='emoji'><HourglassBottomIcon /></div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        }

        {!loading && photos.length > 0 &&
          <C.PhotoList>
            {photos.map((item, index) => (
              <>
               <PhotoItem key={index} url={item.url} name={item.name} id={item.name} handleDelete={handleDeletePhoto} />
              </>
            ))}
          </C.PhotoList>
        }

        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className='emoji'><NoPhotographyIcon /></div>
            <div>Não há fotos cadastradas</div>
        </C.ScreenWarning>
        }

      </C.Area>
    </C.Container>
  )
}

export default App