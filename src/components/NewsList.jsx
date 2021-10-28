import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import NewsItem from './NewsItem';
import axios from '../../node_modules/axios/index';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=d16a99370dce4ee9b8eaae8d75214fdc`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return <NewsListBlock>Now Loading...</NewsListBlock>;
  }
  if (!articles) {
    return null;
  }

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
