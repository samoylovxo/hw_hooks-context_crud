import styled from "styled-components";

const StyledPostCard = styled.div`
  padding: 24px;

  display: grid;
  gap: 12px;
`;

const StyledCreatedTime = styled.div`
  font-size: 12px;
  color: #a0a0a0;
`;

const StyledContent = styled.div`
  font-size: 16px;
`;

const PostCard = (props) => {
  const { className, content, created, onPostClick } = props;

  const createdDate = new Date(created * 1000);

  const hours = createdDate.getHours();
  const minutes = createdDate.getMinutes();

  return (
    <StyledPostCard className={className} onClick={onPostClick}>
      <StyledCreatedTime>
        Создан в {hours}:{minutes}
      </StyledCreatedTime>
      <StyledContent>{content}</StyledContent>
    </StyledPostCard>
  );
};

export { PostCard };
