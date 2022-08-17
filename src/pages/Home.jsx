import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostCard } from "../components/PostCard";

const StyledPageHome = styled.div`
  padding: 80px;

  display: grid;
  gap: 24px;
`;

const StyledLink = styled(Link)`
  padding: 8px 24px;
  margin-left: auto;

  border-radius: 4px;
  background-color: #141d39;

  text-decoration: none;
  color: #fff;

  transition: background-color 0.4s;

  &:hover {
    background-color: #112f3f;
  }
`;

const StyledPostList = styled.div`
  padding: 8px;

  display: grid;
  gap: 8px;

  border-radius: 4px;

  background-color: #fff;
`;

const StyledPostCard = styled(PostCard)`
  border: 1px solid #dfdfdf;
  border-radius: 4px;
`;

const StyledPlaceholder = styled.div`
  padding: 48px;

  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const PageHome = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const onPostClick = (post) => {
    const { id } = post;


    console.log('post', post);

    localStorage.setItem("selectedPost", JSON.stringify(post));
    navigate(`/posts/${id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:7777/posts");
      const json = await response.json();

      setPosts(json);
    })();
  }, []);

  return (
    <StyledPageHome>
      <StyledLink to="/posts/new">Создать пост</StyledLink>

      <StyledPostList>
        {posts.length ? (
          posts.map((post) => {
            const { id, content, created } = post;

            return (
              <StyledPostCard
                key={id}
                content={content}
                created={created}
                onPostClick={() => onPostClick(post)}
              />
            );
          })
        ) : (
          <StyledPlaceholder>У вас нет созданных постов :(</StyledPlaceholder>
        )}
      </StyledPostList>
    </StyledPageHome>
  );
};

export { PageHome };
