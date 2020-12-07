import { useEffect, useState } from "react";

import { Container } from "semantic-ui-react";

import HeaderWrapper from "../../Component/Header";

import SearchBar from "../../Component/SearchBar";

import FriendsList from "../../Component/FriendsList";

import FriendSuggestionList from "../../Component/FriendSuggestion";

import Pagination from "../../Component/Pagination";

const FriendListContainer = () => {
  /**
   * Local state for dummy friend list
   */

  const [users, setUsers] = useState([
    { name: "Ankit Lale", favorite: false },
    { name: "Kajal Dalai", favorite: true },
    { name: "Prajakta Parab", favorite: false },
    { name: "Prajakta Yadav", favorite: true },
    { name: "Sagar Pednekar", favorite: false },
  ]);

  const PAGINATION_COUNT = 4; // displays 4 results

  useEffect(() => {
    const usersData = users.slice(0, PAGINATION_COUNT);
    setDisplayUsers(usersData);
  }, [users]);

  /**
   * Local State
   */

  const [friendList, setFriendList] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [enableSearch, toggleEnableSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * handlers
   */

  /**
   * Suggest matching friends from existing list
   * @param {*} name - User input name
   * returns
   */

  const handleUserSearch = (name) => {
    if (name) {
      const matchingUsers = checkIfAlreadyFriend(name);
      if (matchingUsers.length) {
        toggleEnableSearch(true);
        setFriendList(matchingUsers);
        return;
      }
    }
    toggleEnableSearch(false);
    setUsers(users);
  };

  /**
   * Check if friend already exist in friendlist
   * @param {*} name - User input name
   * @return  boolean
   */

  const checkIfAlreadyFriend = (name) => {
    return users?.filter((friend) =>
      friend?.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  /**
   * Add user on enter key event 
   * @param {*} e - event data
   */

  const handleEnterClick = (e) => {
    if (searchQuery && e.key === "Enter") {
      setUsers([{ name: searchQuery, favorite: false }, ...users]);
      setSearchQuery("");
    }
  };

  /**
   * Delete the user from friend list
   * @param {*} name - Name of user to delete
   */

  const deleteUser = (name) => {
    if (name) {
      const updatedUsers = users?.filter(
        (friend) => friend?.name.toLowerCase() !== name.toLowerCase()
      );
      setUsers(updatedUsers);
    }
  };

  /**
   * Add/remove friend from favorites list
   * @param {*} user - User object
   */

  const toggleFavorite = (user) => {
    const updatedUsers = users.filter((friend) => {
      return friend?.name.toLowerCase() !== user.name.toLowerCase();
    });
    if (!user.favorite) {
      updatedUsers.unshift({ ...user, favorite: true });
      setUsers(updatedUsers);
      return;
    }
    updatedUsers.push({ ...user, favorite: false });
    setUsers(updatedUsers);
  };

  /**
   * Sort the user list by favoites on the Top
   */

  const sortByFavorites = () => {
    const nonfavorites = users.filter((user) => {
      return !user.favorite;
    });

    const favorites = users.filter((user) => {
      return user.favorite;
    });

    setUsers([...favorites, ...nonfavorites]);
  };

  /**
   * Sort the user list in ascending order of the name
   */

  const sortByName = () => {
    const updatedUsers = users.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setUsers([...updatedUsers]);
  };

  /**
   * Handler to toggle pagination for friend list
   * @param {*} currentPageNo
   */

  const handlePagination = (currentPageNo) => {
    if (currentPageNo > 1) {
      const end = PAGINATION_COUNT * currentPageNo;
      const paginatedUsers = users.slice(end - PAGINATION_COUNT, end);
      setDisplayUsers(paginatedUsers);
      return;
    }
    const usersData = users.slice(0, PAGINATION_COUNT);
    setDisplayUsers(usersData);
  };

  /**
   * Handle to toggle between Sort by name/favorites
   * @param {*} e - event object
   * @param {*} selection  - Sorting criteria
   */

  const handleSort = (e, selection) => {
    switch (selection?.value) {
      case "byName":
        return sortByName();
      case "byFavorites":
        return sortByFavorites();
      default:
        return;
    }
  };

  return (
    <Container>
      <HeaderWrapper />

      <SearchBar
        setSearchQuery={setSearchQuery}
        handleUserSearch={handleUserSearch}
        handleEnterClick={handleEnterClick}
        searchQuery={searchQuery}
        handleSort={handleSort}
      />

      <FriendsList
        displayUsers={displayUsers}
        enableSearch={enableSearch}
        deleteUser={deleteUser}
        toggleFavorite={toggleFavorite}
      />

      <FriendSuggestionList
        toggleFavorite={toggleFavorite}
        deleteUser={deleteUser}
        enableSearch={enableSearch}
        friendList={friendList}
      />

      <Pagination
        handlePagination={handlePagination}
        users={users}
        paginationCount={PAGINATION_COUNT}
      />
    </Container>
  );
};
export default FriendListContainer;
