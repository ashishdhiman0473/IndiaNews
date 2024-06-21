import { useEffect, useState} from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {
    const[isLoading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[articles,setArticles]=useState([]);

    useEffect(()=>{
        fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=886ae838632e46b9a5483cc966f9db5e`).then(response=> response.json()).then(data=> {setArticles(data.articles); setLoading(false)}).catch(error=>{setError(error);setLoading(false)});
    },[category]);

    if(isLoading) return <h1 className="fs-1 text text-success text-center text-uppercase m-5">Loading...</h1>;
    if(error) return <h1 className="fs-1 text text-danger text-center text-uppercase m-5">Error: {error.message}</h1>
  

  return (
    <div className="mt-5 pt-5">
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      {articles.map((news,index)=>{
        return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
      })}

    </div>
  )
}

export default NewsBoard;
