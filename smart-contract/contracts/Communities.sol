//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Communities {
    struct Community {
        string communityName;
        string communityDescription;
        address[] communityMembers;
        address communityOwner;
        uint256 communityId;
    }

    Community[] public allCommunities;
    mapping (uint256 => Community) public communityIdToCommunity;
    mapping(address => bool) public isCommunityMember;


    uint256 public totalCommunities;

    function createCommunity(string memory _communityName, string memory _communityDescription) external {
        Community memory newCommunity = Community({
            communityName: _communityName,
            communityDescription: _communityDescription,
            communityMembers: new address[](0),
            communityOwner: msg.sender,
            communityId: totalCommunities
        });
        allCommunities.push(newCommunity);
        totalCommunities++;
    }

    function joinACommunity(uint256 _communityId) external {
        require(!isCommunityMember[msg.sender], "You are already a member of this community");
        //ccheck if community exist
        require(_communityId < totalCommunities, "This community does not exist");
        allCommunities[_communityId].communityMembers.push(msg.sender);
        isCommunityMember[msg.sender] = true;
    }

    function leaveCommunity(uint256 _communityId) external {
    require(isCommunityMember[msg.sender], "You are not a member of this community");
    
    Community storage community = allCommunities[_communityId];
    address[] storage communityMembers = community.communityMembers;
    
    // Get the index of the member to remove
    uint256 memberIndex = memberIndexInCommunity(communityMembers, msg.sender);
    require(memberIndex < communityMembers.length, "Member not found in community");

    // Swap the member to remove with the last member in the array
    address lastMember = communityMembers[communityMembers.length - 1];
    communityMembers[memberIndex] = lastMember;

    // Update the index mapping for the swapped member
    isCommunityMember[lastMember] = true;

    // Pop the last element to remove the member
    communityMembers.pop();

    // Update the index mapping for the removed member
    isCommunityMember[msg.sender] = false;
}

  // Helper function to find the index of a member in the communityMembers array
  function memberIndexInCommunity(address[] storage members, address member) internal view returns (uint256) {
    for (uint256 i = 0; i < members.length; i++) {
        if (members[i] == member) {
            return (i);
        }
    }
    return (0); // Not found
}


    function retreiveAllCommunities() external view returns (Community[] memory) {
        return allCommunities;
    }

    function checkIfMember(address _member) external view returns (bool) {
        return isCommunityMember[_member];
    }

    function retrieveCommunityMembers(uint256 _communityId) external view returns (address[] memory) {
        return allCommunities[_communityId].communityMembers;
    }

    //function to retrive all the community a user is a member of
    function retreiveCommunity(address _member) external view returns (Community[] memory) {
        //check if community exist
        require(isCommunityMember[_member], "You are not a member of any community");
        Community[] memory memberCommunities = new Community[](totalCommunities);
        uint256 counter = 0;
        for (uint256 i = 0; i < totalCommunities; i++) {
            if (isCommunityMember[_member]) {
                memberCommunities[counter] = allCommunities[i];
                counter++;
            }
        }
        return memberCommunities;
    }
}