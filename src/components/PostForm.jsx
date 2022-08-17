import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledPostForm = styled.form`
  position: relative;

  padding: 8px;

  display: grid;
  gap: 8px;

  border-radius: 4px;

  background-color: #fff;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: -32px;
  right: 0;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;

  background-color: transparent;
  cursor: pointer;

  font-size: 22px;
  font-weight: 500;
  color: #000;
`;

const StyledInput = styled.input`
  padding: 8px 16px;

  width: 100%;

  background-color: #fff;

  border: 1px solid #eee;
  border-radius: 4px;

  transition: border-color 0.4s;
  outline: none;

  &:hover {
    border-color: #d1d1d1;
  }
`;

const StyledButton = styled.button`
  padding: 8px 24px;
  margin-left: auto;

  border: 0;
  border-radius: 4px;
  background-color: #141d39;

  color: #fff;

  transition: background-color 0.4s;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #112f3f;
  }

  &:disabled {
    background-color: #eee;
    color: #d1d1d1;

    cursor: not-allowed;
  }
`;

const PostForm = (props) => {
  const { postValue, buttonText, isDisabled, onPostValueChange, onSubmit } =
    props;

  const navigate = useNavigate();

  return (
    <StyledPostForm
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <StyledCloseButton onClick={navigate(-1)}>x</StyledCloseButton>

      <StyledInput
        value={postValue}
        placeholder="Что у вас нового?"
        onChange={(event) => onPostValueChange(event.target.value)}
      />

      <StyledButton type="submit" disabled={isDisabled}>
        {buttonText}
      </StyledButton>
    </StyledPostForm>
  );
};

export { PostForm };
