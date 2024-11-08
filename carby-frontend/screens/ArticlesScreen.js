import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";

export default function ArticlesScreen() {
  const [articlesData, setArticlesData] = useState([]);
  const [expandedArticles, setExpandedArticles] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://carby-backend.vercel.app/articles/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticlesData(data.articles);
        setLoading(false);
      });
  }, []);

  // cette fonction permet de click sur l'url de l'article
  const handleReadMore = (url) => {
    Linking.openURL(url);
  };

  // Avec cette fonction fleché je change la valeur boolean de mon etat expandedArticle comme ceci {index : false} ou {index : true}
  const toggleReadMore = (index) => {
    setExpandedArticles((prevExpandedArticles) => ({
      ...prevExpandedArticles,
      [index]: !prevExpandedArticles[index],
    }));
  };

  const renderItem = ({ item: article, index }) => {
    if (!article.urlToImage) {
      return null; // Si pas d'image ne pas afficher l'article
    }

    const isExpanded = expandedArticles[index]; // isExpanded est true si l'indice index est 'etendue' c'est a dire a true.

    return (
      <View key={index} style={styles.articleContainer}>
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.articleImage}
        />
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleContent} numberOfLines={isExpanded ? 0 : 2}>
          {article.description}
        </Text>
        <TouchableOpacity onPress={() => toggleReadMore(index)}>
          <Text style={styles.readMoreText}>
            {isExpanded ? "Lire moins" : "Lire la suite"}
          </Text>
        </TouchableOpacity>
        {isExpanded && (
          <TouchableOpacity onPress={() => handleReadMore(article.url)}>
            <Text style={styles.readFullArticleText}>
              Lire l'article complet
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.articleAuthor}>{article.author}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Actualités</Text>
      </View>

      <View style={styles.containerG}>
        {!loading && (
          <FlatList
            data={articlesData}
            renderItem={renderItem}
            style={styles.containerFlatList}
            onEndReachedThreshold={1} // 1 est le point de bas de page ou FlatList charge les 10 articles suivants
            onEndReached={loading}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    top: 0,
    backgroundColor: "#2c6e49",
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    zIndex: 500,
    position: "absolute",
    paddingBottom: 25,
    marginBottom: 40,
  },
  headerText: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Comfortaa",
  },
  containerG: {
    flex: 1,
    backgroundColor: "#4c956c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "24%",
  },
  containerFlatList: {
    width: "88%",
    marginBottom: "28%",
  },
  containerFlatList: {
    width: "88%",
    marginBottom: "28%",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  articleContainer: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#2c6e49",
    padding: 15,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 7 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  articleTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fefee3",
    fontFamily: "Comfortaa",
  },
  articleAuthor: {
    textAlign: "right",
    fontSize: 14,
    marginTop: "3%",
    color: "#2c6e49",
    fontFamily: "Comfortaa",
  },
  articleContent: {
    textAlign: "left",
    fontSize: 16,
    color: "#fefee3",
    fontFamily: "Comfortaa",
  },
  readMoreText: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: "Comfortaa",
  },
  readFullArticleText: {
    color: "#FF4500",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});
