 // SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

contract Post {
    struct ContentPost {
        string contentImage;
        string contentPost;
        address[] contentContributors;
        address contentOwner;
        uint256 contentId;
        uint256 communityId;
    }

    event PostCreated(uint256 indexed contentId, address indexed contentOwner, uint256 communityId);
    event ContributionMade(uint256 indexed contentId, address indexed contributor, uint256 amount);


    modifier onlyContentOwner(uint256 _contentId) {
    require(msg.sender == allContent[_contentId].contentOwner, "Not the content owner");
    _;
    }

    modifier contentExists(uint256 _contentId) {
    require(_contentId < totalContent, "Content does not exist");
    _;
   }


    ContentPost[] public allContent;
    mapping(uint256 => ContentPost[])  idToPost;

    uint256 public totalContent;

    function createPost(string memory _contentImage, string memory _contentPost, uint256 _communityID) external {
        ContentPost memory newContent = ContentPost({
            contentImage: _contentImage,
            contentPost: _contentPost,
            contentContributors: new address[](0),
            contentOwner: msg.sender,
            contentId: totalContent,
            communityId: _communityID
        });
        allContent.push(newContent);
        totalContent++;
         emit PostCreated(newContent.contentId, msg.sender, _communityID);
    }


    function retreiveAllContent() external view returns (ContentPost[] memory) {
        return allContent;
    }

    function retreiveContent(uint256 _contentId) external view returns (ContentPost memory) {
        return allContent[_contentId];
    }

    function contributeContent(uint256 _contentId) external payable contentExists(_contentId) {
        require(msg.value > 0, "You need to send some ether");
        //send payment straight to the owner of the content
        payable(allContent[_contentId].contentOwner).transfer(msg.value);
        allContent[_contentId].contentContributors.push(msg.sender);
        emit ContributionMade(_contentId, msg.sender, msg.value);
    }

    function retreiveContributors(uint256 _contentId) external view returns (address[] memory) {
        return allContent[_contentId].contentContributors;
    }

   function fetchPostByCommunityId(uint256 _communityId) external view returns (ContentPost[] memory) {
    uint256 count = 0;

    // Count the number of posts in the specified community
    for (uint256 i = 0; i < allContent.length; i++) {
        if (allContent[i].communityId == _communityId) {
            count++;
        }
    }

    // Create a dynamic array with the correct size
    ContentPost[] memory communityPosts = new ContentPost[](count);

    // Populate the array with posts from the specified community
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < allContent.length; i++) {
        if (allContent[i].communityId == _communityId) {
            communityPosts[currentIndex] = allContent[i];
            currentIndex++;
        }
    }

     return communityPosts;
     }

  receive() external payable {
    // Handle incoming Ether
  }

}