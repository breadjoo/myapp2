// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';

function App() {
  const [mode,setMode] = useState('index');
  const [id, setId] = useState(null);
  const [nextId,  setNextId] = useState(4);
  const [introduces, setIntroduces] = useState([
    {id:1, title:'이름', body:'유환주'},
    {id:2, title:'나이', body:'31세'},
    {id:3, title:'주소', body:'서울시 금천구'}
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'index') {
    content=<Article title="메인화면 Test"></Article>
  } else if(mode === 'READ') {
    let title = null;
    let body = null;
    for(let i=0;i<introduces.length;i++){
      if(introduces[i].id === id) {
        title = introduces[i].title;
        body = introduces[i].body;
      }
    }
    content = <Content title={title} body={body}></Content>
    contextControl = <>
      <li>
        <a href={"/update"+id} onClick={event=>{
          event.preventDefault();
          setMode('update');
        }}>수정하기</a>
      </li>
      <li>
        <button value="delete" onClick={event=>{
          const newIntroduces = [];
          if(window.confirm("삭제하시겠습니까?")){
            for(let i=0;i<introduces.length;i++){
              if(introduces[i].id !== id) {
                newIntroduces.push(introduces[i]);
              }
            }
            setIntroduces(newIntroduces);
            setMode('index');
          }
        }}>삭제하기</button>
      </li>
    
    </>
  } else if (mode === 'create') {
    content = <Create onCreate={(title,body) =>{
      const newIntroduce = {id:nextId, title:title, body:body};
      const newIntroduces = [...introduces];
      introduces.push(newIntroduce);
      setIntroduces(introduces);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);

    }}></Create>
    
  } else if( mode === 'update') {
    let title, body = null;
    for(let i=0;i<introduces.length;i++){
      if(introduces[i].id === id) {
        title = introduces[i].title;
        body = introduces[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body) =>{
      const newIntroduces = [...introduces];
      const updatedIntroduces = {id:id, title:title, body:body};
      for(let i=0;i<newIntroduces.length;i++) {
        if(newIntroduces[i].id === id) {
          newIntroduces[i] = updatedIntroduces;
          break;
        }
      }
      setIntroduces(newIntroduces);
      setMode('READ');
    }}></Update>

  }
  return(
    <div className='App-header'>
        <Header title="자기소개 페이지" onChangeMode={() =>{
          setMode('index');
        }}></Header>
    <div className='app-link'>
        <Nav introduces={introduces} onChangeMode={(id)=> {
          setMode('READ');
          setId(id);
        }}></Nav></div>
    <div className='app-link'>
      {content}
      <h1>Welcome</h1>
      <h6>@@ Hello, React @@</h6>
      <ul>
        <li>
          <a href='/create' onClick={event=>{
            event.preventDefault();
            setMode('create');
          }}>작성하기</a>
          </li>
        {contextControl} 
      </ul>
      <Footer></Footer>
    </div></div>
    
    
  )
}
function Create(props) {
  return (
    <article>
      <h2>작성하기</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);
      }}>
      <p><input type='text' name='title' placeholder='title' value={props.title}></input></p>
      <p><textarea name='body' placeholder='body' value={props.body}></textarea></p>
      <p><input type='submit' value='작성'></input></p>
      </form>
    </article>
  )
}
function Update(props) {
  const [title,setTitle] = useState(props.title);
  const [body,setBody] = useState(props.body);
  return (
    <article>
      <h2>수정하기</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title= event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title,body);
      }}>
      <p><input type='text' name='title' placeholder='title' value={title}
      onChange={event=> {
        setTitle(event.target.value);
      }}></input></p>
      <p><textarea name='body' placeholder='body' value={body}
      onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value='작성'></input></p>

      </form>
    </article>
  )
}

function Content(props) {
  return(
    <article>
      <font size='10px' color="green">{props.title}&nbsp;:&nbsp;{props.body}</font>
    </article>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
    
  )
}
function Footer(props) {
  const today = new Date();
  
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[today.getDay()]; 
  return(

    <footer>
      <h6>Footer 컴포넌트 : {year}년 {month}월 {day}일 ({dayOfWeek})</h6>
    </footer>
  )
}

function Nav(props) {
  const list = []
  for(let i=0; i<props.introduces.length; i++){
    let int = props.introduces[i];
    list.push(<li key={int.id}>
      <a id={int.id} href={'/read/'+int.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{int.title}</a></li>);
  }
  return (
    <nav>
      <ol>
        {list}
      </ol>
    </nav>
  )
}

export default App;
