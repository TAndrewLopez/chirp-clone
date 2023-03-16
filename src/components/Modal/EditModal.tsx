import { editModalState } from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/userCurrentUser";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import ImageUpload from "../ImageUpload";
import Input from "../Input";
import Modal from "./Modal";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const [editState, setEditState] = useRecoilState(editModalState);

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();
      toast.success("Updated.");
      setEditState((prev) => ({
        ...prev,
        isOpen: false,
      }));
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    profileImage,
    coverImage,
    name,
    username,
    bio,
    editModalState,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(evt) => setName(evt.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(evt) => setUsername(evt.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(evt) => setBio(evt.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editState.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={() => setEditState((prev) => ({ ...prev, isOpen: false }))}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
