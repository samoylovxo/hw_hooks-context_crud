import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import styled, { css } from "styled-components";

const StyledPagePostDetails = styled.div`
  padding: 80px;

  display: grid;
  gap: 24px;
`;

const StyledHeader = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`;

const StyledDetails = styled.div`
  padding: 8px;

  display: grid;
  gap: 8px;

  border-radius: 4px;

  background-color: #fff;
`;

const StyledContent = styled.div`
  font-size: 16px;
`;

const StyledButtons = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledButton = styled.button`
  padding: 8px 24px;

  border: 0;
  border-radius: 4px;
  background-color: ${({ isDelete }) => (isDelete ? "#931d1d" : "#141d39")};

  color: #fff;

  transition: background-color 0.4s;
  cursor: pointer;

  &:hover:not(:disabled) {
    ${({ isDelete }) =>
      !isDelete &&
      css`
        background-color: #112f3f;
      `}
  }

  &:disabled {
    background-color: #eee;
    color: #d1d1d1;

    cursor: not-allowed;
  }
`;

const PagePostDetails = () => {
  const navigate = useNavigate();

  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const title = showEditForm ? "Редактирование поста" : "Просмотр поста";
  const isDisabledButton = !selectedPost?.content;

  const onInputChange = (value) =>
    setSelectedPost((prev) => ({ ...prev, content: value }));
  const onPostCreate = async () => {
    const response = await fetch("http://localhost:7777/posts", {
      method: "POST",
      body: JSON.stringify({
        id: selectedPost?.id,
        content: selectedPost?.content,
      }),
    });

    if (response) {
      navigate("/");
      setShowEditForm(false);
    }
  };

  const onPostDelete = async (id) => {
    const response = await fetch(`http://localhost:7777/posts/${id}`, {
      method: "DELETE",
    });

    if (response) {
      navigate("/");
      setShowEditForm(false);
    }
  };

  useEffect(() => {
    const post = localStorage.getItem("selectedPost") || null;

    if (!post) navigate("/");

    setSelectedPost(JSON.parse(post));
  }, []);

  return (
    <StyledPagePostDetails>
      <StyledHeader>{title}</StyledHeader>

      {showEditForm ? (
        <PostForm
          postValue={selectedPost?.content}
          buttonText="Изменить"
          isDisabled={isDisabledButton}
          onPostValueChange={onInputChange}
          onSubmit={onPostCreate}
        />
      ) : (
        <StyledDetails>
          <StyledContent>{selectedPost?.content}</StyledContent>

          <StyledButtons>
            <StyledButton onClick={() => setShowEditForm(true)}>
              Изменить
            </StyledButton>

            <StyledButton
              isDelete={true}
              onClick={() => onPostDelete(selectedPost?.id)}
            >
              Удалить
            </StyledButton>
          </StyledButtons>
        </StyledDetails>
      )}
    </StyledPagePostDetails>
  );
};

export { PagePostDetails };
