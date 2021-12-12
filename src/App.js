import { ProfileInfo } from './components/ProfileInfo'
import React from 'react'
import axios from 'axios'
import { Heart } from 'react-spinners-css'

const App = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [userInfo, setUserInfo] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)

  const location = window.location
  console.log(location)
  const his = window.history
  console.log(his)

  const onChangeInput = (e) => {
    const { value } = e.target
    setInputValue(value)
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await axios.get(`https://api.github.com/users/${inputValue}`)
      setUserInfo(data)
    } catch (e) {
      alert('Пользователь не найден')
      console.log(e.message)
      setUserInfo({})
    }
    setIsLoading(false)
    setInputValue('')
  }
  return (
    <div id='app'>
      <div className='app-container'>
        <form onSubmit={handleSubmitForm} className='app-form'>
          <input onChange={onChangeInput} value={inputValue} type='text' className='app-input'
                 placeholder={isLoading ? 'Загрузка..' : 'Укажите GitHub-аккаунт'} />
          <button disabled={isLoading} type='submit' className='app-form_btn'>Найти</button>
        </form>
        {isLoading ? <Heart className='margin-loader' color='#007afe' size={350} /> : Object.keys(userInfo).length ?
          <ProfileInfo {...userInfo} /> : null}
      </div>
    </div>
  )
}

export default App
