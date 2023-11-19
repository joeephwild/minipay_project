import ProfileABI from "./Profile.json";
import MentorABI from "./Mentor.json";
import LacentBadgeABI from "./LancentBadge.json";
import LaentContentABI from "./LacentContent.json";
import communityABI from "./Community.json";
import postABI from "./Post.json";

const profileAddress = "0xF152B89DddfF08b0dC1D6Cd37A239F7045C81845";
const MentorAddress = "0x2F793feA079FF92C36F6fB9EC5aAE6c7efFA472F";
const LancentBadgeAddress = "0xF152B89DddfF08b0dC1D6Cd37A239F7045C81845";
const LacentContentAddress = "0x815B5034b894E855E29B5286696b5ce7Ed643bbc";
const communityAddress = "0x49DB7e2FE891C82599c7255C40F0d4832990B6ae";
const postAddress = "0x5B8E1eabB43a88926ce29Dd57E48E9a0268d702d";

const lacentBadgeAbi = LacentBadgeABI;
const ProfileAbi = ProfileABI;
const MentorAbi = MentorABI;
const LacentContentAbi = LaentContentABI;
const communityAbi = communityABI;
const postAbi = postABI;

export {
  profileAddress,
  ProfileAbi,
  MentorAddress,
  MentorAbi,
  lacentBadgeAbi,
  LancentBadgeAddress,
  LacentContentAddress,
  LacentContentAbi,
  communityAbi,
  communityAddress,
  postAbi,
  postAddress,
};
