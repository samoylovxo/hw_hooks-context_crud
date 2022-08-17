import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostForm } from "../components/PostForm";

const StyledPagePostCreate = styled.div`
  padding: 80px;

  display: grid;
  gap: 24px;
`;

const StyledHeader = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`;

const PagePostCreate = () => {
  const navigate = useNavigate();

  const [postValue, setPostValue] = useState("");

  const isDisabledButton = !postValue;

  const onInputChange = (value) => setPostValue(value);
  const onPostCreate = async () => {
    const response = await fetch("http://localhost:7777/posts", {
      method: "POST",
      body: JSON.stringify({
        id: 0,
        content: postValue,
      }),
    });

    if (response) {
      navigate("/");
      setPostValue("");
    }
  };

  return (
    <StyledPagePostCreate>
      <StyledHeader>Создание поста</StyledHeader>

      <PostForm
        postValue={postValue}
        buttonText="Опубликовать"
        isDisabled={isDisabledButton}
        onPostValueChange={onInputChange}
        onSubmit={onPostCreate}
      />
    </StyledPagePostCreate>
  );
};

export { PagePostCreate };
