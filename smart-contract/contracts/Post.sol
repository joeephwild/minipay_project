// SPDX-Lincense-Identifier: UNLICENSED

pragma solidity ^0.8.20;

contract Post {
    struct ContentPost {
        string contentImage;
        string contentPost;
        address[] contentContributors;
        address contentOwner;
        uint256 contentId;
    }

    ContentPost[] public allContent;

    uint256 public totalContent;

    function createPost(string memory _contentImage, string memory _contentPost) external {
        ContentPost memory newContent = ContentPost({
            contentImage: _contentImage,
            contentPost: _contentPost,
            contentContributors: new address[](0),
            contentOwner: msg.sender,
            contentId: totalContent
        });
        allContent.push(newContent);
        totalContent++;
    }


    function retreiveAllContent() external view returns (ContentPost[] memory) {
        return allContent;
    }

    function retreiveContent(uint256 _contentId) external view returns (ContentPost memory) {
        return allContent[_contentId];
    }

    function contributeContent(uint256 _contentId) external payable {
        require(msg.value > 0, "You need to send some ether");
        //send payment straight to the owner of the content
        payable(allContent[_contentId].contentOwner).transfer(msg.value);
        allContent[_contentId].contentContributors.push(msg.sender);
    }

    function retreiveContributors(uint256 _contentId) external view returns (address[] memory) {
        return allContent[_contentId].contentContributors;
    }
}