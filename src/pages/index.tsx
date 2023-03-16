import Form from "@/components/Form";
import Header from "@/components/Header/Header";
import PostFeed from "@/components/Posts/PostFeed";

const HomePage = () => {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
};

export default HomePage;
