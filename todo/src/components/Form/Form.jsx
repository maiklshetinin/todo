import { SvgSelector } from "../SvgSelector/SvgSelector";








export const Form = ({ createTodo, title, setTitle, setText, text, heightText, setHeightText, uploadFiles,url }) => {

  function textAreaAdjust(e) {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight) + "px";
    setHeightText((e.target.scrollHeight) + "px")
  }
  return (
    <form
      onSubmit={createTodo}
      className='form'>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className='input input_title' type='text' placeholder='title todo' />
      <textarea value={text}
        style={{ height: heightText }}
        onChange={(e) => {
          setText(e.target.value)
          textAreaAdjust(e)
        }}
        className='textarea' type='text' placeholder='add todo' />
      <label className='input_file'>
        <div className='container_img'> <img className='img' src={url} alt='url' /></div>
        choose file
        <input
          className='hidden'
          type='file'
          accept="image/*, .png,.gif,jpg,.web"
          onChange={(e) => uploadFiles(e)} />
        <SvgSelector id='clip' />
      </label>
      <button
        className='button'><SvgSelector id='add' /></button>
    </form>
)
}