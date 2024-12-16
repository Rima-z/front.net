import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importez useParams pour accéder aux paramètres de l'URL
import './Articles.css';

const Articles = () => {
  const { id } = useParams(); // Récupérez l'ID de la catégorie depuis l'URL
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:5247/api/Articles?categoryId=${id}`);
        setArticles(response.data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération des articles:', err);
        setError('Une erreur est survenue lors de la récupération des articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="articles-container">
      <h1>Articles de la catégorie</h1>
      <div className="articles-list">
        {articles.map((article) => (
          <div className="article-card" key={article.id}>
            <h2>{article.name}</h2>
            <p>Prix : {article.price} €</p>
            <p>Catégorie : {article.category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
