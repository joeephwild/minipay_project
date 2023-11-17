import ProfileABI from "./Profile.json";
import MentorABI from "./Mentor.json";
import LacentBadgeABI from "./LancentBadge.json";
import LaentContentABI from "./LacentContent.json";
import communityABI from "./Community.json";
import postABI from "./Post.json";

const profileAddress = "0xF152B89DddfF08b0dC1D6Cd37A239F7045C81845";
const MentorAddress = "0xb6E5ed136ce33964d25B51723F217142D01C4801";
const LancentBadgeAddress = "0xF152B89DddfF08b0dC1D6Cd37A239F7045C81845";
const LacentContentAddress = "0xb656E4E3258fD2D28c56E4aeA818840B905Ecb73";
const communityAddress = "0x4Ad0929eD337a32f46F54D44277FB3c7052a2Ce1";
const postAddress = "0xf11e0BAD3Cc5D62D920B74B2DA79205517b017A9";

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
